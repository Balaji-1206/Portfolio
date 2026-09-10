from flask import Blueprint, render_template
from db import get_db

projects_bp = Blueprint("projects", __name__)

@projects_bp.route("/projects")
def index():
    db = get_db()
    result = db.table("projects").select("*").order("sort_order").execute()
    projects = result.data or []
    for p in projects:
        if p.get("tech_stack"):
            p["tech_list"] = [t.strip() for t in p["tech_stack"].split(",") if t.strip()]
        else:
            p["tech_list"] = []
    return render_template("projects.html", projects=projects)
