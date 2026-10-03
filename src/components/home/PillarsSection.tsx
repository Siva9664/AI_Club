import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Target, 
  Compass, 
  Award, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Activity, 
  BrainCircuit, 
  ShieldCheck, 
  Zap,
  Globe2,
  GitBranch,
  BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';

// ============================================================================
// DATA DEFINITIONS FOR THE 4 PILLARS WITH DIFFERENT MOVING AI/ML BACKGROUNDS
// ============================================================================

interface AimItem {
  icon: React.ElementType;
  title: string;
  desc: string;
  tag: string;
  gradient: string;
  bgImage: string;
}

interface GoalItem {
  phase: string;
  timeline: string;
  title: string;
  desc: string;
  metrics: string;
  accent: string;
  glow: string;
  badge: string;
  bgImage: string;
  bgVector?: string;
}

interface DoneItem {
  badge: string;
  title: string;
  metric: string;
  sub: string;
  detail: string;
  icon: React.ElementType;
  accent: string;
  gradient: string;
  bgImage: string;
  bgVector?: string;
}

interface OngoingItem {
  code: string;
  title: string;
  desc: string;
  status: 'Completed' | 'In Progress';
  stage: string;
  stack: string[];
  link: string;
  glow: string;
  bgImage: string;
  bgVector?: string;
}

// 1. AIM ITEMS (Visionary Aim & Core Research Focus)
const AIM_ITEMS: AimItem[] = [
  {
    icon: BrainCircuit,
    title: 'Neural Discovery',
    desc: 'Investigating sparse transformer primitives, attention token compression, and neuromorphic spike dynamics from mathematical foundations.',
    tag: 'Foundational Theory',
    gradient: 'from-blue-500 to-indigo-600',
    bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: ShieldCheck,
    title: 'Algorithmic Safety',
    desc: 'Verifiable mechanistic interpretability, adversarial bias containment, and strict alignment guardrails against neural drift.',
    tag: 'Alignment & Safety',
    gradient: 'from-emerald-500 to-teal-600',
    bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Zap,
    title: 'Edge Quantization',
    desc: 'Compressing multi-billion parameter networks down to INT4 precision for microsecond execution on constrained silicon runtimes.',
    tag: 'Hardware Synthesis',
    gradient: 'from-amber-500 to-orange-600',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Globe2,
    title: 'Societal Impact',
    desc: 'Architecting vernacular multilingual agents and decentralized edge health diagnostics to solve tangible regional challenges.',
    tag: 'Applied Humanity',
    gradient: 'from-purple-500 to-pink-600',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  },
];

// 2. GOAL ITEMS (Strategic Horizons with Distinct Moving AI Backgrounds)
const GOAL_ITEMS: GoalItem[] = [
  {
    phase: 'Horizon 01',
    timeline: '2026 – 2027',
    title: 'Flagship Academic Dissemination',
    desc: 'Publishing peer-reviewed empirical research across premier symposia (NeurIPS, CVPR, ACL, IEEE Trans), establishing SIET as a globally cited collegiate research center.',
    metrics: 'Target: 8+ Tier-1 Papers/Year',
    accent: 'from-blue-600 to-cyan-500',
    glow: 'rgba(59, 130, 246, 0.2)',
    badge: 'Peer-Reviewed Research',
    bgImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-quantum-tensor.svg',
  },
  {
    phase: 'Horizon 02',
    timeline: '2027 – 2028',
    title: 'Distributed Compute Sovereign Cluster',
    desc: 'Scaling our on-premise compute cluster to over 80 TFLOPS of specialized INT8/FP16 training capacity, guaranteeing uninterrupted neural experimentation for every student researcher.',
    metrics: 'Target: 80+ TFLOPS Lab Capacity',
    accent: 'from-purple-600 to-indigo-500',
    glow: 'rgba(168, 85, 247, 0.2)',
    badge: 'Hardware Scaling',
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-neural-mesh.svg',
  },
  {
    phase: 'Horizon 03',
    timeline: '2028 – 2029',
    title: 'Deep-Tech Venture Incubation',
    desc: 'Translating laboratory algorithmic intellectual property into scalable industrial spin-offs and patented technologies in medical diagnostics, clean energy, and robotics.',
    metrics: 'Target: 3 Incubated Startups',
    accent: 'from-indigo-600 to-rose-500',
    glow: 'rgba(99, 102, 241, 0.2)',
    badge: 'Commercial Spin-Offs',
    bgImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-telemetry-hud.svg',
  },
  {
    phase: 'Horizon 04',
    timeline: '2029 – 2030',
    title: 'National Talent Pipeline',
    desc: 'Cultivating the top 1% of system-level AI engineers proficient in CUDA kernel writing, distributed model parallelism, and production pipeline deployment.',
    metrics: 'Target: 1,000+ Certified Fellows',
    accent: 'from-emerald-600 to-teal-500',
    glow: 'rgba(16, 185, 129, 0.2)',
    badge: 'Elite Engineering',
    bgImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-golden-breakthroughs.svg',
  },
];

