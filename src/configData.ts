import { KPIDefinition, Play, Agent } from './types';

export const INITIAL_KPIS: KPIDefinition[] = [
  {
    name: "revenue_total_30d",
    label: "Total Revenue (last 30 days)",
    unit: "USD",
    category: "revenue",
    dimension: "company",
    target: 5000,
    warning_ratio_below: 0.8,
    critical_ratio_below: 0.5,
    description: "All revenue across main streams in last 30 days."
  },
  {
    name: "cr_main_funnel",
    label: "Main Funnel Conversion Rate",
    unit: "ratio",
    category: "conversion",
    dimension: "funnel",
    target: 0.05,
    warning_ratio_below: 0.8,
    critical_ratio_below: 0.5,
    description: "Sessions to purchase for primary sales funnel."
  },
  {
    name: "sessions_main_30d",
    label: "Main Funnel Sessions (30d)",
    unit: "count",
    category: "traffic",
    dimension: "funnel",
    min_healthy: 500,
    warning_below: 300,
    critical_below: 100,
    description: "Unique sessions reaching primary funnel."
  },
  {
    name: "cac_paid",
    label: "Customer Acquisition Cost (Paid)",
    unit: "USD",
    category: "efficiency",
    dimension: "company",
    max_healthy: 30,
    warning_above: 40,
    critical_above: 60,
    description: "Average paid acquisition cost per new customer."
  },
  {
    name: "retention_60d",
    label: "60-Day Customer Retention",
    unit: "ratio",
    category: "retention",
    dimension: "company",
    target: 0.35,
    warning_ratio_below: 0.8,
    critical_ratio_below: 0.5,
    description: "Share of customers who buy again within 60 days."
  },
  {
    name: "fiverr_impressions_7d",
    label: "Fiverr Gig Impressions (7d)",
    unit: "count",
    category: "traffic",
    dimension: "channel",
    min_healthy: 200,
    warning_below: 100,
    critical_below: 50,
    description: "Fiverr gig impressions in last 7 days."
  },
  {
    name: "fiverr_orders_30d",
    label: "Fiverr Orders (30d)",
    unit: "count",
    category: "revenue",
    dimension: "channel",
    target: 5,
    warning_ratio_below: 0.8,
    critical_ratio_below: 0.5,
    description: "Number of Fiverr orders in last 30 days."
  },
  {
    name: "shopify_sessions_30d",
    label: "Shopify Sessions (30d)",
    unit: "count",
    category: "traffic",
    dimension: "channel",
    min_healthy: 500,
    warning_below: 200,
    critical_below: 100,
    description: "Shopify store sessions in last 30 days."
  },
  {
    name: "shopify_orders_30d",
    label: "Shopify Orders (30d)",
    unit: "count",
    category: "revenue",
    dimension: "channel",
    target: 10,
    warning_ratio_below: 0.8,
    critical_ratio_below: 0.5,
    description: "Number of Shopify orders in last 30 days."
  },
  {
    name: "income_streams_count",
    label: "Active Income Streams",
    unit: "count",
    category: "diversification",
    dimension: "company",
    target: 3,
    warning_below: 2,
    critical_below: 1,
    description: "Number of active income streams (diversification metric)."
  },
  {
    name: "automation_coverage",
    label: "Automation Coverage",
    unit: "ratio",
    category: "efficiency",
    dimension: "company",
    target: 0.7,
    warning_ratio_below: 0.5,
    critical_ratio_below: 0.3,
    description: "Percentage of processes that are automated (0-1)."
  },
  {
    name: "social_engagement_rate",
    label: "Social Media Engagement Rate",
    unit: "ratio",
    category: "engagement",
    dimension: "channel",
    target: 0.05,
    warning_ratio_below: 0.8,
    critical_ratio_below: 0.5,
    description: "Social media engagement rate (likes, comments, shares / followers)."
  },
  {
    name: "opportunities_applied_30d",
    label: "Opportunities Applied (30d)",
    unit: "count",
    category: "growth",
    dimension: "company",
    target: 10,
    warning_below: 5,
    critical_below: 2,
    description: "Number of income opportunities applied to in last 30 days."
  },
  {
    name: "content_assets_created_30d",
    label: "Content Assets Created (30d)",
    unit: "count",
    category: "content",
    dimension: "company",
    target: 20,
    warning_below: 10,
    critical_below: 5,
    description: "Number of content assets (posts, videos, graphics) created."
  },
  {
    name: "manual_work_hours_per_week",
    label: "Manual Work Hours Per Week",
    unit: "hours",
    category: "efficiency",
    dimension: "company",
    max_healthy: 10,
    warning_above: 20,
    critical_above: 30,
    description: "Hours spent on manual, automatable tasks per week."
  }
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: "growth_commander_ai",
    label: "Director of Growth",
    handles: ["SUGGEST_PLAYS", "PLAN_JOB_QUEUE_FOR_PLAY", "EXECUTE_PLAY_GROWTH"],
    role: "Plans channels, campaigns, acquisition, content systems.",
    values: ["zero_ad_first", "compound_small_wins"],
    style: "decisive, experiment-driven, evidence-based"
  },
  {
    id: "commerce_commander_ai",
    label: "Director of Commerce",
    handles: ["SUGGEST_PLAYS", "PLAN_JOB_QUEUE_FOR_PLAY", "EXECUTE_PLAY_COMMERCE"],
    role: "Designs offers, pricing experiments, bundles, and revenue tests.",
    values: ["maximize_long_term_clv", "protect_brand_positioning"]
  },
  {
    id: "opportunity_commander_ai",
    label: "Commander Opportunity Hunter",
    handles: ["HUNT_OPPORTUNITIES", "ANALYZE_INCOME_STREAMS", "AUTO_APPLY_OPPORTUNITY"],
    role: "Scouts income opportunities, freelance gigs, remote jobs, side hustles, passive income.",
    values: ["maximize_income_diversity", "minimize_time_investment"]
  },
  {
    id: "intelligence_commander_ai",
    label: "AI Business Intelligence Commander",
    handles: ["DETECT_TRENDS", "FIND_PARTNERSHIPS", "SCOUT_FUNDING", "ANALYZE_COMPETITION"],
    role: "Monitors trends, finds partnerships, scouts funding, analyzes competition.",
    values: ["stay_ahead_of_curves", "leverage_network_effects"]
  },
  {
    id: "lazy_larry_bot",
    label: "Lazy Larry Personal Assistant Bot",
    handles: ["PERSONAL_ASSISTANCE", "CHAT_INTERACTION", "PROFILE_MANAGEMENT"],
    role: "Multi-layer profiled personal assistant, chatbot, task management.",
    values: ["emotional_intelligence", "proactive_help", "minimize_user_effort"]
  },
  {
    id: "social_pack_bot",
    label: "Social Content Pack Bot",
    handles: ["EXECUTE_PLAY_GROWTH", "CREATE_SOCIAL_CONTENT", "SCHEDULE_SOCIAL_POSTS"],
    role: "Creates social media content packs, carousels, and Shorts scripts."
  },
  {
    id: "dashboard_bot",
    label: "Dashboard & Content Design Bot",
    handles: ["CREATE_DASHBOARD", "CREATE_INFOGRAPHIC", "CREATE_STORYBOARD"],
    role: "Creates dashboards, infographics, storyboards with emotional design."
  },
  {
    id: "automation_bot",
    label: "Automation Workflow Bot",
    handles: ["CREATE_AUTOMATION", "SCHEDULE_TASKS", "MINIMIZE_MANUAL_WORK"],
    role: "Creates automation workflows to minimize human work."
  },
  {
    id: "evidence_commander_ai",
    label: "Director of Evidence & Finance",
    handles: ["EVALUATE_KPIS", "LOG_EVIDENCE"],
    role: "Defines KPIs, evaluates performance, ties plays to financial outcomes."
  }
];

