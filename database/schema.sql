-- NexWeb Solutions — initial database schema (PostgreSQL)
-- Applied to the managed database; kept here for portability and review.
-- MySQL note: replace gen_random_uuid()/uuid with CHAR(36)+application UUIDs,
-- TIMESTAMPTZ with DATETIME, and the regex CHECK with application validation.

CREATE TABLE IF NOT EXISTS contact_submissions (
  id              UUID         NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT         NOT NULL,
  business_name   TEXT,
  email           TEXT         NOT NULL,
  phone           TEXT,
  service         TEXT         NOT NULL,
  budget          TEXT         NOT NULL,
  project_details TEXT         NOT NULL,
  status          TEXT         NOT NULL DEFAULT 'new',
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT contact_submissions_status_check
    CHECK (status IN ('new','contacted','qualified','proposal_sent','won','lost')),
  CONSTRAINT contact_submissions_email_format
    CHECK (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$'),
  CONSTRAINT contact_submissions_name_len
    CHECK (char_length(name) BETWEEN 2 AND 120),
  CONSTRAINT contact_submissions_details_len
    CHECK (char_length(project_details) BETWEEN 10 AND 4000)
);

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx     ON contact_submissions (status);
CREATE INDEX IF NOT EXISTS contact_submissions_email_idx      ON contact_submissions (email);

-- Row level security: the public may only INSERT. Reads happen through
-- trusted server-side code, so enquiries are never publicly exposed.
GRANT INSERT ON contact_submissions TO anon, authenticated;
GRANT ALL    ON contact_submissions TO service_role;

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Keep updated_at accurate on every edit.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_contact_submissions_updated_at
BEFORE UPDATE ON contact_submissions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
