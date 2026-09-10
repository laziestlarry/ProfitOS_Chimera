import React from 'react';
import { PlaySquare, Bot, ArrowRight, Zap } from 'lucide-react';
import { INITIAL_PLAYS, INITIAL_AGENTS } from '../configData';

export const PlaysView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Growth Playbook Library</h2>
        <p className="text-xs text-slate-400">
          Automated playbooks triggered by KPI thresholds to generate job queues and drive revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_PLAYS.map((play) => {
          const ownerAgent = INITIAL_AGENTS.find((a) => a.id === play.owner_agent);

          return (
            <div key={play.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{play.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{play.intent}</p>
                </div>
                <span className="text-[11px] bg-slate-800 text-indigo-300 px-2 py-1 rounded font-mono border border-slate-700 shrink-0">
                  {play.id}
                </span>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-2 text-xs">
                <span className="text-slate-400 font-medium block uppercase text-[10px]">Impact Hypothesis</span>
                <p className="text-emerald-400 font-medium">{play.impact_hypothesis}</p>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-400 font-medium block">Job Plan Execution Tasks</span>
                <div className="space-y-1.5">
                  {play.job_plan.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-950/40 px-2.5 py-1.5 rounded border border-slate-800/60">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono text-indigo-300 font-semibold">{item.type}</span>
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                      <span className="text-slate-400">({item.handler})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Owner: <strong className="text-slate-300">{ownerAgent?.label || play.owner_agent}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
