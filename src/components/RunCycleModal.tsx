import React, { useState } from 'react';
import { X, Zap, CheckCircle2 } from 'lucide-react';
import { KPIRecord } from '../types';

interface RunCycleModalProps {
  companyId: string;
  isOpen: boolean;
  onClose: () => void;
  onRunCycleComplete: (result: any) => void;
}

export const RunCycleModal: React.FC<RunCycleModalProps> = ({
  companyId,
  isOpen,
  onClose,
  onRunCycleComplete
}) => {
  const [revenue, setRevenue] = useState(3800);
  const [conversion, setConversion] = useState(0.035);
  const [sessions, setSessions] = useState(620);
  const [cac, setCac] = useState(38);
  const [retention, setRetention] = useState(0.28);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const snapshot = {
      revenue_total_30d: revenue,
      cr_main_funnel: conversion,
      sessions_main_30d: sessions,
      cac_paid: cac,
      retention_60d: retention,
      fiverr_impressions_7d: 150,
      fiverr_orders_30d: 2,
      shopify_sessions_30d: 400,
      shopify_orders_30d: 3
    };

    try {
      const res = await fetch('/api/v1/cycles/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_id: companyId, kpi_snapshot: snapshot })
      });
      const data = await res.json();
      onRunCycleComplete(data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600/20 p-2.5 rounded-xl border border-indigo-500/30 text-indigo-400">
            <Zap className="w-6 h-6 fill-amber-300 text-amber-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Run Growth Cycle</h3>
            <p className="text-xs text-slate-400">
              Input current metric snapshot to trigger automated growth plays and enqueued jobs.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">30-Day Revenue ($)</label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Conversion Rate (0.05 = 5%)</label>
              <input
                type="number"
                step="0.001"
                value={conversion}
                onChange={(e) => setConversion(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Main Funnel Sessions (30d)</label>
              <input
                type="number"
                value={sessions}
                onChange={(e) => setSessions(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Paid CAC ($)</label>
              <input
                type="number"
                value={cac}
                onChange={(e) => setCac(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md shadow-indigo-600/20"
            >
              {loading ? 'Evaluating Plays...' : 'Run Cycle & Enqueue Jobs'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