// 3. DONE ITEMS (Historic Milestones with Distinct Moving AI Backgrounds)
const DONE_ITEMS: DoneItem[] = [
  {
    badge: 'National Champion',
    title: 'National AI Hackathon Podiums',
    metric: '1st of 1,200+',
    sub: 'Teams Nationwide',
    detail: 'Secured gold medal honors with an autonomous multimodal vision pipeline for emergency vehicular telemetry and traffic routing.',
    icon: Award,
    accent: 'text-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    bgImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-golden-breakthroughs.svg',
  },
  {
    badge: 'Open-Source Ecosystem',
    title: 'Production Frameworks Deployed',
    metric: '18+ Repos',
    sub: '6,500+ GitHub Stars',
    detail: 'Shipped highly optimized quantized inference libraries and vision pipelines adopted by developers across 40+ countries.',
    icon: GitBranch,
    accent: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-neural-mesh.svg',
  },
  {
    badge: 'Human Capital',
    title: 'Engineers Upskilled & Certified',
    metric: '550+ Fellows',
    sub: 'Direct Research Mentorship',
    detail: 'Graduated over five cohorts through rigorous bootcamps spanning PyTorch, CUDA kernels, LLM fine-tuning, and edge robotics.',
    icon: CheckCircle2,
    accent: 'text-emerald-500',
    gradient: 'from-emerald-500 to-teal-500',
    bgImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-quantum-tensor.svg',
  },
  {
    badge: 'Infrastructure',
    title: 'Liquid-Cooled Compute Station',
    metric: '4 Nodes Active',
    sub: '24/7 Research Cluster',
    detail: 'Custom designed and deployed enterprise GPU rigs powering localized LLM weights, vision tokenizers, and synthetic dataset synthesis.',
    icon: Cpu,
    accent: 'text-purple-500',
    gradient: 'from-purple-500 to-indigo-500',
    bgImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-telemetry-hud.svg',
  },
];

// 4. ONGOING ITEMS (Active Research Pipelines with Distinct Moving AI Backgrounds)
const ONGOING_ITEMS: OngoingItem[] = [
  {
    code: 'PIPELINE-01',
    title: 'Project NeuroMesh: Decentralized Agentic Swarms',
    desc: 'Engineering autonomous consensus protocols enabling heterogeneous large language models to deliberate, cross-verify reasoning traces, and execute multi-stage code synthesis without human intervention.',
    status: 'In Progress',
    stage: 'Multi-Agent Consensus & Ray Cluster Stress-Testing',
    stack: ['vLLM', 'LangGraph', 'Ray Core', 'DeepSeek-Coder'],
    link: '/projects',
    glow: 'rgba(59, 130, 246, 0.2)',
    bgImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-telemetry-hud.svg',
  },
  {
    code: 'PIPELINE-02',
    title: 'BioGenomics Vision Core: Edge Oncology Segmentation',
    desc: 'Quantizing 3D convolutional-transformer hybrid networks down to INT4 precision for instantaneous, sub-millimeter histological tumor boundary detection directly on localized hospital edge devices.',
    status: 'In Progress',
    stage: 'Clinical Validation & Sensitivity Calibration',
    stack: ['PyTorch', 'MONAI', 'TensorRT-LLM', 'Jetson AGX Orin'],
    link: '/projects',
    glow: 'rgba(168, 85, 247, 0.2)',
    bgImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-neural-mesh.svg',
  },
  {
    code: 'PIPELINE-03',
    title: 'PolyGlot Indic: Low-Resource Vernacular LLM Tuning',
    desc: 'Fine-tuning specialized foundational tokenizers and parameter-efficient adapters (LoRA) for high-fidelity Tamil and regional dialect comprehension tailored for rural educational equity.',
    status: 'Completed',
    stage: 'Production Vernacular Model Published & Benchmark Verified',
    stack: ['LLaMA-Factory', 'Unsloth', 'HuggingFace', 'QLoRA'],
    link: '/projects',
    glow: 'rgba(16, 185, 129, 0.2)',
    bgImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-quantum-tensor.svg',
  },
  {
    code: 'PIPELINE-04',
    title: 'Neuromorphic Aerial Robotics: GPS-Denied Flight',
    desc: 'Coupling bio-inspired spiking neural networks (SNNs) with event-based silicon retinas to achieve ultra-low latency, zero-shot collision avoidance for micro-drones in subterranean caverns.',
    status: 'In Progress',
    stage: 'Hardware-in-the-Loop Simulation & Subterranean Trials',
    stack: ['ROS 2', 'snnTorch', 'PX4 Autopilot', 'Gazebo'],
    link: '/projects',
    glow: 'rgba(234, 179, 8, 0.2)',
    bgImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    bgVector: '/images/ai-golden-breakthroughs.svg',
  },
];

