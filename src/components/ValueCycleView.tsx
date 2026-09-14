import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  BarChart2,
  Cpu,
  Globe2,
  DollarSign,
  Workflow,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  Bot
} from 'lucide-react';

export const ValueCycleView: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);

  const stages = [
    {
      id: 0,
      gate: 'Gate 0: Ecosystem Ingestion & Signal Mapping',
      department: 'Data & Infrastructure Operations',
      handlers: ['infra_commander_ai', 'metrics_collector_bot'],
      description: 'Ingests real-time telemetric, transactional, and market signals across Shopify, Fiverr, Stripe, and social APIs into normalized KPI vectors.',
      sops: ['SOP-01: Multi-Channel Signal Normalization', 'SOP-02: Telemetry Noise Filtering', 'SOP-03: Real-time Ingestion Audit'],
      kpiOutput: 'revenue_total_30d, cr_main_funnel, cac_paid',
      status: 'Verified Operational'
    },
    {
      id: 1,
      gate: 'Gate 1: Multi-Dimensional Intelligence (BI / MI / SI)',
      department: 'AI Intelligence & Market Scout Command',
      handlers: ['intelligence_commander_ai', 'trend_scout_bot'],
      description: 'Processes signals through Business Intelligence (BI), Market Intelligence (MI), and Social Intelligence (SI) layers to isolate margin anomalies and arbitrage opportunities.',
      sops: ['SOP-04: Multi-Layer Opportunity Scoring', 'SOP-05: Competitor Pricing & Arbitrage Scan', 'SOP-06: Trend Velocity Vector Analysis'],
      kpiOutput: 'opportunity_score, margin_yield_delta',
      status: 'Active Analytics'
    },
    {
      id: 2,
      gate: 'Gate 2: Growth Playbook Matching & Hypothesis Evaluation',
      department: 'Strategic Portfolio & Commerce Command',
      handlers: ['commerce_commander_ai', 'product_commander_ai'],
      description: 'Evaluates KPI anomalies against the Playbook library (PLAY_COMMERCE_01, PLAY_GROWTH_01, PLAY_AGENCY_01) to formulate high-ROI growth hypotheses.',
      sops: ['SOP-07: Impact-Effort Matrix Evaluation', 'SOP-08: Revenue Hypothesis Verification', 'SOP-09: Risk & Cannibalization Assessment'],
      kpiOutput: 'triggered_play_ids, target_yield_multiplier',
      status: 'Trigger Engine Ready'
    },
    {
      id: 3,
      gate: 'Gate 3: Autonomous Agency Process Bus Delegation',
      department: 'Orchestration & Process Delegation',
      handlers: ['orchestrator_agent', 'growth_commander_ai'],
      description: 'Dispatches typed, prioritized execution jobs onto the system process bus, mapping each job step to specialized execution bots.',
      sops: ['SOP-10: Process Bus Queue Prioritization', 'SOP-11: Agent Role & Scope Binding', 'SOP-12: Distributed Queue Load Balancing'],
      kpiOutput: 'enqueued_jobs_count, payload_specs',
      status: 'Bus Active'
    },
    {
      id: 4,
      gate: 'Gate 4: Stage Realization & Execution SOPs Fulfillment',
      department: 'Production Execution Teams',
      handlers: ['copy_bot', 'shopify_bot', 'fiverr_bot', 'social_bot'],
      description: 'Executes programmatic SOP actions: auto-generating offer bundles, optimizing Fiverr gig copy, publishing zero-ad social packs, and configuring storefront upsells.',
      sops: ['SOP-13: Conversion Copywriting Standards', 'SOP-14: Storefront Offer Deployment', 'SOP-15: Zero-Ad Social Script Rendering'],
      kpiOutput: 'executed_artifacts, live_deployments',
      status: 'Automated Realization'
    },
    {
      id: 5,
      gate: 'Gate 5: Quality Assurance & Service Lifecycle Fulfillment',
      department: 'QA & Customer Lifecycle Operations',
      handlers: ['qa_gatekeeper_bot', 'support_bot'],
      description: 'Conducts end-to-end delivery verification, compliance checks, customer satisfaction tracking, and automated onboarding lifecycle touchpoints.',
      sops: ['SOP-16: End-to-End Artifact Inspection', 'SOP-17: Customer Experience Verification', 'SOP-18: NPS & Churn Prevention Monitoring'],
      kpiOutput: 'qa_pass_score, nps_rating, retention_60d',
      status: '100% QA Standard'
    },
    {
      id: 6,
      gate: 'Gate 6: Commercial Settlement & Immutable Evidence Logging',
      department: 'Finance & Audit Governance',
      handlers: ['evidence_commander_ai', 'finance_bot'],
      description: 'Logs immutable EvidenceRecords tying action artifacts directly to metric deltas, ROI calculation, and commercial revenue settlement.',
      sops: ['SOP-19: Financial Return Attribution', 'SOP-20: Immutable Audit Log Commit', 'SOP-21: Valuation Multiplier Recalculation'],
      kpiOutput: 'financial_return_attributed, evidence_hash',
      status: 'Audit Verified'
    }
  ];

  const runFullPipelineSimulation = async () => {
    setSimulationRunning(true);
    setSimulationLogs([]);

    const logStep = (msg: string) => {
      setSimulationLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    for (let i = 0; i < stages.length; i++) {
      setActiveStage(i);
      logStep(`ENTERING ${stages[i].gate}`);
      logStep(`→ Department: ${stages[i].department}`);
      logStep(`→ Executing Handlers: ${stages[i].handlers.join(', ')}`);
      logStep(`→ Validating SOPs: ${stages[i].sops.join(' | ')}`);
      logStep(`✓ ${stages[i].gate} PASSED. Output: ${stages[i].kpiOutput}`);
      await new Promise((r) => setTimeout(r, 600));
    }

    logStep('🎉 PIPELINE COMPLETION SUCCESSFUL: Live value created and commercial revenue attributed!');
    setSimulationRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-indigo-500/20 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-1 z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-mono">
              Enterprise Value Cycle & Stage-Gate Bus
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Supply-to-Demand Value Creation Architecture
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Complete mapping of stage realization gates, process bus hand-offs, SOP fulfillment, AI-Core capabilities, and commercial revenue attribution.
          </p>
        </div>

        <button
          onClick={runFullPipelineSimulation}
          disabled={simulationRunning}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 z-10 disabled:opacity-50"
        >
          <Zap className={`w-4 h-4 text-amber-300 ${simulationRunning ? 'animate-spin' : ''}`} />
          <span>{simulationRunning ? 'Simulating Stage Gates...' : 'Simulate End-to-End Value Cycle'}</span>
        </button>
      </div>

      {/* AI Intelligence Capability Stack Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase font-mono">AI-Core Engine</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-sm font-semibold text-slate-200">5 Commander Agents + 8 Bots</p>
          <p className="text-xs text-slate-400">Autonomous role-based execution with Gemini AI core synthesis.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-violet-400 uppercase font-mono">BI / MI / SI Stack</span>
            <BarChart2 className="w-4 h-4 text-violet-400" />
          </div>
          <p className="text-sm font-semibold text-slate-200">Continuous Market Intelligence</p>
          <p className="text-xs text-slate-400">Real-time signal tracking, competitor pricing & social sentiment.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono">SOP Gates</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-sm font-semibold text-slate-200">21 Enforced SOP Gates</p>
          <p className="text-xs text-slate-400">Deterministic quality verification prior to live commercial deployment.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase font-mono">Financial Return</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-sm font-semibold text-slate-200">100% Attributed Evidence</p>
          <p className="text-xs text-slate-400">Direct linkage from executed play to revenue delta and valuation boost.</p>
        </div>
      </div>

      {/* Stage Gates Visualization Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
          <Workflow className="w-4 h-4 text-indigo-400" />
          <span>Stage Realization Gates & Process Bus Levels</span>
        </h3>

        <div className="space-y-3">
          {stages.map((st) => {
            const isActive = activeStage === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setActiveStage(st.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold font-mono text-sm shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      G{st.id}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-100 text-base">{st.gate}</h4>
                      <p className="text-xs text-indigo-300 font-medium">Department: {st.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-mono">
                      {st.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Delegated Handlers</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {st.handlers.map((h, idx) => (
                        <span key={idx} className="bg-slate-950 text-indigo-300 px-2 py-0.5 rounded border border-slate-800 font-mono text-[11px]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Fulfillable SOPs</span>
                    <div className="space-y-0.5 mt-1 text-slate-400">
                      {st.sops.map((sop, idx) => (
                        <p key={idx} className="text-[11px] truncate">• {sop}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px] font-mono uppercase">Gate Output Artifact</span>
                    <p className="font-mono text-emerald-400 mt-1 font-semibold text-[11px]">{st.kpiOutput}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Simulation Output Terminal */}
      {simulationLogs.length > 0 && (
        <div className="bg-slate-950 border border-indigo-500/30 p-5 rounded-2xl space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-indigo-400 font-bold flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Live Process Bus Simulation Terminal</span>
            </span>
            <span className="text-slate-500 text-[10px]">{simulationLogs.length} events logged</span>
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto text-slate-300">
            {simulationLogs.map((log, idx) => (
              <p key={idx} className={log.includes('✓') || log.includes('🎉') ? 'text-emerald-400 font-semibold' : ''}>
                {log}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
