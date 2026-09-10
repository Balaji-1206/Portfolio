from flask import Blueprint, render_template
from db import get_db

about_bp = Blueprint("about", __name__)

@about_bp.route("/about")
def index():
    db = get_db()
    result = db.table("about").select("*").eq("id", 1).execute()
    data = result.data[0] if result.data else {}
    return render_template("about.html", about=data)
