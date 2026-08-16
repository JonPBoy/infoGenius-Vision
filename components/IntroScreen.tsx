/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { Play, Globe } from 'lucide-react';
import Logo, { LogoVariant } from './Logo';

interface IntroScreenProps {
  onComplete: () => void;
  logoVariant: LogoVariant;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete, logoVariant }) => {
  const [phase, setPhase] = useState(0); 
  // 0: Latent Space (Darkness/Particles)
  // 1: Synthetic Convergence (Strands forming)
  // 2: Manifestation (Logo revealed)
  // 3: System Ready

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 500); // 1.0s -> 0.5s
    const timer2 = setTimeout(() => setPhase(2), 1500); // 3.0s -> 1.5s
    const timer3 = setTimeout(() => setPhase(3), 2500); // 5.0s -> 2.5s

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnter = () => {
    onComplete();
  };

  const strands = Array.from({ length: 16 });
  const nodes = Array.from({ length: 24 });

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-display">
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-300px) translateX(var(--tx)); opacity: 0; }
        }
        @keyframes strand-flow {
          0% { stroke-dashoffset: 200; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes lattice-rotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .perspective-2000 { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
      `}</style>

      {/* Atmospheric Background */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Dynamic Gradient Flow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15)_0%,_transparent_70%)] animate-pulse"></div>
        
        {/* Floating Code/Data Particles */}
        {phase >= 0 && Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-cyan-500 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              animation: `float-particle ${Math.random() * 4 + 3}s linear infinite ${Math.random() * 5}s`,
            } as any}
          />
        ))}
      </div>

      {/* Central Interactive Core */}
      <div className="relative w-full max-w-4xl h-[50vh] md:h-[60vh] flex items-center justify-center perspective-2000">
        
        {/* Synthetic Lattice Background Effect */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-2000 ${phase >= 1 ? 'opacity-30 scale-100' : 'opacity-0 scale-50'}`}>
           <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-[0.5px] border-cyan-500/20 rounded-full animate-[lattice-rotate_20s_linear_infinite]">
              <div className="absolute inset-0 border-[0.5px] border-indigo-500/20 rounded-full rotate-45 scale-90"></div>
              <div className="absolute inset-0 border-[0.5px] border-purple-500/20 rounded-full -rotate-45 scale-75"></div>
           </div>
        </div>

        {/* Phase 1: The Strands (Neural Convergence) */}
        {phase === 1 && (
          <svg viewBox="0 0 600 600" className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] pointer-events-none opacity-40">
            {strands.map((_, i) => {
              const angle = (i / strands.length) * Math.PI * 2;
              const x1 = Math.cos(angle) * 300 + 300;
              const y1 = Math.sin(angle) * 300 + 300;
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q 300 300 300 300`}
                  stroke="url(#grad)"
                  strokeWidth="0.5"
                  strokeDasharray="100 100"
                  fill="none"
                  className="animate-[strand-flow_3s_ease-out_infinite]"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              );
            })}
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor="rgb(6,182,212)" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Phase 2: Manifestation */}
        <div className={`relative transition-all duration-1500 ease-out will-change-transform ${phase >= 2 ? 'scale-100 opacity-100 blur-0' : 'scale-75 opacity-0 blur-xl'}`}>
          
          {/* Glowing Aura Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="absolute w-48 h-48 border border-cyan-500/50 rounded-full animate-[pulse-ring_4s_ease-out_infinite]"></div>
             <div className="absolute w-48 h-48 border border-indigo-500/50 rounded-full animate-[pulse-ring_4s_ease-out_infinite_1s]"></div>
             <div className="absolute w-48 h-48 border border-white/20 rounded-full animate-[pulse-ring_4s_ease-out_infinite_2s]"></div>
          </div>

          <div className="relative z-10 bg-slate-900/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)] flex flex-col items-center">
             <Logo variant={logoVariant} size="lg" className="transform-gpu hover:scale-105 transition-transform duration-700" />
             <div className="mt-8 h-1 w-48 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-[2000ms] ease-out ${phase === 3 ? 'w-full' : 'w-0'}`}></div>
             </div>
          </div>

          {/* Orbiting Data Nodes */}
          {phase >= 2 && nodes.map((_, i) => {
            const angle = (i / nodes.length) * 360;
            const radius = 220;
            const x = Math.cos(angle * (Math.PI / 180)) * radius;
            const y = Math.sin(angle * (Math.PI / 180)) * radius;
            return (
              <div 
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_cyan]"
                style={{ 
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px)`,
                  opacity: phase === 3 ? 0.3 : 0,
                  transition: 'opacity 1s ease-out',
                  transitionDelay: `${i * 0.05}s`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* PHASE 3: ACTION UI */}
      <div className={`absolute bottom-16 md:bottom-24 flex flex-col items-center transition-all duration-1000 ${phase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         
         <div className="flex flex-col items-center gap-6 mb-12 text-center pointer-events-none">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-xs md:max-w-md px-6 leading-relaxed">
              Synthesizing domain knowledge into ultra-high-definition interactive structures.
            </p>
         </div>
         
         <button 
            onClick={handleEnter}
            className="group relative"
         >
            {/* Pulsing Button Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/40 transition-all"></div>
            
            <div className="relative px-12 py-4 bg-slate-900 border border-cyan-500/30 rounded-full overflow-hidden flex items-center gap-4 group-hover:border-cyan-400 transition-colors">
                {/* Scanner effect on hover */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                
                <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs">COMMENCE VISUALIZATION</span>
                <Play className="w-4 h-4 text-cyan-400 fill-current group-hover:scale-110 transition-transform" />
            </div>
         </button>
      </div>

      {/* System Status Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-slate-500 tracking-widest font-mono">LLM.CORE: ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-75"></div>
            <span className="text-[10px] text-slate-500 tracking-widest font-mono">NET.VIS: READY</span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Globe className="w-3 h-3" />
            <span className="text-[10px] tracking-widest font-mono">SEARCH: SYNCED</span>
          </div>
      </div>

      {/* Skip Controls */}
      <button 
        onClick={onComplete}
        className="absolute top-10 right-10 text-[10px] text-slate-600 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em] font-bold"
      >
        Skip System Initialization
      </button>

    </div>
  );
};

export default IntroScreen;