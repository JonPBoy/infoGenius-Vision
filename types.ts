/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export type AspectRatio = '16:9' | '9:16' | '1:1';

export type ComplexityLevel = 'Elementary' | 'High School' | 'College' | 'Expert';

export type VisualStyle = 
  | 'Let AI Decide' 
  | '3D Render' 
  | 'Cartoon' 
  | 'Default' 
  | 'Futuristic' 
  | 'Minimalist' 
  | 'Realistic' 
  | 'Sketch' 
  | 'Vintage'
  // 20 Cool Distinctive Aesthetics
  | 'Cyberpunk Neon HUD'
  | 'Solarpunk Utopia'
  | 'Synthwave Retrowave'
  | 'Glassmorphism Aero'
  | 'Dark Academia'
  | 'Bioluminescent Deep Sea'
  | 'Stained Glass Gothic'
  | 'Papercut Shadowbox'
  | 'Isometric Voxel'
  | 'Swiss Typographic Grid'
  | 'Claymation Stop-Motion'
  | 'Cosmic Nebula'
  | 'Blueprint Cyanotype'
  | 'Risograph Grain'
  | 'Ghibli Anime Serenity'
  | 'Liminal Dreamscape'
  | 'Steampunk Brass Workshop'
  | 'Neon Noir Detective'
  | 'Holographic Iridescent'
  | 'Fantasy Cartography';

export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Mandarin' | 'Japanese' | 'Hindi' | 'Arabic' | 'Portuguese' | 'Russian';

export type ArtForm = 
  | 'None'
  | 'Adventure Time'
  | 'Afrofuturism'
  | 'Art Deco'
  | 'Art Nouveau'
  | 'Banksy'
  | 'Bauhaus'
  | 'Betty Boop'
  | 'Charley Harper'
  | 'Classic Disney'
  | 'Claymation'
  | 'Claude Monet'
  | 'Cyberpunk Anime'
  | 'Dark Fantasy'
  | 'Invader Zim'
  | 'Jack Kirby'
  | 'Jean-Michel Basquiat'
  | 'Johnny the Homicidal Maniac'
  | 'Keith Haring'
  | 'Looney Tunes'
  | 'Moebius'
  | 'Origami Papercraft'
  | 'Pablo Picasso'
  | 'Pixel Art'
  | 'Pop Art'
  | 'Popeye'
  | 'Porky Pig'
  | 'Psychedelic 60s'
  | 'Retro 90s Anime'
  | 'Risograph Print'
  | 'Rubber Hose Animation'
  | 'Salvador Dali'
  | 'Steampunk'
  | 'Studio Ghibli'
  | 'Tin Tin'
  | 'Tim Burton'
  | 'Tom and Jerry'
  | 'Ukiyo-e Woodblock'
  | 'Vaporwave'
  | 'Vincent van Gogh'
  | 'Watercolor Botanical'
  | 'WWII Pin-up Art'
  | 'Yogi Bear';

export interface Hotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  description: string;
  url?: string;
}

export interface Annotation {
  id: string;
  type: 'drawing' | 'text';
  color: string;
  strokeWidth?: number;
  fontSize?: number;
  // Drawing props
  points?: { x: number, y: number }[];
  // Text props
  x?: number;
  y?: number;
  content?: string;
  width?: number;
  height?: number;
}

export interface GeneratedImage {
  id: string;
  data: string; // Base64 data URL
  prompt: string;
  timestamp: number;
  level?: ComplexityLevel;
  style?: VisualStyle;
  language?: Language;
  artForm?: ArtForm;
  hotspots?: Hotspot[];
  annotations?: Annotation[];
  annotationHistoryStates?: Annotation[][];
  historyIndex?: number;
}

export interface SearchResultItem {
  title: string;
  url: string;
}

export interface ResearchResult {
  imagePrompt: string;
  facts: string[];
  searchResults: SearchResultItem[];
}

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}