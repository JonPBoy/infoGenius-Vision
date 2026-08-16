/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useEffect, useState } from 'react';
import { Loader2, BrainCircuit, BookOpen, Atom, ScrollText, Database, Dna, Microscope, Globe, Compass, Cpu, Network, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoadingProps {
  status: string;
  step: number;
  facts?: string[];
}

const Loading: React.FC<LoadingProps> = ({ status, step, facts = [] }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  
  useEffect(() => {
    if (facts.length > 0) {
      const interval = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % facts.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [facts]);

  // A mix of Icons and Text flying into the center
  const FlyingItem = ({ delay, position, type, content }: { delay: number, position: number, type: 'icon' | 'text', content: any }) => {
    const startLeft = position % 2 === 0 ? '-20%' : '120%';
    const startTop = `${(position * 7) % 100}%`;
    
    return (
      <div 
        className={`absolute flex items-center justify-center font-bold opacity-0 select-none ${type === 'text' ? 'text-cyan-500 dark:text-cyan-400 text-[10px] md:text-xs tracking-[0.2em] bg-white/50 dark:bg-slate-900/50 border border-cyan-500/20 px-2 py-0.5 md:px-3 md:py-1 rounded shadow-[0_0_15px_rgba(6,182,212,0.2)] backdrop-blur-md' : 'text-amber-500 dark:text-amber-400'}`}
        style={{
          animation: `implode 3s infinite ease-in ${delay}s`,
          top: startTop,
          left: startLeft,
          zIndex: 10,
        }}
      >
        {type === 'icon' ? React.createElement(content, { className: "w-5 h-5 md:w-6 md:h-6 filter drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" }) : content}
      </div>
    );
  };

  const aiSteps = [
    { num: 1, label: "CONTEXT", icon: Globe },
    { num: 2, label: "SYNTHESIS", icon: Cpu },
    { num: 3, label: "SPATIAL", icon: Network }
  ];

  const displayStep = Math.max(1, Math.min(step, 3));

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-8 min-h-[400px] md:min-h-[550px] overflow-hidden rounded-3xl bg-slate-50/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 shadow-[0_0_50px_rgba(6,182,212,0.05)] backdrop-blur-3xl transition-colors">
      
      <style>{`
        @keyframes implode {
          0% { transform: scale(1.5) rotate(0deg); opacity: 0; filter: blur(4px); }
          20% { opacity: 1; filter: blur(0px); }
          80% { opacity: 1; filter: blur(0px); }
          100% { transform: scale(0) rotate(360deg); opacity: 0; top: 50%; left: 50%; filter: blur(4px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes pulse-core {
          0%, 100% { box-shadow: 0 0 40px 0 rgba(6, 182, 212, 0.4), inset 0 0 20px 0 rgba(6, 182, 212, 0.2); transform: scale(1); }
          50% { box-shadow: 0 0 80px 20px rgba(6, 182, 212, 0.2), inset 0 0 40px 10px rgba(6, 182, 212, 0.4); transform: scale(1.02); }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* THE REACTOR CORE */}
      <div className="relative z-20 mb-8 md:mb-12 scale-[0.7] md:scale-[1.15] mt-6 md:mt-12 flex items-center justify-center">
        
        {/* Background Network SVG */}
        <svg className="absolute w-[400px] h-[400px] pointer-events-none opacity-20 dark:opacity-30" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" className="text-cyan-500" strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" className="text-indigo-500" strokeWidth="1" strokeDasharray="2 6" />
            {[0, 60, 120, 180, 240, 300].map(deg => {
                const rad = (deg * Math.PI) / 180;
                return (
                    <line 
                        key={deg}
                        x1={200 + Math.cos(rad) * 100} 
                        y1={200 + Math.sin(rad) * 100} 
                        x2={200 + Math.cos(rad) * 150} 
                        y2={200 + Math.sin(rad) * 150} 
                        stroke="currentColor" 
                        className="text-cyan-500" 
                        strokeWidth="1"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                        style={{ animation: `data-flow 2s infinite linear ${deg / 60}s` }}
                    />
                )
            })}
        </svg>

        {/* Outer Rings */}
        <div className="absolute inset-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border-[0.5px] border-cyan-500/10 dark:border-cyan-500/20 rounded-full animate-[spin-slow_30s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#22d3ee]"></div>
            <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-indigo-500 rounded-full -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_#6366f1]"></div>
        </div>
        <div className="absolute inset-0 w-60 h-60 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border border-dashed border-cyan-500/20 dark:border-cyan-400/30 rounded-full animate-[spin-reverse_20s_linear_infinite]"></div>
        <div className="absolute inset-0 w-44 h-44 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border-2 border-indigo-500/20 dark:border-indigo-400/20 rounded-full animate-[spin-slow_10s_linear_infinite]"></div>
        <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border-[3px] border-dotted border-cyan-300/40 dark:border-cyan-300/30 rounded-full animate-[spin-reverse_15s_linear_infinite]"></div>
        
        {/* Glowing Center */}
        <div className="relative bg-white/30 dark:bg-slate-900/50 p-2 rounded-full backdrop-blur-sm animate-[pulse-core_3s_infinite_ease-in-out]">
           <div className="bg-white dark:bg-slate-950 p-4 rounded-full flex items-center justify-center w-28 h-28 relative overflow-hidden ring-1 ring-cyan-500/30 shadow-[inset_0_0_20px_rgba(6,182,212,0.5)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.4)_0%,transparent_70%)] opacity-50 dark:opacity-70 animate-pulse"></div>
              
              <div className="relative w-14 h-14 flex items-center justify-center z-10 text-cyan-600 dark:text-cyan-400">
                  <BrainCircuit className="w-14 h-14 animate-[pulse-core_2s_infinite]" />
              </div>
              
              {/* Inner crosshairs */}
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-cyan-400/30 dark:bg-cyan-500/50 animate-[spin-slow_4s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-0 h-[1px] w-full bg-cyan-400/30 dark:bg-cyan-500/50 animate-[spin-slow_4s_linear_infinite]"></div>
           </div>
        </div>

        {/* Flying Particles IN to the core */}
        <div className="absolute top-1/2 left-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
           <FlyingItem content={BookOpen} type="icon" delay={0} position={1} />
           <FlyingItem content="HISTORY" type="text" delay={0.3} position={2} />
           <FlyingItem content={Microscope} type="icon" delay={0.6} position={3} />
           <FlyingItem content="SCIENCE" type="text" delay={0.9} position={4} />
           <FlyingItem content={Dna} type="icon" delay={1.2} position={5} />
           <FlyingItem content="FACTS" type="text" delay={1.5} position={6} />
           <FlyingItem content={Globe} type="icon" delay={1.8} position={7} />
           <FlyingItem content="DATA" type="text" delay={2.1} position={8} />
           <FlyingItem content={Compass} type="icon" delay={2.4} position={9} />
           <FlyingItem content={ScrollText} type="icon" delay={2.7} position={10} />
        </div>
      </div>

      {/* Dynamic Status Display */}
      <div className="relative z-30 w-full max-w-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white/40 dark:border-white/10 flex flex-col items-center transition-all duration-700 min-h-[160px] md:min-h-[180px] ring-1 ring-black/5 dark:ring-white/5">
        
        {/* Status indicator */}
        <div className="flex items-center gap-4 mb-6">
            <div className="relative w-8 h-8 flex items-center justify-center bg-cyan-100 dark:bg-cyan-900/40 rounded-full border border-cyan-200 dark:border-cyan-500/30">
                {step === 1 && <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-spin" />}
                {step === 2 && <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />}
                {step >= 3 && <Network className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-pulse" />}
                {/* Ping effect */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20 animate-ping"></span>
            </div>
            <h3 className="text-slate-800 dark:text-white font-bold text-sm md:text-base tracking-[0.2em] uppercase font-display border-b border-cyan-200 dark:border-cyan-900/50 pb-1">
              {status}
            </h3>
        </div>

        {/* Fact Carousel */}
        <div className="flex-1 flex items-center justify-center px-4 w-full text-center relative h-[80px]">
            {facts.length > 0 ? (
            <div key={currentFactIndex} className="absolute w-full animate-in slide-in-from-bottom-4 fade-in slide-out-to-top-4 fade-out duration-700 fill-mode-both">
                <p className="text-base md:text-xl text-slate-800 dark:text-slate-200 font-serif-display leading-relaxed italic">
                "{facts[currentFactIndex]}"
                </p>
            </div>
            ) : (
            <div className="absolute w-full flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400 italic font-light text-sm md:text-base animate-pulse">
                <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                    <span>Establishing quantum link...</span>
                </div>
            </div>
            )}
        </div>
        
        {/* AI Pipeline Segmented Progress */}
        <div className="w-full mt-6 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0">
                {/* Active connecting line */}
                <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-1000 ease-in-out shadow-[0_0_10px_#06b6d4]"
                    style={{ width: `${((displayStep - 1) / 2) * 100}%` }}
                ></div>
            </div>
            
            <div className="relative z-10 flex justify-between w-full">
                {aiSteps.map((s, idx) => {
                    const isActive = s.num === displayStep;
                    const isCompleted = Math.max(1, step) > s.num;
                    
                    return (
                        <div key={s.num} className="flex flex-col items-center gap-2 group">
                            <div 
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-700 border-2 
                                ${isActive ? 'bg-cyan-500 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-110' : 
                                  isCompleted ? 'bg-slate-800 dark:bg-slate-800 border-cyan-600 text-cyan-400' : 
                                  'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600'}`}
                            >
                                {isCompleted ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" /> : <s.icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'animate-[pulse-core_2s_infinite]' : ''}`} />}
                            </div>
                            <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : isCompleted ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400/50 dark:text-slate-600'}`}>
                                {s.label}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>

    </div>
  );
};

export default Loading;