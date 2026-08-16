import React from 'react';
import { 
  Atom, Zap, Globe, Cpu, Sun, Moon, Palette, Shield, Sparkles, 
  Wand2, Compass, Boxes, Binary, Microscope, Landmark,
  Layers, Terminal, Rocket, Diamond, Activity, Infinity, 
  Command, Search, Map, Crown, Triangle, ScanText,
  Hexagon, Layout, FlaskConical, Dna, Brain, Cpu as Silicon, 
  Square, Circle, Play, Wind, Cloud, Flame, Droplets, Leaf, 
  Music, Camera, Monitor, Smartphone, Watch, Pencil
} from 'lucide-react';

export type LogoVariant = 
  | 'specialist' | 'editorial' | 'hardware' | 'organic' | 'creative'
  | 'cyberpunk' | 'swiss' | 'vaporwave' | 'minimalist' | 'luxury'
  | 'midnight' | 'playful' | 'zen' | 'futuristic' | 'nature'
  | 'architect' | 'metropolis' | 'biotech' | 'velocity' | 'glitch'
  | 'titanium' | 'aurora' | 'pixel' | 'discovery' | 'quantum' | 'prestige'
  | 'nebula' | 'blueprint' | 'monolith' | 'prismatic' | 'emerald'
  | 'obsidian' | 'synapse' | 'hex' | 'silicon' | 'atlas'
  | 'catalyst' | 'manual' | 'horizon' | 'lab' | 'genome';

interface LogoProps {
  variant: LogoVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm md:text-base',
    md: 'text-lg md:text-2xl',
    lg: 'text-3xl md:text-5xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  };

