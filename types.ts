/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export type AspectRatio = '16:9' | '9:16' | '1:1';

export type ComplexityLevel = 'Elementary' | 'High School' | 'College' | 'Expert';

export type VisualStyle = 'Default' | 'Minimalist' | 'Realistic' | 'Cartoon' | 'Vintage' | 'Futuristic' | '3D Render' | 'Sketch';

export type Language = 'English' | 'Spanish' | 'French' | 'German' | 'Mandarin' | 'Japanese' | 'Hindi' | 'Arabic' | 'Portuguese' | 'Russian';

export type ArtForm = 'None' | 'Rubber Hose Animation' | 'Looney Tunes' | 'Tom and Jerry' | 'Betty Boop' | 'Yogi Bear' | 'Porky Pig' | 'Tin Tin' | 'Classic Disney' | 'Salvador Dali' | 'Popeye' | 'Tim Burton' | 'Johnny the Homicidal Maniac' | 'Invader Zim' | 'WWII Pin-up Art' | 'Studio Ghibli' | 'Cyberpunk Anime' | 'Art Nouveau' | 'Pixel Art' | 'Jean-Michel Basquiat' | 'Pop Art' | 'Steampunk' | 'Ukiyo-e Woodblock';

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