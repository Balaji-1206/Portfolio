import os
from functools import wraps
from flask import session, redirect, url_for, flash
from dotenv import load_dotenv

load_dotenv()

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get("admin_logged_in"):
            flash("Please login to access admin panel.", "warning")
            return redirect(url_for("auth.login"))
        return f(*args, **kwargs)
    return decorated
