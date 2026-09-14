import React from 'react';
import {
  Zap,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Bot,
  PlaySquare,
  Workflow,
  CheckCircle2,
  Users,
  Award,
  Globe,
  Layers,
  BarChart3,
  Rocket
} from 'lucide-react';

interface DropLandingViewProps {
  onEnterApp: () => void;
  onOpenRegister: () => void;
}

export const DropLandingView: React.FC<DropLandingViewProps> = ({ onEnterApp, onOpenRegister }) => {
  return (
    <div className="space-y-12 animate-fade-in pb-12">
      {/* Hero Drop Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-8 md:p-12 rounded-3xl shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-emerald-500/20 text-indigo-300 border border-indigo-500/30 px-4 py-1.5 rounded-full text-xs font-mono font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>SPECIAL DROP ── PROFIT OS CHIMERA V2.0 LIVE RELEASE</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Autonomous Business Growth Engine.<br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-400 bg-clip-text text-transparent">
              Zero Ads. 100% Attributed Revenue.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            Profit OS Chimera orchestrates a multi-agent swarm (`growth_commander`, `commerce_commander`, `evidence_commander`) that continuously analyzes 30-day KPI anomalies and deploys automated growth plays across social, e-commerce, and client acquisition channels.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-3 font-mono group"
            >
              <span>Enter Launch Command Center</span>
              <ArrowRight className="w-4 h-4 text-indigo-200 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 px-6 py-4 rounded-2xl font-semibold text-sm transition-colors flex items-center justify-center space-x-2 font-mono"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Register Individual Operator Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live System Drop Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-mono uppercase">Baseline Yield</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">$3,800 ──► $10,000+</div>
          <p className="text-[11px] text-slate-400">30-Day Automated Scaling Target</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-mono uppercase">Agent Swarm</span>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono">5 Commanders + 8 Bots</div>
          <p className="text-[11px] text-slate-400">Zero-Human Touch Execution</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-mono uppercase">Realization Bus</span>
          <div className="text-2xl font-extrabold text-violet-400 font-mono">7-Gate SOP Pipeline</div>
          <p className="text-[11px] text-slate-400">Gate 0 Telemetry to G6 Settlement</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-1">
          <span className="text-xs text-slate-400 font-mono uppercase">QA Verification</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">100% Cryptographic Logs</div>
          <p className="text-[11px] text-slate-400">Immutable Evidence Ledger</p>
        </div>
      </div>

      {/* Core Drop Feature Matrix */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Why Operators Choose Profit OS</h2>
          <p className="text-xs text-slate-400">
            A comprehensive operating system combining telemetry ingestion, autonomous strategy generation, and execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-indigo-500/40 transition-colors">
            <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400 w-fit">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">Multi-Agent Swarm Orchestrator</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commander agents evaluate revenue anomalies and delegate execution tasks to specialized bots (`copy_bot`, `shopify_bot`, `fiverr_bot`).
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Automated Anomaly Detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Marginal Cost Workflows</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-violet-500/40 transition-colors">
            <div className="bg-violet-500/10 p-3 rounded-xl text-violet-400 w-fit">
              <Workflow className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">7-Stage Realization Bus</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every growth play passes through strict quality gatekeepers (G0 Telemetry, G1 Strategy, G2 Verification, G3 Dispatch, G4 Execution, G5 QA Pass, G6 Revenue Settlement).
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Defect Delivery SOP</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cryptographic Evidence Audit</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-emerald-500/40 transition-colors">
            <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 w-fit">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-100 text-base">Opportunity Hunter & Side Yields</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scans remote job boards, freelance platforms, and digital asset channels to identify high-margin opportunities and prepare auto-proposals.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono pt-2 border-t border-slate-800">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-Match Proposal Engine</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>1-Click Human Execution</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action CTA */}
      <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100">Ready to Activate Your AI Operator Workspace?</h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Register your individual operator profile to get an instant workspace pre-seeded with target KPI snapshots, growth plays, and evidence logs.
        </p>

        <div className="flex justify-center space-x-4 pt-2">
          <button
            onClick={onOpenRegister}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-xs transition-colors shadow-lg shadow-indigo-600/30 font-mono flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span>Create Operator Profile</span>
          </button>
          <button
            onClick={onEnterApp}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-xl font-bold text-xs transition-colors border border-slate-700 font-mono"
          >
            Launch Demo Workspace →
          </button>
        </div>
      </div>
    </div>
  );
};
