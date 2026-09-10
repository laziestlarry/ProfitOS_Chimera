import React, { useState } from 'react';
import { Building2, Plus, Check } from 'lucide-react';
import { Company } from '../types';

interface CompaniesViewProps {
  companies: Company[];
  onCreateCompany: (company: { name: string; industry: string; size: any }) => void;
  currentCompanyId: string;
  onSelectCompany: (id: string) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  onCreateCompany,
  currentCompanyId,
  onSelectCompany
}) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState<'solo' | 'smb' | 'mid' | 'enterprise'>('smb');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateCompany({ name, industry: industry || 'General', size });
    setName('');
    setIndustry('');
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Managed Companies & Portfolio</h2>
          <p className="text-xs text-slate-400">Manage client accounts and business units under Profit OS.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Company</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-indigo-500/30 p-5 rounded-xl space-y-4">
          <h3 className="font-semibold text-sm text-slate-200">Register New Company</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Company Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Zen Calm Studio"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Industry</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. E-Commerce / AI Agency"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Organization Size</label>
              <select
                value={size}
                onChange={(e: any) => setSize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="solo">Solo Founder</option>
                <option value="smb">SMB (1-20)</option>
                <option value="mid">Mid-Market (20-100)</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg font-medium"
            >
              Save Company
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((c) => {
          const isSelected = c.id === currentCompanyId;
          return (
            <div
              key={c.id}
              onClick={() => onSelectCompany(c.id)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200 text-sm">{c.name}</h3>
                    <p className="text-xs text-slate-400">{c.industry}</p>
                  </div>
                </div>
                {isSelected && (
                  <span className="bg-indigo-500/20 text-indigo-300 p-1 rounded-full border border-indigo-500/30">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Size: <strong className="text-slate-300 uppercase">{c.size}</strong></span>
                <span className="font-mono text-[11px]">ID: {c.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
