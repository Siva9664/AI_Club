// src/pages/projects/pages/ProjectsPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProject, setQuickViewProject] = useState<ProjectItem | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [videoSpeed, setVideoSpeed] = useState<string>('0.6x Slow-Mo');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pitch Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDomain, setFormDomain] = useState('Computer Vision');
  const [formYear, setFormYear] = useState('2nd Year');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.65;
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard!`);
    });
  };

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const cycleVideoSpeed = () => {
    if (!videoRef.current) return;
    if (videoRef.current.playbackRate === 0.65) {
      videoRef.current.playbackRate = 0.4;
      setVideoSpeed('0.4x Ultra Slow-Mo');
    } else if (videoRef.current.playbackRate === 0.4) {
      videoRef.current.playbackRate = 1.0;
      setVideoSpeed('1.0x Normal');
    } else {
      videoRef.current.playbackRate = 0.65;
      setVideoSpeed('0.6x Slow-Mo');
    }
  };

  const categories = ['All', 'Computer Vision', 'Healthcare AI', 'Cybersecurity', 'Robotics & RL', 'NLP & LLMs'];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.languages.some((l) => l.toLowerCase().includes(q)) ||
      p.teamMembers.some((m) => m.name.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handlePitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      showToast(`Thanks ${formName}! Your proposal for [${formDomain}] has been sent to our review team.`);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#07090e] -mx-4 -my-6 px-4 py-6">
      {/* ====================================================================
          1. Hero Section with Running Slow-Mo AI Video Background
          ==================================================================== */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 rounded-xl border border-white/10 bg-[#0a0d14] mb-12">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 contrast-110 brightness-90"
            poster="/assets/images/projects/drone_vision.jpg"
          >
            <source src="/assets/videos/ai_slomo_bg.mp4" type="video/mp4" />
          </video>
          {/* Subtle Matte Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090e]/75 via-[#07090e]/88 to-[#07090e]" />
          <div
            className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]"
            style={{ backgroundSize: '32px 32px' }}
          />
        </div>

        {/* Video Telemetry Controls */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-[#0e121b]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-mono text-slate-400">
          <span className={`w-2 h-2 rounded-full ${isVideoPlaying ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          <span>AI SLOW-MO BG</span>
          <span className="opacity-30">|</span>
          <button onClick={toggleVideoPlay} className="hover:text-white transition">
            {isVideoPlaying ? 'Pause' : 'Play'}
          </button>
          <span className="opacity-30">|</span>
          <button onClick={cycleVideoSpeed} className="hover:text-white transition">
            {videoSpeed}
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300 mb-6 tracking-wide">
            <span className="text-cyan-400">⚡</span>
            <span>ACADEMIC YEAR 2024–2026 • AI INNOVATION CELL</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Engineering Intelligent Systems & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
              Applied AI Architectures
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            We build, train, and deploy real-world machine intelligence. From edge-computed autonomous aerial search
            drones to sub-millimeter 3D neural brain tumor segmentations, explore our flagship systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href="#projects-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white text-slate-900 font-semibold text-sm hover:bg-slate-200 transition shadow"
            >
              <span>Explore All Projects</span>
              <span>↓</span>
            </a>
            <a
              href="#contact-section"
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition"
            >
              <span>Pitch a Project</span>
            </a>
          </div>

          {/* Metric Counters Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-[#0e121b]/80 border border-white/10 backdrop-blur-md">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">14+</span>
              <span className="text-xs uppercase tracking-wider text-slate-400 mt-1">Completed Systems</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">38+</span>
              <span className="text-xs uppercase tracking-wider text-slate-400 mt-1">Student Researchers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold font-mono text-cyan-400">98.4%</span>
              <span className="text-xs uppercase tracking-wider text-slate-400 mt-1">Average Accuracy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">6</span>
              <span className="text-xs uppercase tracking-wider text-slate-400 mt-1">Open Source Repos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. Projects Section (Matching Photo 1 Sketch)
          ==================================================================== */}
      <section id="projects-grid" className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-8">
          <div className="inline-block text-xs font-mono uppercase text-cyan-400 tracking-widest mb-2">
            PORTFOLIO ARCHIVE
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Projects That Our Team Done</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Click on any project card below to access complete technical architectures, live model sandbox playgrounds,
            and individual student contributor rosters.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg bg-[#0e121b] border border-white/10 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-white/10 border border-white/20 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models, tech, members..."
              className="w-full bg-[#07090e] border border-white/10 rounded px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Count Indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
          <span>Showing {filteredProjects.length} of {PROJECTS_DATA.length} Projects</span>
          <span className="text-cyan-400">CLICK ANY CARD FOR FULL PROJECT & TEAM DETAILS</span>
        </div>

        {/* Projects Grid (Boxes as sketched in Photo 1) */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-lg">
            <p className="text-slate-400">No matching projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="group relative bg-[#0e121b]/90 border border-white/10 rounded-lg overflow-hidden flex flex-col cursor-pointer hover:border-white/25 hover:-translate-y-1 transition duration-200 shadow-md"
              >
                {/* UPPER HALF: Project Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e121b] via-[#0e121b]/30 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#07090e]/90 border border-white/10 text-slate-300">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {project.status}
                    </span>
                  </div>

                  {/* Quick Peek Button */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProject(project);
                      }}
                      className="px-2 py-1 rounded bg-[#07090e]/90 border border-white/20 text-white text-[11px] font-medium hover:bg-white/20 transition"
                    >
                      Quick Peek
                    </button>
                  </div>
                </div>

                {/* LOWER HALF: Brief Catchy Idea & Details */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="p-2.5 rounded bg-white/[0.02] border-l-2 border-blue-500 text-xs text-slate-300 mb-4">
                    <span className="block font-mono text-[10px] uppercase text-blue-400 font-semibold mb-0.5">
                      Core Architecture
                    </span>
                    <span className="line-clamp-2">{project.corePart}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-b border-white/10 text-xs font-mono text-slate-400 mb-4">
                    <span>SCORE: <strong className="text-white">{project.metrics.accuracy}</strong></span>
                    <span className="text-cyan-400">{project.metrics.latency}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center -space-x-1.5">
                      {project.teamMembers.map((m) => (
                        <img
                          key={m.name}
                          src={m.photo}
                          alt={m.name}
                          title={`${m.name} (${m.role})`}
                          className="w-6 h-6 rounded-full border border-[#0e121b] object-cover"
                        />
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-slate-300 group-hover:text-cyan-400 transition flex items-center gap-1">
                      <span>Deep Dive</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Compute Infrastructure Banner */}
        <div className="mt-12 p-6 rounded-lg bg-[#0e121b] border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-white mb-2">Empowered by On-Campus AI Compute Infrastructure</h3>
            <p className="text-sm text-slate-400 mb-4">
              All AI Club models are trained and benchmarked on our dedicated department GPU clusters featuring NVIDIA
              DGX workstations, Jetson edge kits, and high-bandwidth optical networking.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">NVIDIA Jetson Orin Nano</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">8x NVIDIA A100 80GB GPUs</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Unitree Robotics Quadruped</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10">PyTorch 2.3 & CUDA 12.2</span>
            </div>
          </div>
          <div className="p-4 rounded bg-[#07090e] border border-white/10 text-center">
            <div className="text-xs font-mono text-emerald-400 mb-1">RESEARCH ACCESS GRANTED</div>
            <div className="text-sm font-semibold text-white mb-3">Want to pitch a new AI project?</div>
            <a
              href="#contact-section"
              className="inline-block w-full py-2 px-4 rounded bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition"
            >
              Submit Project Pitch
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. Contact Us Section (Sample Gmail, LinkedIn, Instagram)
          ==================================================================== */}
      <section id="contact-section" className="max-w-6xl mx-auto pt-10 pb-8 border-t border-white/10">
        <div className="text-center mb-8">
          <div className="text-xs font-mono uppercase text-cyan-400 tracking-widest mb-1">
            COLLABORATE & ENGAGE
          </div>
          <h2 className="text-2xl font-extrabold text-white">Connect With The AI Club</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Channels */}
          <div className="space-y-3">
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Our campus lab is always active with deep learning experiments, robotics trials, and hackathons.
              Connect with us via our official student channels:
            </p>

            {/* Gmail */}
            <div className="flex items-center justify-between p-3.5 rounded bg-[#0e121b] border border-white/10">
              <div>
                <h4 className="text-sm font-semibold text-white">Official Club Gmail</h4>
                <p className="text-xs font-mono text-cyan-400">aiclub.college.official@gmail.com</p>
              </div>
              <button
                onClick={() => copyToClipboard('aiclub.college.official@gmail.com', 'Gmail address')}
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                Copy Email
              </button>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center justify-between p-3.5 rounded bg-[#0e121b] border border-white/10">
              <div>
                <h4 className="text-sm font-semibold text-white">LinkedIn Community</h4>
                <p className="text-xs font-mono text-cyan-400">linkedin.com/company/nexus-ai-club</p>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                Connect ↗
              </a>
            </div>

            {/* Instagram */}
            <div className="flex items-center justify-between p-3.5 rounded bg-[#0e121b] border border-white/10">
              <div>
                <h4 className="text-sm font-semibold text-white">Instagram Daily Feeds</h4>
                <p className="text-xs font-mono text-cyan-400">@nexus_aiclub_official</p>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                Follow ↗
              </a>
            </div>
          </div>

          {/* Pitch Form */}
          <div className="p-6 rounded-lg bg-[#0e121b] border border-white/10">
            <h3 className="text-base font-bold text-white mb-1">Pitch an AI Project or Join a Sprint</h3>
            <p className="text-xs text-slate-400 mb-4">Direct communication pipeline to the AI Club Technical Secretary.</p>

            <form onSubmit={handlePitchSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">College Email ID *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@college.edu"
                    className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Target AI Domain</label>
                  <select
                    value={formDomain}
                    onChange={(e) => setFormDomain(e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Computer Vision">Computer Vision & UAVs</option>
                    <option value="Healthcare AI">Healthcare & Diagnostics</option>
                    <option value="Cybersecurity">Digital Forensics</option>
                    <option value="Robotics & RL">Robotics & SLAM</option>
                    <option value="NLP & LLMs">LLMs & Code Agents</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Academic Year</label>
                  <select
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="2nd Year">2nd Year B.Tech</option>
                    <option value="3rd Year">3rd Year B.Tech</option>
                    <option value="4th Year">Final Year B.Tech</option>
                    <option value="Postgrad">M.Tech / Scholar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Proposal Overview *</label>
                <textarea
                  required
                  rows={3}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Outline your technical approach or specific project ideas..."
                  className="w-full bg-[#07090e] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitting}
                className="w-full py-2 px-4 rounded bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition"
              >
                {formSubmitting ? 'Transmitting...' : 'Transmit Project Pitch'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. Quick View Modal
          ==================================================================== */}
      {quickViewProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setQuickViewProject(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0e121b] border border-white/20 rounded-lg p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ×
            </button>

            <div className="flex gap-4 mb-4">
              <img
                src={quickViewProject.thumbnail}
                alt={quickViewProject.title}
                className="w-36 h-24 object-cover rounded border border-white/10 flex-shrink-0"
              />
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400">
                  {quickViewProject.category}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{quickViewProject.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{quickViewProject.tagline}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 rounded bg-[#07090e] border border-white/10 text-xs mb-4">
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Status</span>
                <span className="text-emerald-400 font-semibold">{quickViewProject.status}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Benchmark</span>
                <span className="text-white font-semibold">{quickViewProject.metrics.accuracy}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Latency</span>
                <span className="text-white font-semibold">{quickViewProject.metrics.latency}</span>
              </div>
              <div>
                <span className="text-slate-500 block uppercase font-mono text-[10px]">Platform</span>
                <span className="text-white font-semibold">{quickViewProject.platform.split('•')[0]}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Executive Summary</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{quickViewProject.executiveSummary}</p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
              <button
                onClick={() => setQuickViewProject(null)}
                className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = quickViewProject.id;
                  setQuickViewProject(null);
                  navigate(`/projects/${id}`);
                }}
                className="px-4 py-1.5 rounded bg-white text-slate-900 font-semibold text-xs hover:bg-slate-200 transition"
              >
                Open Full Project Page →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#0e121b] border border-white/20 text-white text-xs px-4 py-2.5 rounded shadow-lg flex items-center gap-2">
          <span className="text-cyan-400">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
