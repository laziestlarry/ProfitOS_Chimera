import React, { useState } from 'react';
import { ListTodo, CheckCircle2, Clock, AlertCircle, Filter, RotateCw } from 'lucide-react';
import { Job } from '../types';

interface JobsViewProps {
  jobs: Job[];
}

export const JobsView: React.FC<JobsViewProps> = ({ jobs }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredJobs = jobs.filter((job) => {
    if (statusFilter === 'all') return true;
    return job.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const getStatusBadge = (status: string) => {
    const st = status.toLowerCase();
    if (st === 'completed') {
      return (
        <span className="flex items-center space-x-1.5 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-mono font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>completed</span>
        </span>
      );
    }
    if (st === 'in_progress') {
      return (
        <span className="flex items-center space-x-1.5 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-mono font-medium">
          <RotateCw className="w-3.5 h-3.5 animate-spin" />
          <span>in_progress</span>
        </span>
      );
    }
    if (st === 'failed') {
      return (
        <span className="flex items-center space-x-1.5 text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full font-mono font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>failed</span>
        </span>
      );
    }
    return (
      <span className="flex items-center space-x-1.5 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-mono font-medium">
        <Clock className="w-3.5 h-3.5" />
        <span>{status}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Orchestrator Job Queue</h2>
          <p className="text-xs text-slate-400">
            Individual execution tasks enqueued by triggered growth plays for agents and bots.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl text-xs">
          <Filter className="w-3.5 h-3.5 text-indigo-400 ml-2" />
          <span className="text-slate-400 font-mono text-[11px]">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Statuses ({jobs.length})</option>
            <option value="completed">Completed ({jobs.filter((j) => j.status === 'completed').length})</option>
            <option value="in_progress">In Progress ({jobs.filter((j) => j.status === 'in_progress').length})</option>
            <option value="pending">Pending ({jobs.filter((j) => j.status === 'pending').length})</option>
            <option value="failed">Failed ({jobs.filter((j) => j.status === 'failed').length})</option>
          </select>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-xl text-center space-y-3">
          <ListTodo className="w-8 h-8 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-medium text-sm">
            {jobs.length === 0 ? 'Job Queue is Empty' : `No Jobs with status "${statusFilter}"`}
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            {jobs.length === 0
              ? 'No active or historical jobs found for this company. Trigger a Growth Cycle from the header to evaluate plays and populate the queue.'
              : 'Try selecting a different status filter from the dropdown above.'}
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
          <div className="divide-y divide-slate-800">
            {filteredJobs.map((job) => (
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
                  {getStatusBadge(job.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
