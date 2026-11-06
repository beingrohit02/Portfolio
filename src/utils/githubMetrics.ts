/**
 * GitHub Metrics Parser & Formatter for CityPulse Repository
 */

export interface GitHubRepoMetrics {
  stars: number;
  forks: number;
  lastUpdated: string; // Formatted date string
  rawUpdatedAt: string;
  pushedAt: string;
  openIssues: number;
  sizeKb: number;
  language: string;
  defaultBranch: string;
  repoUrl: string;
}

export const FALLBACK_CITYPULSE_METRICS: GitHubRepoMetrics = {
  stars: 0,
  forks: 0,
  lastUpdated: 'Recently updated',
  rawUpdatedAt: '2026-10-31T09:23:07Z',
  pushedAt: '2026-10-31T09:23:03Z',
  openIssues: 0,
  sizeKb: 108,
  language: 'TypeScript / Python',
  defaultBranch: 'main',
  repoUrl: 'https://github.com/beingrohit02/CityPulse',
};

/**
 * Format ISO 8601 date into readable human string
 */
export function formatGitHubDate(isoDateString?: string | null): string {
  if (!isoDateString) return 'Recently';

  try {
    const date = new Date(isoDateString);
    if (isNaN(date.getTime())) return 'Recently';

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return 'Recently';
  }
}

/**
 * Parse raw GitHub API payload into typed metrics
 */
export function parseGitHubRepoResponse(payload: any): GitHubRepoMetrics {
  if (!payload || typeof payload !== 'object') {
    return FALLBACK_CITYPULSE_METRICS;
  }

  const rawDate = payload.pushed_at || payload.updated_at || FALLBACK_CITYPULSE_METRICS.rawUpdatedAt;

  return {
    stars: typeof payload.stargazers_count === 'number' ? payload.stargazers_count : 0,
    forks: typeof payload.forks_count === 'number' ? payload.forks_count : 0,
    lastUpdated: formatGitHubDate(rawDate),
    rawUpdatedAt: payload.updated_at || FALLBACK_CITYPULSE_METRICS.rawUpdatedAt,
    pushedAt: payload.pushed_at || FALLBACK_CITYPULSE_METRICS.pushedAt,
    openIssues: typeof payload.open_issues_count === 'number' ? payload.open_issues_count : 0,
    sizeKb: typeof payload.size === 'number' ? payload.size : 108,
    language: payload.language || 'TypeScript / Python',
    defaultBranch: payload.default_branch || 'main',
    repoUrl: payload.html_url || 'https://github.com/beingrohit02/CityPulse',
  };
}
