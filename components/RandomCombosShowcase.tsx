/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { VisualStyle, ArtForm } from '../types';
import { AESTHETICS_CATALOG, ARTISTS_CATALOG, AestheticDetail, ArtistDetail } from '../data/catalogData';
import { AnimalStyleRenderer } from './AnimalStyleRenderer';
import { 
  Dices, 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  Copy, 
  Maximize2, 
  Palette, 
  Brush, 
  Flame, 
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';

interface RandomCombosShowcaseProps {
  onSelectCombo: (config: { visualStyle?: VisualStyle; artForm?: ArtForm; topic?: string }) => void;
  onClose: () => void;
}

interface AnimalComboItem {
  id: string;
  type: 'aesthetic' | 'artist';
  aesthetic?: AestheticDetail;
  artist?: ArtistDetail;
  animal: {
    name: string;
    scientificName: string;
    icon: string;
    promptTopic: string;
    funFact: string;
  };
  promptFormula: string;
}

const ANIMALS_POOL = [
  {
    name: 'Red Panda',
    scientificName: 'Ailurus fulgens',
    icon: '🦊',
    promptTopic: 'Anatomy and Himalayan Habitat of the Red Panda',
    funFact: 'Uses its bushy ringed tail as a blanket in winter snow.'
  },
  {
    name: 'Barn Owl',
    scientificName: 'Tyto alba',
    icon: '🦉',
    promptTopic: 'Silent Flight Mechanics and Night Vision of Barn Owls',
    funFact: 'Has heart-shaped facial disks that channel sound into asymmetrical ears.'
  },
  {
    name: 'Giant Pacific Octopus',
    scientificName: 'Enteroctopus dofleini',
    icon: '🐙',
    promptTopic: 'Neural Decentralization and Camouflage in Giant Octopuses',
    funFact: 'Has three hearts, blue hemocyanin blood, and nine brains.'
  },
  {
    name: 'Panther Chameleon',
    scientificName: 'Furcifer pardalis',
    icon: '🦎',
    promptTopic: 'Nanocrystal Optics and Ballistic Tongues in Chameleons',
    funFact: 'Changes color by shifting microscopic photonic guanine nanocrystals.'
  },
  {
    name: 'Fennec Fox',
    scientificName: 'Vulpes zerda',
    icon: '🦊',
    promptTopic: 'Desert Thermoregulation and Auditory Radar in Fennec Foxes',
    funFact: 'Its 6-inch ears dissipate body heat and pinpoint underground prey.'
  },
  {
    name: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    icon: '🐆',
    promptTopic: 'High-Altitude Hypoxia Adaptations in Snow Leopards',
    funFact: 'Can leap up to 50 feet horizontally in rocky alpine cliffs.'
  },
  {
    name: 'Bioluminescent Jellyfish',
    scientificName: 'Aequorea victoria',
    icon: '🪼',
    promptTopic: 'Green Fluorescent Protein (GFP) Photonics in Deep Sea Jellyfish',
    funFact: 'Emits luciferin-catalyzed blue-green light pulses in the deep abyss.'
  },
  {
    name: 'Keel-Billed Toucan',
    scientificName: 'Ramphastos sulfuratus',
    icon: '🦜',
    promptTopic: 'Keratin Honeycomb Aerodynamics and Thermoregulation in Toucans',
    funFact: 'Its massive beak acts as a biological thermal radiator to cool off.'
  },
  {
    name: 'Sea Otter',
    scientificName: 'Enhydra lutris',
    icon: '🦦',
    promptTopic: 'Kelp Forest Ecology and Tool Use in Sea Otters',
    funFact: 'Has the densest fur of any mammal with over 1 million hairs per square inch.'
  },
  {
    name: 'Capybara',
    scientificName: 'Hydrochoerus hydrochaeris',
    icon: '🦫',
    promptTopic: 'Symbiotic Social Structures in South American Capybaras',
    funFact: 'The largest living rodent on Earth, revered for its ultra-chill nature.'
  },
  {
    name: 'Three-Toed Sloth',
    scientificName: 'Bradypus tridactylus',
    icon: '🦥',
    promptTopic: 'Metabolic Optimization and Algal Symbiosis in Sloths',
    funFact: 'Hosts specialized green microalgae in its fur for camouflage.'
  },
  {
    name: 'Timber Wolf',
    scientificName: 'Canis lupus',
    icon: '🐺',
    promptTopic: 'Pack Hierarchy and Acoustic Howling Triangulation in Wolves',
    funFact: 'Can communicate over 10 miles away with harmonic vocalizations.'
  }
];

// Helper to shuffle and pick N distinct items
function getRandomSubarray<T>(arr: T[], size: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export const RandomCombosShowcase: React.FC<RandomCombosShowcaseProps> = ({
  onSelectCombo,
  onClose
}) => {
  const [combos, setCombos] = useState<AnimalComboItem[]>([]);
  const [rollCount, setRollCount] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [enlargedCombo, setEnlargedCombo] = useState<AnimalComboItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'aesthetics' | 'artists'>('all');

  // Generator for 3 random aesthetics + 3 random artists + 3 random animals
  const generateNewTrios = () => {
    setIsRolling(true);

    // Pick 3 random distinct aesthetics
    const selectedAesthetics = getRandomSubarray(AESTHETICS_CATALOG, 3);
    // Pick 3 random distinct artists
    const selectedArtists = getRandomSubarray(ARTISTS_CATALOG, 3);
    // Pick 6 random distinct animals (3 for aesthetics, 3 for artists)
    const selectedAnimals = getRandomSubarray(ANIMALS_POOL, 6);

    const newCombos: AnimalComboItem[] = [
      // 3 Random Aesthetics
      ...selectedAesthetics.map((aes, idx) => {
        const animal = selectedAnimals[idx];
        return {
          id: `aes-${aes.id}-${idx}`,
          type: 'aesthetic' as const,
          aesthetic: aes,
          animal,
          promptFormula: `Educational infographic detailing the ${animal.promptTopic}, styled in distinct ${aes.name} visual aesthetics, featuring ${aes.palette.join(', ')} color palette, highly structured composition.`
        };
      }),
      // 3 Random Artists
      ...selectedArtists.map((art, idx) => {
        const animal = selectedAnimals[3 + idx];
        return {
          id: `art-${art.id}-${idx}`,
          type: 'artist' as const,
          artist: art,
          animal,
          promptFormula: `Educational masterwork infographic explaining ${animal.promptTopic}, in the iconic artistic style of ${art.name} (${art.eraOrMovement}), with ${art.signatureStyle}, authentic brushwork and color harmony.`
        };
      })
    ];

    setTimeout(() => {
      setCombos(newCombos);
      setRollCount(prev => prev + 1);
      setIsRolling(false);
    }, 280);
  };

  useEffect(() => {
    generateNewTrios();
  }, []);

  const handleCopyPrompt = (combo: AnimalComboItem) => {
    navigator.clipboard.writeText(combo.promptFormula);
    setCopiedId(combo.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredCombos = combos.filter(c => {
    if (activeTab === 'aesthetics') return c.type === 'aesthetic';
    if (activeTab === 'artists') return c.type === 'artist';
    return true;
  });

  return (
    <div className="fixed inset-0 z-[140] bg-slate-950/90 backdrop-blur-xl flex flex-col overflow-y-auto animate-in fade-in duration-300">
      
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-8 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Dices className="w-3.5 h-3.5 text-pink-400" />
                Random Style & Subject Trios
              </span>
              <span className="text-xs text-slate-400">
                Roll #{rollCount}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white mt-1 flex items-center gap-2">
              <span>3 Random Aesthetics & 3 Random Artists × Animals</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Each roll generates 3 fresh aesthetics and 3 fine art masters matched with random wildlife subjects for instant inspiration.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={generateNewTrios}
              disabled={isRolling}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{isRolling ? 'Rolling Trios...' : '🎲 Re-Roll 3 Aesthetics & Artists'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer shadow-md"
              title="Close Showcase"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 flex-1">
        
        {/* Navigation Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All 6 Showcase Combos (3 + 3)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('aesthetics')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'aesthetics'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>3 Random Aesthetics</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('artists')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'artists'
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brush className="w-3.5 h-3.5" />
              <span>3 Random Artists</span>
            </button>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900/40 px-3 py-1.5 rounded-xl border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Click <strong>"Apply to Studio"</strong> to immediately generate with that style & topic.</span>
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCombos.map((item) => {
            const isAesthetic = item.type === 'aesthetic';
            const title = isAesthetic ? item.aesthetic?.displayName : item.artist?.displayName;
            const subtitle = isAesthetic ? item.aesthetic?.category : `${item.artist?.category} • ${item.artist?.eraOrMovement}`;
            const description = isAesthetic ? item.aesthetic?.shortDescription : item.artist?.signatureStyle;
            const palette = isAesthetic ? item.aesthetic?.palette : item.artist?.palette;

            return (
              <div 
                key={item.id}
                className="group relative bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all flex flex-col justify-between"
              >
                {/* Top Type Tag */}
                <div className="p-4 pb-0 flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                    isAesthetic 
                      ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                      : 'bg-pink-500/15 text-pink-300 border-pink-500/30'
                  }`}>
                    {isAesthetic ? <Palette className="w-3 h-3" /> : <Brush className="w-3 h-3" />}
                    <span>{isAesthetic ? 'Aesthetic Style' : 'Master Artist'}</span>
                  </span>

                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <span className="text-base">{item.animal.icon}</span>
                    <span>{item.animal.name}</span>
                  </span>
                </div>

                {/* Main Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col space-y-3.5">
                  
                  {/* Artwork Showcase Display with Zoom */}
                  <div 
                    onClick={() => setEnlargedCombo(item)}
                    className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 cursor-pointer shadow-inner group/art transition-transform hover:scale-[1.01]"
                  >
                    <AnimalStyleRenderer
                      animalName={item.animal.name}
                      styleName={title || ''}
                      styleType={item.type}
                      className="w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/art:opacity-100 transition-opacity flex items-center justify-center p-3 backdrop-blur-[2px]">
                      <div className="px-3 py-1.5 rounded-xl bg-black/70 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Artwork</span>
                      </div>
                    </div>
                  </div>

                  {/* Title and Style Meta */}
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wide">
                      {subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Color Palette Swatches */}
                  {palette && (
                    <div className="flex items-center gap-2 pt-0.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Palette:
                      </span>
                      <div className="flex items-center gap-1">
                        {palette.map((color, cIdx) => (
                          <div 
                            key={cIdx} 
                            className="w-4 h-4 rounded-md border border-white/20 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Animal Topic Suggestion Box */}
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <span>💡 Topic Idea:</span>
                      <span className="text-white truncate">{item.animal.promptTopic}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                      "{item.animal.funFact}"
                    </p>
                  </div>

                </div>

                {/* Card Actions Footer */}
                <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Copy Prompt Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(item)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Copy exact prompt formula"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>

                    {/* Apply Style only */}
                    <button
                      type="button"
                      onClick={() => {
                        if (isAesthetic && item.aesthetic) {
                          onSelectCombo({ visualStyle: item.aesthetic.name });
                        } else if (item.artist) {
                          onSelectCombo({ artForm: item.artist.name });
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer border border-cyan-500/20"
                    >
                      <span>Style Only</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Primary Action: Apply Style & Topic Combo */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isAesthetic && item.aesthetic) {
                        onSelectCombo({ 
                          visualStyle: item.aesthetic.name,
                          topic: item.animal.promptTopic
                        });
                      } else if (item.artist) {
                        onSelectCombo({ 
                          artForm: item.artist.name,
                          topic: item.animal.promptTopic
                        });
                      }
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 ${
                      isAesthetic 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30'
                        : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 shadow-pink-600/30'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Infographic on this Animal</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </main>

      {/* Enlarged Artwork Lightbox Modal */}
      {enlargedCombo && (
        <div className="fixed inset-0 z-[160] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">
                  {enlargedCombo.type === 'aesthetic' ? enlargedCombo.aesthetic?.category : enlargedCombo.artist?.category}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5 flex items-center gap-2">
                  <span>{enlargedCombo.type === 'aesthetic' ? enlargedCombo.aesthetic?.displayName : enlargedCombo.artist?.displayName}</span>
                  <span className="text-slate-400 font-normal">×</span>
                  <span className="text-amber-300">{enlargedCombo.animal.name} {enlargedCombo.animal.icon}</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEnlargedCombo(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High-Res View Area */}
            <div className="p-6 bg-slate-950 flex flex-col items-center justify-center">
              <div className="w-full max-w-xl aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                <AnimalStyleRenderer
                  animalName={enlargedCombo.animal.name}
                  styleName={enlargedCombo.type === 'aesthetic' ? enlargedCombo.aesthetic?.displayName || '' : enlargedCombo.artist?.displayName || ''}
                  styleType={enlargedCombo.type}
                  className="w-full h-full"
                />
              </div>

              <div className="mt-4 w-full max-w-xl p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                <div className="text-slate-400 font-mono text-[10px] uppercase font-bold">Prompt Schema:</div>
                <p className="text-slate-200 mt-1 leading-relaxed font-mono text-[11px]">
                  {enlargedCombo.promptFormula}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCopyPrompt(enlargedCombo)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedId === enlargedCombo.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Prompt</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (enlargedCombo.type === 'aesthetic' && enlargedCombo.aesthetic) {
                    onSelectCombo({ 
                      visualStyle: enlargedCombo.aesthetic.name,
                      topic: enlargedCombo.animal.promptTopic
                    });
                  } else if (enlargedCombo.artist) {
                    onSelectCombo({ 
                      artForm: enlargedCombo.artist.name,
                      topic: enlargedCombo.animal.promptTopic
                    });
                  }
                  setEnlargedCombo(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Apply Style & Topic to Studio</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default RandomCombosShowcase;
