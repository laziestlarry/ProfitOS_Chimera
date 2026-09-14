import React from 'react';
import { BookOpen, ShieldCheck, Zap, Bot, Layers, CheckCircle2, ArrowRight, FileCheck } from 'lucide-react';

export const OperatingManualView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-2xl border border-indigo-500/30 space-y-2 relative overflow-hidden">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full font-mono border border-indigo-500/30">
            Internal Operating System Manual v0.1.0
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white">Profit OS Chimera Operating Manual</h2>
        <p className="text-sm text-slate-300">
          Standard Operating Procedures (SOPs), Agent Delegation Bus, Job Lifecycle, and Evidence Verification Protocol for internal operators and AI agents.
        </p>
      </div>

      {/* Manual Sections */}
      <div className="space-y-6">
        {/* Section 1: Architecture & Data Layer */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-3 text-indigo-400">
            <Layers className="w-5 h-5" />
            <h3 className="font-bold text-lg text-slate-100">1. System Architecture & Data Layer</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Profit OS Chimera functions as a closed-loop growth operating system that normalizes telemetry from multiple commerce channels (Shopify, Fiverr, Stripe, Google Analytics) into unified 30-day KPI snapshot vectors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">Data Ingestion</span>
              <p className="text-slate-400 text-[11px]">Pulling & normalizing revenue, conversion, CAC, and impression telemetry.</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-violet-400 font-bold block mb-1">Intelligence Layer</span>
              <p className="text-slate-400 text-[11px]">Evaluating KPI thresholds against Playbook triggers (`plays.yml`).</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">Evidence Audit Log</span>
              <p className="text-slate-400 text-[11px]">Binding completed jobs to immutable `EvidenceRecords` for financial attribution.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Roles & Commander Swarm */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-3 text-violet-400">
            <Bot className="w-5 h-5" />
            <h3 className="font-bold text-lg text-slate-100">2. Commander Agents & Execution Swarm</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300">Commerce Commander (`commerce_commander_ai`)</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20">Strategy</span>
              </div>
              <p className="text-slate-400">Owns pricing tests, storefront bundling, upsell offers, and revenue optimization.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-violet-300">Growth Commander (`growth_commander_ai`)</span>
                <span className="text-[10px] bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded border border-violet-500/20">Acquisition</span>
              </div>
              <p className="text-slate-400">Owns zero-ad traffic campaigns, viral content scripts, and social distribution packs.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300">Evidence Commander (`evidence_commander_ai`)</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Audit</span>
              </div>
              <p className="text-slate-400">Owns KPI evaluations, ROI verification, and evidence ledger recording.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300">Execution Bots Swarm</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">Workers</span>
              </div>
              <p className="text-slate-400">`copy_bot`, `shopify_bot`, `fiverr_bot`, `social_bot` carrying out programmatic SOPs.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Job Realization Lifecycle */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-3 text-emerald-400">
            <Zap className="w-5 h-5" />
            <h3 className="font-bold text-lg text-slate-100">3. Operational Job Lifecycle</h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-start space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="bg-indigo-600 text-white font-mono px-2 py-0.5 rounded font-bold shrink-0">Step 1</span>
              <div>
                <span className="font-bold text-slate-200 block">Metric Ingestion & KPI Evaluation</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Current 30-day KPIs are recorded and compared against target boundaries.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="bg-indigo-600 text-white font-mono px-2 py-0.5 rounded font-bold shrink-0">Step 2</span>
              <div>
                <span className="font-bold text-slate-200 block">Growth Play Triggering</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Any condition match evaluates the impact hypothesis and dispatches jobs onto the process bus.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="bg-indigo-600 text-white font-mono px-2 py-0.5 rounded font-bold shrink-0">Step 3</span>
              <div>
                <span className="font-bold text-slate-200 block">SOP Fulfillment & Delivery</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Bots generate live storefront changes, copyable proposals, or social content scripts.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="bg-indigo-600 text-white font-mono px-2 py-0.5 rounded font-bold shrink-0">Step 4</span>
              <div>
                <span className="font-bold text-slate-200 block">Evidence Logging & Financial Attribution</span>
                <p className="text-slate-400 text-[11px] mt-0.5">A permanent record is generated, updating company total revenue and valuation multipliers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
