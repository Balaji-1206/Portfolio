from flask import Blueprint, render_template, request, session, redirect, url_for, flash
from auth_utils import ADMIN_PASSWORD

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/admin/login", methods=["GET", "POST"])
def login():
    if session.get("admin_logged_in"):
        return redirect(url_for("admin.dashboard"))
    if request.method == "POST":
        password = request.form.get("password", "")
        if password == ADMIN_PASSWORD:
            session["admin_logged_in"] = True
            session.permanent = True
            flash("Welcome back, Admin!", "success")
            return redirect(url_for("admin.dashboard"))
        flash("Incorrect password.", "error")
    return render_template("login.html")

@auth_bp.route("/admin/logout")
def logout():
    session.clear()
    flash("Logged out successfully.", "success")
    return redirect(url_for("home.index"))
