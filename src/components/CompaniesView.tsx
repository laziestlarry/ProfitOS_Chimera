import React, { useState } from 'react';
import { Building2, Plus, Check, RefreshCw, DollarSign, ShieldCheck, Zap, Layers, ArrowRight } from 'lucide-react';
import { Company } from '../types';

interface CompaniesViewProps {
  companies: Company[];
  onCreateCompany: (company: { name: string; industry: string; size: any; initial_revenue?: number }) => void;
  currentCompanyId: string;
  onSelectCompany: (id: string) => void;
  onResetPortfolio?: () => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  onCreateCompany,
  currentCompanyId,
  onSelectCompany,
  onResetPortfolio
}) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState<'solo' | 'smb' | 'mid' | 'enterprise'>('smb');
  const [initialRevenue, setInitialRevenue] = useState<number>(3800);
  const [showForm, setShowForm] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateCompany({
      name,
      industry: industry || 'General Growth',
      size,
      initial_revenue: Number(initialRevenue) || 3800
    });
    setName('');
    setIndustry('');
    setInitialRevenue(3800);
    setShowForm(false);
  };

  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to perform a fresh start? This will reset companies and KPIs to baseline state.')) return;
    setResetting(true);
    try {
      const res = await fetch('/api/v1/reset', { method: 'POST' });
      if (res.ok && onResetPortfolio) {
        onResetPortfolio();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Managed Companies & Portfolio</h2>
          <p className="text-xs text-slate-400">Manage client accounts, target initial revenues, and organization tiers.</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            disabled={resetting}
            className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl text-xs font-medium transition-colors border border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            <span>Fresh Start / Reset Portfolio</span>
          </button>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Registration Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-indigo-500/30 p-5 rounded-2xl space-y-4 animate-fade-in">
          <h3 className="font-semibold text-sm text-slate-200 flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>Register New Company Unit</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Company Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. IWS"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Industry / Niche</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Digital Agency / AI Growth"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Starting Revenue (USD / 30d)</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="number"
                  value={initialRevenue}
                  onChange={(e) => setInitialRevenue(Number(e.target.value))}
                  placeholder="3800"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Organization Tier</label>
              <select
                value={size}
                onChange={(e: any) => setSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              >
                <option value="solo">Solo Founder</option>
                <option value="smb">SMB (1-20)</option>
                <option value="mid">Mid-Market (20-100)</option>
                <option value="enterprise">Enterprise (100+)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-5 py-2 rounded-xl font-semibold"
            >
              Save & Initialize KPIs
            </button>
          </div>
        </form>
      )}

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((c) => {
          const isSelected = c.id === currentCompanyId;
          return (
            <div
              key={c.id}
              onClick={() => onSelectCompany(c.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50 shadow-xl shadow-indigo-500/10'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-indigo-400'}`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{c.name}</h3>
                    <p className="text-xs text-slate-400">{c.industry}</p>
                  </div>
                </div>
                {isSelected && (
                  <span className="bg-indigo-500/20 text-indigo-300 p-1.5 rounded-full border border-indigo-500/30">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Tier: <strong className="text-slate-200 uppercase font-mono">{c.size}</strong></span>
                <span className="font-mono text-[11px] text-indigo-300">ID: {c.id}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* How Operations Proceed & Affect Results Explainer Card */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>How Operations Record Proceedings & Drive Financial Results</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          When you execute a <strong>Growth Cycle</strong> or deploy a <strong>Growth Play</strong> for a company:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-2">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-indigo-400 font-bold block mb-1">1. Anomaly Evaluation</span>
            <p className="text-slate-400 text-[11px]">30-Day Revenue (e.g. $3,800) is evaluated against target boundaries ($5,000+).</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-violet-400 font-bold block mb-1">2. Job Dispatch</span>
            <p className="text-slate-400 text-[11px]">Matching plays enqueue specialized execution jobs for `shopify_bot`, `fiverr_bot`, and `copy_bot`.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-emerald-400 font-bold block mb-1">3. Immutable Evidence</span>
            <p className="text-slate-400 text-[11px]">Completed jobs log an `EvidenceRecord` updating company revenue and enterprise valuation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