// ============================================================================
// REUSABLE MOVING AI CARD BACKGROUND COMPONENT
// ============================================================================

const MovingAiCardBackground: React.FC<{
  imageUrl: string;
  vectorSvg?: string;
  accentGlow?: string;
}> = ({ imageUrl, vectorSvg, accentGlow }) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none -z-10">
      {/* 1. Underlying Animated Vector Tech Mesh (Instant Offline Fallback) */}
      {vectorSvg && (
        <img
          src={vectorSvg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-30 scale-105 pointer-events-none"
        />
      )}

      {/* 2. High-Resolution Moving AI Photographic / 3D Render Image with Ken Burns motion */}
      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="w-full h-full object-cover animate-ken-burns scale-105 opacity-25 dark:opacity-20 group-hover:scale-115 group-hover:opacity-35 transition-all duration-700"
      />

      {/* 3. Deep Cinematic Glass Translucent Tint Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/85 to-white/75 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/80 backdrop-blur-md" />

      {/* 4. Ambient Colored Glow Spotlight */}
      {accentGlow && (
        <div
          className="absolute -top-14 -right-14 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
          style={{ background: accentGlow }}
        />
      )}

      {/* 5. Animated Cybernetic Scanline Light Sweep */}
      <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-white/10 dark:via-blue-400/5 to-transparent animate-scanline pointer-events-none" />
    </div>
  );
};

// ============================================================================
// MOTION VARIANTS FOR EXTRAORDINARY MOVING & DISAPPEARING ANIMATIONS
// ============================================================================

const containerMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    filter: 'blur(8px)',
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      duration: 0.26,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

const cardMotionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.92,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 22,
      stiffness: 260,
    },
  },
  exit: {
    opacity: 0,
    y: -25,
    scale: 0.9,
    filter: 'blur(8px)',
    transition: {
      duration: 0.22,
      ease: 'easeInOut',
    },
  },
};

