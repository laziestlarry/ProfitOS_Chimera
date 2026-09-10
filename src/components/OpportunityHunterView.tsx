import React, { useState } from 'react';
import { Compass, Sparkles, DollarSign, CheckCircle2, ArrowRight } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityHunterViewProps {
  companyId: string;
}

export const OpportunityHunterView: React.FC<OpportunityHunterViewProps> = ({ companyId }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  const handleHunt = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/opportunities/hunt/${companyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunity_types: ['freelance', 'remote_job', 'side_hustle', 'passive_income'] })
      });
      const data = await res.json();
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (oppId: string) => {
    try {
      await fetch(`/api/v1/opportunities/auto-apply/${companyId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunity_id: oppId })
      });
      setApplied((prev) => ({ ...prev, [oppId]: true }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Commander Opportunity Hunter</h2>
          <p className="text-xs text-slate-400">
            Automated intelligence scouting income opportunities, freelance gigs, and side hustles.
          </p>
        </div>
        <button
          onClick={handleHunt}
          disabled={loading}
          className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md shadow-violet-600/20"
        >
          <Compass className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Scouting Market...' : 'Hunt Income Opportunities'}</span>
        </button>
      </div>

      {opportunities.length === 0 && !loading && (
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-xl text-center space-y-3">
          <Compass className="w-10 h-10 text-violet-400 mx-auto" />
          <h3 className="font-semibold text-slate-200">No Opportunities Scouted Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the 'Hunt Income Opportunities' button above to scan channels (Fiverr, Upwork, Shopify, Remote Jobs) matching your skills.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {opportunities.map((opp) => {
          const isApplied = applied[opp.id];
          return (
            <div key={opp.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase">
                    {opp.type}
                  </span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">
                    Score: {Math.round((opp.match_score || 0.9) * 100)}%
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-100 text-base">{opp.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{opp.description}</p>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Est. Revenue</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      ${opp.estimated_income.min} - ${opp.estimated_income.max} {opp.estimated_income.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Platform</span>
                    <span className="font-medium text-slate-300">{opp.platform}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">{opp.time_commitment}</span>
                {isApplied ? (
                  <span className="flex items-center space-x-1 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Auto-Applied</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(opp.id)}
                    className="flex items-center space-x-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    <span>Auto-Apply Proposal</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
