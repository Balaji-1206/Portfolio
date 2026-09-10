# 🗂 Portfolio CMS

A full-stack, admin-managed portfolio website with an AI chatbot powered by Grok. Built with **Flask**, **Supabase**, and vanilla JS. Every page is fully editable through a secure admin panel — no code changes needed.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Home Page** | Animated hero with name, title, collab badge, CTA buttons |
| **About Page** | Profile image with shape selector (circle / square / rectangle / hexagon), bio, resume link |
| **Skills Page** | 1:1 image per skill, category filter, certification badges, descriptions |
| **Projects Page** | 16:9 banner, tech stack tags, live / GitHub / video links, featured badge |
| **Contact Page** | Email, phone, location, all major social links |
| **AI Chat Page** | Grok-powered chatbot trained on your portfolio data |
| **Admin Panel** | Full CRUD for every page, session-based login, responsive sidebar |

---

## 🗄 Tech Stack

- **Backend**: Python 3.11 + Flask
- **Database**: Supabase (PostgreSQL)
- **AI**: Grok API (`grok-3-latest`)
- **Deployment**: Render (backend) + Supabase (database)
- **Fonts**: Syne + DM Sans (Google Fonts)
- **Styling**: Custom CSS (no frameworks)

---

## 📁 Project Structure

```
portfolio/
├── app.py                  # Flask app entry point
├── db.py                   # Supabase client
├── auth_utils.py           # Login decorator & password check
├── schema.sql              # Run this in Supabase SQL editor
├── requirements.txt
├── Procfile                # For Render / Heroku deployment
├── runtime.txt             # Python version
├── render.yaml             # One-click Render config
├── .env.example            # Copy to .env for local dev
├── .gitignore
│
├── routes/
│   ├── __init__.py
│   ├── auth.py             # /admin/login  /admin/logout
│   ├── home.py             # /
│   ├── about.py            # /about
│   ├── skills.py           # /skills
│   ├── projects.py         # /projects
│   ├── contact.py          # /contact
│   ├── chatbot.py          # /chat  /api/chat
│   └── admin.py            # /admin/* (all CRUD routes)
│
├── templates/
│   ├── base.html           # Public nav, flash messages, footer
│   ├── login.html          # Admin login page
│   ├── home.html
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── contact.html
│   ├── chatbot.html
│   └── admin/
│       ├── base.html       # Admin sidebar + topbar
│       ├── dashboard.html
│       ├── edit_home.html
│       ├── edit_about.html
│       ├── skills.html
│       ├── edit_skill.html
│       ├── projects.html
│       ├── edit_project.html
│       ├── edit_contact.html
│       ├── knowledge.html
│       └── edit_knowledge.html
│
└── static/
    ├── css/
    │   ├── style.css       # Full design system (dark luxury theme)
    │   └── admin.css       # Admin panel styles
    └── js/
        └── main.js         # Nav toggle, scroll reveal, flash dismiss
```

---

## 🚀 Deployment Guide

### Step 1 — Set Up Supabase (Database)

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Note your **Project URL** and **anon public key** (Settings → API)
3. Go to **SQL Editor** → paste the entire contents of `schema.sql` → **Run**
4. Your tables are ready ✅

### Step 2 — Get a Grok API Key

1. Go to [console.x.ai](https://console.x.ai)
2. Create an account / sign in
3. Generate an API key under **API Keys**
4. Copy the key — you'll add it as an env var

### Step 3 — Deploy to Render (Backend + Frontend)

Render hosts your Flask app for free (with sleep on inactivity on free tier).

1. Push your project to a **GitHub repository**

```bash
git init
git add .
git commit -m "Initial portfolio CMS"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. Go to [render.com](https://render.com) → **New** → **Web Service**
3. Connect your GitHub repo
4. Render auto-detects the `render.yaml` — just confirm settings
5. Add these **Environment Variables** in Render dashboard:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | `https://xxxx.supabase.co` |
| `SUPABASE_KEY` | Your Supabase anon key |
| `ADMIN_PASSWORD` | A strong password you choose |
| `SECRET_KEY` | Any random 32-char string |
| `GROK_API_KEY` | Your Grok API key |
| `FLASK_DEBUG` | `false` |

6. Click **Deploy** — your site will be live at `https://your-app.onrender.com` ✅

---

## 💻 Local Development

```bash
# 1. Clone and enter the project
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd portfolio

# 2. Create a virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env
# Edit .env and fill in your Supabase URL, key, admin password, etc.

# 5. Run the app
flask run
# or
python app.py
```

Visit `http://localhost:5000` in your browser.

**To load env vars automatically**, install python-dotenv (already in requirements) and add this to the top of `app.py` if needed:
```python
from dotenv import load_dotenv
load_dotenv()
```

---

## 🔐 Admin Access

| URL | Description |
|---|---|
| `/admin/login` | Login with your `ADMIN_PASSWORD` |
| `/admin` | Dashboard — overview + quick actions |
| `/admin/home` | Edit home page content |
| `/admin/about` | Edit about page, profile image & shape |
| `/admin/skills` | List, add, edit, delete skills |
| `/admin/projects` | List, add, edit, delete projects |
| `/admin/contact` | Edit contact info & social links |
| `/admin/knowledge` | Manage AI chatbot knowledge base |
| `/admin/logout` | End session |

---

## 🤖 AI Chatbot Setup

The chatbot uses **Grok** (`grok-3-latest`) and automatically reads your portfolio data (bio, skills, projects, contact info) to answer visitor questions.

**To train it further:**
1. Login to admin → **AI Chat Knowledge**
2. Add Q&A pairs like:
   - Q: `Are you available for freelance work?` → A: `Yes, I'm currently open to freelance projects...`
   - Q: `What's your rate?` → A: `My rates vary by project scope...`
3. The chatbot will incorporate all of this in every conversation

---

## 🖼 Image Guidelines

All images are referenced by URL (stored in database, not on server):

| Page | Recommended Ratio | Notes |
|---|---|---|
| About | Any (shape selected in admin) | Use a high-res portrait |
| Skills | **1:1 (square)** | Icon-style images work best |
| Projects | **16:9** | Banner / screenshot of the project |

Use image hosting services like:
- [Cloudinary](https://cloudinary.com) (free tier)
- [Imgur](https://imgur.com)
- [Supabase Storage](https://supabase.com/storage)
- GitHub raw URLs

---

## 🌍 Where Each Service Runs

| Service | Platform | What it does |
|---|---|---|
| **Flask App** | Render | Serves all pages, handles admin, calls Grok API |
| **Database** | Supabase | Stores all content (home, about, skills, projects, contact, chat knowledge) |
| **AI Chatbot** | Grok API (x.ai) | Answers visitor questions based on portfolio data |
| **Images** | External URL | You provide image links (Cloudinary, Imgur, etc.) |
| **Fonts** | Google Fonts CDN | Syne + DM Sans |

---

## 🔧 Customisation Tips

- **Change colour theme**: Edit CSS variables in `static/css/style.css` (`:root` block)
- **Add a new page**: Create a route in `routes/`, a template in `templates/`, register the blueprint in `app.py`
- **Change AI model**: Edit `GROK_API_URL` and `"model"` field in `routes/chatbot.py`
- **Extend the DB**: Add columns in Supabase SQL editor and update the relevant admin form

---

## 📄 License

MIT — free to use, modify, and deploy for personal or commercial portfolios.
