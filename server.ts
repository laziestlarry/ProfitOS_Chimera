import express from "express";
import cors from "cors";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { INITIAL_KPIS, INITIAL_AGENTS, INITIAL_PLAYS } from "./src/configData.js";
import { Company, KPIRecord, Job, EvidenceRecord, Play, TriggerCondition } from "./src/types.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-Memory Database Stores
const companiesStore: Map<string, Company> = new Map([
  ["autonoma-x", { id: "autonoma-x", name: "AutonomaX Growth Corp", industry: "AI Automation", size: "smb", created_at: new Date().toISOString() }],
  ["propulse-agency", { id: "propulse-agency", name: "ProPulse Agency", industry: "E-Commerce Growth", size: "mid", created_at: new Date().toISOString() }]
]);

const kpiRecordsStore: Map<string, KPIRecord[]> = new Map();
const jobsStore: Map<string, Job[]> = new Map();
const evidenceStore: Map<string, EvidenceRecord[]> = new Map();
const lazyProfilesStore: Map<string, any> = new Map();

// Helper to evaluate trigger condition
function evaluateCondition(cond: TriggerCondition, kpiValue: number, kpiDef?: any): boolean {
  let targetVal = kpiDef?.target || 1;
  let valToCompare = cond.relation === "ratio_to_target" ? kpiValue / targetVal : kpiValue;

  switch (cond.operator) {
    case "<": return valToCompare < cond.value;
    case "<=": return valToCompare <= cond.value;
    case ">": return valToCompare > cond.value;
    case ">=": return valToCompare >= cond.value;
    case "==": return valToCompare === cond.value;
    default: return false;
  }
}

// Helper to evaluate if a play triggers
function evaluatePlay(play: Play, kpiSnapshot: Record<string, number>, kpiDefs: typeof INITIAL_KPIS): boolean {
  if (play.triggers.all && play.triggers.all.length > 0) {
    for (const cond of play.triggers.all) {
      const val = kpiSnapshot[cond.kpi] ?? 0;
      const kDef = kpiDefs.find(k => k.name === cond.kpi);
      if (!evaluateCondition(cond, val, kDef)) return false;
    }
    return true;
  }

  if (play.triggers.any && play.triggers.any.length > 0) {
    for (const cond of play.triggers.any) {
      const val = kpiSnapshot[cond.kpi] ?? 0;
      const kDef = kpiDefs.find(k => k.name === cond.kpi);
      if (evaluateCondition(cond, val, kDef)) return true;
    }
    return false;
  }

  return false;
}

// Initialize Gemini lazily
let aiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// API Routes

// Root & Health
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", version: "0.1.0", service: "Profit OS Chimera" });
});

app.get("/api/v1/info", (req, res) => {
  res.json({
    service: "Profit OS Chimera API",
    version: "0.1.0",
    status: "operational",
    agents_count: INITIAL_AGENTS.length,
    kpis_count: INITIAL_KPIS.length,
    plays_count: INITIAL_PLAYS.length
  });
});

// Companies
app.get("/api/v1/companies", (req, res) => {
  res.json(Array.from(companiesStore.values()));
});

app.post("/api/v1/companies", (req, res) => {
  const { name, industry, size } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  
  const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + uuidv4().slice(0, 4);
  const company: Company = {
    id,
    name,
    industry: industry || "General",
    size: size || "smb",
    created_at: new Date().toISOString()
  };

  companiesStore.set(id, company);
  res.status(201).json(company);
});

app.get("/api/v1/companies/:company_id", (req, res) => {
  const comp = companiesStore.get(req.params.company_id);
  if (!comp) return res.status(404).json({ error: "Company not found" });
  res.json(comp);
});

// KPIs
app.get("/api/v1/kpis/definitions", (req, res) => {
  res.json(INITIAL_KPIS);
});

app.get("/api/v1/kpis/company/:company_id/latest", (req, res) => {
  const records = kpiRecordsStore.get(req.params.company_id) || [];
  if (records.length === 0) {
    // Generate default sample snapshot
    const sampleRecords: KPIRecord[] = INITIAL_KPIS.map(kpi => ({
      id: uuidv4(),
      company_id: req.params.company_id,
      name: kpi.name,
      value: kpi.name === "revenue_total_30d" ? 3800 : kpi.name === "cr_main_funnel" ? 0.035 : kpi.name === "sessions_main_30d" ? 620 : kpi.target || 10,
      target: kpi.target,
      status: "warning",
      recorded_at: new Date().toISOString()
    }));
    return res.json(sampleRecords);
  }
  res.json(records);
});

// Plays
app.get("/api/v1/plays", (req, res) => {
  res.json(INITIAL_PLAYS);
});

// Jobs
app.get("/api/v1/jobs/company/:company_id", (req, res) => {
  const jobs = jobsStore.get(req.params.company_id) || [];
  res.json(jobs);
});

