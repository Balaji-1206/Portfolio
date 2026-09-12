import os
from flask import Flask
from routes.auth import auth_bp
from routes.home import home_bp
from routes.about import about_bp
from routes.skills import skills_bp
from routes.projects import projects_bp
from routes.contact import contact_bp
from routes.chatbot import chatbot_bp
from routes.admin import admin_bp
from db import init_db, get_db
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-prod")

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(home_bp)
app.register_blueprint(about_bp)
app.register_blueprint(skills_bp)
app.register_blueprint(projects_bp)
app.register_blueprint(contact_bp)
app.register_blueprint(chatbot_bp)
app.register_blueprint(admin_bp)

# ── Global template context ───────────────────────────────
@app.context_processor
def inject_footer_data():
    """Make contact + home data available in every template for the footer."""
    try:
        db = get_db()
        contact = db.table("contact").select("*").eq("id", 1).execute().data
        home    = db.table("home").select("name").eq("id", 1).execute().data
        return {
            "g_contact": contact[0] if contact else {},
            "g_home":    home[0]    if home    else {},
        }
    except Exception:
        return {"g_contact": {}, "g_home": {}}

if __name__ == "__main__":
    init_db()
    app.run(debug=os.environ.get("FLASK_DEBUG", "false").lower() == "true")
