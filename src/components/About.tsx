import { GraduationCap, Code2, MapPin, Terminal, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AboutProps {
  accentColor: 'yellow' | 'cyan';
}

export function About({ accentColor }: AboutProps) {
  const accentText = accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
  const accentBg = accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400';
  const accentBorder = accentColor === 'yellow' ? 'border-t-yellow-400' : 'border-t-cyan-400';

  return (
    <section id="about" className="py-24 border-t border-neutral-800/80 relative bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-neutral-400 tracking-wider">01.</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            About Me
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-800 via-neutral-700 to-transparent" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Bio Narrative & Avatar */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              
              {/* Developer Telemetry Badge (No photo - pure code & cyber telemetry) */}
              <div className="relative shrink-0 w-full sm:w-44 p-4 rounded-xl border border-neutral-800 bg-[#0c0c0c] font-mono space-y-3 shadow-xl group hover:border-yellow-400/60 transition-colors">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-xs text-white font-bold tracking-tight">ROHIT</span>
                  </div>
                  <span className="text-[10px] text-yellow-400 font-bold px-1.5 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/30">
                    1st Year
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Specialization</span>
                    <span className="text-neutral-200 font-medium text-[11px] leading-tight block">AI & Data Science</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Institution</span>
                    <span className="text-neutral-200 font-medium text-[11px] leading-tight block">NIAT x NIU</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[9px] uppercase tracking-wider">Primary Stack</span>
                    <span className="text-yellow-400 font-medium text-[11px] leading-tight block">Python · PyTorch</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] text-neutral-400">
                  <span>STATUS</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Bio Summary */}
              <div className="space-y-4">
                <h3 className="text-xl font-display font-bold text-white leading-snug">
                  Driven by real-world AI applications, autonomous perception, and robust engineering.
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  I am a first-year Computer Science Engineering student specializing in <strong className="text-white">Artificial Intelligence & Data Science</strong> at{' '}
                  <span className="text-white font-medium">NIAT x Noida International University (NIU)</span>.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed pt-2">
              <p>
                Rather than staying confined to notebook experiments, my primary ambition is building complete, deployable AI software. My foundational language is <span className="text-white font-medium">Python</span>, and I specialize in computer vision using <span className="text-white font-medium">PyTorch</span> and <span className="text-white font-medium">OpenCV / YOLO</span> alongside lightning-fast backend architectures using <span className="text-white font-medium">FastAPI</span>.
              </p>
              <p>
                As creator of <strong className="text-white">CityPulse</strong> (<a href="https://github.com/beingrohit02/CityPulse" target="_blank" rel="noreferrer" className="text-yellow-400 hover:underline">github.com/beingrohit02/CityPulse</a>), I engineered an AI-powered smart city control and command center integrating YOLOv8 edge computer vision, retrieval-augmented generation (RAG) for emergency protocols, and a deterministic priority triage engine.
              </p>
            </div>

            {/* Quick Badges Strip */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-mono rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                PyTorch Neural Networks
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                YOLOv8 Edge Vision
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                FastAPI Async Microservices
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                RAG Vector Search
              </span>
            </div>
          </div>

          {/* Right Column: 4 Highlight Cards & Metrics */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Degree */}
              <div
                className={`p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 border-t-2 ${accentBorder} space-y-2`}
              >
                <div className="flex items-center gap-2 text-neutral-400">
                  <GraduationCap className={`w-4 h-4 ${accentText}`} />
                  <span className="text-xs font-mono uppercase tracking-wider">Degree & Program</span>
                </div>
                <h4 className="text-base font-bold text-white">B.Tech CSE</h4>
                <p className="text-xs text-neutral-400">
                  Specialization: AI & Data Science (1st Year)
                </p>
              </div>

              {/* Card 2: Institution */}
              <div
                className={`p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 border-t-2 ${accentBorder} space-y-2`}
              >
                <div className="flex items-center gap-2 text-neutral-400">
                  <Cpu className={`w-4 h-4 ${accentText}`} />
                  <span className="text-xs font-mono uppercase tracking-wider">Institution</span>
                </div>
                <h4 className="text-base font-bold text-white">NIAT x NIU</h4>
                <p className="text-xs text-neutral-400">
                  Noida International University, Greater Noida
                </p>
              </div>

              {/* Card 3: Core Language */}
              <div
                className={`p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 border-t-2 ${accentBorder} space-y-2`}
              >
                <div className="flex items-center gap-2 text-neutral-400">
                  <Code2 className={`w-4 h-4 ${accentText}`} />
                  <span className="text-xs font-mono uppercase tracking-wider">Main Language</span>
                </div>
                <h4 className="text-base font-bold text-white">Python</h4>
                <p className="text-xs text-neutral-400">
                  PyTorch, OpenCV, YOLO, FastAPI, Pandas
                </p>
              </div>

              {/* Card 4: Location */}
              <div
                className={`p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 border-t-2 ${accentBorder} space-y-2`}
              >
                <div className="flex items-center gap-2 text-neutral-400">
                  <MapPin className={`w-4 h-4 ${accentText}`} />
                  <span className="text-xs font-mono uppercase tracking-wider">Location</span>
                </div>
                <h4 className="text-base font-bold text-white">Noida, India</h4>
                <p className="text-xs text-neutral-400">
                  Delhi NCR Tech Corridor · Available Globally
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
