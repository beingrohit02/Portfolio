import { useState } from 'react';
import { Mail, Linkedin, Github, Copy, CheckCircle2, Send, ArrowUpRight, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  accentColor: 'yellow' | 'cyan';
}

export function ContactSection({ accentColor }: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'AI Collaboration / Research',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setFormSubmitted(true);
  };

  const accentText = accentColor === 'yellow' ? 'text-yellow-400' : 'text-cyan-400';
  const accentBg = accentColor === 'yellow' ? 'bg-yellow-400' : 'bg-cyan-400';
  const accentBorder = accentColor === 'yellow' ? 'border-yellow-400/50' : 'border-cyan-400/50';
  const accentGlow = accentColor === 'yellow' ? 'shadow-[0_0_30px_rgba(250,204,21,0.2)]' : 'shadow-[0_0_30px_rgba(34,211,238,0.2)]';

  return (
    <section id="contact" className="py-24 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-neutral-400 tracking-wider">04.</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Connect & Collaborate
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-neutral-800 via-neutral-700 to-transparent" />
        </div>

        {/* Hero Contact Box */}
        <div
          className={`rounded-2xl bg-neutral-950 border ${accentBorder} p-6 sm:p-10 lg:p-12 transition-all ${accentGlow}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Direct Call to Action */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className={`text-xs font-mono uppercase tracking-wider ${accentText}`}>
                  Open For New Opportunities
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight text-balance">
                  Let's build something intelligent together.
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  Open for AI development projects, student hackathons, open-source initiatives, and engineering collaborations. Feel free to reach out directly.
                </p>
              </div>

              {/* Direct Link Action Cards */}
              <div className="space-y-3 pt-2">
                
                {/* Email with 1-click copy */}
                <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded bg-neutral-800 text-yellow-400`}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                        className="text-xs sm:text-sm font-mono text-white hover:text-yellow-400 truncate block transition-colors"
                      >
                        {PORTFOLIO_DATA.profile.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Card */}
                <a
                  href={PORTFOLIO_DATA.profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-400/50 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-neutral-800 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        Professional Network
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-white group-hover:text-yellow-400 transition-colors">
                        linkedin.com/in/beingrohit
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-yellow-400 transition-colors" />
                </a>

                {/* GitHub Card */}
                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-400/50 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-neutral-800 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                        Code Repositories
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-white group-hover:text-yellow-400 transition-colors">
                        github.com/beingrohit02
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-yellow-400 transition-colors" />
                </a>

              </div>
            </div>

            {/* Right Column: Interactive Message Box */}
            <div className="lg:col-span-7 bg-neutral-900/60 p-6 sm:p-8 rounded-xl border border-neutral-800">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white">
                    Message Dispatched to Rohit!
                  </h4>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you for reaching out, {formData.name}. I'll get back to you at{' '}
                    <code className="text-yellow-400">{formData.email}</code> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        topic: 'AI Collaboration / Research',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 rounded-md bg-neutral-800 text-xs font-mono text-neutral-200 hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-yellow-400" />
                      Direct Inquiry Form
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">Response ~24h</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-300">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-300">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@organization.com"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">Inquiry Topic</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-yellow-400"
                    >
                      <option value="AI Collaboration / Research">AI Collaboration & Research</option>
                      <option value="Hackathon Team Formation">Hackathon Team Formation</option>
                      <option value="Project Inquiries / CityPulse AI">Project Inquiries (CityPulse AI / Vision)</option>
                      <option value="Internship & Industry Opportunity">Internship & Industry Opportunity</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-300">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Rohit, I saw your CityPulse AI project and would love to collaborate..."
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-md px-3 py-2 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-yellow-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 rounded-md text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-black flex items-center justify-center gap-2 transition-all ${accentBg} hover:opacity-95 ${accentGlow}`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Rohit</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