  const variants = {
    specialist: {
      font: 'font-mono',
      geniusColor: 'text-cyan-500',
      visionGradient: 'linear-gradient(to right, #00FF00, #00BFFF)', 
      subtitle: 'DATA-DRIVEN INSIGHTS',
      iconColor: 'text-cyan-400',
      icon: Atom
    },
    editorial: {
      font: 'font-display font-black tracking-tighter uppercase',
      geniusColor: 'text-slate-900 dark:text-white',
      visionGradient: 'linear-gradient(to right, #FF0000, #FFD700)', 
      subtitle: 'Knowledge Redefined.',
      iconColor: 'text-red-500',
      icon: Landmark
    },
    hardware: {
      font: 'font-mono uppercase tracking-[0.2em]',
      geniusColor: 'text-slate-400',
      visionGradient: 'linear-gradient(to right, #333333, #888888)', 
      subtitle: 'SPECIALIST INSTRUMENT v1.0',
      iconColor: 'text-slate-500',
      icon: Cpu
    },
    organic: {
      font: 'font-serif italic',
      geniusColor: 'text-amber-900 dark:text-amber-100',
      visionGradient: 'linear-gradient(to right, #556B2F, #78866b)', 
      subtitle: 'Wisdom. Visualized.',
      iconColor: 'text-amber-700',
      icon: Globe
    },
    creative: {
      font: 'font-display font-bold',
      geniusColor: 'text-slate-900 dark:text-white',
      visionGradient: 'linear-gradient(to right, #4B0082, #CCCCFF, #FFC0CB, #FF69B4)', 
      subtitle: 'Visual Knowledge Engine',
      iconColor: 'text-cyan-400',
      icon: Palette
    },
    cyberpunk: {
      font: 'font-display font-black italic tracking-tighter',
      geniusColor: 'text-[#f0f]',
      visionGradient: 'linear-gradient(to right, #f0f, #0ff)',
      subtitle: 'NEO-KNOWLEDGE PROTOCOL',
      iconColor: 'text-[#0ff]',
      icon: Zap
    },
    swiss: {
      font: 'font-sans font-bold tracking-tight',
      geniusColor: 'text-red-600',
      visionGradient: 'linear-gradient(to right, #000, #333)',
      subtitle: 'OBJECTIVE GRAPHIC SYSTEMS',
      iconColor: 'text-red-600',
      icon: Boxes
    },
    vaporwave: {
      font: 'font-display italic font-bold',
      geniusColor: 'text-pink-400',
      visionGradient: 'linear-gradient(to right, #ff71ce, #01cdfe, #05ffa1, #b967ff, #fffb96)',
      subtitle: 'AESTHETIC INTELLIGENCE',
      iconColor: 'text-pink-300',
      icon: Sun
    },
    minimalist: {
      font: 'font-sans font-extralight uppercase tracking-widest',
      geniusColor: 'text-slate-300',
      visionGradient: 'linear-gradient(to right, #666, #999)',
      subtitle: 'LESS IS GENIUS.',
      iconColor: 'text-slate-400',
      icon: Moon
    },
    luxury: {
      font: 'font-serif font-medium tracking-tight',
      geniusColor: 'text-emerald-900 dark:text-emerald-100',
      visionGradient: 'linear-gradient(to right, #D4AF37, #CFB53B)', // Gold
      subtitle: 'PRESTIGE INSIGHTS',
      iconColor: 'text-emerald-700',
      icon: Shield
    },
    midnight: {
      font: 'font-sans font-semibold tracking-tighter',
      geniusColor: 'text-indigo-400',
      visionGradient: 'linear-gradient(to right, #312e81, #1e1b4b)',
      subtitle: 'DARK MODE INTEL',
      iconColor: 'text-indigo-500',
      icon: Binary
    },
    playful: {
      font: 'font-sans font-black uppercase italic',
      geniusColor: 'text-yellow-400',
      visionGradient: 'linear-gradient(to right, #6366f1, #fbbf24)',
      subtitle: 'SMART. FUN. VISUAL.',
      iconColor: 'text-indigo-500',
      icon: Wand2
    },
    zen: {
      font: 'font-serif font-light italic',
      geniusColor: 'text-teal-600',
      visionGradient: 'linear-gradient(to right, #99f6e4, #5eead4)',
      subtitle: 'CLARITY. CALM. DATA.',
      iconColor: 'text-teal-400',
      icon: Sparkles
    },
    futuristic: {
      font: 'font-mono font-bold tracking-[0.4em] uppercase',
      geniusColor: 'text-blue-500',
      visionGradient: 'linear-gradient(to right, #e2e8f0, #94a3b8)',
      subtitle: 'NEXT-HORIZON ENGINE',
      iconColor: 'text-blue-400',
      icon: Compass
    },
    nature: {
      font: 'font-serif font-bold',
      geniusColor: 'text-green-800 dark:text-green-200',
      visionGradient: 'linear-gradient(to right, #3f6212, #166534)',
      subtitle: 'ORGANIC DATA FLOW',
      iconColor: 'text-green-600',
      icon: Microscope
    },
    architect: {
      font: 'font-mono tracking-tighter uppercase',
      geniusColor: 'text-blue-900 dark:text-blue-100',
      visionGradient: 'linear-gradient(to right, #2563eb, #3b82f6)',
      subtitle: 'STRUCTURAL KNOWLEDGE VISUALS',
      iconColor: 'text-blue-600',
      icon: Layers
    },
    metropolis: {
      font: 'font-display font-black tracking-[0.1em] uppercase',
      geniusColor: 'text-slate-800 dark:text-slate-200',
      visionGradient: 'linear-gradient(to bottom, #f59e0b, #d97706)',
      subtitle: 'ART DECO INTELLIGENCE',
      iconColor: 'text-amber-600',
      icon: Landmark
    },
    biotech: {
      font: 'font-sans font-medium',
      geniusColor: 'text-lime-500',
      visionGradient: 'linear-gradient(to right, #10b981, #34d399)',
      subtitle: 'BIOLOGICAL INSIGHT ENGINE',
      iconColor: 'text-lime-400',
      icon: Activity
    },
    velocity: {
      font: 'font-display italic font-black tracking-tighter skew-x-[-6deg]',
      geniusColor: 'text-orange-500',
      visionGradient: 'linear-gradient(to right, #ef4444, #f97316)',
      subtitle: 'HIGH-SPEED DATA RENDER',
      iconColor: 'text-red-500',
      icon: Rocket
    },
    glitch: {
      font: 'font-mono font-bold tracking-tight',
      geniusColor: 'text-cyan-400',
      visionGradient: 'linear-gradient(90deg, #ff00c1 0%, #00fff0 100%)',
      subtitle: 'DIGITAL ANOMALY VIS v2',
      iconColor: 'text-pink-500',
      icon: Terminal
    },
    titanium: {
      font: 'font-sans font-bold tracking-wide uppercase',
      geniusColor: 'text-slate-500 dark:text-slate-400',
      visionGradient: 'linear-gradient(to right, #94a3b8, #cbd5e1, #94a3b8)',
      subtitle: 'INDUSTRIAL GRADE ANALYSIS',
      iconColor: 'text-slate-300',
      icon: Shield
    },
    aurora: {
      font: 'font-display font-medium tracking-tight',
      geniusColor: 'text-indigo-900 dark:text-indigo-100',
      visionGradient: 'linear-gradient(to right, #818cf8, #c084fc, #fb7185)',
      subtitle: 'ETHEREAL INSIGHT FLOW',
      iconColor: 'text-violet-400',
      icon: Infinity
    },
    pixel: {
      font: 'font-mono uppercase',
      geniusColor: 'text-green-500',
      visionGradient: 'linear-gradient(to bottom, #84cc16, #4d7c0f)',
      subtitle: '8-BIT KNOWLEDGE MATRIX',
      iconColor: 'text-green-500',
      icon: Command
    },
    discovery: {
      font: 'font-serif italic font-bold tracking-wide',
      geniusColor: 'text-yellow-800 dark:text-yellow-100',
      visionGradient: 'linear-gradient(to right, #b45309, #78350f)',
      subtitle: 'EXPLORATION & RESEARCH',
      iconColor: 'text-amber-700',
      icon: Map
    },
    quantum: {
      font: 'font-sans font-light tracking-[0.3em] uppercase',
      geniusColor: 'text-purple-400',
      visionGradient: 'linear-gradient(to right, #a855f7, #ec4899)',
      subtitle: 'SUBATOMIC DATA POINTS',
      iconColor: 'text-purple-500',
      icon: Triangle
    },
    prestige: {
      font: 'font-display font-black tracking-tighter uppercase',
      geniusColor: 'text-slate-100',
      visionGradient: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
      subtitle: 'COGNITIVE EXCELLENCE. PREMIER EDITION.',
      iconColor: 'text-yellow-500',
      icon: Crown
    },
    nebula: {
      font: 'font-serif font-light tracking-wide',
      geniusColor: 'text-indigo-300',
      visionGradient: 'radial-gradient(circle, #ff0080, #7928ca)',
      subtitle: 'COSMIC DATA EXPLORATION',
      iconColor: 'text-magenta-400',
      icon: Infinity
    },
    blueprint: {
      font: 'font-mono uppercase',
      geniusColor: 'text-white',
      visionGradient: 'linear-gradient(to right, #3b82f6, #1d4ed8)',
      subtitle: 'TECHNICAL SPECIFICATION v2.0',
      iconColor: 'text-blue-200',
      icon: Map
    },
    monolith: {
      font: 'font-display font-black tracking-[-0.1em] uppercase scale-y-125',
      geniusColor: 'text-slate-900 dark:text-white',
      visionGradient: 'linear-gradient(to bottom, #000, #333)',
      subtitle: 'ABSOLUTE ARCHITECTURAL VISION',
      iconColor: 'text-slate-900 dark:text-white',
      icon: Layers
    },
    prismatic: {
      font: 'font-sans font-black italic tracking-tighter',
      geniusColor: 'text-slate-900 dark:text-white',
      visionGradient: 'linear-gradient(45deg, #f06, #9f6, #06f, #f06)',
      subtitle: 'MULTIDIMENSIONAL INSIGHT',
      iconColor: 'text-cyan-400',
      icon: Sparkles
    },
    emerald: {
      font: 'font-serif font-bold italic tracking-tight',
      geniusColor: 'text-emerald-800 dark:text-emerald-200',
      visionGradient: 'linear-gradient(to right, #059669, #10b981, #059669)',
      subtitle: 'PREMIUM ANALYTIC GEM',
      iconColor: 'text-emerald-500',
      icon: Diamond
    },
    obsidian: {
      font: 'font-sans font-thin uppercase tracking-[0.5em]',
      geniusColor: 'text-slate-400',
      visionGradient: 'linear-gradient(to right, #111, #333, #111)',
      subtitle: 'STEALTH INTELLIGENCE',
      iconColor: 'text-slate-600',
      icon: Shield
    },
    synapse: {
      font: 'font-sans font-semibold tracking-tighter',
      geniusColor: 'text-indigo-600 dark:text-indigo-400',
      visionGradient: 'linear-gradient(to right, #4f46e5, #ec4899)',
      subtitle: 'NEURAL NETWORK VISUALIZER',
      iconColor: 'text-indigo-500',
      icon: Activity
    },
    hex: {
      font: 'font-mono tracking-widest uppercase',
      geniusColor: 'text-slate-700 dark:text-slate-300',
      visionGradient: 'linear-gradient(60deg, #334155, #94a3b8)',
      subtitle: 'GEOMETRIC DATA ALIGNMENT',
      iconColor: 'text-slate-500',
      icon: Hexagon
    },
    silicon: {
      font: 'font-mono font-bold',
      geniusColor: 'text-green-500',
      visionGradient: 'linear-gradient(to right, #000, #111)',
      subtitle: 'LOW-LEVEL LOGIC ENGINE',
      iconColor: 'text-green-400',
      icon: Cpu
    },
    atlas: {
      font: 'font-serif font-black tracking-normal',
      geniusColor: 'text-blue-900 dark:text-blue-100',
      visionGradient: 'linear-gradient(to bottom, #2563eb, #1d4ed8)',
      subtitle: 'UNIVERSAL KNOWLEDGE MAP',
      iconColor: 'text-blue-600',
      icon: Globe
    },
    catalyst: {
      font: 'font-display font-bold uppercase italic skew-x-[-12deg]',
      geniusColor: 'text-red-600',
      visionGradient: 'linear-gradient(to right, #dc2626, #ea580c)',
      subtitle: 'REACTIVE DATA ACCELERATOR',
      iconColor: 'text-red-500',
      icon: Zap
    },
    manual: {
      font: 'font-serif italic font-medium',
      geniusColor: 'text-slate-800 dark:text-slate-200',
      visionGradient: 'linear-gradient(to right, #94a3b8, #64748b)',
      subtitle: 'HAND-CRAFTED VISUAL LOGIC',
      iconColor: 'text-slate-500',
      icon: Pencil
    },
    horizon: {
      font: 'font-sans font-light tracking-[0.2em] uppercase',
      geniusColor: 'text-orange-950 dark:text-orange-50',
      visionGradient: 'linear-gradient(to top, #f97316, #fdba74)',
      subtitle: 'NEXT-GENERATION DAWN',
      iconColor: 'text-orange-500',
      icon: Sun
    },
    lab: {
      font: 'font-mono font-bold tracking-tight',
      geniusColor: 'text-slate-900 dark:text-white',
      visionGradient: 'linear-gradient(to right, #8b5cf6, #d946ef)',
      subtitle: 'EXPERIMENTAL KNOWLEDGE LAB',
      iconColor: 'text-violet-500',
      icon: FlaskConical
    },
    genome: {
      font: 'font-sans font-bold flex items-center',
      geniusColor: 'text-teal-600 dark:text-teal-400',
      visionGradient: 'linear-gradient(to bottom, #14b8a6, #2dd4bf)',
      subtitle: 'DNA OF DIGITAL INFORMATION',
      iconColor: 'text-teal-500',
      icon: Dna
    }
  };

  const active = variants[variant];
  const IconComponent = active.icon;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-white/10 relative z-10 shadow-sm`}>
         <IconComponent className={`${iconSizes[size]} ${active.iconColor} animate-pulse`} />
      </div>
      <div className="flex flex-col justify-center">
          <div className={`${sizeClasses[size]} ${active.font} leading-tight whitespace-nowrap text-slate-900 dark:text-white`}>
            info<span 
              className="text-transparent bg-clip-text inline-block" 
              style={{ backgroundImage: active.visionGradient }}
            >
              VISION
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-[1px] w-4 bg-gradient-to-r from-slate-500/50 to-transparent"></div>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 font-bold">
              {active.subtitle}
            </span>
          </div>
      </div>
    </div>
  );
};

export default Logo;
