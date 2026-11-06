import { Github, ExternalLink, Activity, ShieldAlert, Cpu, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GitHubMetricsDashboard } from './GitHubMetricsDashboard';

interface ProjectsProps {
  accentColor: 'yellow' | 'cyan';
}

export function Projects({ accentColor }: ProjectsProps) {
  const project = PORTFOLIO_DATA.featuredProject;

  const accentText = accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
  const accentBg = accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400';
  const accentBorder = accentColor === 'yellow' ? 'border-yellow-400/40' : 'border-cyan-400/40';
  const accentGlow = accentColor === 'yellow' ? 'shadow-[0_0_30px_rgba(250,204,21,0.2)]' : 'shadow-[0_0_30px_rgba(34,211,238,0.2)]';

  return (
    <section id="projects" className="py-24 border-t border-neutral-800/80 relative">
      {/* Anchor for backward compatibility with existing links */}
      <div id="citypulse" className="sr-only" />
      <div id="featured-project" className="sr-only" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-neutral-400 tracking-wider">02.</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Projects
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-800 via-neutral-700 to-transparent" />
        </div>

        {/* CityPulse Project Showcase Card */}
        <div
          className={`rounded-2xl bg-neutral-950 border ${accentBorder} overflow-hidden transition-all ${accentGlow}`}
        >
          {/* Top Bar with Project Status Tag & Repo Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-neutral-900/60 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider text-black ${accentBg}`}
              >
                FEATURED PROJECT
              </span>
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                Urban AI & Computer Vision
              </span>
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-neutral-300 hover:text-yellow-400 flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/beingrohit02/CityPulse</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </a>
          </div>

          {/* Main Content Area */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <span className={`text-xs font-mono uppercase tracking-wider ${accentText}`}>
                {project.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight text-balance">
                {project.title}
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-4xl">
                {project.description}
              </p>
            </div>

            {/* Architectural Pillars Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                Architectural Pillars:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="flex flex-col gap-1.5 text-xs font-mono text-neutral-200 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Activity className={`w-4 h-4 shrink-0 ${accentText}`} />
                    <span>LLM (RAG)</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-relaxed">
                    Instant municipal protocol synthesis & standard operating procedures.
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-mono text-neutral-200 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <Cpu className={`w-4 h-4 shrink-0 ${accentText}`} />
                    <span>YOLO Vision</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-relaxed">
                    Real-time junction incident detection & continuous spatial telemetry.
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-mono text-neutral-200 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <ShieldAlert className={`w-4 h-4 shrink-0 ${accentText}`} />
                    <span>Priority Engine</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-relaxed">
                    Deterministic score triage & emergency corridor preemption dispatch.
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-mono text-neutral-200 p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <MapPin className={`w-4 h-4 shrink-0 ${accentText}`} />
                    <span>GIS Mapping</span>
                  </div>
                  <span className="text-neutral-400 text-[11px] leading-relaxed">
                    Interactive spatial mapping & dynamic arterial routing for responders.
                  </span>
                </div>
              </div>
            </div>

            {/* Tech Stack Tags & Primary Repository Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Tech Stack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-black border border-neutral-700 text-neutral-200 hover:border-yellow-400/60 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-black rounded-md transition-all ${accentBg} hover:opacity-95 ${accentGlow}`}
                >
                  <Github className="w-4 h-4" />
                  <span>View Source on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>

          </div>

          {/* GitHub Live Telemetry Metrics Dashboard */}
          <div className="px-6 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10 pt-2 border-t border-neutral-800/80">
            <GitHubMetricsDashboard accentColor={accentColor} />
          </div>
        </div>

      </div>
    </section>
  );
}
