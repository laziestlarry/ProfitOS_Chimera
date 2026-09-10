import React from 'react';
import { ListTodo, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Job } from '../types';

interface JobsViewProps {
  jobs: Job[];
}

export const JobsView: React.FC<JobsViewProps> = ({ jobs }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Orchestrator Job Queue</h2>
        <p className="text-xs text-slate-400">
          Individual execution tasks enqueued by triggered growth plays for agents and bots.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-xl text-center space-y-3">
          <ListTodo className="w-8 h-8 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-medium text-sm">Job Queue is Empty</p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No active or historical jobs found for this company. Trigger a Growth Cycle from the header to evaluate plays and populate the queue.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-slate-800">
            {jobs.map((job) => (
              <div key={job.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm text-slate-200">
                      {job.payload?.play_name || job.type}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Handler Bot: <strong className="text-indigo-300">{job.payload?.handler || 'system'}</strong>
                  </p>
                  {job.payload?.params && (
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800 mt-2 max-w-xl">
                      {JSON.stringify(job.payload.params)}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-xs text-slate-500 font-mono">
                    {job.created_at ? new Date(job.created_at).toLocaleTimeString() : 'Just now'}
                  </span>
                  <span className="flex items-center space-x-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-mono font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{job.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
