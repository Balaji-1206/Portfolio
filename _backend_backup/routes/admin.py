from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify, session
from auth_utils import login_required
from db import get_db

admin_bp = Blueprint("admin", __name__, url_prefix="/admin")

# ── Dashboard ──────────────────────────────────────────────
@admin_bp.route("/")
@login_required
def dashboard():
    db = get_db()
    skills_count = len(db.table("skills").select("id").execute().data or [])
    projects_count = len(db.table("projects").select("id").execute().data or [])
    knowledge_count = len(db.table("chat_knowledge").select("id").execute().data or [])
    return render_template("admin/dashboard.html",
        skills_count=skills_count,
        projects_count=projects_count,
        knowledge_count=knowledge_count
    )

# ── Home ───────────────────────────────────────────────────
@admin_bp.route("/home", methods=["GET", "POST"])
@login_required
def edit_home():
    db = get_db()
    if request.method == "POST":
        payload = {
            "greeting": request.form.get("greeting"),
            "name": request.form.get("name"),
            "title": request.form.get("title"),
            "subtitle": request.form.get("subtitle"),
            "collab_text": request.form.get("collab_text"),
            "cta_text": request.form.get("cta_text"),
            "cta_link": request.form.get("cta_link"),
        }
        db.table("home").upsert({"id": 1, **payload}).execute()
        flash("Home page updated!", "success")
        return redirect(url_for("admin.edit_home"))
    data = db.table("home").select("*").eq("id", 1).execute().data
    return render_template("admin/edit_home.html", home=data[0] if data else {})

# ── About ──────────────────────────────────────────────────
@admin_bp.route("/about", methods=["GET", "POST"])
@login_required
def edit_about():
    db = get_db()
    if request.method == "POST":
        payload = {
            "image_url": request.form.get("image_url"),
            "image_shape": request.form.get("image_shape"),
            "bio_title": request.form.get("bio_title"),
            "bio": request.form.get("bio"),
            "resume_link": request.form.get("resume_link"),
        }
        db.table("about").upsert({"id": 1, **payload}).execute()
        flash("About page updated!", "success")
        return redirect(url_for("admin.edit_about"))
    data = db.table("about").select("*").eq("id", 1).execute().data
    return render_template("admin/edit_about.html", about=data[0] if data else {})

# ── Skills ─────────────────────────────────────────────────
@admin_bp.route("/skills")
@login_required
def skills():
    db = get_db()
    data = db.table("skills").select("*").order("sort_order").execute().data or []
    return render_template("admin/skills.html", skills=data)

@admin_bp.route("/skills/new", methods=["GET", "POST"])
@login_required
def new_skill():
    if request.method == "POST":
        db = get_db()
        db.table("skills").insert({
            "name": request.form.get("name"),
            "image_url": request.form.get("image_url"),
            "description": request.form.get("description"),
            "certification_name": request.form.get("certification_name"),
            "certification_url": request.form.get("certification_url"),
            "category": request.form.get("category"),
            "sort_order": int(request.form.get("sort_order", 0)),
        }).execute()
        flash("Skill added!", "success")
        return redirect(url_for("admin.skills"))
    return render_template("admin/edit_skill.html", skill={}, action="new")

@admin_bp.route("/skills/<int:skill_id>/edit", methods=["GET", "POST"])
@login_required
def edit_skill(skill_id):
    db = get_db()
    if request.method == "POST":
        db.table("skills").update({
            "name": request.form.get("name"),
            "image_url": request.form.get("image_url"),
            "description": request.form.get("description"),
            "certification_name": request.form.get("certification_name"),
            "certification_url": request.form.get("certification_url"),
            "category": request.form.get("category"),
            "sort_order": int(request.form.get("sort_order", 0)),
        }).eq("id", skill_id).execute()
        flash("Skill updated!", "success")
        return redirect(url_for("admin.skills"))
    data = db.table("skills").select("*").eq("id", skill_id).execute().data
    return render_template("admin/edit_skill.html", skill=data[0] if data else {}, action="edit")

@admin_bp.route("/skills/<int:skill_id>/delete", methods=["POST"])
@login_required
def delete_skill(skill_id):
    get_db().table("skills").delete().eq("id", skill_id).execute()
    flash("Skill deleted.", "success")
    return redirect(url_for("admin.skills"))

# ── Projects ───────────────────────────────────────────────
@admin_bp.route("/projects")
@login_required
def projects():
    db = get_db()
    data = db.table("projects").select("*").order("sort_order").execute().data or []
    return render_template("admin/projects.html", projects=data)

