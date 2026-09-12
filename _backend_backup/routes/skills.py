from flask import Blueprint, render_template
from db import get_db

skills_bp = Blueprint("skills", __name__)

@skills_bp.route("/skills")
def index():
    db = get_db()
    result = db.table("skills").select("*").order("sort_order").execute()
    skills = result.data or []
    categories = sorted(set(s.get("category", "General") for s in skills))
    return render_template("skills.html", skills=skills, categories=categories)
