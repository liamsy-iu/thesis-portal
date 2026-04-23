
import psycopg2
import sys

# Paste your Railway DATABASE_URL here
DATABASE_URL = input("Enter your Railway DATABASE_URL: ")

sql = """
-- Create thesis chapters table
CREATE TABLE IF NOT EXISTS thesis_chapters (
    id SERIAL PRIMARY KEY,
    chapter_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    word_count_current INTEGER DEFAULT 0,
    word_count_target INTEGER,
    progress_percentage INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'planning',
    notes TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create literature table
CREATE TABLE IF NOT EXISTS literature (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT,
    year INTEGER,
    source_type VARCHAR(50),
    url TEXT,
    abstract TEXT,
    tags TEXT[],
    read_status VARCHAR(20) DEFAULT 'unread',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create M-PESA data table
CREATE TABLE IF NOT EXISTS mpesa_data (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    active_users BIGINT,
    transactions BIGINT,
    value_kes BIGINT,
    agents INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create research notes table
CREATE TABLE IF NOT EXISTS research_notes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[],
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert thesis chapters
INSERT INTO thesis_chapters (chapter_number, title, word_count_target, status) VALUES
(1, 'المبحث التمهيدي: الأطر النظرية للتقنية المالية والشمول المالي', 5000, 'planning'),
(2, 'المبحث الأول: واقع التقنية المالية في دولة كينيا', 6000, 'planning'),
(3, 'المبحث الثاني: تعزيز الشمول المالي من خلال التقنية المالية في كينيا', 8000, 'planning'),
(4, 'المبحث الثالث: خدمات التقنية المالية عبر منصة M-PESA', 7000, 'planning'),
(5, 'الخاتمة: أهم النتائج والتوصيات', 3000, 'planning');

-- Insert sample M-PESA data
INSERT INTO mpesa_data (year, active_users, transactions, value_kes) VALUES
(2007, 100000, 500000, 2000000000),
(2010, 8000000, 150000000, 300000000000),
(2015, 19000000, 900000000, 2500000000000),
(2020, 30000000, 1200000000, 4500000000000),
(2025, 35000000, 1500000000, 6000000000000);
"""

try:
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    print("✅ Database setup complete!")
    cur.close()
    conn.close()
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
