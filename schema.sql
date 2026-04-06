-- Branding Survey Database Schema
-- Run this in your Vercel Postgres dashboard

-- Create surveys table
CREATE TABLE IF NOT EXISTS surveys (
  id VARCHAR(20) PRIMARY KEY,
  month VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create responses table
CREATE TABLE IF NOT EXISTS responses (
  id VARCHAR(20) PRIMARY KEY,
  survey_id VARCHAR(20) NOT NULL,
  responses JSONB NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_responses_survey_id ON responses(survey_id);
CREATE INDEX IF NOT EXISTS idx_surveys_created_at ON surveys(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_responses_submitted_at ON responses(submitted_at DESC);
