/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useMemo } from 'react';
import { VisualStyle } from '../types';
import { AESTHETICS_CATALOG, AestheticDetail } from '../data/catalogData';
import { 
  Palette, 
  Search, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Layers, 
  Filter, 
  Compass, 
  ExternalLink,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Dices
} from 'lucide-react';

interface AestheticsCatalogProps {
  currentStyle: VisualStyle;
  onSelectStyle: (style: VisualStyle) => void;
  onClose: () => void;
  onOpenRandomCombos?: () => void;
}

const CATEGORIES = [
  'All',
  'Futuristic & Sci-Fi',
  'Tactile & Craft',
  'Atmospheric & Retro',
  'Fine & Classic',
  'Modern & Graphic'
] as const;

export const AestheticsCatalog: React.FC<AestheticsCatalogProps> = ({
  currentStyle,
  onSelectStyle,
  onClose,
  onOpenRandomCombos,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAesthetic, setSelectedAesthetic] = useState<AestheticDetail | null>(null);

  const filteredAesthetics = useMemo(() => {
    return AESTHETICS_CATALOG.filter((item) => {
      const matchesSearch = 
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bestFor.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (style: VisualStyle) => {
    onSelectStyle(style);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header & Navigation */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 transition-all shadow-sm flex items-center gap-2 font-bold text-sm cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Infographic Studio</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-500/20">
                  Visual Catalog
                </span>
                <span className="text-xs text-slate-400">
                  {AESTHETICS_CATALOG.length} Distinctive Aesthetics
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mt-1">
                Visual Aesthetics Gallery & Samples
              </h1>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            {onOpenRandomCombos && (
              <button
                type="button"
                onClick={onOpenRandomCombos}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              >
                <Dices className="w-4 h-4 text-pink-500" />
                <span>🎲 3x3 Random Animals & Aesthetics</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSelect('Let AI Decide')}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                currentStyle === 'Let AI Decide'
                  ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-purple-500/30'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Auto (AI Decide)</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Category Filter Tabs */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search aesthetics (e.g., Cyberpunk, Solarpunk, Voxel, Stained Glass)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-slate-400 shadow-sm"
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid of Aesthetic Cards with Side-by-Side Visual Samples */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAesthetics.map((aesthetic) => {
          const isSelected = currentStyle === aesthetic.name;

          return (
            <div
              key={aesthetic.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white dark:bg-slate-900/90 shadow-lg ${
                isSelected
                  ? 'border-purple-500 ring-2 ring-purple-500/40 shadow-purple-500/10 scale-[1.01]'
                  : 'border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-800/80 hover:shadow-xl'
              }`}
            >
              {/* Card Body: Split Left Info & Right Visual Sample */}
              <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
                
                {/* Left Side: Aesthetic Details (7 cols) */}
                <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] font-bold border border-purple-300 dark:border-purple-700/50">
                        {aesthetic.category}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-300 dark:border-emerald-700/50 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Currently Active
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold font-display text-slate-900 dark:text-white">
                      {aesthetic.displayName}
                    </h3>

                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {aesthetic.shortDescription}
                    </p>
                  </div>

                  {/* Best for subjects */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Best Suited For:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {aesthetic.bestFor.map((topic, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette Swatches */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Palette:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {aesthetic.palette.map((color, idx) => (
                        <div 
                          key={idx} 
                          className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Side: Visual Sample Representation (5 cols) */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center">
                  <div className={`w-full h-full min-h-[160px] rounded-2xl bg-gradient-to-br ${aesthetic.visualPreview.bgGradient} p-4 border ${aesthetic.visualPreview.borderStyle} flex flex-col justify-between relative overflow-hidden shadow-inner group/sample`}>
                    
                    {/* Simulated Artistic Motif / Diagram preview */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                          Sample Preview
                        </span>
                        <div 
                          className="w-2.5 h-2.5 rounded-full animate-ping"
                          style={{ backgroundColor: aesthetic.visualPreview.accentColor }}
                        />
                      </div>

                      <div className="mt-3">
                        <div className="text-xs font-bold text-white tracking-wide truncate">
                          {aesthetic.displayName}
                        </div>
                        <div className="text-[10px] text-white/70 mt-0.5 truncate">
                          Visual Composition Sample
                        </div>
                      </div>
                    </div>

                    {/* Distinctive Visual Motifs based on type */}
                    <div className="my-auto py-2 flex items-center justify-center relative z-10">
                      {aesthetic.visualPreview.motifType === 'neon-grid' && (
                        <div className="w-full h-12 border border-cyan-400/40 rounded-lg bg-cyan-950/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                          <div className="w-8 h-8 rounded-full border border-pink-400 flex items-center justify-center text-cyan-300 font-mono text-[10px] shadow-[0_0_10px_#ec4899]">
                            HUD
                          </div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'botanical-sun' && (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-400/80 shadow-[0_0_15px_#f59e0b]"></div>
                          <div className="text-xl">🌿</div>
                          <div className="w-6 h-6 rounded-lg bg-emerald-500/40 border border-emerald-400 flex items-center justify-center text-xs">☀️</div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'synthwave-sun' && (
                        <div className="flex flex-col items-center">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-t from-orange-400 via-pink-500 to-purple-600 shadow-[0_0_20px_#f43f5e]"></div>
                          <div className="w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mt-1"></div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'frosted-glass' && (
                        <div className="w-full p-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-center shadow-lg">
                          <div className="text-[11px] font-semibold text-white">Frosted Glass Aero</div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'stained-glass' && (
                        <div className="grid grid-cols-3 gap-1 w-20 h-10 border-2 border-black rounded p-0.5 bg-black/40">
                          <div className="bg-purple-500 rounded-sm"></div>
                          <div className="bg-blue-500 rounded-sm"></div>
                          <div className="bg-amber-400 rounded-sm"></div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'paper-shadow' && (
                        <div className="relative w-24 h-10">
                          <div className="absolute inset-0 bg-orange-600 rounded-lg shadow-md translate-y-1"></div>
                          <div className="absolute inset-0 bg-orange-400 rounded-lg shadow-lg -translate-y-1 translate-x-1 flex items-center justify-center text-white text-[10px] font-bold">
                            Layer 3D
                          </div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'voxel-block' && (
                        <div className="flex gap-1">
                          <div className="w-5 h-5 bg-indigo-500 border border-indigo-300 shadow-sm rounded-sm"></div>
                          <div className="w-5 h-5 bg-blue-500 border border-blue-300 shadow-sm rounded-sm"></div>
                          <div className="w-5 h-5 bg-purple-500 border border-purple-300 shadow-sm rounded-sm"></div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'swiss-grid' && (
                        <div className="grid grid-cols-2 gap-1 w-full bg-white/10 p-1.5 border-l-4 border-red-500">
                          <div className="text-[11px] font-bold text-white uppercase">HELVETICA</div>
                          <div className="text-[9px] text-red-300 font-mono">1957.GRID</div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'cosmic-stars' && (
                        <div className="flex items-center justify-center gap-1.5 text-lg">
                          <span>✨</span>
                          <span className="text-purple-300 animate-pulse">🌌</span>
                          <span>⭐</span>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'blueprint-lines' && (
                        <div className="w-full border border-blue-400/50 p-1.5 font-mono text-[9px] text-blue-200 bg-blue-950/60 rounded">
                          <div>[DIM: 1920x1080]</div>
                          <div className="text-[8px] text-blue-300">CALIPER TOL: ±0.01</div>
                        </div>
                      )}

                      {aesthetic.visualPreview.motifType === 'ghibli-meadow' && (
                        <div className="flex items-center gap-2 text-xl">
                          <span>☁️</span>
                          <span>🌾</span>
                          <span>🍃</span>
                        </div>
                      )}

                      {!['neon-grid', 'botanical-sun', 'synthwave-sun', 'frosted-glass', 'stained-glass', 'paper-shadow', 'voxel-block', 'swiss-grid', 'cosmic-stars', 'blueprint-lines', 'ghibli-meadow'].includes(aesthetic.visualPreview.motifType) && (
                        <div className="text-center">
                          <Palette className="w-7 h-7 text-white/90 mx-auto" />
                        </div>
                      )}
                    </div>

                    {/* Bottom Tag */}
                    <div className="relative z-10 flex items-center justify-between text-[10px] text-white/70 font-mono">
                      <span>{aesthetic.category}</span>
                      <span className="font-bold text-white">4K Canvas</span>
                    </div>

                  </div>
                </div>

              </div>

              {/* Card Footer: Select Button */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Ready to visualize in this style?
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(aesthetic.name)}
                  className={`px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25 hover:shadow-purple-500/40'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Selected Aesthetic</span>
                    </>
                  ) : (
                    <>
                      <span>Choose {aesthetic.displayName}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AestheticsCatalog;