@admin_bp.route("/projects/new", methods=["GET", "POST"])
@login_required
def new_project():
    if request.method == "POST":
        db = get_db()
        db.table("projects").insert({
            "title": request.form.get("title"),
            "image_url": request.form.get("image_url"),
            "description": request.form.get("description"),
            "tech_stack": request.form.get("tech_stack"),
            "live_url": request.form.get("live_url"),
            "github_url": request.form.get("github_url"),
            "video_url": request.form.get("video_url"),
            "featured": request.form.get("featured") == "on",
            "sort_order": int(request.form.get("sort_order", 0)),
        }).execute()
        flash("Project added!", "success")
        return redirect(url_for("admin.projects"))
    return render_template("admin/edit_project.html", project={}, action="new")

@admin_bp.route("/projects/<int:project_id>/edit", methods=["GET", "POST"])
@login_required
def edit_project(project_id):
    db = get_db()
    if request.method == "POST":
        db.table("projects").update({
            "title": request.form.get("title"),
            "image_url": request.form.get("image_url"),
            "description": request.form.get("description"),
            "tech_stack": request.form.get("tech_stack"),
            "live_url": request.form.get("live_url"),
            "github_url": request.form.get("github_url"),
            "video_url": request.form.get("video_url"),
            "featured": request.form.get("featured") == "on",
            "sort_order": int(request.form.get("sort_order", 0)),
        }).eq("id", project_id).execute()
        flash("Project updated!", "success")
        return redirect(url_for("admin.projects"))
    data = db.table("projects").select("*").eq("id", project_id).execute().data
    return render_template("admin/edit_project.html", project=data[0] if data else {}, action="edit")

@admin_bp.route("/projects/<int:project_id>/delete", methods=["POST"])
@login_required
def delete_project(project_id):
    get_db().table("projects").delete().eq("id", project_id).execute()
    flash("Project deleted.", "success")
    return redirect(url_for("admin.projects"))

# ── Contact ────────────────────────────────────────────────
@admin_bp.route("/contact", methods=["GET", "POST"])
@login_required
def edit_contact():
    db = get_db()
    if request.method == "POST":
        payload = {
            "email": request.form.get("email"),
            "phone": request.form.get("phone"),
            "location": request.form.get("location"),
            "github_url": request.form.get("github_url"),
            "linkedin_url": request.form.get("linkedin_url"),
            "twitter_url": request.form.get("twitter_url"),
            "instagram_url": request.form.get("instagram_url"),
            "website_url": request.form.get("website_url"),
            "contact_heading": request.form.get("contact_heading"),
            "contact_subtext": request.form.get("contact_subtext"),
        }
        db.table("contact").upsert({"id": 1, **payload}).execute()
        flash("Contact info updated!", "success")
        return redirect(url_for("admin.edit_contact"))
    data = db.table("contact").select("*").eq("id", 1).execute().data
    return render_template("admin/edit_contact.html", contact=data[0] if data else {})

# ── Chat Knowledge ─────────────────────────────────────────
@admin_bp.route("/knowledge")
@login_required
def knowledge():
    db = get_db()
    data = db.table("chat_knowledge").select("*").order("category").execute().data or []
    return render_template("admin/knowledge.html", items=data)

@admin_bp.route("/knowledge/new", methods=["GET", "POST"])
@login_required
def new_knowledge():
    if request.method == "POST":
        db = get_db()
        db.table("chat_knowledge").insert({
            "category": request.form.get("category"),
            "question": request.form.get("question"),
            "answer": request.form.get("answer"),
        }).execute()
        flash("Knowledge item added!", "success")
        return redirect(url_for("admin.knowledge"))
    return render_template("admin/edit_knowledge.html", item={}, action="new")

@admin_bp.route("/knowledge/<int:item_id>/edit", methods=["GET", "POST"])
@login_required
def edit_knowledge(item_id):
    db = get_db()
    if request.method == "POST":
        db.table("chat_knowledge").update({
            "category": request.form.get("category"),
            "question": request.form.get("question"),
            "answer": request.form.get("answer"),
        }).eq("id", item_id).execute()
        flash("Updated!", "success")
        return redirect(url_for("admin.knowledge"))
    data = db.table("chat_knowledge").select("*").eq("id", item_id).execute().data
    return render_template("admin/edit_knowledge.html", item=data[0] if data else {}, action="edit")

@admin_bp.route("/knowledge/<int:item_id>/delete", methods=["POST"])
@login_required
def delete_knowledge(item_id):
    get_db().table("chat_knowledge").delete().eq("id", item_id).execute()
    flash("Deleted.", "success")
    return redirect(url_for("admin.knowledge"))
