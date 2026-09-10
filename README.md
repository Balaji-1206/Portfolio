# ⚡ Balaji P — Software Developer & AI/ML Engineer Portfolio

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.3+-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![LeetCode](https://img.shields.io/badge/LeetCode-700+_Solved-FFA116?style=for-the-badge&logo=leetcode&logoColor=black)](https://leetcode.com/balaji_1206/)
[![CGPA](https://img.shields.io/badge/CGPA-8.47_/_10-22c55e?style=for-the-badge)](https://citchennai.edu.in)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/balaji1206)

Personal portfolio and engineering showcase of **Balaji P**, Computer Science and Engineering undergraduate at Chennai Institute of Technology. Built with **Flask**, **SQLite / Supabase**, and **Vanilla JavaScript & CSS** — featuring custom 60fps dynamic visual effects, interactive animations, and zero framework bloat.

---

## 🌟 Highlights & Key Metrics

- 💻 **Competitive Programming**: **700+ Data Structures & Algorithms** problems solved on LeetCode across arrays, dynamic programming, graphs, trees, and system design patterns.
- 🎓 **Education**: B.E. Computer Science & Engineering @ **Chennai Institute of Technology** (2024 – 2028) · **CGPA: 8.47 / 10** · School Cutoff: **194.5 / 200**.
- 💼 **Industry Internships**:
  - **Generative AI Intern** @ *National Institute of Technology, Puducherry* (Apr 2026 – Jul 2026) — Engineered an oncology-focused **Agentic RAG clinical decision support system** using hybrid retrieval (BM25 + FAISS), MRL embeddings, and MedGemma reranking.
  - **Full Stack Developer Intern** @ *WebDevSoft Online* (Nov 2025 – Dec 2025) — Built responsive full-stack applications with React.js, Node.js, Express.js, and MongoDB with secure REST APIs.
- 🏆 **Hackathons & Competitions**:
  - **Finalist** — Hacksagon Hackathon 2026
  - **Finalist** — Nasscomm Agentic AI Hackathon 2025
  - **10th Place** among 3,000 participants in Codathon at CIT Chennai

---

## 🚀 Featured Projects

| Project | Tech Stack | Highlights | Links |
|---|---|---|---|
| **LeadForge AI** | Fastify, Groq Llama, Redis, BullMQ, TailwindCSS | Autonomous multi-agent B2B lead generation engine with AI scraping, verification, and automated outreach. | [GitHub](https://github.com/Balaji-1206/LeadForge-AI) |
| **Oncology Agentic RAG** | Python, LangChain, BM25, FAISS, MedGemma | Evidence-based clinical QA engine synthesizing biomedical literature with semantic chunking and reranking. | [GitHub](https://github.com/Balaji-1206) |
| **LegalAce** | Flask, Supabase, NLP Parsing, Python | AI-powered legal document contract analyzer detecting high-risk clauses and summarizing key obligations. | [GitHub](https://github.com/Balaji-1206/LegalAce) |
| **SmartCare** | React.js, Node.js, Express.js, MongoDB, WebSockets | Real-time healthcare emergency coordination and patient telemetry monitoring platform. | [GitHub](https://github.com/Balaji-1206/SmartCare) |

---

## ✨ Unique Dynamic Effects

The frontend is crafted in modern Vanilla CSS and JavaScript with performance in mind:

1. **Interactive Neural Network Particle Canvas (60fps)**: Floating nodes in the hero section that gently repel and connect to your cursor via dynamic synapsis lines. Automatically pauses rendering when off-screen.
2. **Multi-Role Dynamic Typewriter**: Cycles through key technical specializations (*Software Developer*, *AI / ML Engineer*, *Agentic RAG Specialist*, *Full Stack Developer*, *Competitive Programmer*).
3. **Cyber Grid Background Overlay**: A radial-masked dot matrix grid seamlessly blending into space black.
4. **Scroll-Driven Cubic Animated Counters**: Numerical stats (`700+`, `8.47`, `2x`, `4+`) smoothly count up when scrolled into view.
5. **3D Perspective Mouse Tilt**: Interactive 3D depth tilt on project cards and circular profile glow on hover.
6. **One-Click Quick Copy with Floating Toast**: Instant clipboard copy for contact details with dark-glass checkmark confirmation.
7. **Top Reading Progress Bar & Scrollspy**: Real-time reading depth bar and active section navbar tracking.

---

## 🛠 Tech Stack

- **Backend**: Python 3.11+, Flask
- **Database**: Dual Mode — Local SQLite (`local_portfolio.db`) with zero configuration, and Supabase (PostgreSQL) for production cloud deployments
- **Frontend**: Semantic HTML5, Vanilla CSS3 (Syne & DM Sans typography, dark luxury theme), Vanilla ES6+ JavaScript
- **DevOps & Tools**: Git, GitHub, Docker, Postman, Linux / Windows

---

## 📁 Project Structure

```
Portfolio/
├── app.py                  # Flask entry point & global context processors
├── db.py                   # Hybrid SQLite fallback + Supabase client
├── auth_utils.py           # Admin auth session decorators
├── schema.sql              # Database schema & initial seeding
├── requirements.txt        # Python package dependencies
├── .env.example            # Environment variables template
├── .gitignore              # Ignores sensitive keys, venv, and local db
│
├── routes/
│   ├── auth.py             # Admin login & logout
│   ├── home.py             # Landing page & section anchors
│   ├── about.py            # Detailed bio & trajectory
│   ├── skills.py           # Technical skill competencies & devicon SVGs
│   ├── projects.py         # Production systems & repositories
│   ├── contact.py          # Contact information & socials
│   └── admin.py            # Secure admin CRUD operations
│
├── templates/
│   ├── base.html           # Master layout, progress bar, toast, footer
│   ├── home.html           # Full dynamic landing page
│   ├── about.html          # Standalone About page
│   ├── skills.html         # Standalone Skills page
│   ├── projects.html       # Standalone Projects page
│   ├── contact.html        # Standalone Contact page
│   ├── login.html          # Admin authentication
│   └── admin/              # Management dashboard templates
│
└── static/
    ├── css/
    │   ├── style.css       # Complete design system & dynamic effect styles
    │   └── admin.css       # Admin dashboard interface styling
    ├── js/
    │   └── main.js         # Canvas particles, typewriter, 3D tilt, counters
    └── img/
        └── profile.jpg     # Balaji P profile photograph
```

---

## 💻 Local Setup & Running

### 1. Clone the Repository
```bash
git clone https://github.com/Balaji-1206/Portfolio.git
cd Portfolio
```

### 2. Create and Activate Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
The application automatically seeds an offline SQLite database if Supabase keys are not set:
```bash
python app.py
```
Open **[http://127.0.0.1:5000](http://127.0.0.1:5000)** in your browser to view the portfolio.

---

## 📬 Contact & Socials

- **Email**: [balajip.cse2024@citchennai.net](mailto:balajip.cse2024@citchennai.net)
- **Phone**: [+91 9655018485](tel:+919655018485)
- **Location**: Chennai, India
- **GitHub**: [@Balaji-1206](https://github.com/Balaji-1206)
- **LinkedIn**: [balaji1206](https://linkedin.com/in/balaji1206)
- **LeetCode**: [balaji_1206](https://leetcode.com/balaji_1206/)
- **Resume**: [Google Drive Resume](https://drive.google.com/file/d/1bT-WVeauHwH1AXol2_HcPIUWPlYi6SuO/view?usp=drive_link)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
