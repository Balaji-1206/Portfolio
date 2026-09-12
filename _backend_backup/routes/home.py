from flask import Blueprint, render_template
from db import get_db

home_bp = Blueprint("home", __name__)

@home_bp.route("/")
def index():
    db = get_db()
    home_res = db.table("home").select("*").eq("id", 1).execute()
    home_data = home_res.data[0] if home_res.data else {}

    about_res = db.table("about").select("*").eq("id", 1).execute()
    about_data = about_res.data[0] if about_res.data else {}

    skills_res = db.table("skills").select("*").order("sort_order").execute()
    skills_data = skills_res.data or []
    categories = sorted(set(s.get("category", "General") for s in skills_data))

    projects_res = db.table("projects").select("*").order("sort_order").execute()
    projects_data = projects_res.data or []
    for p in projects_data:
        if p.get("tech_stack"):
            p["tech_list"] = [t.strip() for t in p["tech_stack"].split(",") if t.strip()]
        else:
            p["tech_list"] = []

    contact_res = db.table("contact").select("*").eq("id", 1).execute()
    contact_data = contact_res.data[0] if contact_res.data else {}

    return render_template(
        "home.html",
        home=home_data,
        about=about_data,
        skills=skills_data,
        categories=categories,
        projects=projects_data,
        contact=contact_data
    )
