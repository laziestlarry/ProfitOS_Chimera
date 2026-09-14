import React, { useState } from 'react';
import { X, User, Mail, Building2, DollarSign, Award, ShieldCheck, Zap } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (userData: any, workspaceId: string) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'founder' | 'operator' | 'agency_owner' | 'investor'>('founder');
  const [companyName, setCompanyName] = useState('');
  const [initialRevenue, setInitialRevenue] = useState(3800);
  const [licenseTier, setLicenseTier] = useState<'starter' | 'pro' | 'agency'>('pro');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role,
          company_name: companyName || `${name}'s Growth Workspace`,
          initial_revenue: Number(initialRevenue) || 3800,
          license_tier: licenseTier
        })
      });

      const data = await res.json();
      if (res.ok) {
        onSuccess(data.user, data.workspace_id);
        onClose();
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 p-1 rounded-lg bg-slate-800/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-0.5 rounded-full text-xs font-mono font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>INDIVIDUAL OPERATOR REGISTRATION</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">Create Operator Profile & Workspace</h2>
          <p className="text-xs text-slate-400">
            Register your profile to deploy an individual workspace seeded with target 30-day KPI snapshots.
          </p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-mono">Operator Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kagan Dolek"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-mono">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kagan@autonomax.io"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Operator Role</label>
              <select
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              >
                <option value="founder">Founder</option>
                <option value="operator">Growth Operator</option>
                <option value="agency_owner">Agency Owner</option>
                <option value="investor">Investor</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">License Tier</label>
              <select
                value={licenseTier}
                onChange={(e: any) => setLicenseTier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              >
                <option value="starter">Starter ($49/mo)</option>
                <option value="pro">Pro Swarm ($199/mo)</option>
                <option value="agency">Enterprise ($499/mo)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-mono">Company / Workspace Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. AutonomaX"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-mono">Starting 30d Revenue</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="number"
                  value={initialRevenue}
                  onChange={(e) => setInitialRevenue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white py-3 rounded-xl font-bold font-mono text-xs transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <span>Provisioning Profile...</span>
              ) : (
                <span>Deploy Individual Workspace →</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
