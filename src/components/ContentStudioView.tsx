import React, { useState } from 'react';
import { Palette, Layout, FileImage, Film, Sparkles } from 'lucide-react';

export const ContentStudioView: React.FC = () => {
  const [createdAsset, setCreatedAsset] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateDashboard = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/content/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: {}, metrics: ['revenue', 'conversion', 'CAC'], style: 'modern' })
      });
      const data = await res.json();
      setCreatedAsset(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Content & Design Studio</h2>
        <p className="text-xs text-slate-400">
          Create rich visual assets including dashboard layouts, infographics, and storyboards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleGenerateDashboard}
          disabled={loading}
          className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl text-left space-y-3 transition-all group"
        >
          <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400 w-fit group-hover:bg-indigo-500 group-hover:text-white transition-colors">
            <Layout className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-200 text-sm">Dashboard Spec</h3>
          <p className="text-xs text-slate-400">Build high-contrast data visualization specs.</p>
        </button>

        <button
          onClick={handleGenerateDashboard}
          disabled={loading}
          className="bg-slate-900/80 border border-slate-800 hover:border-violet-500/50 p-6 rounded-2xl text-left space-y-3 transition-all group"
        >
          <div className="bg-violet-500/10 p-3 rounded-xl text-violet-400 w-fit group-hover:bg-violet-500 group-hover:text-white transition-colors">
            <FileImage className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-200 text-sm">Infographic Spec</h3>
          <p className="text-xs text-slate-400">Design viral infographics for social distribution.</p>
        </button>

        <button
          onClick={handleGenerateDashboard}
          disabled={loading}
          className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl text-left space-y-3 transition-all group"
        >
          <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 w-fit group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-200 text-sm">Video Storyboard</h3>
          <p className="text-xs text-slate-400">Generate multi-scene scripts & visual cues.</p>
        </button>
      </div>

      {createdAsset && (
        <div className="bg-slate-900/80 border border-indigo-500/30 p-5 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm">{createdAsset.title}</h3>
          </div>
          <p className="text-xs text-slate-400">Tone: {createdAsset.emotional_tone}</p>
          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto">
            {JSON.stringify(createdAsset.design_spec, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
