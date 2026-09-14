import React, { useState } from 'react';
import {
  Workflow,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  Building2,
  TrendingUp,
  Award,
  ChevronRight,
  PlaySquare,
  FileCheck,
  Bot,
  BarChart3,
  Rocket
} from 'lucide-react';
import { Company, KPIRecord } from '../types';

interface GrowthRoadmapViewProps {
  company: Company;
  kpis: KPIRecord[];
  onNavigate: (tab: any) => void;
  onRunCycle: () => void;
}

export const GrowthRoadmapView: React.FC<GrowthRoadmapViewProps> = ({
  company,
  kpis,
  onNavigate,
  onRunCycle
}) => {
  const [selectedStage, setSelectedStage] = useState<number>(2);

  const stages = [
    {
      id: 0,
      title: 'Stage 0: Telemetry & Baseline Ingestion',
      gate: 'G0 Telemetry Gate',
      governing_body: 'AutonomaX Strategic Board',
      status: 'completed',
      completion_percentage: 100,
      description: 'Ingest 30-day KPI baselines ($3,800 total revenue, conversion rate 3.5%) and verify telemetry schema.',
      key_deliverables: [
        'Baseline KPI snapshot validation',
        'Database connection health check',
        'Cryptographic telemetry hash logging'
      ]
    },
    {
      id: 1,
      title: 'Stage 1: Anomaly Detection & Strategy Hypothesis',
      gate: 'G1 Strategy Gate',
      governing_body: 'AutonomaX Strategic Board',
      status: 'completed',
      completion_percentage: 100,
      description: 'Commander agents identify revenue drop triggers and synthesize zero-ad growth hypotheses.',
      key_deliverables: [
        'Anomalous conversion ratio flagging',
        'Growth play selection (social_video_short_pack & ecommerce_bundle_boost)',
        'Impact hypothesis verification'
      ]
    },
    {
      id: 2,
      title: 'Stage 2: AI Swarm Dispatch & Play Execution',
      gate: 'G2-G4 Execution Gate',
      governing_body: 'ProPulse Fulfillment Council',
      status: 'in_progress',
      completion_percentage: 75,
      description: 'Dispatch specialized bots (copy_bot, shopify_bot, fiverr_bot) to execute automated tasks.',
      key_deliverables: [
        'Automated script & storyboard generation',
        'Shopify order bundle dynamic price update',
        'Remote opportunity Hunter proposal submissions'
      ]
    },
    {
      id: 3,
      title: 'Stage 3: Customer Monetization & Cash Flow Realization',
      gate: 'G5 QA Pass Gate',
      governing_body: 'ProPulse Fulfillment Council',
      status: 'in_progress',
      completion_percentage: 50,
      description: 'Track attributed revenue conversion and verify order payment settlements in real-time.',
      key_deliverables: [
        'Attributed revenue attribution tracking',
        'Customer proposal acceptance alerts',
        'Dynamic upsell order conversions'
      ]
    },
    {
      id: 4,
      title: 'Stage 4: Settlement & Cryptographic Evidence Ledger',
      gate: 'G6 Revenue Settlement',
      governing_body: 'Joint AutonomaX & ProPulse Board',
      status: 'upcoming',
      completion_percentage: 20,
      description: 'Generate immutable EvidenceRecords and log financial ROI attribution in the permanent ledger.',
      key_deliverables: [
        'Immutable EvidenceRecord hash generation',
        'Commercial revenue attribution report',
        '30-Day scaling roadmap refresh'
      ]
    }
  ];

  const overallProgress = Math.round(
    stages.reduce((acc, stage) => acc + stage.completion_percentage, 0) / stages.length
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3.5 py-1 rounded-full text-xs font-mono font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>ACTIVE GOVERNING BOARD ── {company?.name || 'AUTONOMAX BOARD'}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Strategic Growth & Commercialization Roadmap
          </h1>
          <p className="text-xs md:text-sm text-slate-300">
            Guiding AutonomaX Strategic Board and ProPulse Fulfillment Council through the 5-stage commercialization lifecycle.
          </p>
        </div>

        <div className="z-10 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center min-w-[200px] space-y-2">
          <span className="text-[10px] text-slate-400 font-mono uppercase">Overall Roadmap Progress</span>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{overallProgress}%</div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Visual Lifecycle Progress Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6">
        <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <span>5-Stage Commercialization Gates</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {stages.map((stage) => {
            const isSelected = selectedStage === stage.id;
            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-slate-950 border-indigo-500 ring-2 ring-indigo-500/40'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-indigo-400 font-bold">{stage.gate}</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase ${
                      stage.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : stage.status === 'in_progress'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {stage.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="font-bold text-slate-200 text-xs line-clamp-2">{stage.title}</div>

                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{stage.completion_percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        stage.status === 'completed' ? 'bg-emerald-400' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${stage.completion_percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Focus */}
      {stages.find((s) => s.id === selectedStage) && (
        <div className="bg-slate-900 border border-indigo-500/30 p-6 md:p-8 rounded-3xl space-y-6 shadow-xl">
          {(() => {
            const activeStageObj = stages.find((s) => s.id === selectedStage)!;
            return (
              <>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs text-indigo-400 font-mono font-bold uppercase">{activeStageObj.gate}</span>
                    <h3 className="text-xl font-bold text-slate-100">{activeStageObj.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{activeStageObj.description}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                    <span className="text-slate-500 text-[10px] block">Governing Council</span>
                    <span className="text-amber-300 font-bold">{activeStageObj.governing_body}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-200 text-xs font-mono uppercase">Key Milestone Deliverables:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeStageObj.key_deliverables.map((del, i) => (
                      <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button
                    onClick={() => onNavigate('plays')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center space-x-1"
                  >
                    <span>View Assigned Growth Plays →</span>
                  </button>

                  <button
                    onClick={onRunCycle}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl font-mono font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Advance Stage Gate Execution</span>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
