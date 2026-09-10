import React, { useState } from 'react';
import { Workflow, CheckCircle2, Clock, Play } from 'lucide-react';
import { AutomationWorkflow } from '../types';

export const AutomationWorkflowsView: React.FC = () => {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/automation/audit-processes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ processes: [{ name: 'KPI sync' }, { name: 'Social posting' }] })
      });
      const data = await res.json();
      setOpportunities(data.opportunities || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Workflow Automation Engine</h2>
          <p className="text-xs text-slate-400">
            Audit manual processes and deploy recurring automated workflows to minimize human effort.
          </p>
        </div>
        <button
          onClick={handleAudit}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          {loading ? 'Auditing Processes...' : 'Audit & Automate Manual Tasks'}
        </button>
      </div>

      {opportunities.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Identified Automation Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {opportunities.map((item, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
                <span className="text-xs bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded font-mono">
                  {item.automation_type}
                </span>
                <h4 className="font-bold text-slate-200 text-sm">{item.process}</h4>
                <p className="text-xs text-emerald-400 font-medium">Est. Time Saved: {item.potential_savings}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
