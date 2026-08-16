import { VisualStyle, ArtForm, ComplexityLevel } from '../types';

export interface InspirationPrompt {
  topic: string;
  category: string;
  suggestedStyle?: VisualStyle;
  suggestedArtForm?: ArtForm;
  suggestedLevel?: ComplexityLevel;
  emoji?: string;
  shortLabel?: string;
}

export const ALL_INSPIRATION_PROMPTS: InspirationPrompt[] = [
  // Kids & Elementary Fun Curiosities
  {
    topic: "Why are flamingos pink and how does their diet of shrimp and algae change their color?",
    shortLabel: "🦩 Why Flamingos Turn Pink",
    category: "Fun Animal Biology",
    suggestedStyle: "Ghibli Anime Serenity",
    suggestedLevel: "Elementary",
    emoji: "🦩"
  },
  {
    topic: "How do cats always manage to land on their feet using the feline righting reflex?",
    shortLabel: "🐱 Why Cats Land on Their Feet",
    category: "Animal Physics",
    suggestedStyle: "Claymation Stop-Motion",
    suggestedLevel: "Elementary",
    emoji: "🐱"
  },
  {
    topic: "How do popcorn kernels pop into fluffy snacks with steam pressure?",
    shortLabel: "🍿 The Physics of Popcorn",
    category: "Kitchen Science",
    suggestedStyle: "Papercut Shadowbox",
    suggestedLevel: "Elementary",
    emoji: "🍿"
  },
  {
    topic: "What is actually inside an active volcano under the magma chamber?",
    shortLabel: "🌋 Inside an Active Volcano",
    category: "Earth Wonders",
    suggestedStyle: "3D Render",
    suggestedLevel: "Elementary",
    emoji: "🌋"
  },
  {
    topic: "How do chameleons change colors using photonic crystals in their skin cells?",
    shortLabel: "🦎 How Chameleons Shift Colors",
    category: "Animal Wonders",
    suggestedStyle: "Holographic Iridescent",
    suggestedLevel: "Elementary",
    emoji: "🦎"
  },
  {
    topic: "Why do we yawn and why is yawning contagious among humans and dogs?",
    shortLabel: "🥱 Why Is Yawning Contagious?",
    category: "Human Body",
    suggestedStyle: "Cartoon",
    suggestedLevel: "Elementary",
    emoji: "🥱"
  },
  {
    topic: "How do fireflies glow in the dark without producing any heat?",
    shortLabel: "✨ How Fireflies Light Up",
    category: "Nature Glow",
    suggestedStyle: "Bioluminescent Deep Sea",
    suggestedLevel: "Elementary",
    emoji: "✨"
  },
  {
    topic: "How did Tyrannosaurus Rex use its bone-crushing jaw bite force?",
    shortLabel: "🦖 T-Rex Bite Force Mechanics",
    category: "Dinosaurs",
    suggestedStyle: "Comic Book",
    suggestedLevel: "Elementary",
    emoji: "🦖"
  },
  {
    topic: "How do rainbow colors form when raindrops bend and reflect sunlight?",
    shortLabel: "🌈 How Rainbows Form",
    category: "Atmospheric Optics",
    suggestedStyle: "Watercolor Botanical",
    suggestedLevel: "Elementary",
    emoji: "🌈"
  },
  {
    topic: "How do honeybees make sweet honey from flower nectar?",
    shortLabel: "🐝 How Bees Make Honey",
    category: "Nature & Food",
    suggestedStyle: "Solarpunk Utopia",
    suggestedLevel: "Elementary",
    emoji: "🐝"
  },

  // Everyday Magic & How Things Work
  {
    topic: "How does a microwave oven heat water molecules inside food so quickly?",
    shortLabel: "🍲 How Microwaves Cook Food",
    category: "Everyday Tech",
    suggestedStyle: "Swiss Typographic Grid",
    suggestedLevel: "High School",
    emoji: "🍲"
  },
  {
    topic: "How does a smartphone capacitive touchscreen detect your finger touches?",
    shortLabel: "📱 How Touchscreens Work",
    category: "Everyday Tech",
    suggestedStyle: "Glassmorphism Aero",
    suggestedLevel: "High School",
    emoji: "📱"
  },
  {
    topic: "How do heavy steel airplanes generate aerodynamic lift and stay in the air?",
    shortLabel: "✈️ How Airplanes Fly",
    category: "Aviation",
    suggestedStyle: "Blueprint Cyanotype",
    suggestedLevel: "High School",
    emoji: "✈️"
  },
  {
    topic: "How do noise-canceling headphones produce anti-noise sound waves to cancel background noise?",
    shortLabel: "🎧 Active Noise Cancellation",
    category: "Audio Physics",
    suggestedStyle: "Cyberpunk Neon HUD",
    suggestedLevel: "High School",
    emoji: "🎧"
  },
  {
    topic: "How does soap destroy viruses and bacteria by breaking their lipid membranes?",
    shortLabel: "🧼 How Soap Kills Germs",
    category: "Chemistry",
    suggestedStyle: "3D Render",
    suggestedLevel: "High School",
    emoji: "🧼"
  },
  {
    topic: "How does a mechanical zipper interlock metal teeth to hold your jacket together?",
    shortLabel: "🤐 How Zippers Work",
    category: "Inventions",
    suggestedStyle: "Steampunk Brass Workshop",
    suggestedLevel: "High School",
    emoji: "🤐"
  },
  {
    topic: "Why is the ocean blue and where does all the salt in seawater come from?",
    shortLabel: "🌊 Why the Ocean Is Salty",
    category: "Oceanography",
    suggestedStyle: "Risograph Grain",
    suggestedLevel: "High School",
    emoji: "🌊"
  },
  {
    topic: "How does chocolate transform from bitter cacao pods into silky smooth candy bars?",
    shortLabel: "🍫 The Chocolate Making Journey",
    category: "Food Science",
    suggestedStyle: "Dark Academia",
    suggestedLevel: "High School",
    emoji: "🍫"
  },
  {
    topic: "How do submarine ballast tanks work to submerge and rise in deep ocean waters?",
    shortLabel: "⚓ How Submarines Dive & Surface",
    category: "Naval Tech",
    suggestedStyle: "Blueprint Cyanotype",
    suggestedLevel: "High School",
    emoji: "⚓"
  },

  // Mind-Blowing Science & Deep Space
  {
    topic: "What happens to the human body during months of living in zero gravity on the ISS?",
    shortLabel: "👨‍🚀 Human Body in Zero Gravity",
    category: "Space Medicine",
    suggestedStyle: "Realistic",
    suggestedLevel: "High School",
    emoji: "👨‍🚀"
  },
  {
    topic: "Anatomy of a Black Hole: Event Horizon, Singularity, Photon Sphere and Accretion Disk",
    shortLabel: "🌌 Inside a Black Hole",
    category: "Astrophysics",
    suggestedStyle: "Cosmic Nebula",
    suggestedLevel: "High School",
    emoji: "🌌"
  },
  {
    topic: "How the James Webb Space Telescope unfolds its 18 gold-plated hexagonal mirrors in deep space",
    shortLabel: "🔭 JWST 18 Gold Mirrors",
    category: "Space Engineering",
    suggestedStyle: "Cyberpunk Neon HUD",
    suggestedLevel: "High School",
    emoji: "🔭"
  },
  {
    topic: "How does Quantum Entanglement create 'spooky action at a distance' between particles?",
    shortLabel: "🔬 Quantum Entanglement Spooky Action",
    category: "Quantum Physics",
    suggestedStyle: "Cyberpunk Neon HUD",
    suggestedLevel: "College",
    emoji: "🔬"
  },
  {
    topic: "How trees in a forest talk and share sugar nutrients through underground fungal networks",
    shortLabel: "🌲 The Wood Wide Web in Forests",
    category: "Ecology & Mycology",
    suggestedStyle: "Solarpunk Utopia",
    suggestedLevel: "High School",
    emoji: "🌲"
  },
  {
    topic: "How do massive whales sleep in the open ocean without drowning?",
    shortLabel: "🐋 How Whales Sleep Underwater",
    category: "Marine Zoology",
    suggestedStyle: "Bioluminescent Deep Sea",
    suggestedLevel: "Elementary",
    emoji: "🐋"
  },
  {
    topic: "How do tornadoes form inside severe supercell thunderstorms?",
    shortLabel: "🌪️ Anatomy of a Supercell Tornado",
    category: "Meteorology",
    suggestedStyle: "Synthwave Retrowave",
    suggestedLevel: "High School",
    emoji: "🌪️"
  },
  {
    topic: "How the CRISPR-Cas9 molecular scissors find, cut, and edit specific gene sequences",
    shortLabel: "🧬 CRISPR Gene Editing Scissors",
    category: "Biotechnology",
    suggestedStyle: "Glassmorphism Aero",
    suggestedLevel: "College",
    emoji: "🧬"
  },
  {
    topic: "How caffeine blocks adenosine receptors in your brain to keep you feeling awake",
    shortLabel: "☕ How Caffeine Wakes Up Your Brain",
    category: "Neuroscience",
    suggestedStyle: "Swiss Typographic Grid",
    suggestedLevel: "High School",
    emoji: "☕"
  },
  {
    topic: "How ancient Egyptians cut, transported, and stacked 2-million stone blocks for the Great Pyramids",
    shortLabel: "🏛️ How Pyramids Were Built",
    category: "Ancient Engineering",
    suggestedStyle: "Dark Academia",
    suggestedLevel: "High School",
    emoji: "🏛️"
  },
  {
    topic: "The 2,000-year-old Antikythera Mechanism: The world's first mechanical astronomical computer",
    shortLabel: "⚙️ 2,000-Yr-Old Greek Computer",
    category: "Ancient History",
    suggestedStyle: "Steampunk Brass Workshop",
    suggestedLevel: "High School",
    emoji: "⚙️"
  },
  {
    topic: "How do octopuses change their skin color, texture, and pattern in less than a second?",
    shortLabel: "🐙 Octopus Camouflage Superpowers",
    category: "Marine Biology",
    suggestedStyle: "Bioluminescent Deep Sea",
    suggestedLevel: "Elementary",
    emoji: "🐙"
  },
  {
    topic: "How does lightning strike the ground and why does thunder boom seconds later?",
    shortLabel: "⚡ The Physics of Lightning & Thunder",
    category: "Weather Wonders",
    suggestedStyle: "Synthwave Retrowave",
    suggestedLevel: "Elementary",
    emoji: "⚡"
  },
  {
    topic: "How do Monarch Butterflies navigate 3,000 miles across North America to Mexico?",
    shortLabel: "🦋 Monarch Butterfly 3,000-Mile Migration",
    category: "Animal Migration",
    suggestedStyle: "Ghibli Anime Serenity",
    suggestedLevel: "Elementary",
    emoji: "🦋"
  },
  {
    topic: "How does 3D Printing build solid physical objects layer by plastic layer?",
    shortLabel: "🖨️ How 3D Printers Build Objects",
    category: "Modern Tech",
    suggestedStyle: "Isometric Voxel",
    suggestedLevel: "High School",
    emoji: "🖨️"
  },
  {
    topic: "How does your immune system remember past viruses using Memory B-Cells and Antibodies?",
    shortLabel: "🛡️ How Immune Memory Protects You",
    category: "Human Biology",
    suggestedStyle: "3D Render",
    suggestedLevel: "High School",
    emoji: "🛡️"
  }
];

export const getRandomInspiration = (excludeTopic?: string): InspirationPrompt => {
  const filtered = excludeTopic 
    ? ALL_INSPIRATION_PROMPTS.filter(p => p.topic !== excludeTopic) 
    : ALL_INSPIRATION_PROMPTS;
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};

export const getRandomQuickIdeas = (count: number = 9): InspirationPrompt[] => {
  const shuffled = [...ALL_INSPIRATION_PROMPTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const INSPIRATION_PROMPTS = ALL_INSPIRATION_PROMPTS;
