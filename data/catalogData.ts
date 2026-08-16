/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { VisualStyle, ArtForm } from '../types';

export interface AestheticDetail {
  id: string;
  name: VisualStyle;
  displayName: string;
  category: 'Futuristic & Sci-Fi' | 'Tactile & Craft' | 'Atmospheric & Retro' | 'Fine & Classic' | 'Modern & Graphic';
  shortDescription: string;
  fullDescription: string;
  bestFor: string[];
  palette: string[];
  tags: string[];
  visualPreview: {
    bgGradient: string;
    accentColor: string;
    borderStyle: string;
    motifType: 'neon-grid' | 'botanical-sun' | 'synthwave-sun' | 'frosted-glass' | 'candle-brass' | 'abyssal-glow' | 'stained-glass' | 'paper-shadow' | 'voxel-block' | 'swiss-grid' | 'clay-tactile' | 'cosmic-stars' | 'blueprint-lines' | 'riso-dots' | 'ghibli-meadow' | 'liminal-sky' | 'steampunk-gears' | 'noir-rain' | 'hologram-iridescent' | 'fantasy-parchment' | 'minimal-vector' | 'sketch-ink' | 'photoreal' | 'cartoon-comic' | 'vintage-etching';
  };
}

export interface ArtistDetail {
  id: string;
  name: ArtForm;
  displayName: string;
  category: 'Fine Art Masters' | 'Animation & Comics' | '3D & Physical Craft' | 'Retro & Digital' | 'Historical & Decorative';
  eraOrMovement: string;
  signatureStyle: string;
  description: string;
  bestFor: string[];
  palette: string[];
  visualPreview: {
    bgGradient: string;
    accentColor: string;
    sampleSymbol: string;
    previewPattern: string;
    sampleTitle: string;
    sampleSubtitle: string;
  };
}

