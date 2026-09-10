import React, { useState } from 'react';
import { Share2, Youtube, Instagram, Video, Calendar, Sparkles } from 'lucide-react';

export const SocialAutomationView: React.FC = () => {
  const [theme, setTheme] = useState('AI Automation & Passive Income');
  const [platforms, setPlatforms] = useState<string[]>(['youtube', 'instagram', 'tiktok']);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/social/create-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platforms, content_theme: theme, count: 6 })
      });
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Social Media Automation Module</h2>
          <p className="text-xs text-slate-400">
            Generate zero-ad traffic with automated short-form scripts, posts, and scheduling.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <h3 className="text-sm font-semibold text-slate-200">Content Pack Generator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Content Theme / Core Topic</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-600/20"
            >
              {loading ? 'Generating Content Pack...' : 'Generate 6-Post Zero-Ad Content Pack'}
            </button>
          </div>
        </div>
      </div>

      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-mono uppercase">
                  {post.platform}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {new Date(post.scheduled_time).toLocaleDateString()}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                {post.content_preview}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Status: <strong className="text-emerald-400">Scheduled</strong></span>
                <span className="text-[10px] text-slate-500 font-mono">ID: {post.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
