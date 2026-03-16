CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'guide',
  plan_type TEXT NOT NULL DEFAULT 'guide',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_profiles (
  id UUID PRIMARY KEY,
  owner_user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  city_id UUID,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  country_code TEXT NOT NULL DEFAULT 'KH',
  tourism_index_model TEXT NOT NULL
);

ALTER TABLE business_profiles
  ADD CONSTRAINT fk_business_city
  FOREIGN KEY (city_id) REFERENCES cities(id);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES business_profiles(id),
  source TEXT NOT NULL CHECK (source IN ('google_reviews')),
  rating NUMERIC(2,1) NOT NULL,
  review_text TEXT NOT NULL,
  sentiment_score NUMERIC(4,3),
  reply_generated TEXT,
  reviewed_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS seo_metrics (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES business_profiles(id),
  source TEXT NOT NULL CHECK (source IN ('google_search_console', 'youtube_data')),
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  ctr NUMERIC(6,3) DEFAULT 0,
  measured_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS engagement_metrics (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES business_profiles(id),
  source TEXT NOT NULL CHECK (source IN ('meta_graph', 'youtube_data', 'telegram_bot')),
  engagement_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  measured_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES business_profiles(id),
  source TEXT NOT NULL CHECK (source IN ('whatsapp_business', 'telegram_bot')),
  response_time_seconds INTEGER,
  status TEXT NOT NULL DEFAULT 'received',
  received_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tour_packages (
  id UUID PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES business_profiles(id),
  city_id UUID REFERENCES cities(id),
  package_name TEXT NOT NULL,
  listed_price_usd NUMERIC(10,2) DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visibility_scores (
  business_id UUID PRIMARY KEY REFERENCES business_profiles(id),
  city_id UUID NOT NULL REFERENCES cities(id),
  review_health_score NUMERIC(8,2) DEFAULT 0,
  seo_score NUMERIC(8,2) DEFAULT 0,
  engagement_score NUMERIC(8,2) DEFAULT 0,
  response_speed_score NUMERIC(8,2) DEFAULT 0,
  final_score NUMERIC(8,2) DEFAULT 0,
  scoring_model TEXT NOT NULL,
  scored_at TIMESTAMPTZ DEFAULT NOW()
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

CREATE TABLE IF NOT EXISTS startup_profiles (
  id UUID PRIMARY KEY,
  legal_name TEXT NOT NULL,
  market_focus TEXT NOT NULL DEFAULT 'Cambodia tourism',
  current_arr_usd NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS funding_rounds (
  id UUID PRIMARY KEY,
  startup_profile_id UUID NOT NULL REFERENCES startup_profiles(id),
  round_name TEXT NOT NULL,
  target_amount_usd NUMERIC(12,2) NOT NULL,
  closed_amount_usd NUMERIC(12,2) DEFAULT 0,
  opened_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS outreach_logs (
  id UUID PRIMARY KEY,
  investor_id UUID NOT NULL REFERENCES investors(id),
  startup_profile_id UUID NOT NULL REFERENCES startup_profiles(id),
  channel TEXT NOT NULL,
  status TEXT NOT NULL,
  summary TEXT,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS capital_scores (
  startup_profile_id UUID PRIMARY KEY REFERENCES startup_profiles(id),
  city_growth_score NUMERIC(8,2) DEFAULT 0,
  operator_performance_index NUMERIC(8,2) DEFAULT 0,
  network_growth_score NUMERIC(8,2) DEFAULT 0,
  capital_efficiency_score NUMERIC(8,2) DEFAULT 0,
  scored_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY,
  actor_user_id UUID REFERENCES users(id),
  action_type TEXT NOT NULL,
  target_ref TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS model_usage_tracking (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  model_name TEXT NOT NULL,
  task_type TEXT NOT NULL,
  token_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prompt_logs (
  id UUID PRIMARY KEY,
  task_type TEXT NOT NULL,
  prompt_hash TEXT NOT NULL,
  abuse_flag BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
