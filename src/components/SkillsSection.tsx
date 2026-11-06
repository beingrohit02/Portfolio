import { Code2, BrainCircuit, Globe, Wrench, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface SkillsSectionProps {
  accentColor: 'yellow' | 'cyan';
}

export function SkillsSection({ accentColor }: SkillsSectionProps) {
  const accentText = accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
  const accentBorder = accentColor === 'yellow' ? 'border-yellow-400/40' : 'border-cyan-400/40';

  const categoryIcons = [
    <Code2 className={`w-5 h-5 ${accentText}`} />,
    <BrainCircuit className={`w-5 h-5 ${accentText}`} />,
    <Globe className={`w-5 h-5 ${accentText}`} />,
    <Wrench className={`w-5 h-5 ${accentText}`} />,
  ];

  return (
    <section id="skills" className="py-24 border-t border-neutral-800/80 relative bg-[#070707]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-xs text-neutral-400 tracking-wider">03.</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Skills & Capabilities
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-800 via-neutral-700 to-transparent" />
        </div>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mb-12">
          Structured engineering competencies across machine learning systems, computer vision, async Python backends, and full-stack interfaces.
        </p>

        {/* 4-Column Structured Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.skillsMatrix.map((cat, idx) => (
            <div
              key={cat.title}
              className={`rounded-xl bg-[#121212] border border-neutral-800 p-6 flex flex-col justify-between hover:border-neutral-700 transition-all`}
            >
              <div className="space-y-4">
                {/* Header of Card */}
                <div className="space-y-1 pb-3 border-b border-neutral-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Category 0{idx + 1}
                    </span>
                    {categoryIcons[idx]}
                  </div>
                  <h3 className={`text-lg font-display font-bold ${accentText}`}>
                    {cat.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-3.5 pt-1">
                  {cat.items.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400'}`} />
                          {item.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-snug pl-3">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom indicator */}
              <div className="pt-4 mt-6 border-t border-neutral-800/60 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
                <span>Active Practice</span>
                <span className="text-neutral-400">Production & Lab</span>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Banner on Primary Skill (Python) */}
        <div className="mt-10 p-5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-yellow-400 text-black uppercase">
                Primary Specialty
              </span>
              <h4 className="text-base font-display font-bold text-white">
                Python Systems Engineering
              </h4>
            </div>
            <p className="text-xs text-neutral-400 max-w-xl">
              Deep expertise in leveraging Python for high-performance deep learning pipelines: PyTorch custom models, OpenCV image manipulations, YOLOv8 real-time inference, and FastAPI asynchronous microservices.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-neutral-400">Target Frameworks:</span>
            <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700">
              PyTorch · YOLO · FastAPI
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
