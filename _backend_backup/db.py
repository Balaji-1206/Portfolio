import os
import sqlite3
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL", "").strip()
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "").strip()

_client = None
DB_FILE = os.path.join(os.path.dirname(__file__), "local_portfolio.db")

class SQLiteResponse:
    def __init__(self, data=None):
        self.data = data if data is not None else []

class SQLiteTableQuery:
    def __init__(self, db_path, table_name):
        self.db_path = db_path
        self.table_name = table_name
        self.select_cols = "*"
        self.where_clauses = []
        self.params = []
        self.order_by = None
        self.op = "SELECT"
        self.update_data = None
        self.insert_data = None

    def select(self, cols="*"):
        self.op = "SELECT"
        self.select_cols = cols
        return self

    def eq(self, col, val):
        self.where_clauses.append(f"{col} = ?")
        self.params.append(val)
        return self

    def order(self, col, desc=False):
        direction = "DESC" if desc else "ASC"
        self.order_by = f"{col} {direction}"
        return self

    def insert(self, data):
        self.op = "INSERT"
        self.insert_data = data
        return self

    def upsert(self, data):
        self.op = "UPSERT"
        self.insert_data = data
        return self

    def update(self, data):
        self.op = "UPDATE"
        self.update_data = data
        return self

    def delete(self):
        self.op = "DELETE"
        return self

    def execute(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        try:
            if self.op == "SELECT":
                query = f"SELECT {self.select_cols} FROM {self.table_name}"
                if self.where_clauses:
                    query += " WHERE " + " AND ".join(self.where_clauses)
                if self.order_by:
                    query += f" ORDER BY {self.order_by}"
                cur.execute(query, self.params)
                rows = [dict(r) for r in cur.fetchall()]
                for r in rows:
                    if "featured" in r:
                        r["featured"] = bool(r["featured"])
                return SQLiteResponse(rows)

            elif self.op == "INSERT":
                item = self.insert_data
                keys = list(item.keys())
                vals = [item[k] for k in keys]
                placeholders = ", ".join(["?"] * len(keys))
                cur.execute(f"INSERT INTO {self.table_name} ({', '.join(keys)}) VALUES ({placeholders})", vals)
                conn.commit()
                return SQLiteResponse([{"id": cur.lastrowid, **item}])

            elif self.op == "UPSERT":
                item = self.insert_data
                keys = list(item.keys())
                vals = [item[k] for k in keys]
                placeholders = ", ".join(["?"] * len(keys))
                cur.execute(f"INSERT OR REPLACE INTO {self.table_name} ({', '.join(keys)}) VALUES ({placeholders})", vals)
                conn.commit()
                return SQLiteResponse([item])

            elif self.op == "UPDATE":
                set_parts = [f"{k} = ?" for k in self.update_data.keys()]
                vals = list(self.update_data.values())
                query = f"UPDATE {self.table_name} SET {', '.join(set_parts)}"
                if self.where_clauses:
                    query += " WHERE " + " AND ".join(self.where_clauses)
                    vals.extend(self.params)
                cur.execute(query, vals)
                conn.commit()
                return SQLiteResponse([])

            elif self.op == "DELETE":
                query = f"DELETE FROM {self.table_name}"
                if self.where_clauses:
                    query += " WHERE " + " AND ".join(self.where_clauses)
                cur.execute(query, self.params)
                conn.commit()
                return SQLiteResponse([])
        finally:
            conn.close()

class LocalSQLiteClient:
    def __init__(self, db_path):
        self.db_path = db_path
        self._ensure_schema()

    def table(self, name):
        return SQLiteTableQuery(self.db_path, name)

    def _ensure_schema(self):
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        cur.executescript("""
            CREATE TABLE IF NOT EXISTS home (
                id INTEGER PRIMARY KEY,
                greeting TEXT DEFAULT 'Hello, I''m',
                name TEXT DEFAULT 'Balaji P',
                title TEXT DEFAULT 'Software Developer & AI/ML Engineer',
                subtitle TEXT DEFAULT 'Building scalable web applications, high-performance backends, and intelligent Agentic AI & RAG systems.',
                collab_text TEXT DEFAULT 'Open to engineering opportunities & collaborations',
                cta_text TEXT DEFAULT 'View My Work',
                cta_link TEXT DEFAULT '#projects',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS about (
                id INTEGER PRIMARY KEY,
                image_url TEXT DEFAULT '/static/img/profile.jpg',
                image_shape TEXT DEFAULT 'circle',
                bio_title TEXT DEFAULT 'Engineering Scalable & Intelligent Systems',
                bio TEXT DEFAULT 'Third-year Computer Science and Engineering student at Chennai Institute of Technology (CGPA: 8.47 / 10) with hands-on experience in full-stack development, AI/ML, and backend engineering.\n\nSkilled in Python, C++, React.js, FastAPI, LangGraph, and modern database architectures, with practical experience building production-grade web applications and evidence-based Agentic RAG systems.\n\nFormer Generative AI Intern at National Institute of Technology, Puducherry and Full Stack Developer Intern at WebDevSoft Online. Passionate about competitive programming and algorithmic problem solving with 700+ LeetCode problems solved.',
                resume_link TEXT DEFAULT 'https://drive.google.com/file/d/1bT-WVeauHwH1AXol2_HcPIUWPlYi6SuO/view?usp=drive_link',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS skills (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                image_url TEXT DEFAULT '',
                description TEXT DEFAULT '',
                certification_name TEXT DEFAULT '',
                certification_url TEXT DEFAULT '',
                category TEXT DEFAULT 'General',
                sort_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                image_url TEXT DEFAULT '',
                description TEXT DEFAULT '',
                tech_stack TEXT DEFAULT '',
                live_url TEXT DEFAULT '',
                github_url TEXT DEFAULT '',
                video_url TEXT DEFAULT '',
                featured BOOLEAN DEFAULT 0,
                sort_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS contact (
                id INTEGER PRIMARY KEY,
                email TEXT DEFAULT 'balajip.cse2024@citchennai.net',
                phone TEXT DEFAULT '+91 9655018485',
                location TEXT DEFAULT 'Chennai, India',
                github_url TEXT DEFAULT 'https://github.com/Balaji-1206',
                linkedin_url TEXT DEFAULT 'https://linkedin.com/in/balaji1206',
                twitter_url TEXT DEFAULT '',
                instagram_url TEXT DEFAULT '',
                website_url TEXT DEFAULT 'https://leetcode.com/balaji_1206',
                contact_heading TEXT DEFAULT 'Let''s Connect',
                contact_subtext TEXT DEFAULT 'Interested in collaborating, discussing engineering roles, or exploring AI systems? Feel free to reach out!',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS chat_knowledge (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category TEXT DEFAULT 'general',
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)

        # Ensure default rows
        cur.execute("INSERT OR IGNORE INTO home (id, name, title) VALUES (1, 'Balaji P', 'Software Developer & AI/ML Engineer')")
        cur.execute("INSERT OR IGNORE INTO about (id, bio_title) VALUES (1, 'Engineering Scalable & Intelligent Systems')")
        cur.execute("INSERT OR IGNORE INTO contact (id, email) VALUES (1, 'balajip.cse2024@citchennai.net')")

        conn.commit()
        conn.close()

def is_supabase_configured():
    return bool(SUPABASE_URL and SUPABASE_KEY and "your-project-id" not in SUPABASE_URL)

def get_db():
    global _client
    if _client is None:
        if is_supabase_configured():
            try:
                from supabase import create_client
                _client = create_client(SUPABASE_URL, SUPABASE_KEY)
                print(" Connected to Supabase cloud database.")
            except Exception as e:
                print(f" Failed connecting to Supabase ({e}), falling back to local SQLite.")
                _client = LocalSQLiteClient(DB_FILE)
        else:
            print(" Supabase credentials not set in .env — using local SQLite database (local_portfolio.db).")
            _client = LocalSQLiteClient(DB_FILE)
    return _client

def init_db():
    """Ensure database connection and tables are ready."""
    db = get_db()
    if is_supabase_configured():
        print(" Supabase client ready. Ensure schema.sql has been run in Supabase SQL editor.")
    else:
        print(" Local SQLite database initialized with rich sample data at local_portfolio.db.")
