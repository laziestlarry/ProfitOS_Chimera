import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Sparkles, Lightbulb } from 'lucide-react';
import { Trend } from '../types';

export const IntelligenceView: React.FC = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/intelligence/detect-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: ['ai', 'market'], limit: 5 })
      });
      const data = await res.json();
      setTrends(data.trends || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">AI Business Intelligence Commander</h2>
          <p className="text-xs text-slate-400">
            Market trends, partnership synergies, and funding opportunity scouting.
          </p>
        </div>
        <button
          onClick={fetchTrends}
          disabled={loading}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Refresh Intelligence</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trends.map((t) => (
          <div key={t.id} className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase">
                {t.category}
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold uppercase">
                Impact: {t.impact_level}
              </span>
            </div>

            <h3 className="font-bold text-slate-100 text-base">{t.title}</h3>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs text-slate-400 font-semibold uppercase text-[10px]">Actionable Insights</span>
              {t.actionable_insights.map((insight, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
