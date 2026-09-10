export interface Company {
  id: string;
  name: string;
  industry: string;
  size: 'solo' | 'smb' | 'mid' | 'enterprise';
  created_at?: string;
}

export interface KPIDefinition {
  name: string;
  label: string;
  unit: string;
  category: string;
  dimension: string;
  target?: number;
  min_healthy?: number;
  max_healthy?: number;
  warning_ratio_below?: number;
  critical_ratio_below?: number;
  warning_below?: number;
  critical_below?: number;
  warning_above?: number;
  critical_above?: number;
  description: string;
}

export interface KPIRecord {
  id?: string;
  company_id: string;
  name: string;
  value: number;
  target?: number;
  status: 'ok' | 'warning' | 'critical' | 'unknown';
  recorded_at: string;
}

export interface TriggerCondition {
  kpi: string;
  relation: 'ratio_to_target' | 'absolute';
  operator: '<' | '<=' | '>' | '>=' | '==';
  value: number;
}

export interface PlayTrigger {
  all?: TriggerCondition[];
  any?: TriggerCondition[];
}

export interface JobPlanItem {
  type: string;
  handler: string;
  params: Record<string, any>;
}

export interface Play {
  id: string;
  name: string;
  owner_agent: string;
  intent: string;
  triggers: PlayTrigger;
  impact_hypothesis: string;
  job_plan: JobPlanItem[];
}

export interface Agent {
  id: string;
  label: string;
  handles: string[];
  role: string;
  values?: string[];
  style?: string;
}

export interface Job {
  id: string;
  company_id: string;
  type: string;
  payload: Record<string, any>;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  created_at?: string;
}

export interface EvidenceRecord {
  id: string;
  company_id: string;
  job_id?: string;
  event_type: string;
  payload: Record<string, any>;
  occurred_at: string;
}

export interface CycleRequest {
  company_id: string;
  kpi_snapshot: Record<string, number>;
}

export interface CycleResponse {
  cycle_id: string;
  company_id: string;
  jobs_created: number;
  plays_triggered: string[];
  evidence_count: number;
  status: string;
}

export interface LazyLarryProfile {
  user_id: string;
  layers: {
    core_identity?: Record<string, any>;
    skills_knowledge?: Record<string, any>;
    business_context?: Record<string, any>;
    goals_aspirations?: Record<string, any>;
    current_state?: Record<string, any>;
    psychological_operational?: Record<string, any>;
  };
  preferences: Record<string, any>;
}

export interface Opportunity {
  id: string;
  type: 'freelance' | 'remote_job' | 'side_hustle' | 'passive_income';
  title: string;
  description: string;
  estimated_income: { min: number; max: number; unit: string };
  time_commitment: string;
  skills_required: string[];
  platform: string;
  auto_apply_ready: boolean;
  match_score?: number;
}

export interface SocialPost {
  id: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'twitter' | 'linkedin';
  content_type: string;
  content: Record<string, any>;
  scheduled_time: string;
  status?: string;
  performance_metrics?: Record<string, any>;
}

export interface Trend {
  id: string;
  category: string;
  title: string;
  impact_level: 'high' | 'medium' | 'low';
  relevance_score: number;
  actionable_insights: string[];
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'created';
  schedule?: string;
  trigger: Record<string, any>;
  steps: Record<string, any>[];
  time_saved_hours_weekly?: number;
}
