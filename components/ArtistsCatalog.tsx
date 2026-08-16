/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useMemo } from 'react';
import { ArtForm } from '../types';
import { ARTISTS_CATALOG, ArtistDetail } from '../data/catalogData';
import { ArtistMonkeySample } from './ArtistMonkeySample';
import { 
  Palette, 
  Search, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Layers, 
  Brush, 
  History, 
  ChevronRight,
  ExternalLink,
  Dices,
  Award,
  Eye,
  Maximize2,
  X
} from 'lucide-react';

interface ArtistsCatalogProps {
  currentArtForm: ArtForm;
  onSelectArtForm: (artForm: ArtForm) => void;
  onClose: () => void;
  onOpenRandomCombos?: () => void;
}

const CATEGORIES = [
  'All',
  'Fine Art Masters',
  'Animation & Comics',
  '3D & Physical Craft',
  'Retro & Digital',
  'Historical & Decorative'
] as const;

export const ArtistsCatalog: React.FC<ArtistsCatalogProps> = ({
  currentArtForm,
  onSelectArtForm,
  onClose,
  onOpenRandomCombos,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewModalArtist, setPreviewModalArtist] = useState<ArtistDetail | null>(null);

  const filteredArtists = useMemo(() => {
    return ARTISTS_CATALOG.filter((item) => {
      const matchesSearch = 
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.signatureStyle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.bestFor.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.eraOrMovement.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (artForm: ArtForm) => {
    onSelectArtForm(artForm);
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
              className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 transition-all shadow-sm flex items-center gap-2 font-bold text-sm cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Infographic Studio</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold border border-cyan-500/20">
                  Visual Comparison Directory
                </span>
                <span className="text-xs text-slate-400">
                  {ARTISTS_CATALOG.length} Iconic Master Styles Illustrated
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mt-1">
                Art Forms & Artists Visual Directory
              </h1>
            </div>
          </div>

          {/* Reset to None Button */}
          <button
            type="button"
            onClick={() => handleSelect('None')}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
              currentArtForm === 'None'
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 ring-2 ring-slate-400'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>Standard Style (None)</span>
          </button>
        </div>

        {/* Visual Benchmark Feature Banner */}
        <div className="mt-6 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-xl shrink-0">
              🎨
            </div>
            <div>
              <div className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                <span>Visual Benchmark Comparison: The Iconic Monkey Illustrated Across All {ARTISTS_CATALOG.length} Master Styles</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-400/20 text-[10px] font-mono uppercase text-cyan-200 border border-cyan-400/30">Complete Gallery</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Every card features visual comparison artwork rendered in that artist's signature brushwork, color palette, lighting, and composition.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-cyan-200/80 bg-black/40 px-3 py-1.5 rounded-xl border border-cyan-500/20">
              Tip: Click any artwork to enlarge
            </span>
          </div>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artists & art forms (e.g., Van Gogh, Monet, Ghibli, Warhol, Woodblock)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-slate-400 shadow-sm"
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
                    ? 'bg-cyan-600 text-white shadow-sm shadow-cyan-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Artist & Art Form Cards with Samples on the Right */}
      {filteredArtists.length === 0 ? (
        <div className="max-w-xl mx-auto my-16 text-center p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center text-3xl mx-auto mb-4">
            🎨
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            No artists found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            No master artists matched your search "{searchQuery}" in category "{selectedCategory}".
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            Clear Filters & Show All Artists
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArtists.map((artist) => {
            const isSelected = currentArtForm === artist.name;

            return (
              <div
                key={artist.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white dark:bg-slate-900/90 shadow-lg ${
                  isSelected
                    ? 'border-cyan-500 ring-2 ring-cyan-500/40 shadow-cyan-500/10 scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-800 hover:border-cyan-300 dark:hover:border-cyan-800/80 hover:shadow-xl'
                }`}
              >
              {/* Split Content: Left Details & Right Visual Sample */}
              <div className="p-5 md:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
                
                {/* Left Side: Artist Details (7 cols) */}
                <div className="sm:col-span-6 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 text-[11px] font-bold border border-cyan-300 dark:border-cyan-700/50">
                        {artist.category}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-300 dark:border-emerald-700/50 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Currently Active
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg md:text-xl font-bold font-display text-slate-900 dark:text-white">
                      {artist.displayName}
                    </h3>

                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      {artist.eraOrMovement}
                    </div>

                    <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {artist.signatureStyle}
                    </p>
                  </div>

                  {/* Best Suited For Subjects */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Recommended Topics:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {artist.bestFor.map((topic, i) => (
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
                      {artist.palette.map((color, idx) => (
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

                {/* Right Side: Visual Sample Representation featuring the iconic monkey artwork (6 cols) */}
                <div className="sm:col-span-6 flex flex-col items-center justify-center">
                  <div 
                    onClick={() => setPreviewModalArtist(artist)}
                    className="w-full h-full min-h-[190px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 relative overflow-hidden shadow-inner cursor-pointer group/art transition-transform hover:scale-[1.02]"
                  >
                    {/* Visual Art Sample SVG */}
                    <ArtistMonkeySample 
                      artFormId={artist.id}
                      artFormName={artist.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Hover Overlay with Enlarge Action */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/art:opacity-100 transition-opacity flex items-center justify-center p-3 backdrop-blur-[2px]">
                      <div className="px-3 py-1.5 rounded-xl bg-black/70 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Enlarge Artwork</span>
                      </div>
                    </div>

                    {/* Bottom Floating Technique Caption */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2.5 pointer-events-none">
                      <div className="flex items-center justify-between text-[10px] text-white/90 font-mono">
                        <span className="truncate max-w-[150px] font-semibold">{artist.visualPreview.previewPattern}</span>
                        <span className="bg-cyan-500/40 text-cyan-200 px-1.5 py-0.5 rounded text-[9px] font-bold border border-cyan-400/30">
                          Sample
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Card Footer: Select Button */}
              <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Apply this master's visual style?
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(artist.name)}
                  className={`px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 ${
                    isSelected
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Selected Artist Style</span>
                    </>
                  ) : (
                    <>
                      <span>Apply {artist.displayName}</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>
      )}

      {/* Bottom Action Footer & Renamed Randomizer Section */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Looking for creative style & animal combinations?</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mix and match random aesthetics, master artists, and wildlife subjects for instant inspiration.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {onOpenRandomCombos && (
            <button
              type="button"
              onClick={onOpenRandomCombos}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-purple-500/25 cursor-pointer transition-all active:scale-95"
            >
              <Dices className="w-4 h-4 text-pink-200" />
              <span>🎲 Random Style & Subject Mixer</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
          >
            Back to Infographic Studio
          </button>
        </div>
      </div>

      {/* Lightbox / Modal for Enlarged Artwork Inspection */}
      {previewModalArtist && (
        <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">
                  {previewModalArtist.category} • {previewModalArtist.eraOrMovement}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  {previewModalArtist.displayName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalArtist(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-res enlarged artwork display */}
            <div className="p-6 bg-slate-950 flex flex-col items-center justify-center">
              <div className="w-full max-w-xl aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                <ArtistMonkeySample 
                  artFormId={previewModalArtist.id}
                  artFormName={previewModalArtist.name}
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 text-center max-w-lg">
                <div className="text-sm font-bold text-cyan-300">
                  {previewModalArtist.visualPreview.sampleTitle}
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {previewModalArtist.signatureStyle}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setPreviewModalArtist(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold cursor-pointer"
              >
                Close Preview
              </button>
              
              <button
                type="button"
                onClick={() => {
                  handleSelect(previewModalArtist.name);
                  setPreviewModalArtist(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Apply {previewModalArtist.displayName} Style</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ArtistsCatalog;