export const PillarsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'aim' | 'goal' | 'done' | 'ongoing'>('all');

  const tabs = [
    { id: 'all', label: 'Complete Overview', count: '16 Highlights', icon: Layers },
    { id: 'aim', label: '1. Visionary Aim', count: '4 Focus Vectors', icon: Target },
    { id: 'goal', label: '2. Strategic Goals', count: '4 Horizons', icon: Compass },
    { id: 'done', label: '3. Proven Breakthroughs', count: '4 Triumphs', icon: Award },
    { id: 'ongoing', label: '4. Active Pipelines', count: '4 Frontiers', icon: Activity },
  ] as const;

  // ============================================================================
  // RENDER FUNCTION: PILLAR I - VISIONARY AIM
  // ============================================================================
  const renderAimPillar = () => (
    <div key="part-aim" className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Target className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Pillar I • Core Mission
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            What is Our Aim?
          </h3>
        </div>
      </div>

      {/* Extraordinary Liquid Glass Hero Panel with Moving AI Synaptic Mesh Background */}
      <motion.div
        variants={cardMotionVariants}
        className="relative group rounded-3xl p-8 md:p-10 border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
      >
        {/* Moving AI Synaptic Background for Aim Charter Panel */}
        <MovingAiCardBackground
          imageUrl="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
          vectorSvg="/images/ai-neural-mesh.svg"
          accentGlow="rgba(59, 130, 246, 0.25)"
        />

        {/* Specular top rim highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

        {/* Moving light sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Laboratory Charter
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
              Democratizing Frontier Compute & Engineering Ethical Human-Centric Machine Cognition
            </h4>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              The fundamental aim of the SIET AI Club and Frontier AI Laboratory is to dismantle the barriers between theoretical mathematics and impactful reality. We cultivate an intellectually rigorous ecosystem where scholars do not merely consume pre-trained APIs, but architect foundational neural mechanisms from fundamental mathematical principles.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our purpose is crystallized in the laboratory’s constitutional ethos: <strong className="text-slate-900 dark:text-white">Learn Artificial Intelligence, Research New Ideas, Solve Real-World Problems, and Build Intelligent Applications</strong> that serve humanitarian advancement with uncompromising ethical alignment.
            </p>
          </div>

          {/* 4 Moving Levitating Sub-Cards, each with its own moving AI image background */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {AIM_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4 + idx * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.04, y: -6 }}
                  className="relative p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group/sub overflow-hidden cursor-default"
                >
                  {/* Moving AI Background for each Sub-Card */}
                  <MovingAiCardBackground imageUrl={item.bgImage} />

                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-white mb-2 bg-gradient-to-tr shadow-sm relative z-10', item.gradient)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold block mb-0.5 relative z-10">
                    {item.tag}
                  </span>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white tracking-wide mb-1 relative z-10">
                    {item.title}
                  </h5>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );

  // ============================================================================
  // RENDER FUNCTION: PILLAR II - STRATEGIC GOALS
  // ============================================================================
  const renderGoalPillar = () => (
    <div key="part-goal" className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Pillar II • Strategic Milestones
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            What is Our Goal?
          </h3>
        </div>
      </div>

      {/* 4 Moving Liquid Glass Horizon Cards with Different Moving AI Backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {GOAL_ITEMS.map((goal, idx) => (
          <motion.div
            key={goal.phase}
            variants={cardMotionVariants}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4.5 + idx * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="relative group rounded-3xl p-6 border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 overflow-hidden"
          >
            {/* Different Moving AI/ML Background for each Goal Card */}
            <MovingAiCardBackground
              imageUrl={goal.bgImage}
              vectorSvg={goal.bgVector}
              accentGlow={goal.glow}
            />

            {/* Top specular highlight edge */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

            {/* Moving specular sheen sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className={cn('w-2 h-2 rounded-full bg-gradient-to-r animate-pulse', goal.accent)} />
                  {goal.phase}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 font-semibold border border-slate-200/80 dark:border-slate-700/80">
                  {goal.timeline}
                </span>
              </div>

              <div className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                {goal.badge}
              </div>

              <h4 className="text-lg font-black text-slate-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {goal.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {goal.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
                {goal.metrics}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // ============================================================================
  // RENDER FUNCTION: PILLAR III - PROVEN BREAKTHROUGHS
  // ============================================================================
  const renderDonePillar = () => (
    <div key="part-done" className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Pillar III • Historic Milestones
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            What Have We Done?
          </h3>
        </div>
      </div>

      {/* 4 Moving Historic Milestone Cards with Different Moving AI Backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DONE_ITEMS.map((item, idx) => {
          const ItemIcon = item.icon;
          return (
            <motion.div
              key={item.title}
              variants={cardMotionVariants}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4.8 + idx * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="relative group rounded-3xl p-6 border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4 overflow-hidden"
            >
              {/* Different Moving AI/ML Background for each Milestone Card */}
              <MovingAiCardBackground
                imageUrl={item.bgImage}
                vectorSvg={item.bgVector}
                accentGlow="rgba(245, 158, 11, 0.2)"
              />

              {/* Top specular highlight edge */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

              {/* Moving light sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/20">
                    {item.badge}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 flex items-center justify-center shadow-xs">
                    <ItemIcon className={cn('w-4 h-4', item.accent)} />
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 relative z-10">
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight flex items-baseline gap-1">
                  <span className="ai-gradient-text">{item.metric}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  {item.sub}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  // ============================================================================
  // RENDER FUNCTION: PILLAR IV - ACTIVE RESEARCH PIPELINES
  // ============================================================================
  const renderOngoingPillar = () => (
    <div key="part-ongoing" className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Pillar IV • Live Research Pipelines
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            What Are We Currently Doing?
          </h3>
        </div>
      </div>

      {/* 4 Moving Active Frontier Pipeline Cards with Different Moving AI Backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ONGOING_ITEMS.map((pipe, idx) => (
          <motion.div
            key={pipe.code}
            variants={cardMotionVariants}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 4.6 + idx * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.02, y: -6 }}
            className="relative group rounded-3xl p-7 border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 overflow-hidden"
          >
            {/* Different Moving AI/ML Background for each Research Pipeline Card */}
            <MovingAiCardBackground
              imageUrl={pipe.bgImage}
              vectorSvg={pipe.bgVector}
              accentGlow={pipe.glow}
            />

            {/* Top specular highlight edge */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none" />

            {/* Moving light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="space-y-3.5 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" />
                  {pipe.code}
                </span>

                {/* STRICT STATUS: COMPLETED OR IN PROGRESS (NO PERCENTAGES) */}
                {pipe.status === 'Completed' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>In Progress</span>
                  </span>
                )}
              </div>

              <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {pipe.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {pipe.desc}
              </p>
            </div>

            {/* Stage & Details */}
            <div className="space-y-3 pt-3 border-t border-slate-200/80 dark:border-slate-800 relative z-10">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span className="text-slate-400 dark:text-slate-500">Phase:</span>
                <strong className="text-slate-800 dark:text-slate-200 font-medium">
                  {pipe.stage}
                </strong>
              </div>

              {/* Tech Stack Chips & Action Link */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {pipe.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-white/80 dark:bg-slate-800/80 border border-white/80 dark:border-white/10 text-slate-600 dark:text-slate-300 font-medium shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  to={pipe.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 shrink-0 ml-2 group/btn"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="four-pillars">
      {/* Dynamic Ambient Fluid Glows behind the section */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-liquid-1" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-purple-500/15 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-liquid-2" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-500/10 dark:bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ==================================================================== */}
        {/* 1. SECTION EDITORIAL HEADER                                          */}
        {/* ==================================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.18]">
            Our Visionary Aim, Strategic Goals &{' '}
            <span className="silver-gradient-text">Living Research Frontier</span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Delivering theoretical breakthroughs and concrete engineering systems. Explore what directs our laboratory, what milestones define our legacy, and the transformative pipelines underway right now.
          </p>

          {/* ==================================================================== */}
          {/* INTERACTIVE TAB CONTROLS WITH GLIDING SPRING INDICATOR              */}
          {/* ==================================================================== */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400',
                    isActive
                      ? 'text-white dark:text-slate-900 shadow-lg shadow-black/20 dark:shadow-white/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-600'
                  )}
                >
                  {/* Sliding Spring Active Indicator (Liquid Silver Metallic) */}
                  {isActive && (
                    <motion.div
                      layoutId="activePillarTabIndicator"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-800 via-slate-900 to-zinc-900 dark:from-slate-100 dark:via-white dark:to-zinc-200 shadow-md -z-10"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }}
                    />
                  )}

                  <Icon className={cn('w-4 h-4', isActive ? 'text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400')} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* ANIMATED CARDS CONTAINER (WITH MOVING & DISAPPEARING ANIMATIONS)      */}
        {/* ==================================================================== */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerMotionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-16"
          >
            {activeTab === 'all' && (
              <>
                {renderAimPillar()}
                {renderGoalPillar()}
                {renderDonePillar()}
                {renderOngoingPillar()}
              </>
            )}
            {activeTab === 'aim' && renderAimPillar()}
            {activeTab === 'goal' && renderGoalPillar()}
            {activeTab === 'done' && renderDonePillar()}
            {activeTab === 'ongoing' && renderOngoingPillar()}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
