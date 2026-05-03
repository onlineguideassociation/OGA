/**
 * Angkor Wat Tourism Platform — Configuration
 * Multi-layer AI orchestration system for pass bundling, guide matching, driver dispatch, culture enrichment
 * Based on: angkor_wat_trillion_brain_architecture.svg
 */

export const CONFIG = {
  // ── LAYER 0: LEAD CHANNELS ──────────────────────────────────────────
  channels: {
    whatsapp: {
      enabled: true,
      description: "WhatsApp Business API for lead capture and booking",
      priority: 1,
    },
    facebook_ads: {
      enabled: true,
      description: "Facebook Lead Ads feed into booking pipeline",
      priority: 2,
    },
    tiktok: {
      enabled: true,
      description: "TikTok for Business campaign capture",
      priority: 3,
    },
    website: {
      enabled: true,
      description: "Direct website booking widget",
      priority: 2,
    },
    hotel_walkin: {
      enabled: false,
      description: "Hotel walk-in guests (tablet/kiosk-based capture)",
      priority: 3,
      notes: "Phase 2 implementation",
    },
  },

  // ── LAYER 1: INTENT CLASSIFIER ──────────────────────────────────────
  intent_classifier: {
    model: "claude-haiku-4-5-20251001",
    max_tokens: 32,
    temperature: 0,
    intents: [
      "pass_inquiry",
      "guide_request",
      "itinerary_request",
      "culture_question",
      "driver_request",
      "booking_action",
      "review_reply",
      "social_ad",
      "tour_description",
      "seo_article",
      "upsell_trigger",
      "support_request",
      "unknown",
    ],
  },

  // ── LAYER 2: SPECIALIST AI BRAINS ──────────────────────────────────
  specialist_brains: {
    pass_brain: {
      model: "gpt-4o",
      description: "Angkor pass ticket advice, pricing, durations",
      focus: ["1-day pass", "3-day pass", "7-day pass", "upsell logic"],
      provider: "openai",
    },
    guide_matcher: {
      model: "gemini-pro",
      description: "Match licensed guides by language, specialty, rating",
      criteria: ["language", "specialty", "rating >= 4.5", "availability"],
      provider: "gemini",
    },
    itinerary_brain: {
      model: "gemini-pro",
      description: "Plan temple routes and daily schedules",
      outputs: ["daily_plan", "suggested_tours", "timing"],
      provider: "gemini",
    },
    culture_brain: {
      model: "claude-sonnet-4-6",
      description: "Khmer history, temple stories, cultural context",
      outputs: ["temple_story", "historical_significance", "visitor_tips"],
      provider: "anthropic",
    },
    driver_dispatch: {
      model: "gpt-4o-mini",
      description: "Assign tuk-tuks or cars, optimize pickup timing",
      constraints: ["vehicle_type", "driver_rating", "pickup_zone", "time_window"],
      provider: "openai",
    },
    upsell_brain: {
      model: "claude-sonnet-4-6",
      description: "Post-tour upsell: Phnom Penh, Floating Village, extra activities",
      offers: [
        { name: "Phnom Penh Tour", price: 45, days_after: 1 },
        { name: "Floating Village", price: 55, days_after: 1 },
        { name: "Tonle Sap Sunset", price: 40, days_after: 0 },
      ],
      provider: "anthropic",
    },
    support_brain: {
      model: "claude-sonnet-4-6",
      description: "Customer support for cancellations, rescheduling, issues",
      responses: ["empathetic", "solution-focused", "procedural"],
      provider: "anthropic",
    },
  },

  // ── LAYER 3: PRODUCT BUNDLES ──────────────────────────────────────
  product_bundles: {
    angkor_pass: {
      type: "entry",
      name: "Angkor Archaeological Park Pass",
      tiers: [
        {
          duration: "1-day",
          price_usd: 37,
          includes: ["park_entry", "map", "sunrise_or_sunset"],
        },
        {
          duration: "3-day",
          price_usd: 62,
          includes: ["park_entry_x3", "detailed_map", "flexibility", "guide_included"],
        },
        {
          duration: "7-day",
          price_usd: 72,
          includes: ["unlimited_entry", "detailed_map", "guide_included", "culture_pack"],
        },
      ],
      auto_upsell: {
        trigger: "pass_inquiry",
        logic: "1-day → 3-day (group size > 3) → 7-day (if itinerary > 4 days)",
      },
    },

    licensed_guide: {
      type: "service",
      name: "Licensed Guide",
      matching_criteria: {
        language: ["English", "French", "Mandarin", "Japanese", "Korean"],
        specialty: [
          "archaeology",
          "history",
          "photography",
          "family_friendly",
          "off_beat",
        ],
        rating_min: 4.5,
      },
      availability: "real-time from graph",
      daily_rate_usd: 50,
    },

    driver_vehicle: {
      type: "service",
      name: "Driver & Vehicle",
      options: {
        tuk_tuk: {
          capacity: 2,
          price_per_day_usd: 30,
          best_for: "couples, small groups, scenic drives",
        },
        car: {
          capacity: 4,
          price_per_day_usd: 45,
          best_for: "larger groups, long distances, comfort",
        },
      },
      pickup_schedule: {
        sunrise_tours: "5:00 AM",
        regular_tours: "8:00 AM",
        afternoon: "2:00 PM",
      },
    },

    culture_pack: {
      type: "digital",
      name: "Culture Pack — Temple Stories + Khmer History",
      deliverables: [
        { type: "pdf", name: "Temple Stories", pages: 24 },
        { type: "audio", name: "Khmer History (MP3)", duration_min: 45 },
        { type: "map", name: "Annotated Temple Map", pages: 1 },
      ],
      auto_generate: true,
      customization: "per_guest_language",
    },
  },

  // ── LAYER 4: GRAPH SCHEMA (Neo4j) ──────────────────────────────────
  graph_schema: {
    nodes: {
      Customer: {
        properties: [
          "id",
          "name",
          "email",
          "phone",
          "language",
          "budget_usd",
          "origin_country",
          "group_size",
          "interests[]",
        ],
      },
      Temple: {
        properties: [
          "id",
          "name",
          "historical_period",
          "significance_score",
          "difficulty_level",
          "estimated_visit_time_min",
          "coordinates",
        ],
      },
      Guide: {
        properties: [
          "id",
          "name",
          "license_number",
          "languages[]",
          "specialties[]",
          "average_rating",
          "total_reviews",
          "availability_calendar",
        ],
      },
      Driver: {
        properties: [
          "id",
          "name",
          "vehicle_type",
          "license_plate",
          "assigned_zone",
          "average_rating",
          "total_trips",
        ],
      },
      Booking: {
        properties: ["id", "date", "amount_usd", "status", "payment_method", "created_at"],
      },
    },
    relationships: {
      VISITED: { from: "Customer", to: "Temple", properties: ["date", "feedback"] },
      BOOKED: {
        from: "Customer",
        to: "Booking",
        properties: ["date"],
      },
      ASSIGNED: { from: "Booking", to: "Guide", properties: ["date"] },
      INCLUDES: { from: "Booking", to: "Driver", properties: ["date"] },
      HAS_PREFERENCE: {
        from: "Customer",
        to: "Temple",
        properties: ["strength"],
      },
      SPEAKS: { from: "Guide", to: null, properties: ["language"] },
      DRIVES: { from: "Driver", to: null, properties: ["vehicle_type"] },
    },
    learning_loop: "Feedback → Guide/Driver Performance → Better Matching",
  },

  // ── LAYER 5: AUTOMATION PIPELINES (n8n) ───────────────────────────
  automation_workflows: {
    booking_confirmation: {
      trigger: "Booking created",
      steps: [
        "Generate PDF e-ticket",
        "Send WhatsApp receipt (booking ref + link)",
        "Send 7-day reminder",
      ],
      channel: "whatsapp",
      template: "booking_confirm",
    },

    sunrise_reminder: {
      trigger: "Sunrise tour date - 1 day",
      time: "4:00 AM",
      steps: [
        "Fetch guest details",
        "Fetch driver + ETA",
        "Send WhatsApp reminder",
        "Suggest tip amount",
      ],
      channel: "whatsapp",
      template: "sunrise_reminder",
    },

    post_tour_upsell: {
      trigger: "Tour completed",
      time_offset: "same day, 3 hours post-tour",
      steps: [
        "Get guest interests from graph",
        "Run upsell_brain AI",
        "Send WhatsApp offer (Phnom Penh / Floating Village)",
        "Track click-through",
      ],
      channel: "whatsapp",
      template: "upsell_offer",
    },

    review_collection: {
      trigger: "Tour completed",
      time_offset: "24 hours post-tour",
      steps: [
        "Send Google review link",
        "Send TripAdvisor review link",
        "Track completion",
        "Auto-reply to reviews (if 4+ stars)",
      ],
      channels: ["google_business_profile", "tripadvisor"],
    },

    guide_performance_update: {
      trigger: "Review received",
      steps: ["Update guide rating in graph", "Flag if rating dips below 4.5", "Notify dispatch"],
      frequency: "real-time",
    },
  },

  // ── LAYER 6: PAYMENT + CONFIRMATION ────────────────────────────────
  payment_config: {
    gateways: [
      {
        name: "ABA PayWay",
        region: "Cambodia",
        currencies: ["USD", "KHR"],
        methods: ["QR", "card", "Bakong"],
        default_for: "local_guests",
      },
      {
        name: "Wing Pay",
        region: "Cambodia",
        currencies: ["KHR"],
        methods: ["mobile_money"],
        default_for: "mobile_wallets",
      },
      {
        name: "Bakong KHQR",
        region: "Cambodia",
        currencies: ["KHR"],
        methods: ["QR"],
        default_for: "all_khmer_banks",
      },
      {
        name: "Stripe",
        region: "International",
        currencies: ["USD", "EUR"],
        methods: ["card", "ACH"],
        default_for: "international_guests",
      },
    ],
    confirmation_format: {
      type: "PDF e-ticket",
      includes: [
        "booking_reference",
        "guest_names",
        "pass_type",
        "guide_name",
        "driver_name",
        "pickup_location",
        "pickup_time",
        "qr_code",
      ],
      delivery: "WhatsApp + email",
    },
  },

  // ── BUILD PHASES / ROADMAP ────────────────────────────────────────
  roadmap: [
    {
      phase: 1,
      duration: "Week 1–2",
      name: "MVP: WhatsApp Bot + Pass Quoting",
      features: [
        "WhatsApp Business bot",
        "Pass type quoting (1/3/7 day)",
        "Manual guide assignment",
        "ABA PayWay integration",
        "PDF e-ticket generation",
      ],
      success_metric: "10 bookings/day from WhatsApp",
    },

    {
      phase: 2,
      duration: "Week 3–6",
      name: "Automation & Graph Memory",
      features: [
        "Neo4j graph live",
        "Auto driver assignment",
        "Culture pack auto-generation",
        "n8n confirmation workflows",
        "Sunrise reminder automation",
        "Wing Pay + Bakong integration",
      ],
      success_metric: "50% of bookings fully automated",
    },

    {
      phase: 3,
      duration: "Month 2–3",
      name: "Intelligent Routing & Multi-Channel",
      features: [
        "Multi-AI brain routing",
        "Upsell flows (Phnom Penh, Floating Village)",
        "Sunrise optimizer (predict demand)",
        "Review automation & AI replies",
        "Facebook Ads lead integration",
        "TikTok lead capture",
      ],
      success_metric: "70% upsell conversion on completed tours",
    },

    {
      phase: 4,
      duration: "Month 4+",
      name: "Full Intelligence & Predictive",
      features: [
        "Full bundle auto-configuration",
        "Predictive guide recommendations",
        "Dynamic pricing (demand-based)",
        "Khmer AI voice assistant",
        "Hotel walk-in kiosk system",
        "Multi-language support (6+ languages)",
      ],
      success_metric: "100% booking automation, $10k/day revenue",
    },
  ],

  // ── PERFORMANCE TARGETS ────────────────────────────────────────────
  kpis: {
    booking_conversion: {
      target: "15% from lead to booking",
      measurement: "leads_sourced → bookings_completed",
    },
    upsell_rate: {
      target: "25% of completed tours → upsell",
      measurement: "post_tour_offers → purchases",
    },
    guide_satisfaction: {
      target: ">= 4.5 stars average",
      measurement: "guest_reviews → guide_rating",
    },
    payment_success: {
      target: ">= 98% success rate",
      measurement: "payment_attempted → payment_confirmed",
    },
    automation_rate: {
      target: "Phase 1: 20%, Phase 2: 50%, Phase 3: 70%, Phase 4: 90%+",
      measurement: "fully_automated_bookings / total_bookings",
    },
  },

  // ── GOVERNANCE & ORGANIZATIONAL STRUCTURE ─────────────────────────────────────
  governance: {
    board_of_directors: {
      role: "Vision, policy, driver welfare",
      advisory_domains: ["tourism", "transport", "legal", "finance"],
    },
    executive_leadership: {
      ceo: { focus: "Strategy, driver welfare, tourism" },
      cto: { focus: "App, platform, AI orchestration, GPS, dispatch" },
      coo: { focus: "Operations, delivery, logistics, compliance" },
      cfo: { focus: "Driver payouts, payments, USD/KHR, wallets" },
      cmo: { focus: "Brand, growth, driver recruitment, promotions" },
      tourism_head: { focus: "Angkor, temple routes, hotel partnerships" },
    },
    departments: {
      tech_platform: ["App", "GPS", "Dispatch algorithm", "Real-time matching"],
      driver_ops: ["Onboarding", "Performance tracking", "Safety verification"],
      tourist_experience: ["Multilingual support", "Booking", "Ratings", "Reviews"],
      growth_marketing: ["Driver recruitment", "Tourist acquisition", "Social campaigns"],
      finance_payments: ["ABA PayWay", "Wing Pay", "Bakong KHQR", "Stripe", "Payouts"],
      legal_safety: ["Ministry of Tourism compliance", "Insurance", "Driver protection"],
    },
  },

  // ── LAYER 0: CITY HUBS (Geographic Operations) ────────────────────────────────
  city_hubs: {
    phnom_penh: {
      name: "Phnom Penh Capital Hub",
      focus: ["PNH airport transfers", "City rides", "Business travelers"],
      drivers_target: 500,
      revenue_target_monthly_usd: 35000,
    },
    siem_reap: {
      name: "Siem Reap — Angkor Circuit",
      focus: ["Angkor Wat tours", "REP airport", "Temple routes", "Cultural guides"],
      drivers_target: 800,
      revenue_target_monthly_usd: 65000,
      tour_types: ["1-day", "3-day", "7-day", "sunrise", "sunset"],
    },
    sihanoukville: {
      name: "Sihanoukville Beach & Islands",
      focus: ["Beach tourism", "Island hopping", "Coastal routes", "Casino tourism"],
      drivers_target: 300,
      revenue_target_monthly_usd: 22000,
    },
    kampot: {
      name: "Kampot Eco-Tourism & Riverside",
      focus: ["Eco-tourism", "Riverside routes", "Kep connection", "Salt farm tours"],
      drivers_target: 150,
      revenue_target_monthly_usd: 12000,
    },
  },

  // ── LAYER 1-9: SOVEREIGN TOURISM INTELLIGENCE INFRASTRUCTURE (TIIL) ───────────
  tiil_architecture: {
    layer_1_ai_intelligence: {
      name: "AI Intelligence Layer — National Forecasting & Modeling",
      providers: ["OpenAI", "Anthropic", "Google DeepMind", "Databricks", "NVIDIA", "Mistral AI"],
      functions: [
        "Tourism demand prediction",
        "Climate + macro forecasting",
        "AI itinerary modeling",
        "Government dashboards",
        "National tourism simulations",
        "Peak season forecasting",
        "Route optimization simulations",
      ],
      kpis: ["Forecast accuracy > 90%", "Simulation latency < 2s"],
    },
    layer_2_tourism_finance_intelligence: {
      name: "Tourism Finance Intelligence Layer — Capital & Risk Modeling",
      partners: ["JPMorgan Chase", "HSBC", "Bank of China", "BNP Paribas", "Mitsubishi UFJ"],
      functions: [
        "Cross-border payment modeling",
        "SME tourism microfinance scoring",
        "Investment risk analytics",
        "ESG tourism infrastructure scoring",
        "Capital matchmaking",
        "Guide income stability modeling",
      ],
    },
    layer_3_global_visibility: {
      name: "Global Visibility Layer — Distribution & Reputation Engine",
      platforms: ["Facebook", "Instagram", "YouTube", "TikTok", "WeChat", "Reddit"],
      functions: [
        "AI auto-publishing",
        "Sentiment intelligence",
        "Cross-platform ad automation",
        "National tourism visibility monitoring",
        "Brand reputation tracking",
        "Influencer coordination",
      ],
    },
    layer_4_access_device: {
      name: "Access & Device Layer — Universal Compatibility",
      platforms: ["iOS", "Android", "Windows", "macOS", "Linux", "Web"],
      functions: [
        "Mobile AI tourism assistant",
        "Real-time guide chat",
        "AR temple overlays (Angkor)",
        "Operator dashboards",
        "Offline mode support",
      ],
    },
    layer_5_travel_search_intelligence: {
      name: "Travel Search Intelligence Layer — Global Demand Monitor",
      platforms: ["Google Flights", "Booking.com", "Airbnb", "Expedia", "TripAdvisor"],
      functions: [
        "Demand signal extraction",
        "Dynamic pricing analytics",
        "Marketplace synchronization",
        "Competitive heatmapping",
        "SEO keyword trending",
        "Booking pattern analysis",
      ],
    },
    layer_6_experience_intelligence: {
      name: "Experience Intelligence Layer — Cambodia Deployment Core",
      focus_areas: ["Siem Reap", "Phnom Penh", "Angkor Wat", "Sihanoukville", "Kampot"],
      functions: [
        "Climate-optimized routing",
        "Smart guide matching",
        "Capacity forecasting",
        "Tourism heatmaps",
        "Site preservation modeling",
        "Crowd overflow alerts",
        "Event-based revenue spikes",
      ],
    },
    layer_7_tourism_commerce_intelligence: {
      name: "Tourism Commerce Intelligence Layer — Digital Trade Engine",
      platforms: ["Amazon", "Alibaba", "Shopify", "Shopee", "Etsy"],
      functions: [
        "Artisan export modeling",
        "Tourism-to-product retargeting",
        "Cross-border trade analytics",
        "Revenue expansion beyond visits",
        "SME marketplace integration",
        "Handicraft export optimization",
      ],
    },
    layer_8_tirn: {
      name: "Tourism Intelligence Resource Network (TIRN)",
      functions: [
        "Founder acceleration",
        "Legal + capital matchmaking",
        "Tourism startup scoring",
        "Investor onboarding",
        "Startup mentorship networks",
        "Growth capital pathways",
      ],
    },
    layer_9_nomad_intelligence: {
      name: "Nomad Remote Intelligence Layer — Global Talent Mobility Engine",
      strategic_countries: ["Spain", "Portugal", "United Arab Emirates", "Canada"],
      nomad_hubs: ["Bali", "Berlin", "Lisbon", "Mexico City"],
      functions: [
        "Remote worker demand modeling",
        "Visa intelligence tracking",
        "Long-stay accommodation forecasting",
        "Nomad → startup → investment funnel",
        "Remote income capture modeling",
        "Digital nomad sentiment tracking",
      ],
    },
  },

  // ── MASTER AI AGENT GRID ───────────────────────────────────────────────────────
  ai_agent_grid: {
    api_orchestrator: {
      role: "Central routing and DevOps backbone",
      responsibilities: ["Request routing", "Rate limiting", "Error handling", "Logging"],
    },
    ai_autobot: {
      role: "Demand + conversation signal detection",
      sources: ["Tripadvisor", "Reddit", "Booking.com", "TikTok", "Meta", "X"],
      detects: [
        "Emerging destination interest",
        "Competitor comparisons",
        "Pain-point mining",
        "Spike detection",
        "Sentiment classification",
        "Misinformation flagging",
      ],
      output: "Demand Probability Index → action triggers",
    },
    rdtb: {
      role: "Research, validation, bias monitoring",
      functions: [
        "Data validation",
        "Algorithm bias detection",
        "Fact-checking",
        "Report generation",
        "Audit logging for Web3 transactions",
      ],
    },
    capital_engine: {
      role: "Monetization optimization",
      functions: [
        "Dynamic pricing",
        "Revenue optimization",
        "Upsell triggering",
        "Margin maximization",
        "ROI tracking",
      ],
    },
    ecommerce_ai: {
      role: "Digital trade enablement",
      functions: [
        "Artisan product visibility",
        "Export channel optimization",
        "Cross-border fulfillment",
        "Marketplace synchronization",
      ],
    },
    website_app_ai: {
      role: "Media and UI automation",
      functions: [
        "Content generation",
        "UI/UX optimization",
        "Dynamic landing pages",
        "Theme adaptation",
        "Responsive design",
      ],
    },
    ai_vibe_code_agent: {
      role: "Emotional + cultural signal engine",
      mood_signals: {
        angkor: "Spiritual + Majestic",
        coastal: "Relaxed + Tropical",
        phnom_penh: "Urban + Entrepreneurial",
      },
      adaptations: [
        "SEO tone adjustment",
        "Ad messaging mood sync",
        "NFT aesthetic alignment",
        "Token reward multipliers",
        "Website UI themes",
        "Color palette switching",
        "Typography adjustment",
      ],
    },
    ai_sem_agent: {
      role: "Search Engine Marketing automation",
      channels: ["Google Ads", "Meta Ads", "TikTok Ads", "X Ads"],
      capabilities: [
        "Demand spike detection",
        "Multilingual ad generation",
        "CPC automation",
        "SME campaign scaling",
        "ROI self-optimization",
      ],
    },
    ai_seo_agent: {
      role: "Organic authority building",
      tools: ["OpenAI", "Vercel", "Google Search Console"],
      priority_clusters: [
        "Angkor authority clusters",
        "Siem Reap event intelligence",
        "Phnom Penh digital nomad hub",
        "Visa automation content",
      ],
    },
    ai_tourism_academy: {
      role: "National skills and certification layer",
      offerings: [
        "Guide certification NFTs",
        "Multilingual training",
        "SME digital onboarding",
        "ESG + sustainability programs",
        "Customer service mastery",
      ],
    },
  },

  // ── TARGET CUSTOMER SEGMENTS ───────────────────────────────────────────────────
  target_segments: {
    tourists: {
      groups: ["Cultural travelers", "Luxury visitors", "Backpackers", "Families", "Digital-first"],
      value_proposition: ["AI itinerary optimization", "Crowd forecasting", "Guide matching", "Climate routing"],
      result: "Better experience → higher spending → longer stays → stable revenue",
    },
    digital_nomads: {
      strategic_sources: ["Spain", "Portugal", "UAE", "Canada"],
      hubs: ["Bali", "Berlin", "Lisbon", "Mexico City"],
      value_proposition: [
        "Remote income inflow modeling",
        "Visa sentiment tracking (Reddit)",
        "Coworking demand prediction",
        "Housing forecasting",
      ],
      result: "Foreign currency inflow, startup formation, long-stay spending",
    },
    tour_guides: {
      focus_areas: ["Angkor Wat", "Siem Reap"],
      value_proposition: [
        "Smart guide-tourist matching",
        "Demand forecasting by language",
        "Dynamic pricing intelligence",
        "Capacity optimization",
        "Performance dashboards",
      ],
      partnerships: ["HSBC", "JPMorgan Chase"],
      result: "Higher income stability, lower off-season risk, professionalization",
    },
    hotels_airbnb: {
      platforms: ["Airbnb", "Booking.com"],
      value_proposition: [
        "Occupancy forecasting",
        "Price optimization",
        "Event-driven surge modeling",
        "Tourist profile analytics",
      ],
      result: "Revenue stabilization, better planning, investment confidence",
    },
    tourism_smes: {
      sectors: ["Restaurants", "Transport", "Shops", "Artisans"],
      commerce_alignment: ["Amazon", "Alibaba", "Shopify", "Shopee", "Etsy"],
      value_proposition: [
        "Tourism-to-export conversion",
        "Demand heatmaps",
        "Capital access scoring",
        "ESG ratings",
      ],
      result: "Tourism becomes export intelligence, access to global capital",
    },
    private_investors: {
      partners: ["BNP Paribas", "Bank of China", "Mitsubishi UFJ"],
      value_proposition: [
        "Infrastructure risk analytics",
        "Climate exposure modeling",
        "Demand simulations",
        "Capital concentration alerts",
      ],
      result: "Smarter projects, sustainable development, reduced speculation",
    },
  },

  // ── WEB3 LAYER: ONLINEGUIDE TOKEN (OGT) & SMART CONTRACTS ────────────────────
  web3_layer: {
    token_ogt: {
      name: "OnlineGuide Token",
      symbol: "OGT",
      chains: ["Ethereum", "Polygon", "BNB Smart Chain", "Solana"],
      recommended_default: "Polygon",
      reason: "Low gas fees, PoS, energy efficient",
    },
    on_chain_revenue_automation: {
      flow: "Tourist Payment → Smart Contract Escrow → Auto Revenue Split → OGT Reward → RDTB Audit",
      objectives: ["Transparent settlement", "Faster payouts", "Reduced corruption"],
    },
    wallet_integrations: ["MetaMask", "Trust Wallet", "Coinbase Wallet"],
    interactions: ["OGT storage", "NFT ticket access", "QR payments", "Merchant dashboards", "Staking"],
    nft_offerings: {
      guide_certifications: {
        name: "Guide Certification NFTs",
        properties: ["Multilingual", "Specialty tags", "Rating embedded", "Training history"],
      },
      experience_tokens: {
        name: "Tokenized Tourism Experiences",
        types: ["Sunrise tour", "Angkor 3-day", "Floating Village", "Temple scholar"],
      },
    },
  },

  // ── PRIVATE SECTOR AI TOURISM FARM GROWTH ENGINE ────────────────────────────
  ai_tourism_farm: {
    mission: "Cultivate demand signals into continuously monetized digital assets",
    cultivation_targets: [
      "Travel demand signals",
      "SEO keyword clusters",
      "Digital learning products",
      "Knowledge assets",
      "Tokenized experiences",
      "Smart booking tools",
    ],
    growth_cycle: ["Detect", "Analyze", "Build", "Monetize", "Optimize", "Scale"],
    architecture: {
      signal_field: {
        sources: ["Tripadvisor", "Reddit", "Booking.com", "TikTok", "X"],
        processing: "AI evaluates signal quality through demand intensity scoring",
      },
      growth_engine: {
        providers: ["OpenAI", "Google Cloud", "AWS"],
        outputs: ["SEO hubs", "Itinerary builders", "Landing pages", "Ad funnels", "Tourism tools"],
      },
      harvest_layer: {
        revenue_rails: ["Stripe", "PayPal", "Ecommerce", "NFT ticketing", "Subscriptions"],
        outcomes: "Automated, diversified, platform-controlled income loops",
      },
    },
  },

  // ── CAPITAL EXTENSION LAYER ────────────────────────────────────────────────────
  capital_extension: {
    gofundme_integration: {
      use_cases: [
        "Guide training sponsorship",
        "Temple conservation campaigns",
        "Crisis recovery funds",
        "Community tourism development",
      ],
      relationship: "OnlineGuide.io = Intelligence Infrastructure, GoFundMe = Capital Extension",
    },
    reddit_integration: {
      role: "Public sentiment and signal surface",
      monitoring: [
        "Cambodia safety sentiment",
        "Angkor crowd perception",
        "Visa discussions",
        "Nomad life sentiment",
      ],
      pipeline: "Conversation → Data → Modeling → Insight → Revenue → Capital → Infrastructure",
    },
  },

  // ── SENTIMENT MONITORING & GLOBAL VISIBILITY ───────────────────────────────────
  global_visibility_layer: {
    national_travel_sentiment_dashboard: {
      indicators: [
        "Destination mention velocity",
        "Sentiment polarity index",
        "Concern vs excitement ratio",
        "Competitor comparison index",
        "Country-of-origin interest heatmap",
        "Narrative volatility score",
      ],
    },
    pain_point_mining: {
      identified_gaps: [
        "Visa confusion",
        "Payment friction",
        "Language barriers",
        "Safety myths",
        "Booking uncertainty",
      ],
      solution_routing: [
        "Visa Intelligence Engine",
        "Payment optimization",
        "Multilingual support",
        "Safety content",
        "Smart booking",
      ],
    },
  },

  // ── STRATEGIC FRAMING ──────────────────────────────────────────────────────────
  strategic_positioning: {
    reference_benchmark: "Google.com (operated by Google LLC, subsidiary of Alphabet Inc.) as global information gateway",
    onlineguide_objective: "Sovereign tourism intelligence gateway for Cambodia",
    unified_flow: "Global Travel Conversation → AI AutoBot → Sentiment + Intent → SEM + SEO + Academy + Web3 → Smart Contracts → Wallet Settlement → Revenue + Audit → National Dashboard",
    national_evolution: [
      "Data-driven",
      "Emotion-aware",
      "AI-optimized",
      "Web3-enabled",
      "Reputation-protected",
      "Sustainability-aligned",
    ],
  },

  // ── VISION: SOVEREIGN DIGITAL TOURISM NATION ───────────────────────────────────
  sovereign_vision: {
    conversion_flow: "Tourism Traffic → Data Capture → AI Modeling → Revenue → Capital → Infrastructure → National Economic Growth",
    impact_areas: ["Tourism", "Data", "Capital", "Government", "Entrepreneurs", "Global travelers"],
    protected_values: ["Heritage", "Infrastructure", "Financial stability"],
    final_outcome: "Tourism + Digital Trade + Remote Workforce Attraction = Cambodia's AI-powered economic expansion engine",
  },
};

export default CONFIG;
