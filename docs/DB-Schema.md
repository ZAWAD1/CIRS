-- ===========================================================
-- ENUM TYPES
-- ===========================================================

CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE report_status AS ENUM ('New', 'Investigating', 'Resolved');
CREATE TYPE contact_type AS ENUM ('Security', 'Counseling', 'Admin', 'Medical');

-- ===========================================================
-- USERS PROFILE TABLE (LINKED TO SUPABASE AUTH)
-- ===========================================================

CREATE TABLE users (
id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
full_name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
role user_role NOT NULL DEFAULT 'student',
student_id VARCHAR(20),
department VARCHAR(50),
phone VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- INCIDENT REPORTS TABLE
-- ===========================================================

CREATE TABLE incident_reports (
report_id SERIAL PRIMARY KEY,
reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
is_anonymous BOOLEAN DEFAULT FALSE,
category VARCHAR(50),
title VARCHAR(100) NOT NULL,
description TEXT NOT NULL,
date_of_incident DATE,
time_of_incident TIME,
location VARCHAR(150),
status report_status DEFAULT 'New',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- REPORT UPDATES TABLE
-- ===========================================================

CREATE TABLE report_updates (
update_id SERIAL PRIMARY KEY,
report_id INT REFERENCES incident_reports(report_id) ON DELETE CASCADE,
updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
update_text TEXT,
new_status report_status,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- EMERGENCY CONTACTS TABLE
-- ===========================================================

CREATE TABLE emergency_contacts (
contact_id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
phone VARCHAR(20),
email VARCHAR(100),
type contact_type NOT NULL,
updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- ATTACHMENTS TABLE
-- ===========================================================

CREATE TABLE attachments (
attachment_id SERIAL PRIMARY KEY,
report_id INT REFERENCES incident_reports(report_id) ON DELETE CASCADE,
file_url TEXT NOT NULL,
file_type VARCHAR(20),
uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================================
-- INDEXES FOR PERFORMANCE
-- ===========================================================

CREATE INDEX idx_incident_reports_status ON incident_reports(status);
CREATE INDEX idx_incident_reports_reporter_id ON incident_reports(reporter_id);
CREATE INDEX idx_attachments_report_id ON attachments(report_id);