export const AESTHETICS_CATALOG: AestheticDetail[] = [
  {
    id: 'cyberpunk-neon-hud',
    name: 'Cyberpunk Neon HUD',
    displayName: 'Cyberpunk Neon HUD',
    category: 'Futuristic & Sci-Fi',
    shortDescription: 'High-tech obsidian interface with glowing electric cyan & magenta neon UI wireframes and telemetry readouts.',
    fullDescription: 'Constructs an ultra-modern holographic HUD visual schema on a deep matte obsidian backdrop. Features intricate glowing wireframes, telemetry telemetry meters, cybernetic circuitry accents, and crisp luminous data overlays.',
    bestFor: ['Quantum Computing', 'Artificial Intelligence', 'Cybersecurity', 'Neuroscience', 'Space Robotics'],
    palette: ['#06b6d4', '#ec4899', '#3b82f6', '#0f172a'],
    tags: ['Sci-Fi', 'High-Tech', 'Neon', 'Telemetry', 'Hologram'],
    visualPreview: {
      bgGradient: 'from-slate-950 via-slate-900 to-cyan-950',
      accentColor: '#06b6d4',
      borderStyle: 'border-cyan-500/40',
      motifType: 'neon-grid'
    }
  },
  {
    id: 'solarpunk-utopia',
    name: 'Solarpunk Utopia',
    displayName: 'Solarpunk Utopia',
    category: 'Modern & Graphic',
    shortDescription: 'Bright golden sunlight, lush biophilic architecture, curved solar tech, and hopeful ecological harmony.',
    fullDescription: 'An optimistic ecological vision fusing high-efficiency green energy with organic architecture. Uses warm terracotta, emerald leaf canopies, golden sunlight reflections, and clean curved glass structures.',
    bestFor: ['Renewable Energy', 'Urban Ecology', 'Botany & Permaculture', 'Clean Tech', 'Sustainable Architecture'],
    palette: ['#10b981', '#f59e0b', '#065f46', '#fef3c7'],
    tags: ['Eco', 'Solar', 'Optimistic', 'Lush Greenery', 'Clean Energy'],
    visualPreview: {
      bgGradient: 'from-emerald-950 via-teal-900 to-amber-950',
      accentColor: '#10b981',
      borderStyle: 'border-emerald-500/40',
      motifType: 'botanical-sun'
    }
  },
  {
    id: 'synthwave-retrowave',
    name: 'Synthwave Retrowave',
    displayName: '80s Synthwave & Retrowave',
    category: 'Atmospheric & Retro',
    shortDescription: 'Outrun sunset gradients, glowing wireframe horizon grids, chrome typography, and 1980s neon nostalgia.',
    fullDescription: 'Channelling the iconic 1980s retro-futuristic aesthetic. Saturated magenta-to-orange gradient horizon, receding perspective grids, chrome reflections, and electronic synthesizer nostalgia.',
    bestFor: ['Video Game History', 'Computing in the 80s', 'Audio Synthesizers', 'Pop Culture History', 'Digital Media Evolution'],
    palette: ['#f43f5e', '#8b5cf6', '#f97316', '#1e1b4b'],
    tags: ['80s', 'Retro', 'Outrun', 'Neon Grid', 'Chrome'],
    visualPreview: {
      bgGradient: 'from-pink-950 via-purple-900 to-indigo-950',
      accentColor: '#f43f5e',
      borderStyle: 'border-pink-500/40',
      motifType: 'synthwave-sun'
    }
  },
  {
    id: 'glassmorphism-aero',
    name: 'Glassmorphism Aero',
    displayName: 'Glassmorphism Aero',
    category: 'Modern & Graphic',
    shortDescription: 'Translucent frosted glass panels, iridescent refractions, soft blur depth, and floating dimensional layers.',
    fullDescription: 'A breath of fresh air featuring floating multi-plane frosted glass tiles, luminous spectral background glows, clean micro-typography, and crisp backdrop blur effects.',
    bestFor: ['Modern App Architecture', 'Financial Economics', 'Meteorology & Atmosphere', 'Cloud Infrastructure', 'Product Analytics'],
    palette: ['#38bdf8', '#818cf8', '#c084fc', '#0f172a'],
    tags: ['Frosted Glass', 'Modern UI', 'Translucent', 'Clean', 'Aero'],
    visualPreview: {
      bgGradient: 'from-slate-900 via-sky-950 to-indigo-950',
      accentColor: '#38bdf8',
      borderStyle: 'border-sky-400/40',
      motifType: 'frosted-glass'
    }
  },
  {
    id: 'dark-academia',
    name: 'Dark Academia',
    displayName: 'Dark Academia',
    category: 'Atmospheric & Retro',
    shortDescription: 'Rich mahogany, brass instruments, vintage anatomical engravings, antique paper, and scholarly candlelight.',
    fullDescription: 'Evokes centuries of scholarly inquiry inside Gothic libraries. Deep oak and parchment tones, sepia-tinted anatomical sketches, brass astrolabes, and candlelit museum ambiance.',
    bestFor: ['Classical Literature', 'Ancient History', 'Philosophy', 'Anatomy & Medicine History', 'Medieval Architecture'],
    palette: ['#d97706', '#78350f', '#451a03', '#fef3c7'],
    tags: ['Scholarly', 'Antique', 'Mahogany', 'Engravings', 'Library'],
    visualPreview: {
      bgGradient: 'from-amber-950 via-stone-900 to-amber-950',
      accentColor: '#d97706',
      borderStyle: 'border-amber-600/40',
      motifType: 'candle-brass'
    }
  },
  {
    id: 'bioluminescent-deep-sea',
    name: 'Bioluminescent Deep Sea',
    displayName: 'Bioluminescent Deep Sea',
    category: 'Atmospheric & Retro',
    shortDescription: 'Pitch-black abyssal ocean backdrop with electric turquoise, neon coral, and ethereal floating particles.',
    fullDescription: 'Plunges into the mysterious midnight ocean zone. Radiant glowing organisms with turquoise, electric cyan, and neon violet light emissions floating gracefully in deep marine darkness.',
    bestFor: ['Marine Biology', 'Oceanography', 'Deep-Sea Trenches', 'Bioluminescence Biochemistry', 'Abyssal Ecosystems'],
    palette: ['#2dd4bf', '#06b6d4', '#6366f1', '#020617'],
    tags: ['Ocean', 'Deep Sea', 'Radiant Glow', 'Turquoise', 'Ethereal'],
    visualPreview: {
      bgGradient: 'from-slate-950 via-teal-950 to-cyan-950',
      accentColor: '#2dd4bf',
      borderStyle: 'border-teal-400/40',
      motifType: 'abyssal-glow'
    }
  },
  {
    id: 'stained-glass-gothic',
    name: 'Stained Glass Gothic',
    displayName: 'Gothic Stained Glass',
    category: 'Fine & Classic',
    shortDescription: 'Radiant jewel-toned light passing through stained glass panels with bold lead caming outlines & sacred geometry.',
    fullDescription: 'Transforms knowledge into illuminated cathedral artwork. Bold black lead outlines framing ruby, cobalt, emerald, and amber glass segments with radiant sunlight transmission.',
    bestFor: ['Religious History', 'European Architecture', 'Theology', 'Medieval Art', 'Mythology & Legends'],
    palette: ['#a855f7', '#3b82f6', '#ef4444', '#eab308'],
    tags: ['Cathedral', 'Lead Caming', 'Jewel Tones', 'Sacred Geometry', 'Illuminated'],
    visualPreview: {
      bgGradient: 'from-purple-950 via-indigo-950 to-blue-950',
      accentColor: '#a855f7',
      borderStyle: 'border-purple-400/40',
      motifType: 'stained-glass'
    }
  },
  {
    id: 'papercut-shadowbox',
    name: 'Papercut Shadowbox',
    displayName: 'Papercut 3D Shadowbox',
    category: 'Tactile & Craft',
    shortDescription: 'Multi-layered textured craft paper with deep cast shadows, ambient backlighting, and physical tactile depth.',
    fullDescription: 'Constructs the infographic as a physical layered shadowbox made from colored craft paper tiers. Deep drop shadows between paper layers create tangible depth and handcrafted tactile warmth.',
    bestFor: ['Children Education', 'Zoology & Animals', 'Geography & Landforms', 'Storytelling', 'Environmental Habitats'],
    palette: ['#fb923c', '#f97316', '#ea580c', '#fff7ed'],
    tags: ['Craft', '3D Paper', 'Shadowbox', 'Layered', 'Tactile'],
    visualPreview: {
      bgGradient: 'from-orange-950 via-amber-950 to-stone-900',
      accentColor: '#fb923c',
      borderStyle: 'border-orange-500/40',
      motifType: 'paper-shadow'
    }
  },
  {
    id: 'isometric-voxel',
    name: 'Isometric Voxel',
    displayName: 'Isometric 3D Voxel Diorama',
    category: 'Tactile & Craft',
    shortDescription: '3D cubic pixel art diorama with clean vibrant colors, tilt-shift depth of field, and volumetric block construction.',
    fullDescription: 'Visualizes subjects through charming volumetric cubes in an isometric perspective. Crisp edges, playful toy-like miniature scale, and immaculate spatial clarity.',
    bestFor: ['Civil Engineering', 'Gaming Architecture', 'Mining & Geology', 'Supply Chains & Logistics', 'Computer Science Data Structures'],
    palette: ['#6366f1', '#8b5cf6', '#3b82f6', '#1e1b4b'],
    tags: ['Voxel', 'Isometric', '3D Cube', 'Miniature', 'Diorama'],
    visualPreview: {
      bgGradient: 'from-indigo-950 via-blue-950 to-slate-900',
      accentColor: '#6366f1',
      borderStyle: 'border-indigo-500/40',
      motifType: 'voxel-block'
    }
  },
  {
    id: 'swiss-typographic-grid',
    name: 'Swiss Typographic Grid',
    displayName: 'Swiss Typographic Grid',
    category: 'Modern & Graphic',
    shortDescription: 'International Typographic Style: strict asymmetric grid, bold sans-serif hierarchy, stark primary red/black/white palette.',
    fullDescription: 'Rooted in 1950s Swiss Modernism (Helvetica perfection). Prioritizes ruthless objective clarity, asymmetric multi-column grids, bold mathematical typography, and high contrast.',
    bestFor: ['Statistical Reports', 'Corporate Economics', 'Linguistics', 'Urban Transit Systems', 'Data Science'],
    palette: ['#ef4444', '#18181b', '#71717a', '#ffffff'],
    tags: ['Swiss Modernism', 'Strict Grid', 'Helvetica', 'Bold Type', 'Minimalist'],
    visualPreview: {
      bgGradient: 'from-zinc-900 via-neutral-900 to-red-950',
      accentColor: '#ef4444',
      borderStyle: 'border-red-500/40',
      motifType: 'swiss-grid'
    }
  },
  {
    id: 'claymation-stop-motion',
    name: 'Claymation Stop-Motion',
    displayName: 'Claymation & Plasticine',
    category: 'Tactile & Craft',
    shortDescription: 'Handcrafted clay models with visible fingerprint textures, plasticine figures, and studio tabletop rim lighting.',
    fullDescription: 'Charming tangible aesthetic featuring sculpted polymer clay models, organic fingerprint impressions, studio spotlight reflections, and whimsical handmade personality.',
    bestFor: ['Biology for Kids', 'Nutrition & Food Science', 'Cell Biology', 'Prehistoric Animals', 'Simple Physics'],
    palette: ['#eab308', '#ca8a04', '#a16207', '#fefce8'],
    tags: ['Clay', 'Stop Motion', 'Handmade', 'Fingerprints', 'Whimsical'],
    visualPreview: {
      bgGradient: 'from-yellow-950 via-stone-900 to-amber-950',
      accentColor: '#eab308',
      borderStyle: 'border-yellow-500/40',
      motifType: 'clay-tactile'
    }
  },
  {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula',
    displayName: 'Deep Space Cosmic Nebula',
    category: 'Futuristic & Sci-Fi',
    shortDescription: 'Swirling stellar dust clouds, ultraviolet and interstellar cyan gas filaments, star clusters, and galaxy backdrop.',
    fullDescription: 'Captures the awe-inspiring majesty of deep cosmos observations like the James Webb Space Telescope. Radiant glowing ion gas filaments, diffraction spikes on brilliant stars, and dark matter expanses.',
    bestFor: ['Astrophysics', 'Cosmology & Black Holes', 'Space Exploration', 'Stellar Evolution', 'Planetary Science'],
    palette: ['#8b5cf6', '#06b6d4', '#d946ef', '#030712'],
    tags: ['Cosmos', 'Astronomy', 'Nebula', 'JWST', 'Star Clusters'],
    visualPreview: {
      bgGradient: 'from-purple-950 via-slate-950 to-indigo-950',
      accentColor: '#8b5cf6',
      borderStyle: 'border-purple-500/40',
      motifType: 'cosmic-stars'
    }
  },
  {
    id: 'blueprint-cyanotype',
    name: 'Blueprint Cyanotype',
    displayName: 'Blueprint & Cyanotype',
    category: 'Modern & Graphic',
    shortDescription: 'Prussian blue canvas with crisp white drafting lines, technical measurements, grid markings, and sun-print texture.',
    fullDescription: 'Classic engineering and architectural drafting aesthetic. Deep Prussian blue background, crisp technical vector callouts, dimension lines, grid crosshairs, and authentic cyanotype exposure grain.',
    bestFor: ['Mechanical Engineering', 'Aviation & Aerodynamics', 'Architectural Structures', 'Patents & Inventions', 'Robotics Hardware'],
    palette: ['#2563eb', '#1d4ed8', '#60a5fa', '#172554'],
    tags: ['Blueprint', 'Technical Drafting', 'Prussian Blue', 'CAD', 'Engineering'],
    visualPreview: {
      bgGradient: 'from-blue-950 via-sky-950 to-slate-900',
      accentColor: '#3b82f6',
      borderStyle: 'border-blue-500/40',
      motifType: 'blueprint-lines'
    }
  },
  {
    id: 'risograph-grain',
    name: 'Risograph Grain',
    displayName: 'Risograph Spot-Color',
    category: 'Modern & Graphic',
    shortDescription: 'Halftone dot screens, vibrant overlapping spot-color inks (fluorescent pink, teal, yellow), and grainy unbleached paper.',
    fullDescription: 'Celebrates Japanese duplicator printmaking. Distinctive grainy halftones, slight mechanical ink misalignment, intense fluorescent spot colors, and warm tactile paper textures.',
    bestFor: ['Graphic Design History', 'Indie Publishing', 'Social Science & Demographics', 'Art Movements', 'Botanical Field Guides'],
    palette: ['#f43f5e', '#14b8a6', '#facc15', '#fef2f2'],
    tags: ['Risograph', 'Halftone', 'Spot Color', 'Printmaking', 'Tactile'],
    visualPreview: {
      bgGradient: 'from-rose-950 via-teal-950 to-stone-900',
      accentColor: '#f43f5e',
      borderStyle: 'border-rose-400/40',
      motifType: 'riso-dots'
    }
  },
  {
    id: 'ghibli-anime-serenity',
    name: 'Ghibli Anime Serenity',
    displayName: 'Studio Ghibli Serenity',
    category: 'Atmospheric & Retro',
    shortDescription: 'Hand-painted gouache backgrounds, fluffy cumulus clouds, lush azure skies, golden meadows, and peaceful nostalgic warmth.',
    fullDescription: 'Imbued with Hayao Miyazaki\'s legendary aesthetic serenity. Fluffy summer clouds against deep sky blue, hand-painted gouache textures, dappled golden sunlight, and heartwarming pastoral calm.',
    bestFor: ['Agriculture & Seasons', 'Atmospheric Science', 'Natural Ecosystems', 'Japanese Culture', 'Environmental Conservation'],
    palette: ['#22c55e', '#38bdf8', '#fbbf24', '#f0fdf4'],
    tags: ['Ghibli', 'Miyazaki', 'Gouache', 'Anime Background', 'Serene'],
    visualPreview: {
      bgGradient: 'from-emerald-950 via-sky-950 to-teal-950',
      accentColor: '#22c55e',
      borderStyle: 'border-emerald-400/40',
      motifType: 'ghibli-meadow'
    }
  },
  {
    id: 'liminal-dreamscape',
    name: 'Liminal Dreamscape',
    displayName: 'Surreal Liminal Dreamscape',
    category: 'Atmospheric & Retro',
    shortDescription: 'Serene dream logic, pastel surrealist architecture, infinite soft horizons, gentle diffused lighting, and tranquil wonder.',
    fullDescription: 'Inspired by De Chirico and modern liminal space art. Pastel staircases to nowhere, gentle archways framing twilight skies, quiet reflecting pools, and meditative geometric wonder.',
    bestFor: ['Cognitive Psychology', 'Philosophy of Time', 'Sleep & Dreaming', 'Quantum Paradoxes', 'Abstract Mathematics'],
    palette: ['#c084fc', '#f472b6', '#38bdf8', '#2e1065'],
    tags: ['Surrealism', 'Liminal Space', 'Pastel', 'Dream Logic', 'Architecture'],
    visualPreview: {
      bgGradient: 'from-fuchsia-950 via-purple-950 to-slate-900',
      accentColor: '#c084fc',
      borderStyle: 'border-fuchsia-400/40',
      motifType: 'liminal-sky'
    }
  },
  {
    id: 'steampunk-brass-workshop',
    name: 'Steampunk Brass Workshop',
    displayName: 'Steampunk Brass Workshop',
    category: 'Tactile & Craft',
    shortDescription: 'Polished brass gears, copper boiler pipes, glass pressure gauges, steam valves, and rich industrial warmth.',
    fullDescription: 'Victorian era mechanical wonder. Intricate interlocked clockwork gear trains, riveted copper boilers, manometer dials, parchment annotations, and warm industrial amber ambiance.',
    bestFor: ['Industrial Revolution', 'Thermodynamics & Steam Engines', 'Horology & Timekeeping', 'Metallurgy', 'Mining History'],
    palette: ['#b45309', '#d97706', '#78350f', '#451a03'],
    tags: ['Steampunk', 'Brass', 'Clockwork', 'Victorian', 'Industrial'],
    visualPreview: {
      bgGradient: 'from-amber-950 via-stone-900 to-amber-950',
      accentColor: '#b45309',
      borderStyle: 'border-amber-600/40',
      motifType: 'steampunk-gears'
    }
  },
  {
    id: 'neon-noir-detective',
    name: 'Neon Noir Detective',
    displayName: 'Neon Noir Cinema',
    category: 'Atmospheric & Retro',
    shortDescription: 'Rain-slicked pavement reflections, dramatic high-contrast chiaroscuro shadows, moody amber and cool cyan lighting.',
    fullDescription: 'Cinematic neo-noir visual storytelling. Wet asphalt reflecting neon streetlights, deep dramatic cast shadows, moody atmospheric fog, and hard-boiled investigative tension.',
    bestFor: ['Forensic Science', 'Criminology History', 'Cyber Crime Investigation', 'Urban Sociology', 'Film History'],
    palette: ['#eab308', '#06b6d4', '#64748b', '#020617'],
    tags: ['Noir', 'Cinematic', 'Rain', 'Chiaroscuro', 'Shadows'],
    visualPreview: {
      bgGradient: 'from-slate-950 via-stone-900 to-yellow-950',
      accentColor: '#eab308',
      borderStyle: 'border-yellow-500/40',
      motifType: 'noir-rain'
    }
  },
  {
    id: 'holographic-iridescent',
    name: 'Holographic Iridescent',
    displayName: 'Holographic Iridescent Y2K',
    category: 'Futuristic & Sci-Fi',
    shortDescription: 'Liquid chrome, shimmering pearlescent sheen, rainbow pastel light diffraction, and futuristic glossy prisms.',
    fullDescription: 'Early 2000s Y2K futurism merged with modern prism optics. Liquid mercury reflections, holographic rainbow sheen, chrome sphere overlays, and radiant spectral highlights.',
    bestFor: ['Optics & Light Physics', 'Nanotechnology', 'Future Fashion Materials', 'Superconductors', 'Audio Waves & Frequencies'],
    palette: ['#38bdf8', '#f472b6', '#a78bfa', '#0c4a6e'],
    tags: ['Y2K', 'Hologram', 'Liquid Chrome', 'Iridescent', 'Prism'],
    visualPreview: {
      bgGradient: 'from-sky-950 via-pink-950 to-purple-950',
      accentColor: '#38bdf8',
      borderStyle: 'border-cyan-400/40',
      motifType: 'hologram-iridescent'
    }
  },
  {
    id: 'fantasy-cartography',
    name: 'Fantasy Cartography',
    displayName: 'Ancient Fantasy Cartography',
    category: 'Fine & Classic',
    shortDescription: 'Aged parchment roll, hand-drawn topographic ridgelines, calligraphic compass rose, sea serpents, and antique banner labels.',
    fullDescription: 'Reminiscent of Middle-earth and vintage Renaissance sea charts. Warm aged vellum, hand-stippled mountain ranges, calligraphic ribbon banners, and nautical compass roses.',
    bestFor: ['Plate Tectonics & Geography', 'Historical Expeditions', 'Mythological Worlds', 'Silk Road Trade Routes', 'Ocean Currents'],
    palette: ['#a8a29e', '#78716c', '#b45309', '#292524'],
    tags: ['Map', 'Parchment', 'Tolkien', 'Compass Rose', 'Hand-Drawn'],
    visualPreview: {
      bgGradient: 'from-stone-900 via-amber-950 to-stone-950',
      accentColor: '#a8a29e',
      borderStyle: 'border-stone-500/40',
      motifType: 'fantasy-parchment'
    }
  }
];

