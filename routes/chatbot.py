import os
import groq
from flask import Blueprint, render_template, request, jsonify
from db import get_db
from dotenv import load_dotenv

load_dotenv()

chatbot_bp = Blueprint("chatbot", __name__)

GROQ_API_KEY = os.environ.get("GROQ_API_KEY") or os.environ.get("GROK_API_KEY")

client = None
if GROQ_API_KEY:
    client = groq.Groq(api_key=GROQ_API_KEY)

def build_system_prompt(db):
    """Build system prompt from portfolio data in DB."""
    home = db.table("home").select("*").eq("id", 1).execute().data
    about = db.table("about").select("*").eq("id", 1).execute().data
    skills = db.table("skills").select("*").execute().data
    projects = db.table("projects").select("*").execute().data
    contact = db.table("contact").select("*").eq("id", 1).execute().data
    knowledge = db.table("chat_knowledge").select("*").execute().data

    home_d = home[0] if home else {}
    about_d = about[0] if about else {}
    contact_d = contact[0] if contact else {}

    skills_text = "\n".join([
        f"- {s['name']} ({s.get('category','')}): {s.get('description','')}"
        for s in (skills or [])
    ])
    projects_text = "\n".join([
        f"- {p['title']}: {p.get('description','')} | Tech: {p.get('tech_stack','')}"
        for p in (projects or [])
    ])
    knowledge_text = "\n".join([
        f"Q: {k['question']}\nA: {k['answer']}"
        for k in (knowledge or [])
    ])

    return f"""You are a helpful AI assistant for {home_d.get('name', 'a developer')}'s portfolio website.
Answer questions about the portfolio owner based ONLY on the information below.
Be friendly, concise, and professional. If asked something not in the data, politely say you don't have that information.

== ABOUT ==
Name: {home_d.get('name', '')}
Title: {home_d.get('title', '')}
Bio: {about_d.get('bio', '')}

== SKILLS ==
{skills_text}

== PROJECTS ==
{projects_text}

== CONTACT ==
Email: {contact_d.get('email', '')}
GitHub: {contact_d.get('github_url', '')}
LinkedIn: {contact_d.get('linkedin_url', '')}

== ADDITIONAL KNOWLEDGE ==
{knowledge_text}
"""

@chatbot_bp.route("/chat")
def index():
    return render_template("chatbot.html")

@chatbot_bp.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    history = data.get("history", [])

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    if not GROQ_API_KEY:
        return jsonify({"reply": "Chatbot is not configured. Admin needs to set GROK_API_KEY."}), 200

    db = get_db()
    system_prompt = build_system_prompt(db)

    messages = [{"role": "system", "content": system_prompt}]
    for h in history[-10:]:  # keep last 10 turns
        messages.append({"role": h["role"], "content": h["content"]})
    messages.append({"role": "user", "content": user_message})

    try:
        if client is None:
            raise RuntimeError("GROQ client not configured")

        resp = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=messages,
            max_tokens=500,
            temperature=0.7,
        )
        reply = resp.choices[0].message.content
        return jsonify({"reply": reply})
    except Exception as e:
        print(f"Chatbot error: {e}")
        return jsonify({"reply": "Sorry, I'm having trouble connecting right now. Please try again later."}), 200
