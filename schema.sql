-- =============================================
-- Portfolio CMS - Supabase Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Home Page
CREATE TABLE IF NOT EXISTS home (
    id SERIAL PRIMARY KEY,
    greeting TEXT DEFAULT 'Hello, I''m',
    name TEXT DEFAULT 'Balaji P',
    title TEXT DEFAULT 'Software Developer & AI/ML Engineer',
    subtitle TEXT DEFAULT 'Building scalable web applications, high-performance backends, and intelligent Agentic AI & RAG systems.',
    collab_text TEXT DEFAULT 'Open to engineering opportunities & collaborations',
    cta_text TEXT DEFAULT 'View My Work',
    cta_link TEXT DEFAULT '#projects',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About Page
CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    image_url TEXT DEFAULT '/static/img/profile.jpg',
    image_shape TEXT DEFAULT 'circle',
    bio_title TEXT DEFAULT 'Engineering Scalable & Intelligent Systems',
    bio TEXT DEFAULT 'Third-year Computer Science and Engineering student at Chennai Institute of Technology (CGPA: 8.47 / 10) with hands-on experience in full-stack development, AI/ML, and backend engineering. Skilled in Python, C++, React.js, FastAPI, LangGraph, and modern database architectures.',
    resume_link TEXT DEFAULT 'https://drive.google.com/file/d/1bT-WVeauHwH1AXol2_HcPIUWPlYi6SuO/view?usp=drive_link',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    image_url TEXT DEFAULT '',
    description TEXT DEFAULT '',
    certification_name TEXT DEFAULT '',
    certification_url TEXT DEFAULT '',
    category TEXT DEFAULT 'General',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT DEFAULT '',
    description TEXT DEFAULT '',
    tech_stack TEXT DEFAULT '',
    live_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    video_url TEXT DEFAULT '',
    featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact
CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
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
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default rows
INSERT INTO home (id, name, title) VALUES (1, 'Balaji P', 'Software Developer & AI/ML Engineer') ON CONFLICT (id) DO NOTHING;
INSERT INTO about (id, bio_title) VALUES (1, 'Engineering Scalable & Intelligent Systems') ON CONFLICT (id) DO NOTHING;
INSERT INTO contact (id, email) VALUES (1, 'balajip.cse2024@citchennai.net') ON CONFLICT (id) DO NOTHING;
