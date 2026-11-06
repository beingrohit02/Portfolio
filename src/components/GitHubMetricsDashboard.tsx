import { useState, useEffect } from 'react';
import {
  Star,
  GitFork,
  Calendar,
  RefreshCw,
  ExternalLink,
  Github,
  GitBranch,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import {
  parseGitHubRepoResponse,
  FALLBACK_CITYPULSE_METRICS,
  type GitHubRepoMetrics,
} from '../utils/githubMetrics';

interface GitHubMetricsDashboardProps {
  accentColor: 'yellow' | 'cyan';
}

export function GitHubMetricsDashboard({ accentColor }: GitHubMetricsDashboardProps) {
  const [metrics, setMetrics] = useState<GitHubRepoMetrics>(FALLBACK_CITYPULSE_METRICS);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [isLive, setIsLive] = useState<boolean>(false);
  const [syncCount, setSyncCount] = useState<number>(0);

  const fetchRepoData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/repos/beingrohit02/CityPulse', {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = parseGitHubRepoResponse(data);
        setMetrics(parsed);
        setIsLive(true);
      } else {
        // If rate-limited (403/429) or other response, use fallback gracefully
        setIsLive(false);
      }
    } catch {
      setIsLive(false);
    } finally {
      setLoading(false);
      const now = new Date();
      setLastSyncTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    }
  };

  useEffect(() => {
    fetchRepoData();
  }, [syncCount]);

  const accentText = accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
  const accentBg = accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400';
  const accentBorder = accentColor === 'yellow' ? 'border-yellow-400/40' : 'border-cyan-400/40';

  return (
    <div className="rounded-xl bg-black/90 border border-neutral-800 p-5 sm:p-6 space-y-5">
      {/* Dashboard Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white">
            <Github className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
              GitHub Repository Live Telemetry
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-300 border border-neutral-800">
                REST API v3
              </span>
            </h4>
            <span className="text-xs font-mono text-neutral-400">
              beingrohit02/CityPulse
            </span>
          </div>
        </div>

        {/* Sync Status & Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-green-500 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="hidden sm:inline">
              {isLive ? 'API Live' : 'API Cached'}
            </span>
            {lastSyncTime && (
              <span className="text-neutral-500 text-[11px] hidden md:inline">
                ({lastSyncTime})
              </span>
            )}
          </div>

          <button
            onClick={() => setSyncCount((c) => c + 1)}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-mono transition-colors disabled:opacity-50"
            title="Refresh GitHub telemetry via REST API"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-yellow-400' : ''}`} />
            <span>{loading ? 'Fetching...' : 'Sync'}</span>
          </button>
        </div>
      </div>

      {/* 4 Telemetry Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Stars */}
        <a
          href="https://github.com/beingrohit02/CityPulse/stargazers"
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-yellow-400/60 transition-all group block space-y-2"
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono uppercase tracking-wider">GitHub Stars</span>
            <Star className={`w-4 h-4 ${accentText} group-hover:scale-110 transition-transform`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
              {loading ? '—' : metrics.stars}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
          </div>
          <span className="text-[11px] font-mono text-neutral-400 block">
            Stargazers count
          </span>
        </a>

        {/* Metric 2: Forks */}
        <a
          href="https://github.com/beingrohit02/CityPulse/network/members"
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-yellow-400/60 transition-all group block space-y-2"
        >
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono uppercase tracking-wider">Forks & Clones</span>
            <GitFork className={`w-4 h-4 ${accentText} group-hover:scale-110 transition-transform`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
              {loading ? '—' : metrics.forks}
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-yellow-400 transition-colors" />
          </div>
          <span className="text-[11px] font-mono text-neutral-400 block">
            Open-source network
          </span>
        </a>

        {/* Metric 3: Last Updated Date */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono uppercase tracking-wider">Last Updated</span>
            <Calendar className={`w-4 h-4 ${accentText}`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-mono font-bold text-white truncate tabular-nums">
              {loading ? 'Checking...' : metrics.lastUpdated}
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 block truncate">
            Latest repo push
          </span>
        </div>

        {/* Metric 4: Branch & Size */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 space-y-2">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-xs font-mono uppercase tracking-wider">Branch & Language</span>
            <GitBranch className={`w-4 h-4 ${accentText}`} />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-mono font-bold text-white truncate">
              {metrics.defaultBranch}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {metrics.sizeKb} KB
            </span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 block truncate">
            Primary: {metrics.language}
          </span>
        </div>

      </div>

      {/* Footer Strip with Direct Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span>Real-time API sync via <code className="text-neutral-300">api.github.com</code></span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/beingrohit02/CityPulse"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-white transition-colors text-xs font-mono"
          >
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400/30" />
            <span>Star on GitHub</span>
          </a>
          <a
            href="https://github.com/beingrohit02/CityPulse/fork"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-white transition-colors text-xs font-mono"
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Fork Repo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