app.post("/api/v1/jobs", (req, res) => {
  const { company_id, type, payload } = req.body;
  if (!company_id || !type) return res.status(400).json({ error: "Missing parameters" });

  const job: Job = {
    id: uuidv4(),
    company_id,
    type,
    payload: payload || {},
    status: "pending",
    created_at: new Date().toISOString()
  };

  const existing = jobsStore.get(company_id) || [];
  existing.unshift(job);
  jobsStore.set(company_id, existing);

  res.status(201).json(job);
});

// Evidence
app.get("/api/v1/evidence/company/:company_id", (req, res) => {
  const evs = evidenceStore.get(req.params.company_id) || [];
  res.json(evs);
});

// Growth Cycle Execution Endpoint
app.post("/api/v1/cycles/run", (req, res) => {
  const { company_id, kpi_snapshot } = req.body;
  if (!company_id || !kpi_snapshot) {
    return res.status(400).json({ error: "company_id and kpi_snapshot are required" });
  }

  const company = companiesStore.get(company_id);
  if (!company) {
    // create default company entry if missing
    companiesStore.set(company_id, {
      id: company_id,
      name: company_id.toUpperCase(),
      industry: "Growth Enterprise",
      size: "smb",
      created_at: new Date().toISOString()
    });
  }

  const triggeredPlayNames: string[] = [];
  const createdJobs: Job[] = [];
  const createdEvidence: EvidenceRecord[] = [];

  // Evaluate plays against snapshot
  for (const play of INITIAL_PLAYS) {
    if (evaluatePlay(play, kpi_snapshot, INITIAL_KPIS)) {
      triggeredPlayNames.push(play.name);

      for (const planItem of play.job_plan) {
        const jobId = uuidv4();
        const job: Job = {
          id: jobId,
          company_id,
          type: planItem.type,
          payload: {
            play_id: play.id,
            play_name: play.name,
            handler: planItem.handler,
            params: planItem.params
          },
          status: "completed",
          created_at: new Date().toISOString()
        };
        createdJobs.push(job);

        // Generate evidence record
        const ev: EvidenceRecord = {
          id: uuidv4(),
          company_id,
          job_id: jobId,
          event_type: `PLAY_EXECUTED_${planItem.type}`,
          payload: {
            play_name: play.name,
            impact: play.impact_hypothesis,
            details: planItem.params,
            timestamp: new Date().toISOString()
          },
          occurred_at: new Date().toISOString()
        };
        createdEvidence.push(ev);
      }
    }
  }

  // Update stores
  const existingJobs = jobsStore.get(company_id) || [];
  jobsStore.set(company_id, [...createdJobs, ...existingJobs]);

  const existingEv = evidenceStore.get(company_id) || [];
  evidenceStore.set(company_id, [...createdEvidence, ...existingEv]);

  res.json({
    cycle_id: uuidv4(),
    company_id,
    jobs_created: createdJobs.length,
    plays_triggered: triggeredPlayNames,
    evidence_count: createdEvidence.length,
    status: "completed"
  });
});

// Lazy Larry Personal Assistant Endpoints
app.post("/api/v1/lazy-larry/profile/:company_id", (req, res) => {
  const { company_id } = req.params;
  const profileData = req.body;
  lazyProfilesStore.set(company_id, profileData);
  res.json({ status: "success", company_id, profile_created: true });
});

app.get("/api/v1/lazy-larry/profile/:company_id", (req, res) => {
  const { company_id } = req.params;
  const profile = lazyProfilesStore.get(company_id) || {
    layers: {
      core_identity: { name: "Lazy Larry Lead", focus: "Maximum output, minimum friction" },
      skills_knowledge: { primary: ["AI Systems", "Automated Funnels"] }
    },
    preferences: { tone: "calm, witty, actionable" }
  };
  res.json({ company_id, profile: profile.layers, preferences: profile.preferences });
});

app.post("/api/v1/lazy-larry/chat/:company_id", async (req, res) => {
  const { message } = req.body;
  const userMsg = message || "";
  const ai = getGemini();

  if (ai && userMsg) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are Lazy Larry, an elite AI Growth Assistant. Be concise, calm, witty, and directly focused on growth metrics and automated solutions. Answer this request: ${userMsg}`,
      });
      return res.json({
        response: response.text,
        agent: "lazy_larry_bot",
        confidence: 0.98
      });
    } catch (err) {
      console.warn("Gemini call failed, falling back to rule response:", err);
    }
  }

  // Smart fallback response
  res.json({
    response: `🤖 **Lazy Larry Growth Intelligence**: I've analyzed your prompt "${userMsg.slice(0, 50)}...". Based on current KPIs, your fastest win is activating the 'Zero-Ad Traffic Expansion' play or running an Opportunity Hunt cycle.`,
    agent: "lazy_larry_bot",
    action_suggested: "Run Growth Cycle"
  });
});

