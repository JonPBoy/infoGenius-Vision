/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

export interface AnimalStyleProps {
  animalName: string;
  styleName: string;
  styleType: 'aesthetic' | 'artist';
  styleId?: string;
  className?: string;
}

export const AnimalStyleRenderer: React.FC<AnimalStyleProps> = ({
  animalName,
  styleName,
  styleType,
  styleId = '',
  className = 'w-full h-full'
}) => {
  const normStyle = styleName.toLowerCase();
  const normAnimal = animalName.toLowerCase();

  // Color & Theme Palette deduction
  let bgGradient = 'from-slate-900 to-slate-950';
  let primaryColor = '#38bdf8';
  let secondaryColor = '#818cf8';
  let accentColor = '#f472b6';
  let mood = 'Vibrant';

  if (normStyle.includes('ghibli') || normStyle.includes('anime serenity')) {
    bgGradient = 'from-sky-400 via-sky-200 to-emerald-200';
    primaryColor = '#15803d';
    secondaryColor = '#38bdf8';
    accentColor = '#f59e0b';
    mood = 'Ghibli Gouache Pastoral';
  } else if (normStyle.includes('gogh')) {
    bgGradient = 'from-indigo-950 via-blue-900 to-amber-900';
    primaryColor = '#facc15';
    secondaryColor = '#38bdf8';
    accentColor = '#f97316';
    mood = 'Post-Impressionist Impasto';
  } else if (normStyle.includes('monet') || normStyle.includes('impressionis')) {
    bgGradient = 'from-sky-600 via-teal-500 to-pink-300';
    primaryColor = '#7dd3fc';
    secondaryColor = '#f472b6';
    accentColor = '#22c55e';
    mood = 'Dappled Water & Light';
  } else if (normStyle.includes('dali') || normStyle.includes('surreal')) {
    bgGradient = 'from-sky-400 via-amber-200 to-amber-800';
    primaryColor = '#d97706';
    secondaryColor = '#0284c7';
    accentColor = '#451a03';
    mood = 'Surrealist Dream Desert';
  } else if (normStyle.includes('burton') || normStyle.includes('gothic')) {
    bgGradient = 'from-zinc-950 via-neutral-900 to-purple-950';
    primaryColor = '#e4e4e7';
    secondaryColor = '#f43f5e';
    accentColor = '#a1a1aa';
    mood = 'Whimsical Gothic Ink';
  } else if (normStyle.includes('cyberpunk') || normStyle.includes('neon')) {
    bgGradient = 'from-purple-950 via-slate-950 to-cyan-950';
    primaryColor = '#06b6d4';
    secondaryColor = '#ec4899';
    accentColor = '#facc15';
    mood = 'High-Tech Neon Glow';
  } else if (normStyle.includes('bioluminescent') || normStyle.includes('deep sea')) {
    bgGradient = 'from-blue-950 via-cyan-950 to-indigo-950';
    primaryColor = '#22d3ee';
    secondaryColor = '#a855f7';
    accentColor = '#34d399';
    mood = 'Deep Abyss Photophores';
  } else if (normStyle.includes('papercut') || normStyle.includes('shadowbox')) {
    bgGradient = 'from-indigo-950 via-sky-900 to-teal-900';
    primaryColor = '#67e8f9';
    secondaryColor = '#f472b6';
    accentColor = '#fed7aa';
    mood = 'Layered 3D Depth Shadows';
  } else if (normStyle.includes('claymation') || normStyle.includes('stop-motion')) {
    bgGradient = 'from-amber-950 via-stone-900 to-amber-900';
    primaryColor = '#d97706';
    secondaryColor = '#f59e0b';
    accentColor = '#b45309';
    mood = 'Tactile Plasticine Clay';
  } else if (normStyle.includes('pop art') || normStyle.includes('warhol')) {
    bgGradient = 'from-yellow-400 via-pink-500 to-cyan-400';
    primaryColor = '#ec4899';
    secondaryColor = '#facc15';
    accentColor = '#06b6d4';
    mood = 'Silkscreen Ben-Day Grid';
  } else if (normStyle.includes('bauhaus') || normStyle.includes('constructiv')) {
    bgGradient = 'from-zinc-100 via-red-100 to-amber-100';
    primaryColor = '#ef4444';
    secondaryColor = '#3b82f6';
    accentColor = '#eab308';
    mood = 'Primary Geometry & Grid';
  } else if (normStyle.includes('ukiyo-e') || normStyle.includes('woodblock')) {
    bgGradient = 'from-amber-100 via-sky-200 to-blue-900';
    primaryColor = '#1d4ed8';
    secondaryColor = '#f43f5e';
    accentColor = '#0f172a';
    mood = 'Moku-Hanga Wave & Ink';
  } else if (normStyle.includes('stained glass')) {
    bgGradient = 'from-purple-950 via-blue-950 to-amber-950';
    primaryColor = '#38bdf8';
    secondaryColor = '#e11d48';
    accentColor = '#fbbf24';
    mood = 'Cathedral Lead Came Glass';
  } else if (normStyle.includes('solarpunk')) {
    bgGradient = 'from-emerald-900 via-teal-950 to-lime-900';
    primaryColor = '#4ade80';
    secondaryColor = '#facc15';
    accentColor = '#38bdf8';
    mood = 'Botanical Glass & Sun Tech';
  } else if (normStyle.includes('synthwave') || normStyle.includes('retrowave')) {
    bgGradient = 'from-purple-950 via-fuchsia-950 to-black';
    primaryColor = '#f43f5e';
    secondaryColor = '#a855f7';
    accentColor = '#06b6d4';
    mood = 'Outrun Sun & Wireframe';
  } else if (normStyle.includes('dark academia')) {
    bgGradient = 'from-stone-950 via-amber-950 to-stone-900';
    primaryColor = '#d97706';
    secondaryColor = '#a8a29e';
    accentColor = '#ca8a04';
    mood = 'Antique Leather & Ink';
  } else if (normStyle.includes('isometric') || normStyle.includes('voxel')) {
    bgGradient = 'from-slate-900 via-indigo-950 to-slate-900';
    primaryColor = '#38bdf8';
    secondaryColor = '#a855f7';
    accentColor = '#f59e0b';
    mood = '3D Cubic Voxel Grid';
  }

  // Render distinctive Animal Head / Body Vector
  const renderAnimalBody = () => {
    if (normAnimal.includes('panda') || normAnimal.includes('red panda')) {
      return (
        <g transform="translate(110, 45)">
          {/* Ears */}
          <circle cx="20" cy="30" r="16" fill={primaryColor} />
          <circle cx="20" cy="30" r="9" fill="#ffffff" opacity="0.8" />
          <circle cx="80" cy="30" r="16" fill={primaryColor} />
          <circle cx="80" cy="30" r="9" fill="#ffffff" opacity="0.8" />
          
          {/* Head */}
          <circle cx="50" cy="50" r="34" fill="#f8fafc" stroke={primaryColor} strokeWidth="3" />
          
          {/* Eye Patches */}
          <ellipse cx="36" cy="46" rx="9" ry="12" fill={secondaryColor} transform="rotate(-15, 36, 46)" />
          <circle cx="36" cy="46" r="3.5" fill="#0f172a" />
          <circle cx="35" cy="44" r="1.2" fill="#ffffff" />
          
          <ellipse cx="64" cy="46" rx="9" ry="12" fill={secondaryColor} transform="rotate(15, 64, 46)" />
          <circle cx="64" cy="46" r="3.5" fill="#0f172a" />
          <circle cx="63" cy="44" r="1.2" fill="#ffffff" />

          {/* Snout & Nose */}
          <ellipse cx="50" cy="62" rx="10" ry="7" fill="#ffffff" stroke={primaryColor} strokeWidth="1.5" />
          <polygon points="50,58 46,62 54,62" fill="#0f172a" />
          <path d="M 46 65 Q 50 68 54 65" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Torso */}
          <ellipse cx="50" cy="98" rx="26" ry="24" fill={primaryColor} opacity="0.9" />
          <circle cx="50" cy="98" r="14" fill="#ffffff" opacity="0.85" />
        </g>
      );
    }

    if (normAnimal.includes('owl')) {
      return (
        <g transform="translate(110, 40)">
          {/* Owl Heart Face Disk */}
          <path d="M 50 35 C 30 10, 5 30, 20 60 C 30 80, 50 90, 50 90 C 50 90, 70 80, 80 60 C 95 30, 70 10, 50 35 Z" fill="#f8fafc" stroke={primaryColor} strokeWidth="3" />
          
          {/* Big Owl Eyes */}
          <circle cx="35" cy="48" r="14" fill={accentColor} opacity="0.3" />
          <circle cx="35" cy="48" r="10" fill={primaryColor} />
          <circle cx="35" cy="48" r="5" fill="#0f172a" />
          <circle cx="33" cy="45" r="1.8" fill="#ffffff" />

          <circle cx="65" cy="48" r="14" fill={accentColor} opacity="0.3" />
          <circle cx="65" cy="48" r="10" fill={primaryColor} />
          <circle cx="65" cy="48" r="5" fill="#0f172a" />
          <circle cx="63" cy="45" r="1.8" fill="#ffffff" />

          {/* Sharp Beak */}
          <polygon points="50,52 46,64 54,64" fill={secondaryColor} />
          
          {/* Feathered Body */}
          <path d="M 25 80 Q 50 115 75 80 Q 80 120 50 125 Q 20 120 25 80 Z" fill={secondaryColor} opacity="0.9" stroke={primaryColor} strokeWidth="2" />
          
          {/* Wings */}
          <path d="M 18 60 Q -5 95 25 110" stroke={primaryColor} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 82 60 Q 105 95 75 110" stroke={primaryColor} strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    }

    if (normAnimal.includes('octopus')) {
      return (
        <g transform="translate(100, 35)">
          {/* Bulbous Mantle Head */}
          <path d="M 30 50 C 20 10, 100 10, 90 50 C 85 70, 35 70, 30 50 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="3" />
          
          {/* Intelligent Eyes */}
          <ellipse cx="45" cy="55" rx="7" ry="5" fill="#ffffff" stroke={primaryColor} strokeWidth="1.5" />
          <ellipse cx="45" cy="55" rx="3.5" ry="1.5" fill="#0f172a" />
          <ellipse cx="75" cy="55" rx="7" ry="5" fill="#ffffff" stroke={primaryColor} strokeWidth="1.5" />
          <ellipse cx="75" cy="55" rx="3.5" ry="1.5" fill="#0f172a" />

          {/* Flowing Curved Tentacles */}
          <path d="M 35 65 Q 10 90 0 120 Q -5 135 15 130 Q 25 115 40 85" stroke={primaryColor} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 48 68 Q 30 100 35 135 Q 45 145 55 125 Q 52 100 55 75" stroke={secondaryColor} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 65 70 Q 75 105 70 140 Q 80 150 90 130 Q 82 100 75 75" stroke={accentColor} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M 80 65 Q 110 90 120 120 Q 125 135 105 130 Q 95 115 80 85" stroke={primaryColor} strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Bioluminescent Suckers / Specks */}
          <circle cx="10" cy="115" r="2.5" fill={accentColor} />
          <circle cx="20" cy="100" r="2.5" fill={accentColor} />
          <circle cx="35" cy="120" r="2.5" fill={accentColor} />
          <circle cx="75" cy="125" r="2.5" fill={accentColor} />
          <circle cx="110" cy="115" r="2.5" fill={accentColor} />
        </g>
      );
    }

    if (normAnimal.includes('chameleon')) {
      return (
        <g transform="translate(100, 45)">
          {/* Branch */}
          <path d="M -10 95 Q 60 90 130 95" stroke="#78350f" strokeWidth="8" strokeLinecap="round" fill="none" />
          
          {/* Curled Spiral Tail */}
          <path d="M 25 70 Q -10 70 -5 50 Q 0 35 15 40 Q 25 45 20 55" stroke={primaryColor} strokeWidth="6" fill="none" strokeLinecap="round" />
          
          {/* Arched Body with Crest */}
          <path d="M 20 70 Q 45 25 75 55 Q 85 70 80 85 Q 50 85 20 70 Z" fill={primaryColor} stroke={secondaryColor} strokeWidth="3" />
          
          {/* Ridge Spines on Back */}
          <polygon points="35,42 40,32 45,40" fill={accentColor} />
          <polygon points="48,38 53,28 58,36" fill={accentColor} />
          <polygon points="61,38 66,30 71,40" fill={accentColor} />

          {/* Swiveling 360 Turret Eye */}
          <circle cx="75" cy="62" r="9" fill={secondaryColor} stroke={primaryColor} strokeWidth="2" />
          <circle cx="75" cy="62" r="3.5" fill="#0f172a" />
          <circle cx="74" cy="60" r="1" fill="#ffffff" />

          {/* Prehensile Feet gripping branch */}
          <ellipse cx="40" cy="85" rx="6" ry="8" fill={secondaryColor} />
          <ellipse cx="70" cy="85" rx="6" ry="8" fill={secondaryColor} />
        </g>
      );
    }

    if (normAnimal.includes('fox')) {
      return (
        <g transform="translate(110, 40)">
          {/* Giant Expressive Fennec Fox Ears */}
          <polygon points="30,45 10,-5 45,25" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          <polygon points="28,40 16,5 40,26" fill="#fed7aa" />
          <polygon points="70,45 90,-5 55,25" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          <polygon points="72,40 84,5 60,26" fill="#fed7aa" />

          {/* Fluffy Bushy Tail with White Tip */}
          <path d="M 20 85 Q -25 90 -20 60 Q -15 35 5 50" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          <polygon points="-20,60 -25,90 -5,75" fill="#ffffff" />

          {/* Sleek Triangular Fox Head */}
          <polygon points="50,82 15,38 85,38" fill={primaryColor} stroke={secondaryColor} strokeWidth="2.5" />
          
          {/* White Cheek Tufts */}
          <polygon points="50,82 25,48 50,55" fill="#ffffff" />
          <polygon points="50,82 75,48 50,55" fill="#ffffff" />

          {/* Almond Eyes */}
          <ellipse cx="36" cy="44" rx="5" ry="3" fill="#0f172a" transform="rotate(-15, 36, 44)" />
          <circle cx="35" cy="43" r="1" fill="#ffffff" />
          <ellipse cx="64" cy="44" rx="5" ry="3" fill="#0f172a" transform="rotate(15, 64, 44)" />
          <circle cx="63" cy="43" r="1" fill="#ffffff" />

          {/* Tiny Black Nose & Smile */}
          <circle cx="50" cy="80" r="3.5" fill="#0f172a" />
          <path d="M 46 83 Q 50 86 54 83" stroke="#0f172a" strokeWidth="1.5" fill="none" />
        </g>
      );
    }

    if (normAnimal.includes('leopard') || normAnimal.includes('tiger') || normAnimal.includes('cat')) {
      return (
        <g transform="translate(110, 45)">
          {/* Round Feline Ears */}
          <circle cx="25" cy="25" r="12" fill={primaryColor} />
          <circle cx="25" cy="25" r="6" fill="#fed7aa" />
          <circle cx="75" cy="25" r="12" fill={primaryColor} />
          <circle cx="75" cy="25" r="6" fill="#fed7aa" />

          {/* Big Cat Face */}
          <ellipse cx="50" cy="50" rx="32" ry="28" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          
          {/* Distinctive Rosette Spots or Stripes */}
          <circle cx="32" cy="32" r="3" fill={secondaryColor} />
          <circle cx="68" cy="32" r="3" fill={secondaryColor} />
          <circle cx="50" cy="28" r="2.5" fill={secondaryColor} />
          <circle cx="24" cy="48" r="3" fill={secondaryColor} />
          <circle cx="76" cy="48" r="3" fill={secondaryColor} />

          {/* Fierce / Mystical Eyes */}
          <ellipse cx="38" cy="45" rx="6" ry="4" fill={accentColor} />
          <circle cx="38" cy="45" r="2.5" fill="#0f172a" />
          <ellipse cx="62" cy="45" rx="6" ry="4" fill={accentColor} />
          <circle cx="62" cy="45" r="2.5" fill="#0f172a" />

          {/* White Snout */}
          <ellipse cx="50" cy="58" rx="12" ry="8" fill="#ffffff" />
          <polygon points="50,54 46,58 54,58" fill={secondaryColor} />
          
          {/* Whiskers */}
          <line x1="38" y1="60" x2="15" y2="58" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="38" y1="63" x2="18" y2="67" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="62" y1="60" x2="85" y2="58" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="62" y1="63" x2="82" y2="67" stroke="#ffffff" strokeWidth="1.5" />
        </g>
      );
    }

    if (normAnimal.includes('jellyfish')) {
      return (
        <g transform="translate(110, 35)">
          {/* Translucent Bell Dome */}
          <path d="M 15 65 C 10 10, 90 10, 85 65 Q 50 75 15 65 Z" fill={primaryColor} opacity="0.75" stroke={accentColor} strokeWidth="2.5" />
          <path d="M 25 55 C 25 25, 75 25, 75 55 Z" fill="#ffffff" opacity="0.4" />
          
          {/* Glowing Inner Organs */}
          <ellipse cx="50" cy="40" rx="14" ry="10" fill={accentColor} opacity="0.8" />
          <circle cx="50" cy="40" r="5" fill="#ffffff" />

          {/* Frilled Oral Arms */}
          <path d="M 40 68 Q 30 95 45 125 Q 35 145 42 165" stroke={secondaryColor} strokeWidth="4" fill="none" opacity="0.85" />
          <path d="M 60 68 Q 70 95 55 125 Q 65 145 58 165" stroke={secondaryColor} strokeWidth="4" fill="none" opacity="0.85" />

          {/* Delicate Stinging Tentacles */}
          <path d="M 20 68 Q 10 110 25 155" stroke={primaryColor} strokeWidth="2" fill="none" strokeDasharray="3,3" />
          <path d="M 80 68 Q 90 110 75 155" stroke={primaryColor} strokeWidth="2" fill="none" strokeDasharray="3,3" />
          <path d="M 30 68 Q 20 110 32 160" stroke={accentColor} strokeWidth="1.5" fill="none" />
          <path d="M 70 68 Q 80 110 68 160" stroke={accentColor} strokeWidth="1.5" fill="none" />
        </g>
      );
    }

    if (normAnimal.includes('toucan') || normAnimal.includes('kingfisher') || normAnimal.includes('bird')) {
      return (
        <g transform="translate(100, 40)">
          {/* Sleek Body */}
          <ellipse cx="45" cy="65" rx="22" ry="30" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          
          {/* Head */}
          <circle cx="45" cy="35" r="18" fill={primaryColor} />
          
          {/* Giant Vibrant Toucan Beak */}
          <path d="M 55 24 Q 105 25 115 45 Q 90 60 55 45 Z" fill={accentColor} stroke={secondaryColor} strokeWidth="2" />
          <path d="M 90 32 Q 115 45 105 50 Z" fill={secondaryColor} />
          <polygon points="55,24 65,24 62,45 55,45" fill="#facc15" />

          {/* Bright Eye Ring */}
          <circle cx="40" cy="32" r="6" fill="#38bdf8" />
          <circle cx="40" cy="32" r="3" fill="#0f172a" />
          <circle cx="39" cy="31" r="1" fill="#ffffff" />

          {/* White / Yellow Bib Throat */}
          <path d="M 35 38 Q 55 45 50 65 Q 35 60 35 38 Z" fill="#fef08a" />
        </g>
      );
    }

    if (normAnimal.includes('otter') || normAnimal.includes('capybara') || normAnimal.includes('sloth')) {
      return (
        <g transform="translate(110, 45)">
          {/* Round Friendly Ears */}
          <circle cx="22" cy="30" r="10" fill={primaryColor} />
          <circle cx="22" cy="30" r="5" fill="#fed7aa" />
          <circle cx="78" cy="30" r="10" fill={primaryColor} />
          <circle cx="78" cy="30" r="5" fill="#fed7aa" />

          {/* Friendly Head */}
          <circle cx="50" cy="45" r="30" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
          
          {/* Wide Snout */}
          <ellipse cx="50" cy="55" rx="16" ry="12" fill="#fed7aa" />
          <ellipse cx="50" cy="48" rx="5" ry="3.5" fill="#0f172a" />
          <path d="M 44 56 Q 50 62 56 56" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Peaceful Relaxed Eyes */}
          <ellipse cx="36" cy="40" rx="4" ry="4" fill="#0f172a" />
          <circle cx="35" cy="38" r="1.5" fill="#ffffff" />
          <ellipse cx="64" cy="40" rx="4" ry="4" fill="#0f172a" />
          <circle cx="63" cy="38" r="1.5" fill="#ffffff" />

          {/* Whiskers */}
          <line x1="32" y1="54" x2="16" y2="52" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="32" y1="58" x2="18" y2="60" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="68" y1="54" x2="84" y2="52" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="68" y1="58" x2="82" y2="60" stroke="#ffffff" strokeWidth="1.5" />

          {/* Paws holding a favorite pebble or flower */}
          <ellipse cx="38" cy="80" rx="8" ry="10" fill={secondaryColor} />
          <ellipse cx="62" cy="80" rx="8" ry="10" fill={secondaryColor} />
          <circle cx="50" cy="78" r="7" fill={accentColor} />
        </g>
      );
    }

    // Default: Regal Majestic Animal Portrait (Wolf / Lion / Bear)
    return (
      <g transform="translate(110, 42)">
        <polygon points="25,35 15,10 40,25" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
        <polygon points="75,35 85,10 60,25" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
        
        <circle cx="50" cy="48" r="30" fill={primaryColor} stroke={secondaryColor} strokeWidth="2" />
        
        <ellipse cx="38" cy="42" rx="4" ry="4" fill="#0f172a" />
        <circle cx="37" cy="40" r="1.5" fill="#ffffff" />
        <ellipse cx="62" cy="42" rx="4" ry="4" fill="#0f172a" />
        <circle cx="61" cy="40" r="1.5" fill="#ffffff" />
        
        <ellipse cx="50" cy="56" rx="14" ry="10" fill="#fed7aa" />
        <polygon points="50,50 46,55 54,55" fill="#0f172a" />
        <path d="M 45 60 Q 50 64 55 60" stroke="#0f172a" strokeWidth="2" fill="none" />
      </g>
    );
  };

  return (
    <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${normAnimal}-${normStyle.replace(/[^a-z0-9]/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
          <stop offset="50%" stopColor={secondaryColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
        </linearGradient>
        
        {/* Pattern overlays */}
        <pattern id="grid-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="1" fill="#ffffff" opacity="0.15" />
        </pattern>
      </defs>

      {/* Main Stylistic Background */}
      <rect width="320" height="220" fill="#09090b" rx="16" />
      <rect width="320" height="220" fill={`url(#grad-${normAnimal}-${normStyle.replace(/[^a-z0-9]/g, '')})`} rx="16" />
      <rect width="320" height="220" fill="url(#grid-dots)" rx="16" />

      {/* Atmospheric Stylistic Elements */}
      {normStyle.includes('cyber') && (
        <g stroke="#06b6d4" strokeWidth="1" opacity="0.4">
          <line x1="0" y1="180" x2="320" y2="180" strokeWidth="2" stroke="#ec4899" />
          <line x1="40" y1="180" x2="0" y2="220" />
          <line x1="160" y1="180" x2="160" y2="220" />
          <line x1="280" y1="180" x2="320" y2="220" />
        </g>
      )}

      {normStyle.includes('ghibli') && (
        <g fill="#ffffff" opacity="0.6">
          <path d="M 30 50 Q 50 30 80 40 Q 110 30 130 50 Q 80 65 30 50 Z" />
          <path d="M 200 40 Q 230 20 270 35 Q 300 30 310 50 Q 250 65 200 40 Z" />
        </g>
      )}

      {normStyle.includes('gogh') && (
        <g stroke="#facc15" strokeWidth="2" strokeLinecap="round" opacity="0.6" fill="none">
          <path d="M 20 30 Q 60 10 100 30 T 200 30 T 300 30" />
          <path d="M 10 60 Q 80 30 150 60 T 280 50" />
        </g>
      )}

      {normStyle.includes('monet') && (
        <g stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.6">
          <line x1="20" y1="170" x2="70" y2="170" />
          <line x1="100" y1="165" x2="160" y2="165" />
          <line x1="200" y1="175" x2="280" y2="175" />
        </g>
      )}

      {/* Render Dynamic Animal Subject */}
      {renderAnimalBody()}

      {/* Top Badge: Style & Animal Info */}
      <rect x="10" y="10" width="170" height="24" rx="6" fill="#09090b" fillOpacity="0.8" stroke={primaryColor} strokeWidth="1" />
      <text x="16" y="26" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
        {animalName} • {styleName}
      </text>

      {/* Bottom Floating Technique Caption */}
      <rect x="10" y="186" width="300" height="24" rx="6" fill="#09090b" fillOpacity="0.75" />
      <text x="18" y="202" fill={accentColor} fontSize="9" fontWeight="bold" fontFamily="monospace">
        ✨ Technique: {mood}
      </text>
    </svg>
  );
};
