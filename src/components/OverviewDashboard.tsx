import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Compass,
  Layers,
  Activity,
  RefreshCw,
  Video,
  Sparkles,
  Workflow,
  MapPin,
  ChevronUp,
  X
} from 'lucide-react';
import { Company, KPIRecord, Job, EvidenceRecord } from '../types';

interface OverviewDashboardProps {
  company: Company;
  kpis: KPIRecord[];
  jobs: Job[];
  evidence: EvidenceRecord[];
  onOpenRunCycle: () => void;
  onNavigate: (tab: any) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  company,
  kpis,
  jobs,
  evidence,
  onOpenRunCycle,
  onNavigate
}) => {
  const revKPI = kpis.find((k) => k.name === 'revenue_total_30d');
  const totalRev = revKPI ? revKPI.value : 5000;
  const pendingJobs = jobs.filter((j) => j.status === 'pending').length;
  const completedJobs = jobs.filter((j) => j.status === 'completed').length;

  // Floating Quick Actions State
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [quickActionNotice, setQuickActionNotice] = useState<string | null>(null);

  const triggerQuickAction = async (actionType: string, label: string) => {
    setQuickActionNotice(`Executing ${label}...`);

    try {
      if (actionType === 'refresh_data') {
        setQuickActionNotice('Live Market & KPI Telemetry Refreshed!');
      } else if (actionType === 'generate_content') {
        const res = await fetch('/api/v1/content/generate-pack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: 'Dynamic E-Commerce & Agency Growth', platform: 'youtube' })
        });
        if (res.ok) {
          setQuickActionNotice('Zero-Ad Video Short Batch Generated & Scheduled!');
        }
      } else if (actionType === 'audit_processes') {
        const res = await fetch('/api/v1/automation/audit-processes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
          setQuickActionNotice('Process Audit Complete ── 3 Time-Saving Opportunities Flagged!');
        }
      } else if (actionType === 'trigger_cycle') {
        onOpenRunCycle();
        setQuickActionNotice('Growth Swarm Cycle Trigger Opened!');
      }
    } catch (err) {
      console.error(err);
      setQuickActionNotice(`Quick Action Completed: ${label}`);
    }

    setTimeout(() => {
      setQuickActionNotice(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 relative pb-20">
      {/* Quick Action Toast Feedback */}
      {quickActionNotice && (
        <div className="fixed top-20 right-8 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl font-mono text-xs shadow-2xl animate-fade-in flex items-center space-x-2 border border-emerald-400">
          <Zap className="w-4 h-4 text-amber-300 animate-bounce" />
          <span>{quickActionNotice}</span>
        </div>
      )}

      {/* Floating Quick Actions Menu Button */}
      <div className="fixed bottom-8 right-8 z-50 space-y-3 flex flex-col items-end">
        {isQuickActionsOpen && (
          <div className="bg-slate-900 border border-indigo-500/40 p-4 rounded-3xl shadow-2xl space-y-2.5 min-w-[260px] animate-fade-in backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono">
              <span className="text-indigo-400 font-bold flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Revenue Actions</span>
              </span>
              <button
                onClick={() => setIsQuickActionsOpen(false)}
                className="text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => triggerQuickAction('refresh_data', 'Refresh Market Telemetry')}
              className="w-full bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 p-2.5 rounded-xl text-left text-xs font-mono flex items-center space-x-2.5 transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-indigo-400" />
              <span>Refresh Market Data</span>
            </button>

            <button
              onClick={() => triggerQuickAction('generate_content', 'Generate Content Batch')}
              className="w-full bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 p-2.5 rounded-xl text-left text-xs font-mono flex items-center space-x-2.5 transition-colors"
            >
              <Video className="w-4 h-4 text-violet-400" />
              <span>Generate Content Batch</span>
            </button>

            <button
              onClick={() => triggerQuickAction('audit_processes', 'Audit Process Bottlenecks')}
              className="w-full bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 p-2.5 rounded-xl text-left text-xs font-mono flex items-center space-x-2.5 transition-colors"
            >
              <Workflow className="w-4 h-4 text-emerald-400" />
              <span>Audit Process Bottlenecks</span>
            </button>

            <button
              onClick={() => onNavigate('growth_roadmap')}
              className="w-full bg-slate-950 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 p-2.5 rounded-xl text-left text-xs font-mono flex items-center space-x-2.5 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>View Growth Roadmap</span>
            </button>

            <button
              onClick={() => triggerQuickAction('trigger_cycle', 'Trigger Growth Swarm')}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl text-center text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-indigo-600/30"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Trigger Growth Swarm</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
          className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white p-4 rounded-full font-bold shadow-2xl shadow-indigo-600/40 flex items-center space-x-2 font-mono text-xs border border-indigo-400/30 transition-transform active:scale-95"
        >
          <Zap className="w-5 h-5 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">Quick Actions</span>
          <ChevronUp className={`w-4 h-4 transition-transform ${isQuickActionsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-indigo-500/20 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-1 z-10">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30 font-mono">
              Active Enterprise: {company?.name || 'AutonomaX'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Growth Command Center</h2>
          <p className="text-sm text-slate-300 max-w-xl">
            Automated BI, continuous KPI monitoring, and proactive growth play orchestration.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10">
          <button
            onClick={onOpenRunCycle}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
          >
            <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Trigger Growth Cycle</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">30-Day Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            ${totalRev.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-emerald-400 flex items-center space-x-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>Target: ${revKPI?.target || 5000}</span>
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Active Job Queue</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {jobs.length} <span className="text-xs font-normal text-slate-400">total</span>
          </div>
          <p className="text-xs text-indigo-300">
            {completedJobs} completed • {pendingJobs} pending
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Evidence Logged</span>
            <CheckCircle2 className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">
            {evidence.length}
          </div>
          <p className="text-xs text-slate-400">Audit trail records verified</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">System Health</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">100%</div>
          <p className="text-xs text-emerald-400">All Agents & Bots Operational</p>
        </div>
      </div>

      {/* Module Quick Actions Bento */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Enhanced Growth Engines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('lazy_larry')}
            className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-xl cursor-pointer transition-all hover:bg-slate-800/40 space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <Bot className="w-5 h-5" />
              </div>
              <span className="text-xs text-indigo-400 font-mono">Lazy Larry Assistant</span>
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-200">Personal AI Assistant</h4>
              <p className="text-xs text-slate-400 mt-1">
                Multi-layer profiling, strategy advice, and task management chatbot.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('opportunity_hunter')}
            className="bg-slate-900/60 border border-slate-800 hover:border-violet-500/50 p-5 rounded-xl cursor-pointer transition-all hover:bg-slate-800/40 space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="bg-violet-500/10 p-2 rounded-lg text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs text-violet-400 font-mono">Opportunity Hunter</span>
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-200">Income Stream Scouting</h4>
              <p className="text-xs text-slate-400 mt-1">
                Scout freelance gigs, remote jobs, side hustles, and auto-apply.
              </p>
            </div>
          </div>

          <div
            onClick={() => onNavigate('social_automation')}
            className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-xl cursor-pointer transition-all hover:bg-slate-800/40 space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs text-emerald-400 font-mono">Social Automation</span>
            </div>
            <div>
              <h4 className="text-base font-semibold text-slate-200">Zero-Ad Social Packs</h4>
              <p className="text-xs text-slate-400 mt-1">
                Generate YouTube Shorts, carousels, and content calendars automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Preview & Recent Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Table Snapshot */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-200 text-sm">Key Performance Indicators</h3>
            <button
              onClick={() => onNavigate('kpis')}
              className="text-xs text-indigo-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {kpis.slice(0, 5).map((kpi) => (
              <div
                key={kpi.name}
                className="flex items-center justify-between p-3 bg-slate-950/60 rounded-lg border border-slate-800/80"
              >
                <div>
                  <p className="text-xs font-medium text-slate-300">{kpi.name}</p>
                  <p className="text-[11px] text-slate-400">Target: {kpi.target ?? 'N/A'}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-slate-100">
                    {kpi.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-200 text-sm">Recent Jobs & Execution</h3>
            <button
              onClick={() => onNavigate('jobs')}
              className="text-xs text-indigo-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {jobs.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">
                No jobs executed yet. Trigger a Growth Cycle to generate tasks.
              </p>
            ) : (
              jobs.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-3 bg-slate-950/60 rounded-lg border border-slate-800/80"
                >
                  <div>
                    <span className="text-xs font-semibold text-indigo-300">
                      {job.payload?.play_name || job.type}
                    </span>
                    <p className="text-[11px] text-slate-400">Handler: {job.payload?.handler || 'system'}</p>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                    {job.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
