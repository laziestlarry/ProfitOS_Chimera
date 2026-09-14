import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Building2,
  Mail,
  Award,
  Key,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Zap,
  Plus,
  RefreshCw,
  LogOut,
  Sparkles,
  Layers,
  ListTodo
} from 'lucide-react';
import { UserProfile, Company, KPIRecord, Job } from '../types';

interface UserDashboardViewProps {
  user: UserProfile | null;
  company: Company | undefined;
  kpis: KPIRecord[];
  jobs: Job[];
  onOpenRegister: () => void;
  onRunCycle: () => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  user,
  company,
  kpis,
  jobs,
  onOpenRegister,
  onRunCycle
}) => {
  const revenueKpi = kpis.find((k) => k.name === 'revenue_total_30d');
  const pendingJobs = jobs.filter((j) => j.status === 'pending' || j.status === 'in_progress');
  const completedJobs = jobs.filter((j) => j.status === 'completed');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Individual Operator Profile Badge */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name || 'Operator'}
              className="w-16 h-16 rounded-2xl border-2 border-indigo-500 object-cover bg-slate-950"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-slate-100">{user?.name || 'Kagan Dolek'}</h2>
                <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold">
                  {user?.role || 'Founder'}
                </span>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold">
                  {user?.license_tier || 'Pro'} License
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center space-x-2 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{user?.email || 'kagan@autonomax.io'}</span>
                <span>•</span>
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{company?.name || user?.company_name || 'AutonomaX Growth Corp'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenRegister}
              className="bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Switch / Register Profile</span>
            </button>
            <button
              onClick={onRunCycle}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center space-x-1.5"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Run Growth Cycle</span>
            </button>
          </div>
        </div>

        {/* Personalized Operator Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">30-Day Revenue</span>
            <div className="text-xl font-bold text-emerald-400">
              ${revenueKpi ? revenueKpi.value.toLocaleString() : '3,800'} USD
            </div>
            <span className="text-[10px] text-slate-400">Target: ${revenueKpi?.target || 5000}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">Active Workspace ID</span>
            <div className="text-sm font-bold text-indigo-300 truncate">{company?.id || user?.workspace_id}</div>
            <span className="text-[10px] text-slate-400">Industry: {company?.industry || 'AI Growth'}</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">Pending Jobs</span>
            <div className="text-xl font-bold text-amber-400">{pendingJobs.length} Tasks</div>
            <span className="text-[10px] text-slate-400">{completedJobs.length} Completed Total</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-500 text-[10px] uppercase">SOP Compliance</span>
            <div className="text-xl font-bold text-violet-400">100% Pass</div>
            <span className="text-[10px] text-slate-400">Gate 0–G6 Realization</span>
          </div>
        </div>
      </div>

      {/* Operator Specific Quick Actions & Tailored Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workspace Tailored Recommendations */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Tailored Operator Action Recommendations</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-indigo-300 font-mono">1. Deploy Zero-Ad Organic Video Play</span>
              <p className="text-slate-400 text-[11px]">
                Your conversion rate is holding strong at {(kpis.find(k => k.name === 'cr_main_funnel')?.value || 0.035) * 100}%. Triggering a social video short pack will multiply top-of-funnel traffic.
              </p>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-emerald-400 font-mono">2. Activate Shopify Pricing Bundle</span>
              <p className="text-slate-400 text-[11px]">
                Increase average order value from $28 to $45 by running the `ecommerce_bundle_boost` play.
              </p>
            </div>
          </div>
        </div>

        {/* Assigned Workspace KPIs */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Assigned Workspace KPI Snapshot</span>
          </h3>

          <div className="space-y-2 text-xs">
            {kpis.slice(0, 3).map((k) => (
              <div key={k.name} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-200 block">{k.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Recorded: {new Date(k.recorded_at).toLocaleTimeString()}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-slate-100 text-sm block">
                    {typeof k.value === 'number' && k.value < 1 ? (k.value * 100).toFixed(1) + '%' : k.value}
                  </span>
                  <span className={`text-[10px] uppercase font-bold ${k.status === 'ok' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {k.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
