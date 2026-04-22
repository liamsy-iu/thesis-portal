-- ============================================================================
-- THESIS RESEARCH PORTAL DATABASE SCHEMA
-- M-PESA & Financial Inclusion Research + Literature Management
-- ============================================================================

-- ── Data Collection Tables ──────────────────────────────────────────────────

CREATE TABLE data_sources (
    id SERIAL PRIMARY KEY,
    source_name VARCHAR(255) NOT NULL,
    source_type VARCHAR(50),  -- 'annual_report', 'cbk_report', 'world_bank', 'academic_paper', etc.
    url TEXT,
    file_path TEXT,
    collection_date DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mpesa_metrics (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    month INTEGER,  -- NULL for annual data, 1-12 for monthly
    
    -- Core metrics
    active_users_total BIGINT,
    active_users_monthly BIGINT,
    transaction_volume BIGINT,  -- number of transactions
    transaction_value_kes DECIMAL(20, 2),  -- in Kenyan Shillings
    
    -- Financial inclusion
    agent_count INTEGER,
    registered_customers BIGINT,
    
    -- Muslim-specific (if available)
    muslim_users_estimated BIGINT,
    muslim_transaction_percentage DECIMAL(5, 2),
    
    -- Metadata
    data_source_id INTEGER REFERENCES data_sources(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(year, month)
);

CREATE TABLE financial_inclusion_metrics (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    region VARCHAR(100),  -- 'National', 'Nairobi', 'Mombasa', 'North Eastern', etc.
    
    -- Population data
    total_population BIGINT,
    muslim_population BIGINT,
    muslim_percentage DECIMAL(5, 2),
    
    -- Financial access
    banked_percentage DECIMAL(5, 2),
    mobile_money_percentage DECIMAL(5, 2),
    formally_included_percentage DECIMAL(5, 2),  -- banked + mobile money
    excluded_percentage DECIMAL(5, 2),
    
    -- Muslim-specific metrics
    muslim_banked_percentage DECIMAL(5, 2),
    muslim_mobile_money_percentage DECIMAL(5, 2),
    muslim_formally_included_percentage DECIMAL(5, 2),
    
    data_source_id INTEGER REFERENCES data_sources(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(year, region)
);

CREATE TABLE kenya_demographics (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    region VARCHAR(100),
    
    total_population BIGINT,
    urban_population BIGINT,
    rural_population BIGINT,
    
    muslim_population BIGINT,
    christian_population BIGINT,
    other_religion_population BIGINT,
    
    median_age DECIMAL(4, 1),
    literacy_rate DECIMAL(5, 2),
    
    data_source_id INTEGER REFERENCES data_sources(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(year, region)
);

-- ── Research Management Tables ──────────────────────────────────────────────

CREATE TABLE literature (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT,
    year INTEGER,
    source_type VARCHAR(50),  -- 'book', 'journal', 'report', 'thesis', 'working_paper', 'website'
    
    -- Publication details
    publisher VARCHAR(255),
    journal_name VARCHAR(255),
    volume VARCHAR(50),
    issue VARCHAR(50),
    pages VARCHAR(50),
    doi VARCHAR(255),
    isbn VARCHAR(50),
    url TEXT,
    
    -- File storage
    file_path TEXT,
    
    -- Status
    read_status VARCHAR(20) DEFAULT 'unread',  -- 'unread', 'reading', 'read'
    relevance_score INTEGER,  -- 1-5
    
    -- Metadata
    tags TEXT[],  -- ['M-PESA', 'financial inclusion', 'Islamic finance', etc.]
    abstract TEXT,
    key_findings TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE research_notes (
    id SERIAL PRIMARY KEY,
    literature_id INTEGER REFERENCES literature(id) ON DELETE CASCADE,  -- NULL for standalone notes
    
    note_type VARCHAR(50),  -- 'summary', 'quote', 'critique', 'idea', 'methodology', 'data'
    content TEXT NOT NULL,
    page_number VARCHAR(20),
    
    chapter_relation VARCHAR(100),  -- Which thesis chapter this relates to
    tags TEXT[],
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE citations (
    id SERIAL PRIMARY KEY,
    literature_id INTEGER REFERENCES literature(id) ON DELETE CASCADE,
    
    citation_style VARCHAR(50),  -- 'APA', 'Chicago', 'Harvard', 'MLA'
    formatted_citation TEXT NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE thesis_chapters (
    id SERIAL PRIMARY KEY,
    chapter_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    
    word_count_target INTEGER,
    word_count_current INTEGER DEFAULT 0,
    
    status VARCHAR(50) DEFAULT 'planning',  -- 'planning', 'drafting', 'revising', 'complete'
    progress_percentage INTEGER DEFAULT 0,
    
    outline TEXT,
    notes TEXT,
    
    due_date DATE,
    completed_date DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(chapter_number)
);

-- ── Indexes for performance ──────────────────────────────────────────────────

CREATE INDEX idx_mpesa_year ON mpesa_metrics(year);
CREATE INDEX idx_financial_inclusion_year ON financial_inclusion_metrics(year);
CREATE INDEX idx_literature_read_status ON literature(read_status);
CREATE INDEX idx_literature_tags ON literature USING GIN(tags);
CREATE INDEX idx_notes_literature ON research_notes(literature_id);
CREATE INDEX idx_notes_tags ON research_notes USING GIN(tags);

-- ── Sample data ──────────────────────────────────────────────────────────────

INSERT INTO thesis_chapters (chapter_number, title, word_count_target, status) VALUES
(1, 'Introduction', 3000, 'drafting'),
(2, 'Literature Review', 8000, 'planning'),
(3, 'Methodology', 4000, 'planning'),
(4, 'M-PESA and Financial Inclusion: Historical Context (2007-2015)', 6000, 'planning'),
(5, 'M-PESA Adoption Among Muslim Communities (2015-2025)', 7000, 'planning'),
(6, 'Analysis and Findings', 8000, 'planning'),
(7, 'Conclusion and Recommendations', 3000, 'planning');

COMMIT;