export const INITIAL_PLAYS: Play[] = [
  {
    id: "low_cr_high_traffic",
    name: "Landing Conversion Upgrade",
    owner_agent: "growth_commander_ai",
    intent: "Improve conversion when traffic is sufficient but CR is low.",
    triggers: {
      all: [
        { kpi: "cr_main_funnel", relation: "ratio_to_target", operator: "<", value: 0.8 },
        { kpi: "sessions_main_30d", relation: "absolute", operator: ">", value: 500 }
      ]
    },
    impact_hypothesis: "CR uplift of 20–50% within 14–30 days.",
    job_plan: [
      { type: "EXECUTE_PLAY_GROWTH", handler: "copy_bot", params: { channel: "landing_page", action: "generate_two_new_headline_variants_and_value_stack" } },
      { type: "EXECUTE_PLAY_GROWTH", handler: "copy_bot", params: { channel: "email", action: "draft_reactivation_sequence_for_recent_visitors" } },
      { type: "LOG_EVIDENCE", handler: "evidence_commander_ai", params: { note: "Landing conversion uplift experiment launched." } }
    ]
  },
  {
    id: "low_traffic_healthy_cr",
    name: "Zero-Ad Traffic Expansion",
    owner_agent: "growth_commander_ai",
    intent: "Drive more qualified visitors without paid ads.",
    triggers: {
      all: [
        { kpi: "cr_main_funnel", relation: "ratio_to_target", operator: ">=", value: 1.0 },
        { kpi: "sessions_main_30d", relation: "absolute", operator: "<", value: 300 }
      ]
    },
    impact_hypothesis: "2–5x traffic within 30–60 days.",
    job_plan: [
      { type: "EXECUTE_PLAY_GROWTH", handler: "copy_bot", params: { channel: "social", action: "generate_7_day_zero_ad_campaign_content" } },
      { type: "EXECUTE_PLAY_GROWTH", handler: "fiverr_bot", params: { channel: "fiverr_profile", action: "optimize_profile_and_gig_keywords_for_discovery" } },
      { type: "LOG_EVIDENCE", handler: "evidence_commander_ai", params: { note: "Zero-ad traffic campaign launched." } }
    ]
  },
  {
    id: "hunt_income_opportunities",
    name: "Automated Income Opportunity Hunt",
    owner_agent: "opportunity_commander_ai",
    intent: "Automatically scout and apply to income opportunities.",
    triggers: {
      any: [
        { kpi: "revenue_total_30d", relation: "ratio_to_target", operator: "<", value: 0.7 },
        { kpi: "fiverr_orders_30d", relation: "absolute", operator: "<", value: 3 }
      ]
    },
    impact_hypothesis: "3–5 new income opportunities identified and applied to within 7 days.",
    job_plan: [
      { type: "HUNT_OPPORTUNITIES", handler: "opportunity_commander_ai", params: { types: ["freelance", "remote_job", "side_hustle"], auto_apply: true } },
      { type: "ANALYZE_INCOME_STREAMS", handler: "opportunity_commander_ai", params: { action: "analyze_current_streams_and_optimize" } },
      { type: "LOG_EVIDENCE", handler: "evidence_commander_ai", params: { note: "Income opportunity hunt completed." } }
    ]
  },
  {
    id: "social_media_automation_launch",
    name: "Social Media Automation System Launch",
    owner_agent: "growth_commander_ai",
    intent: "Launch automated social media content system.",
    triggers: {
      any: [
        { kpi: "sessions_main_30d", relation: "absolute", operator: "<", value: 500 },
        { kpi: "fiverr_impressions_7d", relation: "absolute", operator: "<", value: 200 }
      ]
    },
    impact_hypothesis: "2–3x social engagement and traffic within 14–30 days.",
    job_plan: [
      { type: "CREATE_SOCIAL_CONTENT", handler: "social_pack_bot", params: { platforms: ["youtube", "instagram", "tiktok"], content_count: 14, theme: "AI automation and business growth" } },
      { type: "SCHEDULE_SOCIAL_POSTS", handler: "social_pack_bot", params: { schedule: "daily", auto_post: true } },
      { type: "LOG_EVIDENCE", handler: "evidence_commander_ai", params: { note: "Social media automation system launched." } }
    ]
  },
  {
    id: "trend_capitalization",
    name: "Capitalize on Emerging Trends",
    owner_agent: "intelligence_commander_ai",
    intent: "Detect and capitalize on emerging trends and opportunities.",
    triggers: {
      all: [
        { kpi: "revenue_total_30d", relation: "ratio_to_target", operator: "<", value: 1.0 }
      ]
    },
    impact_hypothesis: "Early trend adoption leading to +20–40% revenue within 30–60 days.",
    job_plan: [
      { type: "DETECT_TRENDS", handler: "trend_bot", params: { categories: ["ai", "market", "technology"], limit: 5 } },
      { type: "FIND_PARTNERSHIPS", handler: "intelligence_commander_ai", params: { partner_types: ["creator", "agency"] } },
      { type: "SCOUT_FUNDING", handler: "intelligence_commander_ai", params: { types: ["grant", "accelerator"] } },
      { type: "LOG_EVIDENCE", handler: "evidence_commander_ai", params: { note: "Trend capitalization play executed." } }
    ]
  },
  {
    id: "minimize_human_work",
    name: "Automation Maximization Play",
    owner_agent: "infra_commander_ai",
    intent: "Identify and automate all manual processes to minimize human work.",
    triggers: {
      all: [
        { kpi: "manual_work_hours_per_week", relation: "absolute", operator: ">", value: 10 }
      ]
    },
    impact_hypothesis: "Reduce manual work by 50–70%, freeing time for high-value activities.",
    job_plan: [
      { type: "CREATE_AUTOMATION", handler: "automation_bot", params: { action: "audit_manual_processes_and_automate" } },
      { type: "SCHEDULE_TASKS", handler: "automation_bot", params: { action: "setup_recurring_automated_tasks" } },
      { type: "MINIMIZE_MANUAL_WORK", handler: "automation_bot", params: { action: "implement_workflow_automations" } },
      { type: "LOG_EVIDENCE", handler: "evidence_commander_ai", params: { note: "Automation maximization play executed." } }
    ]
  }
];
