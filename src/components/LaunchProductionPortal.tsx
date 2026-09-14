import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Globe,
  Lock,
  Server,
  FileText,
  Building2,
  Users,
  MessageSquare,
  Github,
  Activity,
  CheckCircle2,
  Zap,
  AlertTriangle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

export const LaunchProductionPortal: React.FC = () => {
  const [securityAudit, setSecurityAudit] = useState<any>(null);
  const [legalData, setLegalData] = useState<any>(null);
  const [customDomain, setCustomDomain] = useState<string>('growth.profitos.ai');
  const [domainConfig, setDomainConfig] = useState<any>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<any>(null);
  const [isConfiguringDomain, setIsConfiguringDomain] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/v1/system/security-audit')
      .then((res) => res.json())
      .then((data) => setSecurityAudit(data))
      .catch((err) => console.error(err));

    fetch('/api/v1/legal/documents')
      .then((res) => res.json())
      .then((data) => setLegalData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleConfigureDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfiguringDomain(true);
    try {
      const res = await fetch('/api/v1/system/configure-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ custom_domain: customDomain })
      });
      const data = await res.json();
      setDomainConfig(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConfiguringDomain(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-3.5 py-1 rounded-full text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PRODUCTION LAUNCH PORTAL ── READY FOR DOMAIN HOSTING TRAFFIC</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Production Deployment, Legal Suite & System Resilience
          </h1>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Configure custom domain hosting, review top 5 critical security & resilience upgrades, manage legal policies, corporate contact entity details, and link community operational channels.
          </p>
        </div>
      </div>

      {/* 5 Top Critical Security & Resilience Upgrades */}
      <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-amber-400 font-mono text-xs font-bold uppercase">
              <Zap className="w-4 h-4" />
              <span>ARCHITECTURAL REVIEW & AUDIT</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">
              Top 5 Critical Upgrades: Security, Resilience & Code Quality
            </h2>
          </div>

          {securityAudit && (
            <div className="bg-slate-950 border border-emerald-500/30 px-4 py-2 rounded-2xl font-mono text-center shrink-0">
              <span className="text-[10px] text-slate-500 block">Overall Resilience Score</span>
              <span className="text-emerald-400 font-extrabold text-lg">{securityAudit.overall_resilience_score}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {securityAudit?.critical_upgrades?.map((upg: any) => (
            <div key={upg.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-indigo-400 font-bold font-mono text-xs">{upg.title}</span>
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                    Status: {upg.status}
                  </span>
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                    Impact: {upg.impact}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">{upg.description}</p>

              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-amber-300 flex items-start space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Recommendation: {upg.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production Custom Domain Hosting Setup */}
      <div className="bg-slate-900 border border-indigo-500/30 p-6 md:p-8 rounded-3xl space-y-6 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-indigo-400" />
            <span>Custom Domain Activation & Hosting Records</span>
          </h2>
          <p className="text-xs text-slate-400">
            Bind your custom domain name to host live public traffic with automated SSL/TLS 1.3 certificates.
          </p>
        </div>

        <form onSubmit={handleConfigureDomain} className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="e.g. growth.profitos.ai or yourdomain.com"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-3 text-slate-200 font-mono text-xs focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isConfiguringDomain}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-mono font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 shrink-0"
          >
            {isConfiguringDomain ? 'Binding Domain...' : 'Bind & Provision Domain SSL →'}
          </button>
        </form>

        {domainConfig && (
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 text-xs font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-slate-400">Active Custom Domain:</span>
              <span className="text-emerald-400 font-bold">{domainConfig.domain}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-slate-400">SSL Certificate Status:</span>
              <span className="text-emerald-400 font-bold">{domainConfig.ssl_status}</span>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 font-bold block">Required DNS Records:</span>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr>
                      <th className="p-2 border-b border-slate-800">Type</th>
                      <th className="p-2 border-b border-slate-800">Name</th>
                      <th className="p-2 border-b border-slate-800">Value / Target</th>
                      <th className="p-2 border-b border-slate-800">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domainConfig.dns_records_required?.map((rec: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-800/60">
                        <td className="p-2 text-indigo-400 font-bold">{rec.type}</td>
                        <td className="p-2 text-slate-200">{rec.name}</td>
                        <td className="p-2 text-amber-300">{rec.value}</td>
                        <td className="p-2 text-emerald-400 font-bold">{rec.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Corporate Contacts, Legal Policies & Refund Info */}
      {legalData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Corporate Entity & Contact Info */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-xs">
            <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>Corporate Contacts & Headquarters Information</span>
            </h2>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-start space-x-2.5">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block font-mono">Entity Name & Registration</span>
                  <span className="font-bold text-slate-100">{legalData.corporate_info?.entity_name}</span>
                  <span className="text-slate-400 block font-mono text-[10px]">Reg #{legalData.corporate_info?.registration_number}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block font-mono">Global Headquarters</span>
                  <span className="text-slate-200">{legalData.corporate_info?.headquarters}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block font-mono">Legal & Customer Support Emails</span>
                  <span className="text-indigo-400 font-mono block">{legalData.corporate_info?.support_email}</span>
                  <span className="text-indigo-400 font-mono block">{legalData.corporate_info?.legal_email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-500 text-[10px] block font-mono">Support Hotline</span>
                  <span className="text-emerald-400 font-mono font-bold">{legalData.corporate_info?.hotline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Policies Suite */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 text-xs">
            <h2 className="text-base font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Legal Policies & Guarantee Documents</span>
            </h2>

            <div className="space-y-3">
              {legalData.legal_policies?.map((pol: any) => (
                <div
                  key={pol.id}
                  onClick={() => setActivePolicyModal(pol)}
                  className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex justify-between items-center font-mono">
                    <span className="font-bold text-slate-200">{pol.title}</span>
                    <span className="text-[10px] text-slate-500">Updated {pol.last_updated}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-snug">{pol.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Community Networking & Binding Operational Channels */}
      {legalData?.community_channels && (
        <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Community Networking & Binding Operational Channels</span>
            </h2>
            <p className="text-xs text-slate-400">
              Join live operator communities, signal channels, open source repositories, and view real-time incident status.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            {legalData.community_channels.map((chan: any, idx: number) => (
              <a
                key={idx}
                href={chan.url}
                target="_blank"
                rel="noreferrer"
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-indigo-500 transition-colors space-y-2 block group"
              >
                <div className="flex justify-between items-center text-indigo-400">
                  <span className="font-bold text-sm">{chan.platform}</span>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-bold text-slate-200 text-xs">{chan.label}</div>
                <span className="inline-block bg-slate-900 text-emerald-400 border border-slate-800 px-2 py-0.5 rounded text-[10px]">
                  {chan.members || chan.stars || chan.status}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Policy View Drawer / Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/40 p-6 md:p-8 rounded-3xl max-w-xl w-full space-y-4 animate-fade-in shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">{activePolicyModal.title}</h3>
              <button
                onClick={() => setActivePolicyModal(null)}
                className="text-slate-500 hover:text-slate-300 font-mono text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-sans leading-relaxed max-h-60 overflow-y-auto pr-2">
              <p><strong>Last Updated:</strong> {activePolicyModal.last_updated}</p>
              <p>{activePolicyModal.summary}</p>
              <p className="text-slate-400">
                This document legally binds AutonomaX Ltd. and Profit OS Global Inc. to perform services according to specified uptime guarantees, data privacy standards, and 30-day money-back growth benchmarks.
              </p>
            </div>

            <div className="text-right pt-2 border-t border-slate-800">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-mono font-bold"
              >
                Acknowledge Policy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
