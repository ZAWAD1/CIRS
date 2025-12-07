-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.attachments (
attachment_id integer NOT NULL DEFAULT nextval('attachments_attachment_id_seq'::regclass),
report_id integer,
file_url text NOT NULL,
file_type character varying,
uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT attachments_pkey PRIMARY KEY (attachment_id),
CONSTRAINT attachments_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.incident_reports(report_id)
);
CREATE TABLE public.emergency_contacts (
contact_id integer NOT NULL DEFAULT nextval('emergency_contacts_contact_id_seq'::regclass),
name character varying NOT NULL,
phone character varying,
email character varying,
type USER-DEFINED NOT NULL,
updated_by uuid,
updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT emergency_contacts_pkey PRIMARY KEY (contact_id),
CONSTRAINT emergency_contacts_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id)
);
CREATE TABLE public.incident_reports (
report_id integer NOT NULL DEFAULT nextval('incident_reports_report_id_seq'::regclass),
reporter_id uuid,
is_anonymous boolean DEFAULT false,
category character varying,
title character varying NOT NULL,
description text NOT NULL,
date_of_incident date,
time_of_incident time without time zone,
location character varying,
status USER-DEFINED DEFAULT 'New'::report_status,
created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
image_url text,
CONSTRAINT incident_reports_pkey PRIMARY KEY (report_id),
CONSTRAINT incident_reports_reporter_id_fkey FOREIGN KEY (reporter_id) REFERENCES public.users(id)
);
CREATE TABLE public.report_updates (
update_id integer NOT NULL DEFAULT nextval('report_updates_update_id_seq'::regclass),
report_id integer,
updated_by uuid,
update_text text,
new_status USER-DEFINED,
updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT report_updates_pkey PRIMARY KEY (update_id),
CONSTRAINT report_updates_report_id_fkey FOREIGN KEY (report_id) REFERENCES public.incident_reports(report_id),
CONSTRAINT report_updates_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.users(id)
);
CREATE TABLE public.users (
id uuid NOT NULL,
full_name character varying NOT NULL,
email character varying NOT NULL UNIQUE,
role USER-DEFINED NOT NULL DEFAULT 'student'::user_role,
student_id character varying,
department character varying,
phone character varying,
created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT users_pkey PRIMARY KEY (id),
CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