export const ARTISTS_CATALOG: ArtistDetail[] = [
  // 1. Fine Art Masters
  {
    id: 'vincent-van-gogh',
    name: 'Vincent van Gogh',
    displayName: 'Vincent van Gogh (Post-Impressionism)',
    category: 'Fine Art Masters',
    eraOrMovement: '1853 – 1890 • Post-Impressionism',
    signatureStyle: 'Dynamic swirling brushwork, thick impasto textures, emotive cobalt blues, radiant sunflower yellows, and pulsing starry halos.',
    description: 'Master of expressive energy. Swirling directional strokes convey emotional intensity and vibrant life force across sky, fields, and portraits.',
    bestFor: ['Astronomy & Star Lifecycles', 'Botany & Sunflowers', 'Mental Health & Psychology', 'Art History', 'Optics & Color Theory'],
    palette: ['#eab308', '#2563eb', '#1e3a8a', '#713f12'],
    visualPreview: {
      bgGradient: 'from-blue-950 to-amber-950',
      accentColor: '#eab308',
      sampleSymbol: '🌌',
      previewPattern: 'Swirling Impasto Brushwork',
      sampleTitle: 'Starry Sky & Sunflower Harmony',
      sampleSubtitle: 'Vibrant cobalt swirls & golden halos'
    }
  },
  {
    id: 'claude-monet',
    name: 'Claude Monet',
    displayName: 'Claude Monet (Impressionism)',
    category: 'Fine Art Masters',
    eraOrMovement: '1840 – 1926 • French Impressionism',
    signatureStyle: 'Dappled plein-air light, short broken color strokes, shimmering water reflections, pastel mist, and atmospheric optical blending.',
    description: 'Founder of Impressionism who captured the fleeting qualities of natural sunlight across water lilies, haystacks, and Rouen Cathedral.',
    bestFor: ['Water Cycles & Rivers', 'Optics & Sunlight', 'Garden Ecosystems', 'Weather & Seasons', 'French Cultural History'],
    palette: ['#38bdf8', '#86efac', '#f472b6', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-teal-950 to-indigo-950',
      accentColor: '#38bdf8',
      sampleSymbol: '🪷',
      previewPattern: 'Dappled Water Lily Refraction',
      sampleTitle: 'Impressionist Light & Water',
      sampleSubtitle: 'Broken color strokes & pastel reflections'
    }
  },
  {
    id: 'salvador-dali',
    name: 'Salvador Dali',
    displayName: 'Salvador Dalí (Surrealism)',
    category: 'Fine Art Masters',
    eraOrMovement: '1904 – 1989 • Surrealism',
    signatureStyle: 'Melting clocks, infinite dream desert horizons, bizarre metamorphic juxtapositions, hyper-precise classical rendering of irrational visions.',
    description: 'The archetype of surrealist imagination. Blends immaculate Renaissance draftsmanship with subconscious dream logic and melting forms.',
    bestFor: ['Relativity & Time Dilation', 'Neuroscience of Dreams', 'Metamorphosis in Biology', 'Philosophy of Mind', 'Subconscious Psychology'],
    palette: ['#d97706', '#475569', '#38bdf8', '#451a03'],
    visualPreview: {
      bgGradient: 'from-amber-950 to-slate-900',
      accentColor: '#d97706',
      sampleSymbol: '⏳',
      previewPattern: 'Melting Horizon Surrealism',
      sampleTitle: 'The Persistence of Memory',
      sampleSubtitle: 'Dreamscapes, time dilations & infinite plains'
    }
  },
  {
    id: 'pablo-picasso',
    name: 'Pablo Picasso',
    displayName: 'Pablo Picasso (Cubism)',
    category: 'Fine Art Masters',
    eraOrMovement: '1881 – 1973 • Analytic & Synthetic Cubism',
    signatureStyle: 'Deconstructed geometric facets, simultaneous multi-angle viewpoints, fractured planar faces, and bold earth-toned collage textures.',
    description: 'Pioneered Cubism by shattering traditional single-point perspective, presenting objects and human figures from multiple angles simultaneously.',
    bestFor: ['Geometry & Perspectives', 'Cubist Art History', 'Anatomy & Deconstruction', 'Spanish Modernism', 'Abstract Thinking'],
    palette: ['#b45309', '#0284c7', '#d97706', '#1c1917'],
    visualPreview: {
      bgGradient: 'from-amber-950 to-stone-900',
      accentColor: '#d97706',
      sampleSymbol: '📐',
      previewPattern: 'Fractured Multi-Angle Facets',
      sampleTitle: 'Analytical Cubism Planes',
      sampleSubtitle: 'Simultaneous perspectives & geometric forms'
    }
  },
  {
    id: 'jean-michel-basquiat',
    name: 'Jean-Michel Basquiat',
    displayName: 'Jean-Michel Basquiat (Neo-Expressionism)',
    category: 'Fine Art Masters',
    eraOrMovement: '1960 – 1988 • Neo-Expressionism & Street Art',
    signatureStyle: 'Three-pointed gold crowns, raw scrawled anatomical diagrams, crossed-out poetic text, vibrant oil stick gestures, and street grit.',
    description: 'Iconic neo-expressionist master whose raw canvases merged street art, jazz rhythm, African diaspora culture, and intense anatomical sketches.',
    bestFor: ['African Diaspora Culture', 'Urban History & Jazz', 'Anatomy & Physiology', 'Neo-Expressionism', 'Poetic Word Art'],
    palette: ['#eab308', '#ef4444', '#3b82f6', '#09090b'],
    visualPreview: {
      bgGradient: 'from-yellow-950 to-zinc-950',
      accentColor: '#eab308',
      sampleSymbol: '👑',
      previewPattern: 'Raw Oil Stick Scrawls & Crowns',
      sampleTitle: 'Neo-Expressionist Energy',
      sampleSubtitle: 'Gold crowns, anatomy sketches & raw lines'
    }
  },
  {
    id: 'keith-haring',
    name: 'Keith Haring',
    displayName: 'Keith Haring (Subway Pop Art)',
    category: 'Fine Art Masters',
    eraOrMovement: '1958 – 1990 • 1980s Pop & Street Art',
    signatureStyle: 'Thick continuous black contour lines, radiant energy dash halos, dancing humanoids, barking dogs, and flat high-energy primary colors.',
    description: 'Famous for his iconic public subway drawings with universally recognizable dancing figures vibrating with energy, unity, and hope.',
    bestFor: ['Community Activism', 'Public Health Education', 'Dance & Kinetic Energy', 'Graphic Design Simplicity', '80s New York Culture'],
    palette: ['#ef4444', '#3b82f6', '#eab308', '#22c55e'],
    visualPreview: {
      bgGradient: 'from-red-950 to-yellow-950',
      accentColor: '#ef4444',
      sampleSymbol: '🕺',
      previewPattern: 'Radiant Energy Dash Outlines',
      sampleTitle: 'Radiant Subway Pop Outlines',
      sampleSubtitle: 'Bold kinetic figures & radiant vibration dashes'
    }
  },
  {
    id: 'bauhaus',
    name: 'Bauhaus',
    displayName: 'Bauhaus (Walter Gropius & Kandinsky)',
    category: 'Fine Art Masters',
    eraOrMovement: '1919 – 1933 • Weimar Modernism',
    signatureStyle: 'Form follows function: pure primary red/yellow/blue geometry, bold diagonals, asymmetric layouts, and crisp functional clarity.',
    description: 'The legendary German school that founded modern design. Strips away unnecessary ornament to celebrate geometric purity, circles, triangles, and bold planes.',
    bestFor: ['Modern Architecture', 'Industrial Design', 'Mathematical Geometry', 'Urban Planning', 'Design Principles'],
    palette: ['#ef4444', '#3b82f6', '#eab308', '#18181b'],
    visualPreview: {
      bgGradient: 'from-neutral-900 to-red-950',
      accentColor: '#ef4444',
      sampleSymbol: '📐',
      previewPattern: 'Primary Geometric Construction',
      sampleTitle: 'Form Follows Function',
      sampleSubtitle: 'Strict geometry, primary red/blue/yellow'
    }
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    displayName: 'Pop Art (Andy Warhol & Roy Lichtenstein)',
    category: 'Fine Art Masters',
    eraOrMovement: '1950s – 1970s • Pop Art Movement',
    signatureStyle: 'Vibrant screenprint color blocks, Ben-Day comic dots, bold black outlines, repetition, and high-impact consumer iconography.',
    description: 'Transforms everyday consumer items and comic strips into fine art. High saturation neon hues, mechanical silkscreen grain, and playful punchy contrast.',
    bestFor: ['Consumer Culture', 'Media Studies', 'Economics of Mass Production', 'Food Industry History', 'Modern Marketing'],
    palette: ['#ec4899', '#eab308', '#06b6d4', '#18181b'],
    visualPreview: {
      bgGradient: 'from-pink-950 to-cyan-950',
      accentColor: '#ec4899',
      sampleSymbol: '🥫',
      previewPattern: 'Ben-Day Dots & Silkscreen',
      sampleTitle: 'Mass Media & Silkscreen Pop',
      sampleSubtitle: 'Fluorescent ink blocks & dot screens'
    }
  },
  {
    id: 'watercolor-botanical',
    name: 'Watercolor Botanical',
    displayName: 'Watercolor Botanical (Pierre-Joseph Redouté)',
    category: 'Fine Art Masters',
    eraOrMovement: '18th – 19th Century Naturalists (Redouté)',
    signatureStyle: 'Delicate pigment washes, soft bleeding edges, fine ink stippling, pressed leaf textures, and natural unbleached paper.',
    description: 'Naturalist field guide illustrations inspired by Pierre-Joseph Redouté. Transparent watercolor washes detailing floral petals, leaf veins, and delicate stems.',
    bestFor: ['Plant Biology & Photosynthesis', 'Gardening & Horticulture', 'Medicinal Herbs', 'Bird Migration & Ornithology', 'Natural Pigments'],
    palette: ['#15803d', '#22c55e', '#86efac', '#fefce8'],
    visualPreview: {
      bgGradient: 'from-emerald-950 to-stone-900',
      accentColor: '#22c55e',
      sampleSymbol: '🌸',
      previewPattern: 'Transparent Watercolor Washes',
      sampleTitle: 'Botanical Field Herbarium',
      sampleSubtitle: 'Delicate leaf veins & natural pigment washes'
    }
  },

  // 2. Animation & Comics
  {
    id: 'studio-ghibli',
    name: 'Studio Ghibli',
    displayName: 'Studio Ghibli (Hayao Miyazaki)',
    category: 'Animation & Comics',
    eraOrMovement: '1985 – Present • Tokyo, Japan',
    signatureStyle: 'Lush hand-painted gouache backgrounds, majestic cumulus skies, nostalgic pastoral wonder, and heartfelt reverence for nature.',
    description: 'Iconic anime studio known for breathtaking environmental art. Emphasizes organic shapes, luminous sky azure, and painterly gouache brushwork.',
    bestFor: ['Ecosystems', 'Renewable Nature', 'Meteorology', 'Agriculture', 'Cultural Folklore'],
    palette: ['#22c55e', '#38bdf8', '#f59e0b', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-emerald-900 to-sky-900',
      accentColor: '#22c55e',
      sampleSymbol: '🌿',
      previewPattern: 'Gouache Watercolor Meadow',
      sampleTitle: 'Hayao Miyazaki Nature Aesthetic',
      sampleSubtitle: 'Lush green valleys & sky blue clouds'
    }
  },
  {
    id: 'classic-disney',
    name: 'Classic Disney',
    displayName: 'Classic Disney (Golden Age Animation)',
    category: 'Animation & Comics',
    eraOrMovement: '1930s – 1950s • Hand-Inked Cel Animation',
    signatureStyle: 'Warm multiplane camera depth, plush curved character shapes, expressive eyes, hand-painted gouache storybook forests, and magical sparkles.',
    description: 'The golden age of hand-drawn cel animation (Snow White, Pinocchio, Bambi). Warm storybook backgrounds and endearing expressive character acting.',
    bestFor: ['Forest Wildlife', 'Fairy Tale History', 'Principles of Animation', 'Optics of the Multiplane Camera', 'Storytelling Lore'],
    palette: ['#3b82f6', '#f59e0b', '#ef4444', '#14532d'],
    visualPreview: {
      bgGradient: 'from-blue-950 to-amber-950',
      accentColor: '#3b82f6',
      sampleSymbol: '🏰',
      previewPattern: 'Multiplane Cel Storybook Depth',
      sampleTitle: 'Golden Age Cel Animation',
      sampleSubtitle: 'Hand-inked contours & gouache forest depth'
    }
  },
  {
    id: 'rubber-hose-animation',
    name: 'Rubber Hose Animation',
    displayName: 'Rubber Hose Animation (1920s Fleischer)',
    category: 'Animation & Comics',
    eraOrMovement: '1920s – 1930s • Early Sound Cartoon Era',
    signatureStyle: 'Bendy noodle joints, pie-slice cartoon eyes, bouncy rhythmic walking cycles, white gloves, and vintage sepia film grain.',
    description: 'Classic jazz-age cartooning with physics-defying rubbery limbs, rhythmic squash-and-stretch, and cheerful vintage cinema charm.',
    bestFor: ['Early Cinema History', 'Jazz Age Music', 'Physics of Motion & Momentum', 'Animation Mechanics', 'Vintage Entertainment'],
    palette: ['#f8fafc', '#1e293b', '#d97706', '#0f172a'],
    visualPreview: {
      bgGradient: 'from-zinc-950 to-stone-900',
      accentColor: '#f8fafc',
      sampleSymbol: '🎞️',
      previewPattern: 'Pie Eyes & Rubbery Noodle Limbs',
      sampleTitle: '1920s Fleischer Rubber Hose',
      sampleSubtitle: 'Pie eyes, white gloves & bouncy jazz curves'
    }
  },
  {
    id: 'looney-tunes',
    name: 'Looney Tunes',
    displayName: 'Looney Tunes (Chuck Jones & Tex Avery)',
    category: 'Animation & Comics',
    eraOrMovement: '1940s – 1960s • Warner Bros. Animation',
    signatureStyle: 'Dynamic speed blur lines, exaggerated slapstick poses, vivid desert canyon colors, and iconic bullseye rings.',
    description: 'High-energy slapstick brilliance with rapid timing, dynamic squash-and-stretch, and vibrant mid-century cartoon palettes.',
    bestFor: ['Newtonian Physics & Trajectories', 'Desert Ecosystems', 'Humor & Satire', 'Sound Effects & Foley', 'Mid-Century Animation'],
    palette: ['#f97316', '#3b82f6', '#eab308', '#dc2626'],
    visualPreview: {
      bgGradient: 'from-orange-950 to-amber-950',
      accentColor: '#f97316',
      sampleSymbol: '🎯',
      previewPattern: 'Concentric Bullseye Rings',
      sampleTitle: 'Slapstick Warner Bullseye',
      sampleSubtitle: 'Speed lines & exaggerated cartoon timing'
    }
  },
  {
    id: 'tom-and-jerry',
    name: 'Tom and Jerry',
    displayName: 'Tom and Jerry (Hanna-Barbera Classic)',
    category: 'Animation & Comics',
    eraOrMovement: '1940s – 1950s • MGM Golden Era',
    signatureStyle: 'Precise physical comedy poses, orchestral tempo pacing, rich mid-century living room interiors, and comedic reaction eyes.',
    description: 'Masterclass in non-verbal physical animation and comedic timing, backed by sumptuous Technicolor mid-century backdrops.',
    bestFor: ['Simple Machines & Levers', 'Domestic Architecture History', 'Kinetic Energy', 'Symphonic Scoring', 'Classic Comedy'],
    palette: ['#64748b', '#f59e0b', '#ef4444', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-slate-900 to-amber-950',
      accentColor: '#f59e0b',
      sampleSymbol: '🧀',
      previewPattern: 'Technicolor Slapstick Dynamics',
      sampleTitle: 'Mid-Century MGM Chase',
      sampleSubtitle: 'Living room interiors & crisp physical gags'
    }
  },
  {
    id: 'betty-boop',
    name: 'Betty Boop',
    displayName: 'Betty Boop (Fleischer Studios Jazz)',
    category: 'Animation & Comics',
    eraOrMovement: '1930s • Fleischer Cartoon Jazz',
    signatureStyle: 'Garter curls, oversized button eyelashes, surreal dancing objects, black-and-white art deco backdrops, and Cab Calloway jazz energy.',
    description: 'The queen of 1930s animated jazz glamour, featuring surreal transformations where every building and shadow dances to the big band beat.',
    bestFor: ['Jazz History & Harlem Renaissance', 'Early Sound Synch', 'Art Deco Fashion', '1930s Pop Culture', 'Dance & Rhythmic Motion'],
    palette: ['#f43f5e', '#18181b', '#fb7185', '#ffffff'],
    visualPreview: {
      bgGradient: 'from-rose-950 to-zinc-950',
      accentColor: '#f43f5e',
      sampleSymbol: '💋',
      previewPattern: 'Jazz Cab Calloway Swirls',
      sampleTitle: '1930s Fleischer Jazz Glamour',
      sampleSubtitle: 'Curled eyelashes, deco silhouettes & big band beat'
    }
  },
  {
    id: 'popeye',
    name: 'Popeye',
    displayName: 'Popeye the Sailor (E.C. Segar)',
    category: 'Animation & Comics',
    eraOrMovement: '1930s – 1940s • Maritime Comic & Short',
    signatureStyle: 'Corncob pipes, muscular anchor tattoos, spinach can power bursts, nautical docks, and rough-and-tumble harbor charm.',
    description: 'Classic maritime comic icon celebrating nautical harbor life, spinach-powered strength bursts, and sailor bravado.',
    bestFor: ['Nutrition & Iron Biochemistry', 'Maritime History & Lighthouses', 'Harbor Trade Routes', 'Naval Navigation', 'Comic Strip Origins'],
    palette: ['#0284c7', '#22c55e', '#eab308', '#0f172a'],
    visualPreview: {
      bgGradient: 'from-cyan-950 to-slate-950',
      accentColor: '#0284c7',
      sampleSymbol: '⚓',
      previewPattern: 'Nautical Anchors & Spinach Sparks',
      sampleTitle: 'Nautical Sailor Harbor',
      sampleSubtitle: 'Harbor docks, anchor tattoos & spinach power'
    }
  },
  {
    id: 'porky-pig',
    name: 'Porky Pig',
    displayName: 'Porky Pig & Daffy (Termite Terrace)',
    category: 'Animation & Comics',
    eraOrMovement: '1930s – 1950s • Warner Bros.',
    signatureStyle: 'Gentle rounded pastel shapes, iconic bowtie jackets, energetic end title concentric rings ("That\'s all Folks!"), and endearing slapstick.',
    description: 'One of the earliest Warner Bros stars, known for his signature blue bowtie, stuttering charm, and timeless golden-era cartoon energy.',
    bestFor: ['Communication & Speech Psychology', 'Early Hollywood Voice Acting', 'Classic Farm Life', 'Character Design Curves', 'Broadcast History'],
    palette: ['#f472b6', '#3b82f6', '#eab308', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-pink-950 to-blue-950',
      accentColor: '#f472b6',
      sampleSymbol: '🐷',
      previewPattern: 'Concentric Ring Closing Title',
      sampleTitle: 'That\'s All Folks! Classic',
      sampleSubtitle: 'Gentle pastel curves & red bowtie charm'
    }
  },
  {
    id: 'yogi-bear',
    name: 'Yogi Bear',
    displayName: 'Yogi Bear (Jellystone Park)',
    category: 'Animation & Comics',
    eraOrMovement: '1950s – 1960s • Hanna-Barbera TV Animation',
    signatureStyle: 'Green porkpie hats and ties, charming mid-century national park pines, picnic baskets, and clean limited-animation linework.',
    description: 'Beloved smarter-than-the-average bear of Jellystone Park. Clean graphic tree silhouettes, picnic hampers, and warm national park forest humor.',
    bestFor: ['National Parks & Forest Ecology', 'Brown Bear Biology', 'Park Ranger History', 'Limited TV Animation Techniques', 'Outdoor Camping'],
    palette: ['#15803d', '#92400e', '#f59e0b', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-emerald-950 to-amber-950',
      accentColor: '#22c55e',
      sampleSymbol: '🧺',
      previewPattern: 'Jellystone Pine & Picnic Basket',
      sampleTitle: 'National Park Jellystone',
      sampleSubtitle: 'Green porkpie hat, pine trees & picnic baskets'
    }
  },
  {
    id: 'charley-harper',
    name: 'Charley Harper',
    displayName: 'Charley Harper (Minimal Realism)',
    category: 'Animation & Comics',
    eraOrMovement: '1950s – 1970s • Modern Wildlife Graphic Art',
    signatureStyle: 'Pure geometric reduction, precise semicircles and triangles, flat screenprint colors, and witty minimalist wildlife anatomy.',
    description: 'Master of "minimal realism." Captures the essence of birds and mammals with zero perspective, using only pure geometric shapes and clever color harmonies.',
    bestFor: ['Ornithology & Bird Anatomy', 'Geometric Design Principles', 'National Park Posters', 'Biodiversity Studies', 'Mid-Century Modern Art'],
    palette: ['#f97316', '#3b82f6', '#10b981', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-orange-950 to-slate-900',
      accentColor: '#f97316',
      sampleSymbol: '🐦',
      previewPattern: 'Pure Semicircle Wildlife Geometry',
      sampleTitle: 'Minimal Realism Wildlife',
      sampleSubtitle: 'Flat geometric birds & harmonious color blocks'
    }
  },
  {
    id: 'jack-kirby',
    name: 'Jack Kirby',
    displayName: 'Jack Kirby (King of Cosmic Comics)',
    category: 'Animation & Comics',
    eraOrMovement: '1960s – 1970s • Silver Age Comic Powerhouse',
    signatureStyle: 'Kirby Krackle cosmic energy dots, dynamic squarish musculature, monolithic alien machinery, forced-perspective foreshortening, and mythic scale.',
    description: 'Co-creator of the Marvel Universe whose powerful pencil strokes, dynamic foreshortening, and iconic energy "krackle" defined comic book visual language.',
    bestFor: ['Astrophysics & Supernovas', 'Particle Physics & Cosmic Rays', 'Mythology & Epics', 'Comic Book Art History', 'Sci-Fi Megastructures'],
    palette: ['#8b5cf6', '#06b6d4', '#f59e0b', '#09090b'],
    visualPreview: {
      bgGradient: 'from-purple-950 to-slate-950',
      accentColor: '#8b5cf6',
      sampleSymbol: '💥',
      previewPattern: 'Kirby Krackle Energy Dots',
      sampleTitle: 'Cosmic Powerhouse Krackle',
      sampleSubtitle: 'Squarish machinery & pulsing energy dots'
    }
  },
  {
    id: 'moebius',
    name: 'Moebius',
    displayName: 'Moebius / Jean Giraud (Ligne Claire Sci-Fi)',
    category: 'Animation & Comics',
    eraOrMovement: '1970s – 1980s • French BD & Heavy Metal',
    signatureStyle: 'Fine uniform ink outlines (ligne claire), delicate cross-hatch stippling, vast surreal crystalline deserts, biomechanical pterodactyls, and pastel planetary horizons.',
    description: 'Legendary French visionary whose immaculate line art and poetic sci-fi landscapes inspired Dune, Blade Runner, Star Wars, and The Fifth Element.',
    bestFor: ['Planetary Desert Geology', 'Futuristic Architecture', 'Exoplanet Exploration', 'French Graphic Novels', 'Surreal Cartography'],
    palette: ['#38bdf8', '#fb7185', '#fbbf24', '#1e1b4b'],
    visualPreview: {
      bgGradient: 'from-sky-950 to-indigo-950',
      accentColor: '#38bdf8',
      sampleSymbol: '🛸',
      previewPattern: 'Ligne Claire Stippled Horizon',
      sampleTitle: 'Moebius Planetary Dunes',
      sampleSubtitle: 'Fine ink stippling & pastel desert skies'
    }
  },
  {
    id: 'tin-tin',
    name: 'Tin Tin',
    displayName: 'Hergé / Tintin (Ligne Claire Clear Line)',
    category: 'Animation & Comics',
    eraOrMovement: '1930s – 1970s • Franco-Belgian BD',
    signatureStyle: 'Crisp uniform black line weight with zero shading, immaculate historical and mechanical accuracy, flat vibrant color fills, and expressive adventure storytelling.',
    description: 'The definitive pioneer of the "clear line" style. Every vehicle, compass, ship, and mountain is researched with photorealistic precision under clean outlines.',
    bestFor: ['Global Geography Expeditions', 'Archaeological Excavations', 'Aviation & Submarine History', 'Scientific Journalism', 'Franco-Belgian Art'],
    palette: ['#0284c7', '#ef4444', '#eab308', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-sky-950 to-slate-900',
      accentColor: '#0284c7',
      sampleSymbol: '🚀',
      previewPattern: 'Ligne Claire Uniform Line Art',
      sampleTitle: 'Hergé Clear Line Expedition',
      sampleSubtitle: 'Uniform contour lines & technical realism'
    }
  },
  {
    id: 'tim-burton',
    name: 'Tim Burton',
    displayName: 'Tim Burton (Gothic Whimsical)',
    category: 'Animation & Comics',
    eraOrMovement: '1980s – Present • Gothic Fantasy Cinema',
    signatureStyle: 'Spindly elongated silhouettes, spiral hilltops, high-contrast black & white stripes, eerie stitched patchwork, and whimsical gothic charm.',
    description: 'Beloved director and illustrator known for endearing macabre worlds like The Nightmare Before Christmas and Edward Scissorhands.',
    bestFor: ['Halloween History', 'Nocturnal Wildlife', 'Gothic Literature', 'Animation Character Design', 'Folklore Monsters'],
    palette: ['#a855f7', '#18181b', '#f43f5e', '#ffffff'],
    visualPreview: {
      bgGradient: 'from-purple-950 to-zinc-950',
      accentColor: '#a855f7',
      sampleSymbol: '🎃',
      previewPattern: 'Spindly Spiral Hill Silhouette',
      sampleTitle: 'Gothic Macabre Whimsy',
      sampleSubtitle: 'Stripes, spiral curves & stitched textures'
    }
  },
  {
    id: 'invader-zim',
    name: 'Invader Zim',
    displayName: 'Invader Zim (Jhonen Vasquez Dark Cartoon)',
    category: 'Animation & Comics',
    eraOrMovement: '2000s • Nickelodeon Dark Sci-Fi',
    signatureStyle: 'Jagged geometric angles, lime green and magenta acid contrasts, metallic spider-leg backpacks, giant paranoid pupils, and dystopian tech satire.',
    description: 'Cult classic dark sci-fi animation featuring razor-sharp triangular silhouettes, toxic neon hues, and delightfully chaotic extraterrestrial technology.',
    bestFor: ['Extraterrestrial Biology', 'Cybernetic Implants', 'Satirical Sociology', 'Robotics & AI Failures', 'Dystopian Sci-Fi'],
    palette: ['#84cc16', '#ec4899', '#8b5cf6', '#09090b'],
    visualPreview: {
      bgGradient: 'from-lime-950 to-pink-950',
      accentColor: '#84cc16',
      sampleSymbol: '👽',
      previewPattern: 'Jagged Toxic Green & Magenta Tech',
      sampleTitle: 'Irken Empire Dystopia',
      sampleSubtitle: 'Sharp triangular angles & acid neon glows'
    }
  },
  {
    id: 'johnny-the-homicidal-maniac',
    name: 'Johnny the Homicidal Maniac',
    displayName: 'Jhonen Vasquez Graphic Novel (Goth Ink)',
    category: 'Animation & Comics',
    eraOrMovement: '1990s • Underground Indie Comics (Slave Labor Graphics)',
    signatureStyle: 'Razor-sharp heavy ink splatter, extreme pitch-black contrast, spindly gothic limbs, manic crosshatching, and psychological tension.',
    description: 'Underground indie comics legend known for stark black-and-white ink work, hyper-stylized geometric expressions, and dark psychological grit.',
    bestFor: ['Graphic Novel Inking Techniques', 'Dark Psychological Archetypes', 'Underground Comic History', 'High-Contrast Illustration', 'Gothic Noir'],
    palette: ['#dc2626', '#18181b', '#71717a', '#000000'],
    visualPreview: {
      bgGradient: 'from-red-950 to-zinc-950',
      accentColor: '#dc2626',
      sampleSymbol: '🩸',
      previewPattern: 'Stark High-Contrast Ink Splatter',
      sampleTitle: 'Underground Goth Noir Ink',
      sampleSubtitle: 'Heavy pitch-black shadows & sharp silhouettes'
    }
  },
  {
    id: 'adventure-time',
    name: 'Adventure Time',
    displayName: 'Adventure Time (Pendleton Ward)',
    category: 'Animation & Comics',
    eraOrMovement: '2010s • Cartoon Network Post-Apocalyptic Fantasy',
    signatureStyle: 'Noodle limbs, bright candy pastel palette, post-apocalyptic fantasy ruins, whimsical creature designs, and heart-shaped warmth.',
    description: 'Groundbreaking animated series blending surreal humor, post-apocalyptic lore, candy kingdoms, and lovable floppy-limbed characters.',
    bestFor: ['Youth Science Education', 'Imaginative Biology', 'Planetary Geology', 'Creative Writing', 'Fun Elementary Topics'],
    palette: ['#38bdf8', '#fb7185', '#facc15', '#4ade80'],
    visualPreview: {
      bgGradient: 'from-sky-900 to-pink-950',
      accentColor: '#38bdf8',
      sampleSymbol: '⚔️',
      previewPattern: 'Pastel Candy Kingdom Palette',
      sampleTitle: 'Land of Ooo Adventure',
      sampleSubtitle: 'Noodle limbs & vibrant candy hues'
    }
  },
  {
    id: 'cyberpunk-anime',
    name: 'Cyberpunk Anime',
    displayName: 'Cyberpunk Anime (Neo-Tokyo Sci-Fi)',
    category: 'Animation & Comics',
    eraOrMovement: '1980s – 1990s • Akira & Ghost in the Shell',
    signatureStyle: 'Detailed mechanical greebles, neon highway light trails, futuristic holograms, rain-slicked skyscrapers, and electric crimson headlights.',
    description: 'High-octane cyberpunk anime masterpiece style with dense urban detail, motorcycle light streaks, holographic advertisements, and cybernetic hardware.',
    bestFor: ['Urban Megacities', 'Transhumanism & Prosthetics', 'AI & Neural Interfaces', 'Motorcycle Engineering', 'Future Megastructures'],
    palette: ['#ef4444', '#06b6d4', '#a855f7', '#09090b'],
    visualPreview: {
      bgGradient: 'from-red-950 to-slate-950',
      accentColor: '#ef4444',
      sampleSymbol: '🏍️',
      previewPattern: 'Neo-Tokyo Light Trails',
      sampleTitle: 'Neo-Tokyo Cybernetics',
      sampleSubtitle: 'Crimson light streaks & high-tech grime'
    }
  },
  {
    id: 'retro-90s-anime',
    name: 'Retro 90s Anime',
    displayName: 'Retro 90s Anime (Sailor Moon & Cowboy Bebop)',
    category: 'Animation & Comics',
    eraOrMovement: '1990s • Golden Age Japanese TV Animation',
    signatureStyle: 'Hand-painted cel sparkle highlights, soft VHS chromatic diffusion, starry prism gradients, detailed mechanical line art, and dramatic eyes.',
    description: 'Captures the lush nostalgic beauty of 90s cel-animated anime with dreamy watercolor sky gradients, glowing eye highlights, and retro VHS warmth.',
    bestFor: ['Space Exploration & Astronomy', 'Nostalgic 90s History', 'Cel Animation Mechanics', 'Cosmic Wonders', 'Character Design'],
    palette: ['#ec4899', '#8b5cf6', '#06b6d4', '#1e1b4b'],
    visualPreview: {
      bgGradient: 'from-purple-950 to-pink-950',
      accentColor: '#ec4899',
      sampleSymbol: '✨',
      previewPattern: 'Prism Sparkle & Cel Shading',
      sampleTitle: '90s Celestial Anime Cel',
      sampleSubtitle: 'Starry prism shines & nostalgic VHS glow'
    }
  },

  // 3. 3D & Physical Craft
  {
    id: 'claymation',
    name: 'Claymation',
    displayName: 'Claymation (Aardman / Wallace & Gromit)',
    category: '3D & Physical Craft',
    eraOrMovement: 'Tactile Stop-Motion Animation',
    signatureStyle: 'Plasticine clay characters, studio tabletop warm lighting, thumbprint textures, and delightfully tactile physical models.',
    description: 'Handmade stop-motion plasticine brilliance. Every element feels sculpted by hand with visible physical depth, soft shadows, and warm comedic charm.',
    bestFor: ['Kid-Friendly Science', 'Baking & Food Chemistry', 'Animal Habitats', 'Everyday Inventions', 'Household Physics'],
    palette: ['#f59e0b', '#10b981', '#ef4444', '#fef3c7'],
    visualPreview: {
      bgGradient: 'from-amber-950 to-stone-900',
      accentColor: '#f59e0b',
      sampleSymbol: '🧀',
      previewPattern: 'Plasticine Sculpted Depth',
      sampleTitle: 'Stop-Motion Clay Craft',
      sampleSubtitle: 'Handmade clay figures & studio rim light'
    }
  },
  {
    id: 'origami-papercraft',
    name: 'Origami Papercraft',
    displayName: 'Japanese Origami Papercraft',
    category: '3D & Physical Craft',
    eraOrMovement: 'Traditional Japanese Folding Craft',
    signatureStyle: 'Crisp creased paper folds, washi paper fibrous textures, geometric polygon wildlife, delicate shadow relief, and peaceful minimalist balance.',
    description: 'Celebrates the Japanese art of paper folding. Each subject is constructed from clean geometric folds with subtle paper grain and soft ambient shadows.',
    bestFor: ['Japanese Cultural Heritage', 'Mathematics of Folding & Tessellation', 'Animal Morphology', 'Mindfulness & Zen', 'Material Physics'],
    palette: ['#ef4444', '#f59e0b', '#3b82f6', '#fffbeb'],
    visualPreview: {
      bgGradient: 'from-red-950 to-stone-900',
      accentColor: '#ef4444',
      sampleSymbol: '🦢',
      previewPattern: 'Creased Paper Fold Geometry',
      sampleTitle: 'Washi Origami Silhouette',
      sampleSubtitle: 'Precision paper creases & delicate shadows'
    }
  },

  // 4. Retro & Digital
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    displayName: '16-Bit Pixel Art (SNES & Arcade)',
    category: 'Retro & Digital',
    eraOrMovement: '1980s – 1990s • 16-Bit Console Era',
    signatureStyle: 'Precise pixel grid alignment, limited color palette dithering, nostalgic arcade sprites, and retro gaming UI boxes.',
    description: 'Nostalgic tribute to the golden age of 16-bit video games (Chrono Trigger, Super Metroid). Crisp hand-placed pixels with beautiful color ramps.',
    bestFor: ['Computer Hardware History', 'Video Game Design', 'Digital Signals & Logic', 'Retro Computing', 'Interactive Quest Guides'],
    palette: ['#06b6d4', '#f43f5e', '#a855f7', '#0f172a'],
    visualPreview: {
      bgGradient: 'from-slate-950 to-indigo-950',
      accentColor: '#06b6d4',
      sampleSymbol: '👾',
      previewPattern: '16-Bit Sprite Grid Dithering',
      sampleTitle: '16-Bit Retro Pixel Art',
      sampleSubtitle: 'Arcade sprites & pixel-perfect palettes'
    }
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    displayName: 'Vaporwave 90s (Aesthetic Glitch)',
    category: 'Retro & Digital',
    eraOrMovement: '2010s Internet Culture • 80s/90s Nostalgia',
    signatureStyle: 'Pastel magenta/cyan sunsets, neon wireframe perspective grids, classical marble bust statues, glitch artifacts, and Japanese text.',
    description: 'Surreal internet aesthetic combining 80s corporate consumerism, wireframe horizons, pastel gradients, and vapor-synth nostalgia.',
    bestFor: ['Internet Culture History', 'Synthesizer Music Evolution', 'Consumer Tech History', 'Virtual Reality Concepts', 'Memetic Media'],
    palette: ['#f472b6', '#38bdf8', '#c084fc', '#1e1b4b'],
    visualPreview: {
      bgGradient: 'from-pink-950 to-cyan-950',
      accentColor: '#f472b6',
      sampleSymbol: '🌴',
      previewPattern: 'Wireframe Sunset Grid & Palm Trees',
      sampleTitle: 'Aesthetic Vaporwave Grid',
      sampleSubtitle: 'Pastel magenta sun, wireframes & palm silhouettes'
    }
  },
  {
    id: 'psychedelic-60s',
    name: 'Psychedelic 60s',
    displayName: 'Psychedelic 60s (Fillmore Poster Art)',
    category: 'Retro & Digital',
    eraOrMovement: '1960s • San Francisco Counterculture',
    signatureStyle: 'Melting liquid letterforms, vibrating complementary color clashing, swirling paisley patterns, optic art illusions, and groovy floral mandalas.',
    description: 'The iconic San Francisco rock poster style pioneered by Wes Wilson and Peter Max, featuring undulating liquid typography and vibrating color waves.',
    bestFor: ['1960s Social History', 'Visual Perception & Optical Illusions', 'Rock Music Evolution', 'Color Harmony Clashing', 'Poster Printmaking'],
    palette: ['#f43f5e', '#eab308', '#8b5cf6', '#06b6d4'],
    visualPreview: {
      bgGradient: 'from-pink-950 via-purple-950 to-amber-950',
      accentColor: '#f43f5e',
      sampleSymbol: '☮️',
      previewPattern: 'Melting Liquid Paisley Waves',
      sampleTitle: 'San Francisco 60s Fillmore',
      sampleSubtitle: 'Vibrating neon colors & melting liquid curves'
    }
  },
  {
    id: 'risograph-print',
    name: 'Risograph Print',
    displayName: 'Risograph Grain & Halftone Print',
    category: 'Retro & Digital',
    eraOrMovement: 'Modern Indie Zine & Printmaking',
    signatureStyle: 'Distinctive spot-color misregistration, soy ink texture grain, vibrant fluorescent pinks and teals, and tactile screen halftones.',
    description: 'Emulates Japanese Riso duplicator printing with tactile paper grit, charming ink registration offsets, and vibrant soy ink overlaps.',
    bestFor: ['Printmaking Technologies', 'Zine Publishing History', 'Graphic Halftone Theory', 'Indie Comic Production', 'Ink Chemistry'],
    palette: ['#ec4899', '#06b6d4', '#f59e0b', '#fffbeb'],
    visualPreview: {
      bgGradient: 'from-pink-950 to-cyan-950',
      accentColor: '#ec4899',
      sampleSymbol: '🖨️',
      previewPattern: 'Offset Halftone Soy Ink Dots',
      sampleTitle: 'Riso Spot Ink Screen',
      sampleSubtitle: 'Halftone dot patterns & misregistered ink edges'
    }
  },

  // 5. Historical & Decorative
  {
    id: 'art-deco',
    name: 'Art Deco',
    displayName: 'Art Deco (1920s Roaring Twenties Luxury)',
    category: 'Historical & Decorative',
    eraOrMovement: '1920s – 1930s • Roaring Twenties',
    signatureStyle: 'Symmetrical sunbursts, chevron stepped zig-zags, metallic gold and obsidian leafing, opulent luxury typography.',
    description: 'The roaring twenties style celebrating machine-age luxury, streamlined skyscrapers like the Chrysler Building, and glamorous geometric symmetry.',
    bestFor: ['1920s History', 'Skyscraper Architecture', 'Luxury Economics', 'Jazz Age Culture', 'Transportation Steamships & Trains'],
    palette: ['#eab308', '#ca8a04', '#18181b', '#0f172a'],
    visualPreview: {
      bgGradient: 'from-amber-950 to-slate-950',
      accentColor: '#eab308',
      sampleSymbol: '✨',
      previewPattern: 'Sunburst & Stepped Chevrons',
      sampleTitle: 'Roaring Twenties Elegance',
      sampleSubtitle: 'Gold leaf geometric sunbursts'
    }
  },
  {
    id: 'art-nouveau',
    name: 'Art Nouveau',
    displayName: 'Art Nouveau (Alphonse Mucha Belle Époque)',
    category: 'Historical & Decorative',
    eraOrMovement: '1890 – 1910 • Belle Époque',
    signatureStyle: 'Sinuous organic whiplash curves, flowing floral hair tendrils, mosaic halos, pastel earth tones, and decorative border filigree.',
    description: 'The graceful Belle Époque movement celebrating natural organic curves, climbing ivy, stylized peacocks, and ornamental elegance.',
    bestFor: ['Belle Époque History', 'Botanical Geometry', 'Decorative Arts & Stained Glass', 'Jewelry Craft', 'European Modernism'],
    palette: ['#d97706', '#15803d', '#f472b6', '#292524'],
    visualPreview: {
      bgGradient: 'from-amber-950 to-stone-900',
      accentColor: '#d97706',
      sampleSymbol: '🪻',
      previewPattern: 'Sinuous Whiplash Floral Curves',
      sampleTitle: 'Mucha Belle Époque Filigree',
      sampleSubtitle: 'Flowing whiplash vines & mosaic halos'
    }
  },
  {
    id: 'ukiyo-e-woodblock',
    name: 'Ukiyo-e Woodblock',
    displayName: 'Ukiyo-e Woodblock (Hokusai & Hiroshige)',
    category: 'Historical & Decorative',
    eraOrMovement: '17th – 19th Century • Edo Period Japan',
    signatureStyle: 'Prussian blue ocean gradients, crisp carving outlines, flat decorative color fills, Mount Fuji silhouettes, and calligraphic seals.',
    description: 'Traditional Japanese woodblock printing celebrated worldwide by "The Great Wave off Kanagawa". Elegant calligraphic lines and harmonious bokashi gradations.',
    bestFor: ['Japanese History & Edo Period', 'Geology of Volcanoes & Tsunamis', 'Maritime History', 'Traditional Craft', 'Asian Literature'],
    palette: ['#1e40af', '#3b82f6', '#fef3c7', '#78350f'],
    visualPreview: {
      bgGradient: 'from-blue-950 to-stone-900',
      accentColor: '#3b82f6',
      sampleSymbol: '🌊',
      previewPattern: 'Bokashi Prussian Blue Wave',
      sampleTitle: 'The Great Wave Printmaking',
      sampleSubtitle: 'Calligraphic carving lines & bokashi blue'
    }
  },
  {
    id: 'steampunk',
    name: 'Steampunk',
    displayName: 'Steampunk (Victorian Industrial Steam & Brass)',
    category: 'Historical & Decorative',
    eraOrMovement: '19th Century Victorian Neo-Industrial',
    signatureStyle: 'Polished brass cogs, copper boilers, glass pressure gauges, steam valves, leather straps, and rich sepia warmth.',
    description: 'Victorian era industrial grandeur. Interlocking brass gears, steam pressure manometers, riveted iron plates, and warm gaslamp ambiance.',
    bestFor: ['Steam Engine Physics', 'Industrial History', 'Clockmaking & Horology', 'Mining Technology', 'Thermodynamic Power'],
    palette: ['#b45309', '#d97706', '#78350f', '#451a03'],
    visualPreview: {
      bgGradient: 'from-amber-950 to-stone-900',
      accentColor: '#b45309',
      sampleSymbol: '⚙️',
      previewPattern: 'Interlocking Brass Gears & Pipes',
      sampleTitle: 'Victorian Clockwork Brass',
      sampleSubtitle: 'Pressure gauges, copper pipes & steam gears'
    }
  },
  {
    id: 'afrofuturism',
    name: 'Afrofuturism',
    displayName: 'Afrofuturism (Wakandan Cyber-Heritage)',
    category: 'Historical & Decorative',
    eraOrMovement: 'African Diaspora & High-Tech Futurism',
    signatureStyle: 'Intricate glowing kente cloth geometric patterns, cybernetic gold neck rings, solar energy obsidian monuments, and cosmic royalty.',
    description: 'A vibrant vision blending African cultural heritage, intricate geometric textiles, advanced solar technology, and cosmic mythology.',
    bestFor: ['African History & Civilizations', 'Advanced Solar Engineering', 'Textile Mathematics & Fractals', 'Cultural Futurism', 'Aero Megacities'],
    palette: ['#eab308', '#8b5cf6', '#06b6d4', '#18181b'],
    visualPreview: {
      bgGradient: 'from-purple-950 via-amber-950 to-zinc-950',
      accentColor: '#eab308',
      sampleSymbol: '🐆',
      previewPattern: 'Glowing Geometric Kente Circuitry',
      sampleTitle: 'Wakandan Cyber-Heritage',
      sampleSubtitle: 'Solar gold circuitry & royal geometric textiles'
    }
  },
  {
    id: 'dark-fantasy',
    name: 'Dark Fantasy',
    displayName: 'Dark Fantasy (Frank Frazetta & Grimdark)',
    category: 'Historical & Decorative',
    eraOrMovement: 'Grimdark High Fantasy & Medieval Gothic',
    signatureStyle: 'Towering ruined cathedral spires, burning gold embers against pitch night, weathered iron armor, and ominous mythic creatures.',
    description: 'Summons the atmospheric majesty of grimdark high fantasy with gothic ruined arches, flickering forge fire embers, and ancient titans.',
    bestFor: ['Medieval Military History', 'Mythological Bestiaries', 'Gothic Cathedral Architecture', 'Metallurgy of Weapons & Armor', 'Fantasy Lore'],
    palette: ['#f97316', '#71717a', '#d97706', '#09090b'],
    visualPreview: {
      bgGradient: 'from-orange-950 to-zinc-950',
      accentColor: '#f97316',
      sampleSymbol: '🗡️',
      previewPattern: 'Ruined Gothic Arch & Burning Embers',
      sampleTitle: 'Grimdark High Fantasy',
      sampleSubtitle: 'Gothic cathedrals & glowing forge embers'
    }
  },
  {
    id: 'wwii-pin-up-art',
    name: 'WWII Pin-up Art',
    displayName: 'WWII Aviation Pin-up (Alberto Vargas Bomber Nose Art)',
    category: 'Historical & Decorative',
    eraOrMovement: '1940s • WWII Bomber Nose Art (Alberto Vargas)',
    signatureStyle: 'Polished aircraft aluminum rivets, patriotic star roundels, glamorous 1940s poses, painted bomber jacket emblems, and vintage stencil typography.',
    description: 'Celebrates 1940s aviation nose art and classic illustrative glamour painted onto bomber fuselages, featuring aluminum rivet panels and victory stars.',
    bestFor: ['Aviation History & WWII Aircraft', '1940s Pop Culture', 'Propeller Aerodynamics', 'Military Emblems & Typography', 'Illustration Craft'],
    palette: ['#dc2626', '#3b82f6', '#f59e0b', '#1e293b'],
    visualPreview: {
      bgGradient: 'from-slate-900 to-red-950',
      accentColor: '#dc2626',
      sampleSymbol: '✈️',
      previewPattern: 'Aircraft Aluminum Rivets & Star Roundel',
      sampleTitle: '1940s Bomber Nose Art',
      sampleSubtitle: 'Riveted fuselage & patriotic vintage stars'
    }
  },
  {
    id: 'banksy',
    name: 'Banksy',
    displayName: 'Banksy (Stenciled Urban Street Satire)',
    category: 'Historical & Decorative',
    eraOrMovement: '1990s – Present • Guerilla Street Art',
    signatureStyle: 'High-contrast black-and-white spray stencil figures on raw brick or concrete, a single pop of vibrant red (like a heart balloon), and witty social satire.',
    description: 'The world-famous Bristol street artist known for impactful spray-painted stencils, playful humor, and thought-provoking political commentary.',
    bestFor: ['Sociology & Urban Culture', 'Public Art History', 'Economics & Satire', 'Environmental Campaigns', 'Street Art Techniques'],
    palette: ['#ef4444', '#18181b', '#71717a', '#f4f4f5'],
    visualPreview: {
      bgGradient: 'from-neutral-900 to-red-950',
      accentColor: '#ef4444',
      sampleSymbol: '🎈',
      previewPattern: 'Spray Stencil on Concrete Brick',
      sampleTitle: 'Guerilla Stencil Street Art',
      sampleSubtitle: 'High-contrast stencil on brick with red balloon'
    }
  }
];
