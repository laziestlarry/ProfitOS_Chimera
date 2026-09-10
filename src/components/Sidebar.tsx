import React from 'react';
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  PlaySquare,
  ListTodo,
  FileCheck,
  Bot,
  Compass,
  Share2,
  TrendingUp,
  Palette,
  Workflow,
  Sparkles
} from 'lucide-react';

export type ActiveTab =
  | 'overview'
  | 'companies'
  | 'kpis'
  | 'plays'
  | 'jobs'
  | 'evidence'
  | 'lazy_larry'
  | 'opportunity_hunter'
  | 'social_automation'
  | 'intelligence'
  | 'content_studio'
  | 'automation';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const primaryNav = [
    { id: 'overview' as ActiveTab, label: 'Overview Dashboard', icon: LayoutDashboard },
    { id: 'companies' as ActiveTab, label: 'Companies', icon: Building2 },
    { id: 'kpis' as ActiveTab, label: 'KPI Performance', icon: BarChart3 },
    { id: 'plays' as ActiveTab, label: 'Growth Plays', icon: PlaySquare },
    { id: 'jobs' as ActiveTab, label: 'Job Queue', icon: ListTodo },
    { id: 'evidence' as ActiveTab, label: 'Evidence Logs', icon: FileCheck },
  ];

  const moduleNav = [
    { id: 'lazy_larry' as ActiveTab, label: 'Lazy Larry Assistant', icon: Bot, badge: 'AI Chat' },
    { id: 'opportunity_hunter' as ActiveTab, label: 'Opportunity Hunter', icon: Compass, badge: 'Income' },
    { id: 'social_automation' as ActiveTab, label: 'Social Automation', icon: Share2, badge: 'Growth' },
    { id: 'intelligence' as ActiveTab, label: 'AI BI & Trends', icon: TrendingUp, badge: 'Scout' },
    { id: 'content_studio' as ActiveTab, label: 'Content Studio', icon: Palette, badge: 'Design' },
    { id: 'automation' as ActiveTab, label: 'Workflow Automator', icon: Workflow, badge: 'Tasks' },
  ];

  return (
    <aside className="w-64 bg-slate-900/60 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0 min-h-[calc(100vh-73px)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-3">
            Core Operating System
          </h2>
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="flex items-center justify-between px-3 mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Enhanced Modules
            </h2>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          </div>
          <nav className="space-y-1">
            {moduleNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-violet-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-slate-800 text-violet-300 border border-slate-700 px-1.5 py-0.5 rounded font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 px-3">
        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs">
          <p className="text-slate-300 font-semibold mb-1">Profit OS Operating Manual</p>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            BI + Growth Engine designed for rapid valuation & revenue scaling.
          </p>
        </div>
      </div>
    </aside>
  );
};
