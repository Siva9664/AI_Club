// src/pages/projects/pages/ProjectDetailPage.tsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS_DATA, getProjectById } from '../data/projectsData';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProjectById(id || 'aeroscan-sentinel');

  // Adjacent project navigation
  const allProjects = PROJECTS_DATA;
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  // Simulator State
  const [selectedSampleIdx, setSelectedSampleIdx] = useState(0);
  const [simOutput, setSimOutput] = useState(project.simulator.samples[0]?.result || '');
  const [isSimulating, setIsSimulating] = useState(false);

  // Copy code state
  const [codeCopied, setCodeCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Member Spotlight Modal
  const [spotlightMember, setSpotlightMember] = useState<any>(null);

  const handleRunSample = (idx: number) => {
    setSelectedSampleIdx(idx);
    setIsSimulating(true);
    setTimeout(() => {
      setSimOutput(project.simulator.samples[idx].result);
      setIsSimulating(false);
    }, 400);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(project.codeSnippet).then(() => {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    });
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-[#07090e] -mx-4 -my-6 px-4 py-6">
      {/* Breadcrumbs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-white/10 text-xs text-slate-400 mb-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-white transition">Projects</Link>
          <span>/</span>
          <span className="text-white font-medium">{project.title}</span>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={() => navigate(`/projects/${prevProject.id}`)}
            className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition"
          >
            ← Prev
          </button>
          <button
            onClick={() => navigate(`/projects/${nextProject.id}`)}
            className="px-2.5 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout (Matching Photo 2 Sketch) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* ==================================================================
            LEFT COLUMN (2 Cols on lg): Detailed Technical Content
            ================================================================== */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-400">
                {project.category}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                {project.status}
              </span>
              <span className="text-slate-500">{project.version}</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">{project.title}</h1>
            <p className="text-sm md:text-base text-slate-400">{project.tagline}</p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition inline-flex items-center gap-2"
              >
                GitHub Code
              </a>
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded bg-white text-slate-900 text-xs font-semibold hover:bg-slate-200 transition inline-flex items-center gap-2"
              >
                Live Demo ↗
              </a>
              <button
                onClick={handleShare}
                className="px-3 py-2 rounded bg-white/5 border border-white/10 text-slate-300 text-xs hover:bg-white/10 transition"
              >
                {shareCopied ? 'Link Copied!' : 'Share Project'}
              </button>
            </div>
          </div>

          {/* Banner Image */}
          <div className="rounded-lg overflow-hidden border border-white/10 bg-slate-900">
            <img src={project.bannerImage} alt={project.title} className="w-full max-h-80 object-cover" />
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-[#0e121b] border border-white/10">
            <div className="p-2.5 rounded bg-[#07090e] border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Accuracy</span>
              <span className="text-sm font-bold text-cyan-400 font-mono">{project.metrics.accuracy}</span>
            </div>
            <div className="p-2.5 rounded bg-[#07090e] border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Latency</span>
              <span className="text-sm font-bold text-white font-mono">{project.metrics.latency}</span>
            </div>
            <div className="p-2.5 rounded bg-[#07090e] border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Throughput</span>
              <span className="text-sm font-bold text-white font-mono">{project.metrics.fps}</span>
            </div>
            <div className="p-2.5 rounded bg-[#07090e] border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Payload / Size</span>
              <span className="text-sm font-bold text-white font-mono">{project.metrics.payload}</span>
            </div>
            <div className="p-2.5 rounded bg-[#07090e] border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Scope</span>
              <span className="text-sm font-bold text-white font-mono">{project.metrics.range}</span>
            </div>
            <div className="p-2.5 rounded bg-[#07090e] border border-white/5">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Parameters</span>
              <span className="text-sm font-bold text-white font-mono">{project.metrics.params}</span>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Executive Summary & Main Idea</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{project.executiveSummary}</p>
          </div>

          {/* Core Part Spotlight */}
          <div className="p-4 rounded-lg bg-[#0e121b] border-l-4 border-blue-500 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold tracking-wider">
              Core Architectural Innovation
            </span>
            <p className="text-sm text-slate-200">{project.corePart}</p>
          </div>

          {/* Uses & Applications */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Practical Uses & Industrial Applications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.uses.map((use, i) => (
                <div key={i} className="p-3 rounded bg-[#0e121b] border border-white/10 text-xs text-slate-300 flex gap-2">
                  <span className="text-cyan-400 font-mono font-bold">{i + 1}.</span>
                  <span>{use}</span>
                </div>
              ))}
              {project.applications.map((app, i) => (
                <div key={i} className="p-3 rounded bg-[#0e121b] border border-white/10 text-xs text-slate-300 flex gap-2">
                  <span className="text-emerald-400 font-mono">✦</span>
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Platform & Languages Table */}
          <div className="p-4 rounded-lg bg-[#0e121b] border border-white/10 space-y-3">
            <h3 className="text-sm font-mono uppercase text-slate-400 font-semibold">Technical Ecosystem</h3>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-mono">Target Platform</span>
                <span className="col-span-2 text-cyan-300">{project.platform}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-mono">Languages</span>
                <div className="col-span-2 flex flex-wrap gap-1.5">
                  {project.languages.map((l) => (
                    <span key={l} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-[11px]">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1.5">
                <span className="text-slate-500 font-mono">Frameworks</span>
                <div className="col-span-2 flex flex-wrap gap-1.5">
                  {project.frameworks.map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-[11px]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Code Window */}
          <div className="rounded-lg bg-[#06080e] border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/[0.02] text-xs font-mono text-slate-400">
              <span>pipeline_inference.py</span>
              <button onClick={handleCopyCode} className="hover:text-white transition">
                {codeCopied ? 'Copied! ✓' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>

          {/* Interactive AI Sandbox Simulator */}
          <div className="p-5 rounded-lg bg-[#0e121b] border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>⚡ Interactive AI Model Sandbox</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">● INFERENCE CLUSTER READY</span>
            </div>

            <p className="text-xs text-slate-400">{project.simulator.promptLabel}</p>

            <div className="flex flex-wrap gap-2">
              {project.simulator.samples.map((s, idx) => (
                <button
                  key={s.label}
                  onClick={() => handleRunSample(idx)}
                  className={`px-3 py-1.5 rounded text-xs transition ${
                    selectedSampleIdx === idx
                      ? 'bg-white/15 border border-white/30 text-white'
                      : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded bg-[#07090e] border border-white/10 font-mono text-xs text-emerald-400 min-h-[60px] flex items-center">
              {isSimulating ? (
                <span className="text-cyan-400 animate-pulse">Running inference on NVIDIA Tensor Core...</span>
              ) : (
                <span>&gt;&gt; {simOutput}</span>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================================
            RIGHT COLUMN (1 Col on lg): Team Section (Matches Photo 2 Sketch)
            ================================================================== */}
        <div className="space-y-6">
          {/* Team Group Photo (Top of Right Column) */}
          <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0e121b] shadow-md">
            <div className="relative h-48 w-full bg-slate-900">
              <img src={project.teamPhoto} alt="Team Group" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e121b] via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                <span className="font-semibold uppercase tracking-wider">AI Club Project Squad</span>
                <span className="text-cyan-400">{project.teamMembers.length} Members</span>
              </div>
            </div>
            <div className="p-3 text-xs text-slate-400 leading-relaxed border-t border-white/5">
              Ideated, researched, programmed, and deployed collaboratively by students in the college AI Club innovation cohort.
            </div>
          </div>

          {/* Scrolling Individual Members Stack */}
          <div className="p-4 rounded-lg bg-[#0e121b] border border-white/10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Contributors & Roles</h3>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Scroll to inspect</span>
            </div>

            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
              {project.teamMembers.map((member) => (
                <div key={member.name} className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{member.name}</h4>
                      <p className="text-[11px] font-mono text-cyan-400">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Part Done: </strong>{member.contribution}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((s) => (
                      <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                    <div className="flex gap-2 text-slate-400 font-mono">
                      <a href={member.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub ↗</a>
                      <a href={member.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn ↗</a>
                    </div>
                    <button
                      onClick={() => setSpotlightMember(member)}
                      className="text-blue-400 hover:text-blue-300 font-mono text-[10px]"
                    >
                      Spotlight
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Member Spotlight Modal */}
      {spotlightMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSpotlightMember(null)}
        >
          <div
            className="relative w-full max-w-md bg-[#0e121b] border border-white/20 rounded-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSpotlightMember(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ×
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={spotlightMember.photo}
                alt={spotlightMember.name}
                className="w-14 h-14 rounded-full object-cover border border-cyan-400/40"
              />
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 block">Student Researcher</span>
                <h3 className="text-base font-bold text-white">{spotlightMember.name}</h3>
                <p className="text-xs font-mono text-cyan-400">{spotlightMember.role}</p>
              </div>
            </div>

            <div className="p-3 rounded bg-[#07090e] border border-white/10 text-xs text-slate-300 mb-4 leading-relaxed">
              <div className="font-mono text-[10px] uppercase text-slate-500 mb-1">Contributions</div>
              {spotlightMember.contribution}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSpotlightMember(null)}
                className="px-4 py-1.5 rounded bg-white text-slate-900 text-xs font-semibold hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
