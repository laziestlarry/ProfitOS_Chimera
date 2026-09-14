import React, { useState } from 'react';
import { Layout, FileImage, Film, Sparkles, CheckCircle2, Play, Copy, ArrowRight, Zap, Globe, Clock } from 'lucide-react';

export const ContentStudioView: React.FC = () => {
  const [createdAsset, setCreatedAsset] = useState<any>(null);
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateAsset = async (endpoint: string, type: string) => {
    setLoadingType(type);
    try {
      const res = await fetch(`/api/v1/content/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company_id: 'autonoma-x' })
      });
      const data = await res.json();
      setCreatedAsset(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingType(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Content & Visual Design Studio</h2>
          <p className="text-xs text-slate-400">
            Generate viral social infographics, YouTube/TikTok video storyboards, and custom dashboard layout specs.
          </p>
        </div>
      </div>

      {/* Action Mechanics & Execution Explainer Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 rounded-2xl border border-indigo-500/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold font-mono">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Programmatic Real-World API Actions</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Connected API channels (e.g. Shopify pricing/bundles, scheduled social post queues, database records) execute real-world code changes directly upon trigger.
          </p>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-violet-400 font-bold font-mono">
            <Clock className="w-4 h-4 text-violet-400" />
            <span>Scheduled Proposals & Human-in-the-Loop</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            External platform bids (Fiverr custom proposals, Upwork quotes) are enqueued in your Job Queue as scheduled tasks with 1-click human execution.
          </p>
        </div>
      </div>

      {/* Generator Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => generateAsset('dashboard', 'dashboard')}
          disabled={loadingType !== null}
          className={`bg-slate-900/80 border p-6 rounded-2xl text-left space-y-3 transition-all group ${
            createdAsset?.asset_type === 'dashboard' ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-800 hover:border-indigo-500/50'
          }`}
        >
          <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400 w-fit group-hover:bg-indigo-500 group-hover:text-white transition-colors">
            <Layout className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-200 text-sm">Dashboard Spec</h3>
            <p className="text-xs text-slate-400">Generate high-contrast, responsive data visualization UI specs.</p>
          </div>
          <span className="inline-block text-[11px] text-indigo-400 font-semibold font-mono">
            {loadingType === 'dashboard' ? 'Generating...' : '→ Generate Dashboard Spec'}
          </span>
        </button>

        <button
          onClick={() => generateAsset('infographic', 'infographic')}
          disabled={loadingType !== null}
          className={`bg-slate-900/80 border p-6 rounded-2xl text-left space-y-3 transition-all group ${
            createdAsset?.asset_type === 'infographic' ? 'border-violet-500 ring-1 ring-violet-500/50' : 'border-slate-800 hover:border-violet-500/50'
          }`}
        >
          <div className="bg-violet-500/10 p-3 rounded-xl text-violet-400 w-fit group-hover:bg-violet-500 group-hover:text-white transition-colors">
            <FileImage className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-200 text-sm">Infographic Spec</h3>
            <p className="text-xs text-slate-400">Design viral visual infographics with callout nodes and stats.</p>
          </div>
          <span className="inline-block text-[11px] text-violet-400 font-semibold font-mono">
            {loadingType === 'infographic' ? 'Generating...' : '→ Generate Infographic Spec'}
          </span>
        </button>

        <button
          onClick={() => generateAsset('storyboard', 'storyboard')}
          disabled={loadingType !== null}
          className={`bg-slate-900/80 border p-6 rounded-2xl text-left space-y-3 transition-all group ${
            createdAsset?.asset_type === 'storyboard' ? 'border-emerald-500 ring-1 ring-emerald-500/50' : 'border-slate-800 hover:border-emerald-500/50'
          }`}
        >
          <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400 w-fit group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Film className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-200 text-sm">Video Storyboard</h3>
            <p className="text-xs text-slate-400">Generate 60s YouTube Shorts / TikTok scripts & visual cues.</p>
          </div>
          <span className="inline-block text-[11px] text-emerald-400 font-semibold font-mono">
            {loadingType === 'storyboard' ? 'Generating...' : '→ Generate Video Storyboard'}
          </span>
        </button>
      </div>

      {/* Generated Asset Render Area */}
      {createdAsset && (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bold text-slate-100 text-base">{createdAsset.title}</h3>
                <p className="text-xs text-slate-400 font-mono">Type: {createdAsset.asset_type.toUpperCase()} | Tone: {createdAsset.emotional_tone}</p>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(JSON.stringify(createdAsset, null, 2))}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
              <span>{copied ? 'Copied Spec!' : 'Copy Spec JSON'}</span>
            </button>
          </div>

          {/* Render Storyboard */}
          {createdAsset.asset_type === 'storyboard' && createdAsset.scenes && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase font-mono">
                  Platform Target: {createdAsset.target_platform}
                </span>
                <span className="text-xs text-slate-400">{createdAsset.scenes.length} Scenes Total</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {createdAsset.scenes.map((sc: any) => (
                  <div key={sc.scene_number} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="font-mono font-bold text-emerald-400">Scene #{sc.scene_number}</span>
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px]">
                        ⏱️ {sc.duration_sec}s
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono text-[10px] block uppercase">Visual Cue</span>
                      <p className="text-slate-200 font-medium">{sc.visual_cue}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono text-[10px] block uppercase">On-Screen Text</span>
                      <span className="bg-indigo-950/80 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800/50 block font-semibold text-[11px] mt-0.5">
                        "{sc.on_screen_text}"
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono text-[10px] block uppercase">Voiceover Script</span>
                      <p className="text-slate-300 italic">"{sc.voiceover}"</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-mono text-[10px] block uppercase">Audio & SFX</span>
                      <p className="text-amber-400 font-mono text-[11px]">🎵 {sc.audio_sfx}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render Infographic Spec */}
          {createdAsset.asset_type === 'infographic' && createdAsset.design_spec && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-violet-400 text-sm">{createdAsset.design_spec.header}</span>
                  <span className="font-mono text-slate-400 text-[11px]">Aspect: {createdAsset.design_spec.aspect_ratio}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  {createdAsset.design_spec.sections?.map((sec: any, idx: number) => (
                    <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-violet-400 font-mono font-bold block">{sec.node}</span>
                      <p className="text-slate-200 mt-1">{sec.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  {createdAsset.design_spec.callout_stats?.map((st: any, idx: number) => (
                    <div key={idx} className="bg-slate-900/60 p-3 rounded-lg text-center">
                      <span className="text-emerald-400 font-bold text-sm block font-mono">{st.stat}</span>
                      <span className="text-slate-400 text-[10px] uppercase font-mono">{st.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Render Dashboard Spec */}
          {createdAsset.asset_type === 'dashboard' && createdAsset.design_spec && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-3">
              <div className="flex justify-between items-center font-mono">
                <span className="text-indigo-400 font-bold">Theme: {createdAsset.design_spec.theme}</span>
                <span className="text-slate-400">Layout: {createdAsset.design_spec.layout}</span>
              </div>
              <div>
                <span className="text-slate-500 font-mono text-[10px] uppercase block mb-1">Target UI Components</span>
                <div className="flex flex-wrap gap-2">
                  {createdAsset.design_spec.components?.map((c: string, idx: number) => (
                    <span key={idx} className="bg-slate-900 text-slate-200 px-3 py-1 rounded-lg border border-slate-800 font-mono text-[11px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
