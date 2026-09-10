from flask import Blueprint, render_template
from db import get_db

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/contact")
def index():
    db = get_db()
    result = db.table("contact").select("*").eq("id", 1).execute()
    data = result.data[0] if result.data else {}
    return render_template("contact.html", contact=data)
