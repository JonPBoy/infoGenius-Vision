/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState, useMemo } from 'react';
import { 
  Loader2, 
  BrainCircuit, 
  BookOpen, 
  Atom, 
  ScrollText, 
  Database, 
  Dna, 
  Microscope, 
  Globe, 
  Compass, 
  Cpu, 
  Network, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  GraduationCap, 
  Palette, 
  Layers, 
  Clock, 
  Activity, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface LoadingProps {
  status: string;
  step: number;
  facts?: string[];
  topic?: string;
  level?: string;
  style?: string;
}

interface ResearchMilestone {
  id: string;
  stepNum: number;
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  telemetryLogs: string[];
}

const RESEARCH_MILESTONES: ResearchMilestone[] = [
  {
    id: 'grounding',
    stepNum: 1,
    title: 'Search Grounding & Knowledge Retrieval',
    category: 'Source Discovery',
    icon: Search,
    description: 'Querying authoritative encyclopedic sources & validating real-time scientific data.',
    telemetryLogs: [
      'Querying Google Search grounding indexes...',
      'Validating source authenticity & scholarly references...',
      'Aggregating factual consensus across knowledge domains...',
      'Filtering semantic noise & prioritizing verified insights...'
    ]
  },
  {
    id: 'scaffolding',
    stepNum: 1,
    title: 'Pedagogical Scaffolding & Fact Extraction',
    category: 'Educational Curation',
    icon: GraduationCap,
    description: 'Calibrating comprehension depth, structured explanations, and verified key takeaways.',
    telemetryLogs: [
      'Structuring pedagogical explanation hierarchy...',
      'Extracting core scientific principles & key metrics...',
      'Harmonizing tone for intended audience comprehension...',
      'Synthesizing 5 verified educational takeaway pillars...'
    ]
  },
  {
    id: 'composition',
    stepNum: 2,
    title: 'Visual Composition & Prompt Engineering',
    category: 'Creative Blueprint',
    icon: Palette,
    description: 'Architecting visual spatial layout, harmonious color palette, and aesthetic style cues.',
    telemetryLogs: [
      'Constructing spatial quadrant visual layout...',
      'Mapping aesthetic style tokens & color palette...',
      'Optimizing composition contrast & visual focal points...',
      'Finalizing high-precision generative prompt instructions...'
    ]
  },
  {
    id: 'rendering',
    stepNum: 2,
    title: 'High-Definition Neural Canvas Rendering',
    category: 'Generative Synthesis',
    icon: Atom,
    description: 'Rendering high-resolution infographic canvas, typography layouts, and visual metaphors.',
    telemetryLogs: [
      'Executing neural diffusion rendering pipeline...',
      'Generating high-resolution diagrammatic elements...',
      'Refining lighting, textures, and typography balance...',
      'Validating graphical clarity & visual cohesion...'
    ]
  },
  {
    id: 'hotspots',
    stepNum: 3,
    title: 'Interactive Hotspot & Citation Synthesis',
    category: 'Spatial Mapping',
    icon: Network,
    description: 'Pinpointing spatial coordinates (X/Y), crafting 2-paragraph deep-dives, and linking citations.',
    telemetryLogs: [
      'Analyzing generated canvas for key anatomical landmarks...',
      'Pinpointing high-precision spatial X/Y coordinates...',
      'Authoring comprehensive multi-paragraph explanations...',
      'Binding interactive citation links & finishing synthesis...'
    ]
  }
];

const Loading: React.FC<LoadingProps> = ({ 
  status, 
  step, 
  facts = [], 
  topic = '', 
  level = 'General', 
  style = 'Scientific' 
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [telemetryIndex, setTelemetryIndex] = useState(0);

  // Timer for elapsed seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cycle facts every 4 seconds
  useEffect(() => {
    if (facts.length > 0) {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % facts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [facts]);

  // Cycle telemetry logs every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryIndex((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Calculate active milestone index (0 to 4)
  // Step 1: milestones 0 & 1 (Knowledge + Fact extraction)
  // Step 2: milestones 2 & 3 (Composition + Image rendering)
  // Step 3: milestone 4 (Hotspots + interactive synthesis)
  const currentMilestoneIndex = useMemo(() => {
    if (step <= 1) {
      return elapsedSeconds > 4 ? 1 : 0;
    } else if (step === 2) {
      return elapsedSeconds > 12 ? 3 : 2;
    } else {
      return 4;
    }
  }, [step, elapsedSeconds]);

  // Progress percentage calculation
  const progressPercent = useMemo(() => {
    if (step <= 1) {
      return Math.min(38, 10 + elapsedSeconds * 4);
    } else if (step === 2) {
      return Math.min(78, 40 + (elapsedSeconds - 5) * 3);
    } else {
      return Math.min(95, 80 + (elapsedSeconds - 12) * 2);
    }
  }, [step, elapsedSeconds]);

  const activeMilestone = RESEARCH_MILESTONES[currentMilestoneIndex] || RESEARCH_MILESTONES[0];
  const activeLog = activeMilestone.telemetryLogs[telemetryIndex % activeMilestone.telemetryLogs.length];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 md:mt-8 p-4 md:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-2xl transition-all">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>

      {/* Header Bar: Status, Live Timer, Overall Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm">
            <BrainCircuit className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-lg font-bold text-slate-900 dark:text-white font-display">
                Real-Time Research & Synthesis Engine
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-xs font-bold border border-cyan-500/20">
                LIVE
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Phase:</span> {status}
            </p>
          </div>
        </div>

        {/* Right metrics: Time Elapsed & Completion Progress */}
        <div className="flex items-center gap-4 sm:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <Clock className="w-4 h-4 text-cyan-500" />
            <span>{Math.floor(elapsedSeconds / 60)}m {elapsedSeconds % 60 < 10 ? `0${elapsedSeconds % 60}` : elapsedSeconds % 60}s</span>
          </div>

          <div className="text-right">
            <div className="text-sm md:text-base font-bold font-mono text-cyan-600 dark:text-cyan-400">
              {Math.round(progressPercent)}%
            </div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Completion
            </div>
          </div>
        </div>
      </div>

      {/* Main Continuous Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 my-5 overflow-hidden p-0.5 border border-slate-200/60 dark:border-white/5">
        <div 
          className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(6,182,212,0.6)]"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Grid: Left Specific Milestones Tracker, Right Live Telemetry & Fact Discoveries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 mt-2">
        
        {/* Left Column: 5 Specific Research Milestones List (7 cols) */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-500" /> Specific Research Milestones
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Step {currentMilestoneIndex + 1} of {RESEARCH_MILESTONES.length}
            </span>
          </div>

          {RESEARCH_MILESTONES.map((milestone, idx) => {
            const isCompleted = idx < currentMilestoneIndex;
            const isCurrent = idx === currentMilestoneIndex;
            const isPending = idx > currentMilestoneIndex;
            const IconComponent = milestone.icon;

            return (
              <div 
                key={milestone.id}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                  isCurrent 
                    ? 'bg-cyan-50/80 dark:bg-cyan-950/30 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20 scale-[1.01]' 
                    : isCompleted 
                    ? 'bg-slate-50/80 dark:bg-slate-800/40 border-emerald-500/20 dark:border-emerald-500/20' 
                    : 'bg-white/40 dark:bg-slate-900/30 border-slate-200/50 dark:border-slate-800/50 opacity-60'
                }`}
              >
                {/* Milestone Icon / Status Checkbox */}
                <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                  isCompleted 
                    ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30' 
                    : isCurrent 
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/40 animate-pulse' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}>
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Milestone Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-bold truncate ${
                      isCurrent 
                        ? 'text-cyan-900 dark:text-cyan-200' 
                        : isCompleted 
                        ? 'text-slate-800 dark:text-slate-200' 
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {milestone.title}
                    </h4>

                    {/* Badge */}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50' 
                        : isCurrent 
                        ? 'bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700/50 animate-pulse' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {isCompleted ? 'Completed' : isCurrent ? 'Active' : 'Queued'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Active Sub-Telemetry Log */}
                  {isCurrent && (
                    <div className="mt-2.5 pt-2 border-t border-cyan-500/20 flex items-center gap-2 text-xs font-mono text-cyan-800 dark:text-cyan-300 bg-cyan-500/5 p-1.5 rounded-lg">
                      <Zap className="w-3.5 h-3.5 text-cyan-500 shrink-0 animate-bounce" />
                      <span className="truncate">{activeLog}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Live Telemetry Terminal & Knowledge Stream (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Live Knowledge Discoveries Carousel */}
          <div className="bg-gradient-to-br from-slate-50 to-cyan-50/40 dark:from-slate-950 dark:to-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-5 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Live Knowledge Discoveries
                </span>
                {facts.length > 0 && (
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                    {currentFactIndex + 1}/{facts.length}
                  </span>
                )}
              </div>

              {facts.length > 0 ? (
                <div key={currentFactIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-cyan-500/20 shadow-sm">
                    <p className="text-sm md:text-base font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                      "{facts[currentFactIndex]}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-6 text-slate-400 dark:text-slate-500 space-y-2">
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-500" />
                  <p className="text-xs italic">
                    Retrieving validated encyclopedic facts for your infographic...
                  </p>
                </div>
              )}
            </div>

            {/* Quick Fact Indicator Dots */}
            {facts.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-3 pt-2 border-t border-slate-200/60 dark:border-white/5">
                {facts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentFactIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentFactIndex 
                        ? 'w-6 bg-cyan-500' 
                        : 'w-2 bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Research Context & Parameter Verification Card */}
          <div className="bg-slate-50/80 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Synthesis Parameters
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/60 dark:border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Task</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">{status}</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/60 dark:border-white/5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Grounding</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified Sources
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Loading;