// Opportunity Hunter Endpoints
app.post("/api/v1/opportunities/hunt/:company_id", (req, res) => {
  const { company_id } = req.params;
  const opportunities = [
    {
      id: "opp-01",
      type: "freelance",
      title: "AI YouTube Content Automation Pipeline Setup",
      description: "Set up automated script-to-video workflow for high-volume YouTube Short channel.",
      estimated_income: { min: 297, max: 897, unit: "USD/project" },
      time_commitment: "2-4 days",
      skills_required: ["AI Scripting", "Video Automation", "YouTube SEO"],
      platform: "Fiverr Pro",
      auto_apply_ready: true,
      match_score: 0.96
    },
    {
      id: "opp-02",
      type: "remote_job",
      title: "AI Growth Engineer (Part-Time Contract)",
      description: "Build custom workflow integrations and automated CRM funnels.",
      estimated_income: { min: 65, max: 120, unit: "USD/hour" },
      time_commitment: "10 hrs/week",
      skills_required: ["Node.js", "FastAPI", "Growth Analytics"],
      platform: "Upwork Enterprise",
      auto_apply_ready: true,
      match_score: 0.92
    },
    {
      id: "opp-03",
      type: "passive_income",
      title: "Shopify Digital Asset Starter Bundle - Zen Calm Pack",
      description: "Deploy 3-piece printable digital art collection product on Shopify.",
      estimated_income: { min: 300, max: 1500, unit: "USD/month" },
      time_commitment: "1 hour setup",
      skills_required: ["E-Commerce", "Digital Assets"],
      platform: "Shopify Store",
      auto_apply_ready: true,
      match_score: 0.89
    }
  ];

  res.json({
    company_id,
    opportunities_found: opportunities.length,
    opportunities
  });
});

app.post("/api/v1/opportunities/auto-apply/:company_id", (req, res) => {
  const { opportunity_id } = req.body;
  res.json({
    status: "submitted",
    opportunity_id,
    proposal_sent: true,
    estimated_response: "24-48 hours",
    notes: "AI Opportunity Commander submitted personalized high-converting proposal stack."
  });
});

// Social Media Automation Endpoints
app.post("/api/v1/social/create-content", (req, res) => {
  const { platforms, content_theme, count = 7 } = req.body;
  const posts = Array.from({ length: count }).map((_, i) => ({
    id: `post-${i + 1}`,
    platform: (platforms && platforms[i % platforms.length]) || "youtube",
    content_type: "Short Script & Carousel",
    scheduled_time: new Date(Date.now() + (i + 1) * 86400000).toISOString(),
    content_preview: `🚀 [Theme: ${content_theme || "AI Automation"}] Post #${i + 1}: How to automate your growth engine using Profit OS Chimera in 3 steps.`
  }));

  res.json({ posts_created: posts.length, posts });
});

// AI Business Intelligence
app.post("/api/v1/intelligence/detect-trends", (req, res) => {
  res.json({
    trends_found: 3,
    trends: [
      {
        id: "trend-01",
        category: "ai",
        title: "Autonomous Agent Workflow Orchestration",
        impact_level: "high",
        relevance_score: 0.98,
        actionable_insights: [
          "Package agentic workflow templates for agency deployment",
          "Offer zero-code automation monitoring to SMBs"
        ]
      },
      {
        id: "trend-02",
        category: "market",
        title: "Zero-Ad Organic Short-Form Video Scaling",
        impact_level: "high",
        relevance_score: 0.94,
        actionable_insights: [
          "Cross-post automated Shorts on YouTube, TikTok, and Instagram Reels",
          "Include high-converting value stacks in pinned comments"
        ]
      }
    ]
  });
});

// Content & Design Studio
app.post("/api/v1/content/dashboard", (req, res) => {
  res.json({
    dashboard_id: uuidv4(),
    title: "Profit OS Growth Command Dashboard Spec",
    design_spec: {
      theme: "dark_emerald_slate",
      components: ["Revenue Metrics", "Conversion Gauges", "Active Jobs Feed"],
      layout: "bento-3-col"
    },
    emotional_tone: "empowered, clear, high-contrast"
  });
});

// Automation Workflows
app.post("/api/v1/automation/audit-processes", (req, res) => {
  res.json({
    opportunities_found: 3,
    opportunities: [
      { process: "Manual KPI logging", potential_savings: "4 hrs/week", automation_type: "API Scheduled Sync" },
      { process: "Social post drafting & scheduling", potential_savings: "6 hrs/week", automation_type: "Social Pack Bot" },
      { process: "Client proposal generation", potential_savings: "3 hrs/week", automation_type: "Opportunity Hunter Auto-Apply" }
    ]
  });
});

// Vite & Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Profit OS Chimera Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
