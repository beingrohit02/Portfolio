import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatGitHubDate,
  parseGitHubRepoResponse,
  FALLBACK_CITYPULSE_METRICS,
} from './githubMetrics';

test('formatGitHubDate correctly formats ISO timestamp', () => {
  const formatted = formatGitHubDate('2026-10-31T09:23:07Z');
  assert.equal(formatted, 'Oct 31, 2026');
});

test('formatGitHubDate returns fallback on invalid date', () => {
  assert.equal(formatGitHubDate('invalid-date'), 'Recently');
  assert.equal(formatGitHubDate(null), 'Recently');
});

test('parseGitHubRepoResponse correctly maps GitHub API payload', () => {
  const samplePayload = {
    stargazers_count: 42,
    forks_count: 8,
    updated_at: '2026-10-31T09:23:07Z',
    pushed_at: '2026-10-31T09:23:03Z',
    open_issues_count: 2,
    size: 256,
    language: 'Python',
    default_branch: 'main',
    html_url: 'https://github.com/beingrohit02/CityPulse',
  };

  const metrics = parseGitHubRepoResponse(samplePayload);

  assert.equal(metrics.stars, 42);
  assert.equal(metrics.forks, 8);
  assert.equal(metrics.lastUpdated, 'Oct 31, 2026');
  assert.equal(metrics.language, 'Python');
  assert.equal(metrics.defaultBranch, 'main');
});

test('parseGitHubRepoResponse falls back gracefully on empty or broken input', () => {
  const metrics = parseGitHubRepoResponse(null);
  assert.equal(metrics.stars, FALLBACK_CITYPULSE_METRICS.stars);
  assert.equal(metrics.repoUrl, 'https://github.com/beingrohit02/CityPulse');
});
