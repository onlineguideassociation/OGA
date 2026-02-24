CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'free',
  visibility_score NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('google', 'tripadvisor')),
  rating NUMERIC(2,1) NOT NULL,
  review_text TEXT NOT NULL,
  sentiment_score NUMERIC(4,3),
  reply_generated TEXT,
  reviewed_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS visibility_scores (
  business_id UUID PRIMARY KEY,
  google_rank NUMERIC(8,2) DEFAULT 0,
  tripadvisor_rating NUMERIC(3,2) DEFAULT 0,
  engagement_score NUMERIC(8,2) DEFAULT 0,
  ad_efficiency NUMERIC(8,2) DEFAULT 0,
  response_time NUMERIC(8,2) DEFAULT 0,
  final_score NUMERIC(8,2) GENERATED ALWAYS AS (
    (google_rank * 0.25) +
    (tripadvisor_rating * 0.25) +
    (engagement_score * 0.15) +
    (ad_efficiency * 0.15) +
    (response_time * 0.20)
  ) STORED
);

CREATE TABLE IF NOT EXISTS messaging_tracking (
  business_id UUID PRIMARY KEY,
  whatsapp_clicks INTEGER DEFAULT 0,
  avg_response_time NUMERIC(8,2) DEFAULT 0,
  booking_conversion_rate NUMERIC(5,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS investors (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  firm TEXT,
  email TEXT,
  thesis TEXT,
  funding_stage TEXT,
  outreach_status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
