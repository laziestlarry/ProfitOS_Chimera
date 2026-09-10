import React from 'react';
import { Rocket, Activity, Zap, Bot, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentCompanyId: string;
  companies: any[];
  onCompanyChange: (id: string) => void;
  onOpenRunCycle: () => void;
  apiStatus: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentCompanyId,
  companies,
  onCompanyChange,
  onOpenRunCycle,
  apiStatus
}) => {
  return (
    <header className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
          <Rocket className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-xl text-slate-100 tracking-tight">Profit OS Chimera</h1>
            <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-mono font-medium">v0.1.0 Enhanced</span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">AI-Powered Growth Operating System & Automation Brain</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Company Selector */}
        <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5">
          <span className="text-xs text-slate-400 font-medium">Company:</span>
          <select
            value={currentCompanyId}
            onChange={(e) => onCompanyChange(e.target.value)}
            className="bg-transparent text-sm font-semibold text-indigo-300 focus:outline-none cursor-pointer"
          >
            {companies.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-slate-200">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* API Status Badge */}
        <div className="hidden md:flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium font-mono">{apiStatus}</span>
        </div>

        {/* Run Cycle Button */}
        <button
          onClick={onOpenRunCycle}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-md shadow-indigo-600/20 active:scale-95"
        >
          <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>Run Growth Cycle</span>
        </button>
      </div>
    </header>
  );
};
