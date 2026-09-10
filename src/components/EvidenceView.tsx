import React from 'react';
import { FileCheck, ShieldCheck } from 'lucide-react';
import { EvidenceRecord } from '../types';

interface EvidenceViewProps {
  evidence: EvidenceRecord[];
}

export const EvidenceView: React.FC<EvidenceViewProps> = ({ evidence }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Audit & Evidence Log</h2>
        <p className="text-xs text-slate-400">
          Immutable records of executed growth plays, hypothesis outcomes, and financial impact verification.
        </p>
      </div>

      {evidence.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-xl text-center space-y-3">
          <FileCheck className="w-8 h-8 text-slate-500 mx-auto" />
          <p className="text-slate-300 font-medium text-sm">No Evidence Records Found</p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Evidence records are automatically created during growth cycle execution.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {evidence.map((ev) => (
            <div key={ev.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                  <span className="font-semibold text-sm text-slate-200">{ev.event_type}</span>
                  <span className="text-[10px] text-slate-500 font-mono">ID: {ev.id.slice(0, 8)}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(ev.occurred_at).toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
                <pre>{JSON.stringify(ev.payload, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
