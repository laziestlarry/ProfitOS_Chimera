import React from 'react';
import { BarChart3, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { KPIRecord } from '../types';
import { INITIAL_KPIS } from '../configData';

interface KPIsViewProps {
  kpis: KPIRecord[];
}

export const KPIsView: React.FC<KPIsViewProps> = ({ kpis }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Key Performance Indicators Catalog</h2>
          <p className="text-xs text-slate-400">
            Real-time metric definitions, targets, warning thresholds, and current snapshot values.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INITIAL_KPIS.map((def) => {
          const rec = kpis.find((k) => k.name === def.name);
          const currentVal = rec ? rec.value : (def.target ? def.target * 0.8 : 0);
          const isHealthy = def.target ? currentVal >= def.target * 0.8 : true;

          return (
            <div key={def.name} className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {def.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">{def.dimension}</span>
              </div>

              <div>
                <h3 className="font-semibold text-slate-200 text-sm">{def.label}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{def.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-end justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Current Value</span>
                  <span className="text-xl font-bold font-mono text-slate-100">
                    {def.unit === 'USD' ? `$${currentVal.toLocaleString()}` : currentVal}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Target</span>
                  <span className="text-xs font-semibold text-slate-300 font-mono">
                    {def.target ? (def.unit === 'USD' ? `$${def.target}` : def.target) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
