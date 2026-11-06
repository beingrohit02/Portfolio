import { useState } from 'react';
import { ArrowRight, Terminal, Github, Linkedin, Play, CheckCircle2, Copy } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  accentColor: 'yellow' | 'cyan';
}

export function Hero({ accentColor }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'terminal'>('code');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'Rohit AI Workstation v1.0 [Ready]',
    'Type "help" or click quick commands below.',
    'System status: 1st Year B.Tech CSE (AI&DS) @ NIU',
  ]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const pythonSnippet = `import cv2
import torch
from fastapi import FastAPI
from ultralytics import YOLO

app = FastAPI(title="CityPulse AI Engine")
model = YOLO("yolov8n.pt")  # Real-time urban edge weights

@app.post("/v1/analyze-junction")
async def process_traffic_feed(frame_data: bytes):
    # Real-time multi-agent inference at 30 FPS
    detections = model.predict(frame_data, conf=0.45)
    priority_score = compute_priority_triage(
        detections=detections,
        emergency_corridor=True
    )
    return {"status": "ACTIVE", "score": priority_score}`;

  const handleRunCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs = [...terminalLogs, `$ ${cmd}`];

    if (trimmed === 'help') {
      newLogs.push('Available commands: skills, citypulse, contact, status, clear');
    } else if (trimmed === 'skills') {
      newLogs.push('Core: Python (PyTorch, OpenCV, YOLO, FastAPI), C++, React, RAG');
    } else if (trimmed === 'projects' || trimmed === 'citypulse' || trimmed === 'project') {
      newLogs.push('Flagship: CityPulse AI — https://github.com/beingrohit02/CityPulse');
    } else if (trimmed === 'contact') {
      newLogs.push('Email: rk83af@gmail.com | LinkedIn: beingrohit | GitHub: beingrohit02');
    } else if (trimmed === 'status') {
      newLogs.push('Enrolled: 1st-Year B.Tech CSE (AI & DS) @ NIAT x Noida International University');
    } else if (trimmed === 'clear') {
      setTerminalLogs(['Console cleared. Type "help" for options.']);
      setTerminalInput('');
      return;
    } else {
      newLogs.push(`Command not recognized: "${trimmed}". Type "help" for options.`);
    }

    setTerminalLogs(newLogs.slice(-12));
    setTerminalInput('');
  };

  const handleSimulateInference = () => {
    setIsSimulating(true);
    setActiveTab('terminal');
    setTerminalLogs((prev) => [
      ...prev,
      '$ python -m citypulse.inference --source junction_4a.mp4',
      '[*] Initializing YOLOv8n TensorRT runtime...',
      '[*] Video Stream: 1920x1080 @ 30 FPS (H.264)',
      '[+] Frame 014: 18 cars, 2 buses, 1 ambulance [CONF: 0.94]',
      '[!] Emergency Preemption Triggered: Priority 88/100 [CRITICAL]',
      '[✓] Green wave signal corridor enabled on North Arterial.',
    ]);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const accentText = accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
  const accentBg = accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400';
  const accentBorder = accentColor === 'yellow' ? 'border-yellow-400' : 'border-cyan-400';
  const accentGlow = accentColor === 'yellow' ? 'shadow-[0_0_25px_rgba(250,204,21,0.25)]' : 'shadow-[0_0_25px_rgba(34,211,238,0.25)]';

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden cyber-grid">
      {/* Glow gradient backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Hero Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Profile Avatar Badge & Status Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#about"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-yellow-400/60 transition-colors"
                title="View Rohit's Profile & Academic Background"
              >
                <Terminal className="w-3.5 h-3.5 text-yellow-400 group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-mono text-neutral-300 font-medium">Rohit · NIU '28</span>
              </a>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${accentBg}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${accentBg}`} />
                </span>
                <span>Available for AI Projects</span>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                Hi, I'm <span className={accentText}>Rohit</span>.
              </h1>
              <p className="text-xl sm:text-2xl font-display font-medium text-neutral-200">
                1st-Year B.Tech CSE (AI & DS) Student
                <span className="block text-neutral-400 text-base sm:text-lg font-normal mt-1">
                  @ NIAT x Noida International University (NIU)
                </span>
              </p>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
              Building intelligent systems with <strong className="text-white font-semibold">Artificial Intelligence</strong>,{' '}
              <strong className="text-white font-semibold">Computer Vision</strong>, and{' '}
              <strong className="text-white font-semibold">Large Language Models</strong>. Crafting practical AI pipelines with Python, PyTorch, and FastAPI.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold font-mono uppercase tracking-wider text-black rounded-md transition-all ${accentBg} hover:opacity-95 ${accentGlow}`}
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rohit's GitHub Profile"
                  className="p-3 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Rohit's LinkedIn Profile"
                  className="p-3 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Tech Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-400">
              <span className="text-neutral-500">Core Toolkit:</span>
              <span className="text-neutral-200">Python</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-200">PyTorch</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-200">OpenCV</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-200">YOLO</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-200">FastAPI</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-200">RAG</span>
            </div>

          </div>

          {/* Right Column: Cyber Code Terminal */}
          <div className="lg:col-span-5">
            <div
              className={`rounded-xl bg-[#0d0d0d] border border-neutral-800 overflow-hidden shadow-2xl transition-all ${accentGlow}`}
            >
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                
                {/* Tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'code'
                        ? 'bg-neutral-800 text-white font-medium'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    citypulse_engine.py
                  </button>
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                      activeTab === 'terminal'
                        ? 'bg-neutral-800 text-white font-medium'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    interactive_cli
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {activeTab === 'code' ? (
                    <button
                      onClick={handleCopyCode}
                      title="Copy code"
                      className="text-neutral-400 hover:text-white p-1"
                    >
                      {copiedCode ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Terminal Body */}
              {activeTab === 'code' ? (
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-neutral-300">
                  <div className="space-y-1">
                    <p><span className="text-purple-400">import</span> cv2</p>
                    <p><span className="text-purple-400">import</span> torch</p>
                    <p><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI</p>
                    <p><span className="text-purple-400">from</span> ultralytics <span className="text-purple-400">import</span> YOLO</p>
                    <p className="text-neutral-600"># Model: CityPulse Urban Edge Detector</p>
                    <p>app = FastAPI(title=<span className="text-green-400">"CityPulse AI Engine"</span>)</p>
                    <p>model = YOLO(<span className="text-green-400">"yolov8n.pt"</span>)</p>
                    <p className="pt-2"><span className="text-blue-400">@app.post</span>(<span className="text-green-400">"/v1/analyze-junction"</span>)</p>
                    <p><span className="text-purple-400">async def</span> <span className="text-yellow-300">process_traffic_feed</span>(frame_data: <span className="text-cyan-400">bytes</span>):</p>
                    <p className="pl-4 text-neutral-400"># Real-time multi-agent inference at 30 FPS</p>
                    <p className="pl-4">detections = model.predict(frame_data, conf=<span className="text-amber-400">0.45</span>)</p>
                    <p className="pl-4">priority_score = compute_priority_triage(</p>
                    <p className="pl-8">detections=detections,</p>
                    <p className="pl-8">emergency_corridor=<span className="text-purple-400">True</span></p>
                    <p className="pl-4">)</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> &#123;<span className="text-green-400">"status"</span>: <span className="text-green-400">"ACTIVE"</span>, <span className="text-green-400">"score"</span>: priority_score&#125;</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">Python 3.11 · PyTorch CUDA · FastAPI</span>
                    <button
                      onClick={handleSimulateInference}
                      disabled={isSimulating}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-black rounded transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isSimulating ? 'Running...' : 'Run Inference'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-5 font-mono text-xs text-neutral-300 space-y-2 min-h-[290px] flex flex-col justify-between">
                  <div className="space-y-1 overflow-y-auto max-h-[200px]">
                    {terminalLogs.map((log, idx) => (
                      <p
                        key={idx}
                        className={
                          log.startsWith('$')
                            ? 'text-yellow-400 font-semibold'
                            : log.includes('[!]')
                            ? 'text-amber-400'
                            : log.includes('[+]') || log.includes('[✓]')
                            ? 'text-green-400'
                            : 'text-neutral-300'
                        }
                      >
                        {log}
                      </p>
                    ))}
                  </div>

                  {/* Terminal input line & quick actions */}
                  <div className="pt-2 border-t border-neutral-800 space-y-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleRunCommand(terminalInput);
                      }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-yellow-400 font-bold">$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="type 'skills', 'projects', or 'help'..."
                        className="bg-transparent w-full text-white focus:outline-none placeholder-neutral-600"
                      />
                    </form>
                    <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-neutral-400">
                      <span>Quick:</span>
                      {['skills', 'citypulse', 'status', 'clear'].map((cmd) => (
                        <button
                          key={cmd}
                          type="button"
                          onClick={() => handleRunCommand(cmd)}
                          className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
