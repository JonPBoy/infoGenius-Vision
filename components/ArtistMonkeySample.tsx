/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ArtForm } from '../types';

interface ArtistMonkeySampleProps {
  artFormId: string;
  artFormName?: ArtForm;
  className?: string;
}

export const ArtistMonkeySample: React.FC<ArtistMonkeySampleProps> = ({
  artFormId,
  artFormName,
  className = 'w-full h-full'
}) => {
  // Return the distinctive visual artwork of a monkey in each artist/movement's signature style
  switch (artFormId) {
    case 'studio-ghibli':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ghibli-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="ghibli-grass1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="ghibli-grass2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Sky */}
          <rect width="320" height="220" fill="url(#ghibli-sky)" rx="16" />
          
          {/* Fluffy Miyazaki Cumulus Cloud */}
          <path d="M 40 70 Q 60 40 90 50 Q 120 30 150 45 Q 180 35 200 55 Q 220 70 210 85 Q 190 100 130 95 Q 60 100 40 70 Z" fill="#ffffff" opacity="0.95" />
          <path d="M 180 50 Q 210 20 250 30 Q 280 20 300 45 Q 310 65 290 80 Q 250 90 200 80 Z" fill="#ffffff" opacity="0.85" />
          
          {/* Rolling Gouache Hills */}
          <path d="M -10 160 Q 70 120 160 140 Q 250 160 330 130 L 330 220 L -10 220 Z" fill="url(#ghibli-grass1)" />
          <path d="M -10 180 Q 90 150 200 170 Q 280 180 330 160 L 330 220 L -10 220 Z" fill="url(#ghibli-grass2)" />
          
          {/* Ghibli Hand-Drawn Anime Monkey sitting peacefully */}
          <g transform="translate(130, 95)">
            {/* Soft Shadow */}
            <ellipse cx="30" cy="85" rx="35" ry="10" fill="#14532d" opacity="0.4" />
            
            {/* Monkey Tail */}
            <path d="M 15 65 Q -15 60 -10 40 Q -5 20 -25 25" fill="none" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
            
            {/* Body */}
            <ellipse cx="30" cy="55" rx="26" ry="28" fill="#92400e" />
            <ellipse cx="30" cy="55" rx="18" ry="20" fill="#fed7aa" />
            
            {/* Ears */}
            <circle cx="5" cy="22" r="11" fill="#92400e" />
            <circle cx="5" cy="22" r="6" fill="#fecdd3" />
            <circle cx="55" cy="22" r="11" fill="#92400e" />
            <circle cx="55" cy="22" r="6" fill="#fecdd3" />
            
            {/* Head */}
            <ellipse cx="30" cy="25" rx="24" ry="22" fill="#92400e" />
            {/* Face Mask */}
            <path d="M 15 25 C 15 12, 23 15, 30 18 C 37 15, 45 12, 45 25 C 45 35, 38 42, 30 42 C 22 42, 15 35, 15 25 Z" fill="#ffedd5" />
            
            {/* Expressive Anime Eyes */}
            <circle cx="23" cy="25" r="4.5" fill="#1e1b4b" />
            <circle cx="21.5" cy="23.5" r="1.8" fill="#ffffff" />
            <circle cx="37" cy="25" r="4.5" fill="#1e1b4b" />
            <circle cx="35.5" cy="23.5" r="1.8" fill="#ffffff" />
            
            {/* Nose & Smile */}
            <ellipse cx="30" cy="31" rx="2" ry="1.2" fill="#78350f" />
            <path d="M 26 34 Q 30 38 34 34" fill="none" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Rosy Cheeks */}
            <ellipse cx="18" cy="31" rx="3.5" ry="2" fill="#f43f5e" opacity="0.3" />
            <ellipse cx="42" cy="31" rx="3.5" ry="2" fill="#f43f5e" opacity="0.3" />
            
            {/* Little Ghibli Leaf on Head */}
            <path d="M 30 5 Q 40 -10 30 -18 Q 20 -10 30 5 Z" fill="#22c55e" />
            <path d="M 30 5 L 30 -14" stroke="#15803d" strokeWidth="1" />
            
            {/* Arms holding a flower */}
            <ellipse cx="14" cy="56" rx="6" ry="12" fill="#92400e" transform="rotate(25, 14, 56)" />
            <ellipse cx="46" cy="56" rx="6" ry="12" fill="#92400e" transform="rotate(-25, 46, 56)" />
            <circle cx="30" cy="55" r="5" fill="#fbbf24" />
            <circle cx="30" cy="55" r="2.5" fill="#ef4444" />
          </g>

          {/* Dappled Sun Rays */}
          <line x1="0" y1="0" x2="120" y2="200" stroke="#fef08a" strokeWidth="25" opacity="0.15" strokeLinecap="round" />
          <line x1="80" y1="0" x2="220" y2="200" stroke="#fef08a" strokeWidth="35" opacity="0.15" strokeLinecap="round" />
          
          {/* Label Badge */}
          <rect x="10" y="10" width="135" height="22" rx="6" fill="#0f172a" fillOpacity="0.6" />
          <text x="16" y="25" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Studio Ghibli Anime</text>
        </svg>
      );

    case 'vincent-van-gogh':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vg-sky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
            <filter id="vg-swirl">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
            </filter>
          </defs>
          {/* Night Sky */}
          <rect width="320" height="220" fill="url(#vg-sky)" rx="16" />
          
          {/* Swirling Starry Brushstrokes */}
          <g stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" fill="none">
            <path d="M 10 30 Q 50 10 90 35 T 180 30 T 270 40" />
            <path d="M 20 55 Q 80 20 140 60 T 250 45" />
            <path d="M 0 80 Q 60 50 130 90 T 260 75" />
            <path d="M 190 90 Q 230 60 280 90 T 320 80" />
          </g>
          
          <g stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none">
            <path d="M 30 40 Q 70 20 110 45 T 200 40" />
            <path d="M 120 70 Q 170 35 230 75" />
            <path d="M 230 30 A 20 20 0 1 1 250 50" />
            <path d="M 60 65 A 15 15 0 1 1 80 80" />
          </g>

          {/* Golden Halo Star */}
          <circle cx="260" cy="40" r="18" fill="#fef08a" opacity="0.9" />
          <circle cx="260" cy="40" r="26" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,4" fill="none" />
          <circle cx="260" cy="40" r="34" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3,5" fill="none" opacity="0.6" />

          {/* Van Gogh Impasto Textured Monkey */}
          <g transform="translate(110, 80)">
            {/* Cypress tree behind */}
            <path d="M -40 140 Q -30 40 -15 -10 Q 0 40 10 140 Z" fill="#064e3b" opacity="0.8" />
            <path d="M -35 140 Q -25 50 -15 0 Q -5 50 5 140 Z" fill="#047857" opacity="0.7" />
            
            {/* Directional impasto strokes for body */}
            <ellipse cx="50" cy="70" rx="35" ry="40" fill="#78350f" />
            {/* Impasto highlights on body */}
            <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
              <line x1="30" y1="50" x2="35" y2="75" />
              <line x1="42" y1="45" x2="47" y2="80" />
              <line x1="55" y1="45" x2="60" y2="80" />
              <line x1="68" y1="50" x2="72" y2="75" />
            </g>
            <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round">
              <line x1="25" y1="60" x2="28" y2="85" />
              <line x1="75" y1="60" x2="72" y2="85" />
            </g>

            {/* Van Gogh Impasto Head */}
            <circle cx="50" cy="30" r="30" fill="#854d0e" />
            
            {/* Swirling fur strokes on head */}
            <g stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <path d="M 30 15 Q 50 5 70 15" />
              <path d="M 25 25 Q 50 15 75 25" />
              <path d="M 22 35 Q 35 25 45 35" />
              <path d="M 55 35 Q 65 25 78 35" />
            </g>
            <g stroke="#2563eb" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M 28 8 Q 50 0 72 8" />
              <path d="M 20 40 Q 50 55 80 40" />
            </g>

            {/* Impasto Ears */}
            <circle cx="18" cy="25" r="12" fill="#713f12" stroke="#eab308" strokeWidth="2" />
            <circle cx="82" cy="25" r="12" fill="#713f12" stroke="#eab308" strokeWidth="2" />

            {/* Intense Emotive Post-Impressionist Eyes */}
            <circle cx="40" cy="28" r="6" fill="#1e1b4b" stroke="#facc15" strokeWidth="2" />
            <circle cx="41" cy="27" r="2" fill="#ffffff" />
            <circle cx="60" cy="28" r="6" fill="#1e1b4b" stroke="#facc15" strokeWidth="2" />
            <circle cx="61" cy="27" r="2" fill="#ffffff" />

            {/* Expressive Ochre Muzzle */}
            <ellipse cx="50" cy="42" rx="14" ry="10" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
            <ellipse cx="46" cy="40" rx="2" ry="1.5" fill="#451a03" />
            <ellipse cx="54" cy="40" rx="2" ry="1.5" fill="#451a03" />
            <path d="M 44 46 Q 50 50 56 46" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Bottom wheat field strokes */}
          <g stroke="#ca8a04" strokeWidth="3" strokeLinecap="round">
            <line x1="10" y1="210" x2="30" y2="185" />
            <line x1="40" y1="215" x2="65" y2="180" />
            <line x1="80" y1="210" x2="95" y2="188" />
            <line x1="220" y1="215" x2="245" y2="180" />
            <line x1="260" y1="210" x2="280" y2="185" />
            <line x1="290" y1="215" x2="310" y2="190" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="145" height="22" rx="6" fill="#0f172a" fillOpacity="0.7" />
          <text x="16" y="25" fill="#facc15" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Van Gogh Post-Impressionism</text>
        </svg>
      );

    case 'claude-monet':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="monet-water" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#monet-water)" rx="16" />
          
          {/* Shimmering Broken Color Brushstrokes on Water */}
          <g stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
            <line x1="20" y1="40" x2="50" y2="40" />
            <line x1="70" y1="35" x2="110" y2="35" />
            <line x1="140" y1="45" x2="190" y2="45" />
            <line x1="220" y1="30" x2="270" y2="30" />
            <line x1="30" y1="70" x2="80" y2="70" />
            <line x1="100" y1="80" x2="160" y2="80" />
            <line x1="210" y1="75" x2="280" y2="75" />
          </g>
          <g stroke="#f472b6" strokeWidth="2" strokeLinecap="round" opacity="0.6">
            <line x1="40" y1="120" x2="80" y2="120" />
            <line x1="120" y1="110" x2="170" y2="110" />
            <line x1="200" y1="130" x2="250" y2="130" />
          </g>
          
          {/* Water Lilies */}
          <ellipse cx="60" cy="150" rx="30" ry="10" fill="#15803d" opacity="0.9" />
          <circle cx="60" cy="148" r="6" fill="#f472b6" />
          <circle cx="60" cy="148" r="3" fill="#ffffff" />
          
          <ellipse cx="250" cy="160" rx="35" ry="12" fill="#166534" opacity="0.9" />
          <circle cx="250" cy="158" r="8" fill="#fda4af" />
          <circle cx="250" cy="158" r="4" fill="#ffffff" />
          
          {/* Japanese Footbridge */}
          <path d="M 20 80 Q 160 30 300 80" fill="none" stroke="#22c55e" strokeWidth="6" opacity="0.75" />
          <path d="M 20 95 Q 160 45 300 95" fill="none" stroke="#15803d" strokeWidth="5" opacity="0.75" />
          <line x1="70" y1="62" x2="70" y2="90" stroke="#15803d" strokeWidth="3" opacity="0.7" />
          <line x1="160" y1="42" x2="160" y2="80" stroke="#15803d" strokeWidth="3" opacity="0.7" />
          <line x1="250" y1="62" x2="250" y2="90" stroke="#15803d" strokeWidth="3" opacity="0.7" />

          {/* Dappled Impressionist Monkey sitting on Bridge */}
          <g transform="translate(130, 25)">
            <ellipse cx="30" cy="45" rx="20" ry="24" fill="#78716c" opacity="0.9" />
            {/* Dappled strokes on fur */}
            <g stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.8">
              <line x1="22" y1="35" x2="28" y2="48" />
              <line x1="32" y1="32" x2="38" y2="45" />
            </g>
            <g stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" opacity="0.8">
              <line x1="16" y1="42" x2="20" y2="55" />
              <line x1="40" y1="40" x2="44" y2="52" />
            </g>
            {/* Head */}
            <circle cx="30" cy="20" r="16" fill="#a8a29e" />
            <circle cx="16" cy="18" r="7" fill="#78716c" />
            <circle cx="44" cy="18" r="7" fill="#78716c" />
            {/* Impressionist soft eyes */}
            <circle cx="25" cy="18" r="3" fill="#1e293b" />
            <circle cx="35" cy="18" r="3" fill="#1e293b" />
            <ellipse cx="30" cy="26" rx="8" ry="6" fill="#fed7aa" opacity="0.9" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="145" height="22" rx="6" fill="#0f172a" fillOpacity="0.7" />
          <text x="16" y="25" fill="#7dd3fc" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Monet French Impressionism</text>
        </svg>
      );

    case 'salvador-dali':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dali-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="dali-desert" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          {/* Surreal Twilight Sky */}
          <rect width="320" height="220" fill="url(#dali-sky)" rx="16" />
          {/* Infinite Desert Horizon */}
          <rect y="120" width="320" height="100" fill="url(#dali-desert)" rx="0" />
          <line x1="0" y1="120" x2="320" y2="120" stroke="#fde68a" strokeWidth="1.5" />
          
          {/* Surrealist Cliff / Pedestal */}
          <polygon points="10,130 90,125 70,220 0,220" fill="#451a03" />

          {/* Surreal Melting Clock hanging over dead olive branch */}
          <path d="M 30 110 Q 50 90 70 110 C 75 135 60 160 45 155 C 30 150 25 130 30 110 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <ellipse cx="50" cy="130" rx="10" ry="16" fill="#f8fafc" />
          <line x1="50" y1="130" x2="55" y2="120" stroke="#0f172a" strokeWidth="1.5" />
          <line x1="50" y1="130" x2="42" y2="138" stroke="#0f172a" strokeWidth="1.5" />

          {/* Long Bizarre Surrealist Shadow */}
          <ellipse cx="230" cy="180" rx="60" ry="12" fill="#292524" opacity="0.6" />

          {/* Dalí Surrealist Primate */}
          <g transform="translate(170, 70)">
            {/* Elongated classical sculpted body */}
            <ellipse cx="30" cy="65" rx="22" ry="32" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
            {/* Head */}
            <circle cx="30" cy="25" r="20" fill="#92400e" />
            <circle cx="12" cy="22" r="9" fill="#78350f" />
            <circle cx="48" cy="22" r="9" fill="#78350f" />
            
            {/* Intense Piercing Dalí Eyes */}
            <circle cx="24" cy="22" r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <circle cx="24" cy="22" r="2" fill="#0f172a" />
            <circle cx="36" cy="22" r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
            <circle cx="36" cy="22" r="2" fill="#0f172a" />
            
            {/* Signature Upturned Waxed Dalí Mustache on Monkey! */}
            <path d="M 30 32 Q 20 30 10 20 Q 8 16 12 18" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 30 32 Q 40 30 50 20 Q 52 16 48 18" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Muzzle */}
            <ellipse cx="30" cy="35" rx="10" ry="7" fill="#fed7aa" />
            <ellipse cx="30" cy="33" rx="2.5" ry="1.5" fill="#451a03" />

            {/* Tiny second melting watch draped over monkey's arm */}
            <path d="M 50 65 Q 65 60 62 80 Q 55 90 48 85 Z" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="135" height="22" rx="6" fill="#0f172a" fillOpacity="0.7" />
          <text x="16" y="25" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Dalí Surrealism</text>
        </svg>
      );

    case 'bauhaus':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Stark Constructivist Grid Background */}
          <rect width="320" height="220" fill="#f4f4f5" rx="16" />
          
          {/* Asymmetric Bauhaus Color Blocks & Lines */}
          <rect x="0" y="0" width="110" height="220" fill="#ef4444" opacity="0.9" />
          <circle cx="240" cy="80" r="60" fill="#3b82f6" opacity="0.9" />
          <polygon points="170,220 290,220 230,130" fill="#eab308" />
          <line x1="0" y1="140" x2="320" y2="140" stroke="#18181b" strokeWidth="4" />
          <line x1="110" y1="0" x2="110" y2="220" stroke="#18181b" strokeWidth="4" />
          <line x1="20" y1="20" x2="300" y2="200" stroke="#18181b" strokeWidth="2" strokeDasharray="6,6" />

          {/* Geometric Bauhaus Modernist Constructivist Monkey */}
          <g transform="translate(100, 45)">
            {/* Triangular Torso */}
            <polygon points="60,80 20,150 100,150" fill="#18181b" />
            
            {/* Primary Blue Round Ears */}
            <circle cx="25" cy="45" r="16" fill="#3b82f6" stroke="#18181b" strokeWidth="3" />
            <circle cx="95" cy="45" r="16" fill="#3b82f6" stroke="#18181b" strokeWidth="3" />
            
            {/* Pure Red Circular Head */}
            <circle cx="60" cy="50" r="30" fill="#ef4444" stroke="#18181b" strokeWidth="4" />
            
            {/* Yellow Semicircle Muzzle */}
            <path d="M 40 55 A 20 20 0 0 0 80 55 Z" fill="#eab308" stroke="#18181b" strokeWidth="3" />
            
            {/* Minimalist Geometric Eyes */}
            <circle cx="48" cy="42" r="5" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
            <circle cx="48" cy="42" r="2.5" fill="#18181b" />
            <circle cx="72" cy="42" r="5" fill="#ffffff" stroke="#18181b" strokeWidth="2" />
            <circle cx="72" cy="42" r="2.5" fill="#18181b" />

            {/* Geometric Nose & Smile line */}
            <polygon points="60,52 56,58 64,58" fill="#18181b" />
            <line x1="50" y1="65" x2="70" y2="65" stroke="#18181b" strokeWidth="3" />
          </g>

          {/* Label Badge */}
          <rect x="12" y="10" width="140" height="22" rx="4" fill="#18181b" />
          <text x="18" y="25" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Bauhaus Constructivism</text>
        </svg>
      );

    case 'pop-art':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Ben-Day Dots Pattern */}
            <pattern id="benday-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" fill="#000000" opacity="0.25" />
            </pattern>
          </defs>
          {/* 4 Quadrants Warhol Style */}
          {/* Q1 Top-Left (Yellow / Pink) */}
          <rect x="0" y="0" width="160" height="110" fill="#facc15" />
          <rect x="0" y="0" width="160" height="110" fill="url(#benday-dots)" />
          
          {/* Q2 Top-Right (Cyan / Orange) */}
          <rect x="160" y="0" width="160" height="110" fill="#06b6d4" />
          <rect x="160" y="0" width="160" height="110" fill="url(#benday-dots)" />
          
          {/* Q3 Bottom-Left (Magenta / Cyan) */}
          <rect x="0" y="110" width="160" height="110" fill="#ec4899" />
          <rect x="0" y="110" width="160" height="110" fill="url(#benday-dots)" />
          
          {/* Q4 Bottom-Right (Lime / Red) */}
          <rect x="160" y="110" width="160" height="110" fill="#84cc16" />
          <rect x="160" y="110" width="160" height="110" fill="url(#benday-dots)" />
          
          {/* Quadrant Dividers */}
          <line x1="160" y1="0" x2="160" y2="220" stroke="#000000" strokeWidth="4" />
          <line x1="0" y1="110" x2="320" y2="110" stroke="#000000" strokeWidth="4" />

          {/* Warhol Silkscreen Monkey Heads in 4 Pop Colors */}
          {/* Q1 Monkey */}
          <g transform="translate(45, 15) scale(0.7)">
            <circle cx="20" cy="45" r="18" fill="#ec4899" stroke="#000" strokeWidth="4" />
            <circle cx="80" cy="45" r="18" fill="#ec4899" stroke="#000" strokeWidth="4" />
            <circle cx="50" cy="50" r="32" fill="#ec4899" stroke="#000" strokeWidth="5" />
            <ellipse cx="50" cy="62" rx="18" ry="12" fill="#ffffff" stroke="#000" strokeWidth="3" />
            <circle cx="40" cy="42" r="6" fill="#000" />
            <circle cx="60" cy="42" r="6" fill="#000" />
            <path d="M 42 66 Q 50 72 58 66" stroke="#000" strokeWidth="3" fill="none" />
          </g>

          {/* Q2 Monkey */}
          <g transform="translate(205, 15) scale(0.7)">
            <circle cx="20" cy="45" r="18" fill="#f97316" stroke="#000" strokeWidth="4" />
            <circle cx="80" cy="45" r="18" fill="#f97316" stroke="#000" strokeWidth="4" />
            <circle cx="50" cy="50" r="32" fill="#f97316" stroke="#000" strokeWidth="5" />
            <ellipse cx="50" cy="62" rx="18" ry="12" fill="#fef08a" stroke="#000" strokeWidth="3" />
            <circle cx="40" cy="42" r="6" fill="#000" />
            <circle cx="60" cy="42" r="6" fill="#000" />
            <path d="M 42 66 Q 50 72 58 66" stroke="#000" strokeWidth="3" fill="none" />
          </g>

          {/* Q3 Monkey */}
          <g transform="translate(45, 125) scale(0.7)">
            <circle cx="20" cy="45" r="18" fill="#06b6d4" stroke="#000" strokeWidth="4" />
            <circle cx="80" cy="45" r="18" fill="#06b6d4" stroke="#000" strokeWidth="4" />
            <circle cx="50" cy="50" r="32" fill="#06b6d4" stroke="#000" strokeWidth="5" />
            <ellipse cx="50" cy="62" rx="18" ry="12" fill="#fef08a" stroke="#000" strokeWidth="3" />
            <circle cx="40" cy="42" r="6" fill="#000" />
            <circle cx="60" cy="42" r="6" fill="#000" />
            <path d="M 42 66 Q 50 72 58 66" stroke="#000" strokeWidth="3" fill="none" />
          </g>

          {/* Q4 Monkey */}
          <g transform="translate(205, 125) scale(0.7)">
            <circle cx="20" cy="45" r="18" fill="#ef4444" stroke="#000" strokeWidth="4" />
            <circle cx="80" cy="45" r="18" fill="#ef4444" stroke="#000" strokeWidth="4" />
            <circle cx="50" cy="50" r="32" fill="#ef4444" stroke="#000" strokeWidth="5" />
            <ellipse cx="50" cy="62" rx="18" ry="12" fill="#ffffff" stroke="#000" strokeWidth="3" />
            <circle cx="40" cy="42" r="6" fill="#000" />
            <circle cx="60" cy="42" r="6" fill="#000" />
            <path d="M 42 66 Q 50 72 58 66" stroke="#000" strokeWidth="3" fill="none" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="8" width="130" height="20" rx="4" fill="#000000" />
          <text x="16" y="22" fill="#facc15" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Pop Art (Andy Warhol)</text>
        </svg>
      );

    case 'art-deco':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Obsidian Luxury Canvas */}
          <rect width="320" height="220" fill="#09090b" rx="16" />
          
          {/* Metallic Gold Art Deco Sunburst Rays */}
          <g stroke="#eab308" strokeWidth="1.5" opacity="0.6">
            <line x1="160" y1="130" x2="30" y2="20" />
            <line x1="160" y1="130" x2="70" y2="10" />
            <line x1="160" y1="130" x2="120" y2="5" />
            <line x1="160" y1="130" x2="160" y2="0" />
            <line x1="160" y1="130" x2="200" y2="5" />
            <line x1="160" y1="130" x2="250" y2="10" />
            <line x1="160" y1="130" x2="290" y2="20" />
          </g>
          
          {/* Stepped Chevron Arches */}
          <path d="M 60 220 L 60 140 L 160 80 L 260 140 L 260 220" fill="none" stroke="#ca8a04" strokeWidth="2" />
          <path d="M 80 220 L 80 150 L 160 100 L 240 150 L 240 220" fill="none" stroke="#eab308" strokeWidth="1.5" />
          <path d="M 100 220 L 100 160 L 160 120 L 220 160 L 220 220" fill="none" stroke="#fde047" strokeWidth="1" />

          {/* Symmetrical Regal Art Deco Primate */}
          <g transform="translate(110, 60)">
            {/* Gold Geometric Body */}
            <polygon points="50,60 10,130 90,130" fill="#713f12" stroke="#eab308" strokeWidth="2" />
            <polygon points="50,70 25,130 75,130" fill="#a16207" stroke="#fde047" strokeWidth="1.5" />
            
            {/* Geometric Stepped Ears */}
            <polygon points="20,25 0,35 15,55" fill="#ca8a04" stroke="#fde047" strokeWidth="1.5" />
            <polygon points="80,25 100,35 85,55" fill="#ca8a04" stroke="#fde047" strokeWidth="1.5" />

            {/* Diamond / Faceted Head */}
            <polygon points="50,15 20,40 50,75 80,40" fill="#ca8a04" stroke="#fde047" strokeWidth="2" />
            
            {/* Gold Leaf Facets */}
            <polygon points="50,22 30,40 50,65" fill="#eab308" />
            <polygon points="50,22 70,40 50,65" fill="#fde047" />

            {/* Sharp Geometric Eyes */}
            <polygon points="38,36 34,40 42,40" fill="#09090b" />
            <polygon points="62,36 58,40 66,40" fill="#09090b" />
          </g>

          {/* Outer Gold Border */}
          <rect x="8" y="8" width="304" height="204" rx="10" fill="none" stroke="#eab308" strokeWidth="2" />
          <rect x="12" y="12" width="296" height="196" rx="8" fill="none" stroke="#ca8a04" strokeWidth="1" strokeDasharray="4,4" />

          {/* Label Badge */}
          <rect x="18" y="16" width="130" height="20" rx="4" fill="#09090b" stroke="#eab308" strokeWidth="1" />
          <text x="24" y="30" fill="#fde047" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Art Deco 1920s Gold</text>
        </svg>
      );

    case 'ukiyo-e-woodblock':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ukiyoe-sea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="40%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#ukiyoe-sea)" rx="16" />
          
          {/* Mount Fuji in Background */}
          <polygon points="160,70 110,140 210,140" fill="#1e293b" />
          <polygon points="160,70 145,95 175,95" fill="#ffffff" />
          
          {/* Great Wave Foam Claws */}
          <path d="M 0 170 Q 70 100 130 130 Q 180 150 220 110 Q 250 80 230 50 Q 210 30 190 60 C 180 80 160 110 110 120 C 50 130 10 180 0 200 Z" fill="#1d4ed8" stroke="#0f172a" strokeWidth="2" />
          <path d="M 190 60 Q 180 40 170 55 Q 165 70 180 80 Z" fill="#ffffff" />
          <path d="M 220 50 Q 235 35 245 50 Q 240 65 225 65 Z" fill="#ffffff" />

          {/* Japanese Snow Macaque / Monkey */}
          <g transform="translate(50, 90)">
            {/* Furry Body with sumi-e ink strokes */}
            <ellipse cx="40" cy="55" rx="28" ry="30" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2.5" />
            
            {/* Characteristic Japanese Macaque Bright Crimson Face */}
            <circle cx="40" cy="30" r="22" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
            <ellipse cx="40" cy="30" rx="15" ry="14" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.5" />
            
            {/* Inquisitive Woodblock Eyes */}
            <circle cx="34" cy="26" r="3" fill="#0f172a" />
            <circle cx="46" cy="26" r="3" fill="#0f172a" />
            
            {/* Macaque Muzzle & Fur Crest */}
            <ellipse cx="40" cy="35" rx="5" ry="4" fill="#fda4af" />
            <path d="M 38 37 Q 40 40 42 37" stroke="#0f172a" strokeWidth="1.5" fill="none" />
            
            {/* White fluffy fur tufts on cheeks */}
            <path d="M 20 28 Q 10 32 18 40" stroke="#0f172a" strokeWidth="1.5" fill="none" />
            <path d="M 60 28 Q 70 32 62 40" stroke="#0f172a" strokeWidth="1.5" fill="none" />
          </g>

          {/* Traditional Red Calligraphic Seal (Hanko) */}
          <rect x="275" y="25" width="25" height="35" rx="4" fill="#dc2626" />
          <rect x="278" y="28" width="19" height="29" fill="none" stroke="#ffffff" strokeWidth="1" />
          <text x="282" y="47" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="serif">木</text>

          {/* Label Badge */}
          <rect x="10" y="10" width="145" height="22" rx="6" fill="#0f172a" fillOpacity="0.7" />
          <text x="16" y="25" fill="#93c5fd" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Ukiyo-e Woodblock Wave</text>
        </svg>
      );

    case 'tim-burton':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Moody Gothic Night Sky */}
          <rect width="320" height="220" fill="#09090b" rx="16" />
          
          {/* Giant Pale Moonlight */}
          <circle cx="210" cy="90" r="65" fill="#fef08a" opacity="0.9" />
          
          {/* Iconic Tim Burton Spindly Spiral Hill */}
          <path d="M 80 220 Q 140 180 180 130 Q 210 90 230 95 Q 245 100 240 115 Q 230 130 205 125 Q 185 120 190 100" fill="none" stroke="#18181b" strokeWidth="22" strokeLinecap="round" />
          <path d="M -20 220 Q 80 160 200 135 L 340 220 Z" fill="#18181b" />

          {/* Crooked Spooky Trees with Twisting Branches */}
          <path d="M 40 190 Q 30 130 15 100 Q 10 85 20 80 M 25 120 Q 5 110 0 95 M 35 140 Q 55 120 65 105" stroke="#27272a" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Tim Burton Gothic Whimsical Monkey */}
          <g transform="translate(135, 75)">
            {/* Skinny Stitched Patchwork Body */}
            <ellipse cx="25" cy="55" rx="14" ry="24" fill="#3f3f46" stroke="#09090b" strokeWidth="2" />
            {/* Signature Black & White Striped Scarf */}
            <path d="M 12 36 L 38 36 L 35 44 L 15 44 Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
            <line x1="18" y1="36" x2="18" y2="44" stroke="#000" strokeWidth="2" />
            <line x1="26" y1="36" x2="26" y2="44" stroke="#000" strokeWidth="2" />
            <line x1="33" y1="36" x2="33" y2="44" stroke="#000" strokeWidth="2" />
            
            {/* Long Spindly Tail with Spiral Tip */}
            <path d="M 15 65 Q -15 70 -10 40 Q -5 20 -20 25 Q -30 30 -25 45" fill="none" stroke="#27272a" strokeWidth="3.5" strokeLinecap="round" />

            {/* Giant Round Skeletal Pale Head */}
            <circle cx="25" cy="20" r="18" fill="#e4e4e7" stroke="#09090b" strokeWidth="2" />
            
            {/* Stitch Marks on Head */}
            <line x1="25" y1="4" x2="25" y2="12" stroke="#09090b" strokeWidth="1.5" />
            <line x1="22" y1="8" x2="28" y2="8" stroke="#09090b" strokeWidth="1" />

            {/* Oversized Inquisitive Gothic Eyes */}
            <circle cx="18" cy="18" r="6.5" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
            <circle cx="18" cy="18" r="2" fill="#09090b" />
            <circle cx="32" cy="18" r="7.5" fill="#ffffff" stroke="#09090b" strokeWidth="2" />
            <circle cx="32" cy="18" r="2" fill="#09090b" />

            {/* Stitched Smile */}
            <path d="M 16 28 Q 25 33 34 28" stroke="#09090b" strokeWidth="2" fill="none" />
            <line x1="19" y1="27" x2="19" y2="31" stroke="#09090b" strokeWidth="1.5" />
            <line x1="25" y1="28" x2="25" y2="32" stroke="#09090b" strokeWidth="1.5" />
            <line x1="31" y1="27" x2="31" y2="31" stroke="#09090b" strokeWidth="1.5" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="135" height="22" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
          <text x="16" y="25" fill="#f43f5e" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Tim Burton Gothic</text>
        </svg>
      );

    case 'adventure-time':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ooo-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
          </defs>
          <rect width="320" height="220" fill="url(#ooo-sky)" rx="16" />
          
          {/* Land of Ooo Pastel Candy Hills */}
          <path d="M -20 160 Q 60 120 140 150 Q 220 180 340 140 L 340 220 L -20 220 Z" fill="#86efac" stroke="#16a34a" strokeWidth="3" />
          <path d="M 120 160 Q 200 130 280 150 L 340 220 L 100 220 Z" fill="#f472b6" stroke="#db2777" strokeWidth="3" />
          
          {/* Cheerful Adventure Time Floppy Monkey with Noodle Limbs */}
          <g transform="translate(120, 50)">
            {/* Floppy Noodle Tail */}
            <path d="M 10 75 Q -30 90 -20 50 Q -10 10 -40 20" fill="none" stroke="#78350f" strokeWidth="7" strokeLinecap="round" />
            
            {/* Peanut Shaped Body */}
            <path d="M 20 40 C 10 50, 10 80, 25 95 C 40 110, 60 110, 75 95 C 90 80, 90 50, 80 40 C 70 30, 30 30, 20 40 Z" fill="#b45309" stroke="#451a03" strokeWidth="4" />
            
            {/* Light Belly Oval */}
            <ellipse cx="50" cy="75" rx="20" ry="22" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />

            {/* Floppy Noodle Arms */}
            <path d="M 22 55 Q -10 60 -5 85" fill="none" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
            <path d="M 78 55 Q 110 50 105 75" fill="none" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />

            {/* Adorable Round Ears */}
            <circle cx="15" cy="30" r="14" fill="#b45309" stroke="#451a03" strokeWidth="3.5" />
            <circle cx="15" cy="30" r="7" fill="#fecdd3" />
            <circle cx="85" cy="30" r="14" fill="#b45309" stroke="#451a03" strokeWidth="3.5" />
            <circle cx="85" cy="30" r="7" fill="#fecdd3" />

            {/* Cute Iconic Adventure Time Dot Eyes & Grin */}
            <circle cx="38" cy="35" r="4.5" fill="#000000" />
            <circle cx="62" cy="35" r="4.5" fill="#000000" />
            {/* Wide Happy Grin */}
            <path d="M 36 48 Q 50 64 64 48 Z" fill="#ef4444" stroke="#000000" strokeWidth="3" />
            <path d="M 44 54 Q 50 58 56 54" fill="#fda4af" />

            {/* Tiny Green Backpack */}
            <rect x="70" y="55" width="18" height="24" rx="4" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="135" height="22" rx="6" fill="#0f172a" fillOpacity="0.7" />
          <text x="16" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Adventure Time Style</text>
        </svg>
      );

    case 'cyberpunk-anime':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Neo-Tokyo Dark Skyscraper Grid */}
          <rect width="320" height="220" fill="#05050a" rx="16" />
          
          {/* Neon Grid Floor */}
          <line x1="0" y1="180" x2="320" y2="180" stroke="#ec4899" strokeWidth="2" />
          <line x1="40" y1="180" x2="0" y2="220" stroke="#ec4899" strokeWidth="1.5" />
          <line x1="100" y1="180" x2="60" y2="220" stroke="#ec4899" strokeWidth="1.5" />
          <line x1="160" y1="180" x2="160" y2="220" stroke="#06b6d4" strokeWidth="2" />
          <line x1="220" y1="180" x2="260" y2="220" stroke="#ec4899" strokeWidth="1.5" />
          <line x1="280" y1="180" x2="320" y2="220" stroke="#ec4899" strokeWidth="1.5" />

          {/* High Speed Neon Light Trails (Akira Motorcycle Streaks) */}
          <path d="M 0 160 Q 140 140 320 165" stroke="#ef4444" strokeWidth="4" fill="none" opacity="0.9" />
          <path d="M 0 168 Q 120 150 320 172" stroke="#06b6d4" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M 0 174 Q 160 160 320 178" stroke="#facc15" strokeWidth="2" fill="none" opacity="0.7" />

          {/* Cybernetically Enhanced Akira-Style Cyborg Monkey */}
          <g transform="translate(110, 45)">
            {/* Armored Cyber Torso */}
            <ellipse cx="50" cy="75" rx="30" ry="32" fill="#18181b" stroke="#06b6d4" strokeWidth="2" />
            <path d="M 35 65 L 65 65 L 58 85 L 42 85 Z" fill="#09090b" stroke="#ec4899" strokeWidth="1.5" />
            
            {/* Glowing Cybernetic Left Arm */}
            <path d="M 20 70 L 0 90 L 10 105" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" fill="none" />
            <circle cx="10" cy="105" r="4" fill="#22d3ee" />

            {/* Cyborg Monkey Head */}
            <circle cx="50" cy="35" r="26" fill="#27272a" stroke="#71717a" strokeWidth="2" />
            <circle cx="22" cy="30" r="10" fill="#18181b" stroke="#ef4444" strokeWidth="2" />
            <circle cx="78" cy="30" r="10" fill="#18181b" stroke="#06b6d4" strokeWidth="2" />

            {/* Glowing Neon Visor / Cyber HUD Eyepiece */}
            <polygon points="30,28 70,28 65,42 35,42" fill="#06b6d4" opacity="0.9" stroke="#67e8f9" strokeWidth="1.5" />
            <line x1="32" y1="35" x2="68" y2="35" stroke="#ffffff" strokeWidth="2" />

            {/* Cybernetic Audio Headset & Antenna */}
            <rect x="74" y="24" width="8" height="18" rx="2" fill="#ef4444" />
            <line x1="78" y1="24" x2="88" y2="8" stroke="#ef4444" strokeWidth="2" />
            <circle cx="88" cy="8" r="3" fill="#f87171" />

            {/* Neon Japanese Warning Decal */}
            <text x="36" y="76" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">AKIRA-01</text>
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="135" height="22" rx="6" fill="#18181b" stroke="#ef4444" strokeWidth="1" />
          <text x="16" y="25" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Cyberpunk Anime Akira</text>
        </svg>
      );

    case 'claymation':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="clay-spotlight" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1c1917" />
            </radialGradient>
          </defs>
          {/* Tabletop Studio Backdrop */}
          <rect width="320" height="220" fill="url(#clay-spotlight)" rx="16" />
          
          {/* Studio Table Surface */}
          <rect y="150" width="320" height="70" fill="#78350f" opacity="0.9" />
          <line x1="0" y1="150" x2="320" y2="150" stroke="#fde68a" strokeWidth="2" opacity="0.3" />

          {/* Chunky Sculpted Plasticine Clay Monkey */}
          <g transform="translate(110, 45)">
            {/* Cast Shadow on table */}
            <ellipse cx="50" cy="115" rx="40" ry="12" fill="#0c0a09" opacity="0.6" />

            {/* Doughy Clay Tail */}
            <path d="M 20 90 Q -10 95 -5 65 Q 0 45 -20 50" fill="none" stroke="#92400e" strokeWidth="10" strokeLinecap="round" />

            {/* Chunky Plasticine Clay Torso */}
            <ellipse cx="50" cy="75" rx="30" ry="32" fill="#b45309" />
            {/* Visible Thumbprint Textures */}
            <path d="M 40 65 Q 50 68 45 78" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
            <path d="M 52 70 Q 60 74 55 82" stroke="#78350f" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />

            {/* Chunky Clay Arms holding a wedge of cheese */}
            <ellipse cx="22" cy="75" rx="9" ry="18" fill="#92400e" transform="rotate(20, 22, 75)" />
            <ellipse cx="78" cy="75" rx="9" ry="18" fill="#92400e" transform="rotate(-20, 78, 75)" />
            {/* Wallace & Gromit Cheese Wedge! */}
            <polygon points="45,85 65,85 55,70" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="53" cy="80" r="2" fill="#a16207" />

            {/* Big Doughy Clay Head */}
            <circle cx="50" cy="35" r="28" fill="#b45309" />
            
            {/* Big Round Sculpted Ears with Finger indents */}
            <circle cx="18" cy="32" r="14" fill="#92400e" />
            <circle cx="18" cy="32" r="8" fill="#d97706" />
            <circle cx="82" cy="32" r="14" fill="#92400e" />
            <circle cx="82" cy="32" r="8" fill="#d97706" />

            {/* Plasticine Googly Eyeballs with Beads */}
            <circle cx="40" cy="30" r="7" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="41" cy="30" r="3" fill="#1c1917" />
            <circle cx="60" cy="30" r="7" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="59" cy="30" r="3" fill="#1c1917" />

            {/* Doughy Clay Muzzle */}
            <ellipse cx="50" cy="46" rx="16" ry="12" fill="#d97706" />
            <circle cx="45" cy="42" r="2" fill="#451a03" />
            <circle cx="55" cy="42" r="2" fill="#451a03" />
            <path d="M 42 50 Q 50 56 58 50" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="140" height="22" rx="6" fill="#1c1917" stroke="#78350f" strokeWidth="1" />
          <text x="16" y="25" fill="#fde047" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Claymation (Aardman)</text>
        </svg>
      );

    case 'isometric-voxel-art':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Isometric Gradient Background */}
          <rect width="320" height="220" fill="#0f172a" rx="16" />
          
          {/* Isometric Diorama Floor Base */}
          <polygon points="160,140 280,180 160,220 40,180" fill="#334155" stroke="#475569" strokeWidth="1.5" />
          <polygon points="40,180 160,220 160,230 40,190" fill="#1e293b" />
          <polygon points="280,180 160,220 160,230 280,190" fill="#0f172a" />

          {/* 3D Voxel Cubes Constructing Monkey */}
          <g transform="translate(110, 40)">
            {/* Voxel Torso (Large Cube) */}
            <g transform="translate(30, 60)">
              {/* Top face */}
              <polygon points="20,0 40,10 20,20 0,10" fill="#d97706" />
              {/* Left face */}
              <polygon points="0,10 20,20 20,50 0,40" fill="#b45309" />
              {/* Right face */}
              <polygon points="20,20 40,10 40,40 20,50" fill="#78350f" />
            </g>

            {/* Voxel Head Cube */}
            <g transform="translate(25, 20)">
              {/* Top face */}
              <polygon points="25,0 50,12 25,24 0,12" fill="#f59e0b" />
              {/* Left face with eye */}
              <polygon points="0,12 25,24 25,50 0,38" fill="#d97706" />
              {/* Right face with eye */}
              <polygon points="25,24 50,12 50,38 25,50" fill="#b45309" />
              
              {/* Voxel Eyes (Pixel squares) */}
              <rect x="8" y="24" width="6" height="6" fill="#0f172a" transform="skewY(25)" />
              <rect x="34" y="24" width="6" height="6" fill="#0f172a" transform="skewY(-25)" />
            </g>

            {/* Left Voxel Ear Cube */}
            <g transform="translate(5, 15)">
              <polygon points="10,0 20,5 10,10 0,5" fill="#f59e0b" />
              <polygon points="0,5 10,10 10,20 0,15" fill="#d97706" />
              <polygon points="10,10 20,5 20,15 10,20" fill="#b45309" />
            </g>

            {/* Right Voxel Ear Cube */}
            <g transform="translate(65, 15)">
              <polygon points="10,0 20,5 10,10 0,5" fill="#f59e0b" />
              <polygon points="0,5 10,10 10,20 0,15" fill="#d97706" />
              <polygon points="10,10 20,5 20,15 10,20" fill="#b45309" />
            </g>

            {/* Voxel Banana */}
            <g transform="translate(55, 75)">
              <polygon points="8,0 16,4 8,8 0,4" fill="#facc15" />
              <polygon points="0,4 8,8 8,20 0,16" fill="#eab308" />
              <polygon points="8,8 16,4 16,16 8,20" fill="#ca8a04" />
            </g>
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="135" height="22" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <text x="16" y="25" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Isometric 3D Voxel</text>
        </svg>
      );

    case 'pixel-art':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Retro Arcade CRT Screen Background */}
          <rect width="320" height="220" fill="#09090b" rx="16" />
          
          {/* Retro 16-Bit Pixel Ground */}
          <rect y="170" width="320" height="50" fill="#047857" />
          <rect y="180" width="320" height="40" fill="#065f46" />
          <rect y="195" width="320" height="25" fill="#064e3b" />

          {/* Arcade HUD Frame (Health Hearts & Score) */}
          <g transform="translate(15, 15)">
            <text x="0" y="12" fill="#ef4444" fontSize="11" fontFamily="monospace" fontWeight="bold">HP ♥♥♥</text>
            <text x="210" y="12" fill="#facc15" fontSize="11" fontFamily="monospace" fontWeight="bold">SCORE: 84200</text>
          </g>

          {/* Hand-Crafted 16-Bit Pixel Art Monkey Sprite */}
          <g transform="translate(110, 45) scale(3.5)">
            {/* Ears */}
            <rect x="2" y="7" width="5" height="5" fill="#92400e" />
            <rect x="3" y="8" width="3" height="3" fill="#fbcfe8" />
            <rect x="23" y="7" width="5" height="5" fill="#92400e" />
            <rect x="24" y="8" width="3" height="3" fill="#fbcfe8" />

            {/* Head Silhouette */}
            <rect x="6" y="4" width="18" height="16" fill="#92400e" />
            <rect x="8" y="2" width="14" height="2" fill="#92400e" />
            
            {/* Light Face Mask */}
            <rect x="8" y="7" width="14" height="10" fill="#fed7aa" />
            <rect x="10" y="5" width="10" height="2" fill="#fed7aa" />

            {/* Pixel Eyes */}
            <rect x="10" y="8" width="2" height="3" fill="#000000" />
            <rect x="18" y="8" width="2" height="3" fill="#000000" />

            {/* Nose & Grin */}
            <rect x="14" y="12" width="2" height="1" fill="#78350f" />
            <rect x="12" y="14" width="6" height="1" fill="#78350f" />

            {/* Body */}
            <rect x="7" y="20" width="16" height="12" fill="#92400e" />
            <rect x="10" y="21" width="10" height="9" fill="#fed7aa" />

            {/* Arms */}
            <rect x="3" y="21" width="4" height="8" fill="#92400e" />
            <rect x="23" y="21" width="4" height="8" fill="#92400e" />

            {/* Pixel Tail */}
            <rect x="1" y="26" width="3" height="3" fill="#92400e" />
            <rect x="0" y="23" width="2" height="4" fill="#92400e" />
          </g>

          {/* CRT Scanline Simulation */}
          <line x1="0" y1="40" x2="320" y2="40" stroke="#ffffff" strokeWidth="1" opacity="0.08" />
          <line x1="0" y1="80" x2="320" y2="80" stroke="#ffffff" strokeWidth="1" opacity="0.08" />
          <line x1="0" y1="120" x2="320" y2="120" stroke="#ffffff" strokeWidth="1" opacity="0.08" />
          <line x1="0" y1="160" x2="320" y2="160" stroke="#ffffff" strokeWidth="1" opacity="0.08" />

          {/* Label Badge */}
          <rect x="10" y="32" width="135" height="20" rx="4" fill="#18181b" stroke="#06b6d4" strokeWidth="1" />
          <text x="16" y="46" fill="#06b6d4" fontSize="10" fontWeight="bold" fontFamily="monospace">16-BIT RETRO PIXEL</text>
        </svg>
      );

    case 'stained-glass-mosaic':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Gothic Cathedral Arch Stained Glass Window */}
          <rect width="320" height="220" fill="#0f172a" rx="16" />
          
          {/* Outer Gothic Arch Lead Outline */}
          <path d="M 40 220 L 40 100 Q 160 10 280 100 L 280 220 Z" fill="#1e1b4b" stroke="#000000" strokeWidth="6" />

          {/* Glowing Luminous Glass Segments */}
          {/* Background Sky Segments */}
          <polygon points="45,100 160,20 160,60 70,110" fill="#3b82f6" stroke="#000000" strokeWidth="4" />
          <polygon points="275,100 160,20 160,60 250,110" fill="#6366f1" stroke="#000000" strokeWidth="4" />
          <polygon points="70,110 160,60 160,95 85,130" fill="#8b5cf6" stroke="#000000" strokeWidth="4" />
          <polygon points="250,110 160,60 160,95 235,130" fill="#a855f7" stroke="#000000" strokeWidth="4" />

          {/* Stained Glass Luminous Sacred Primate */}
          <g transform="translate(110, 70)">
            {/* Amber & Ruby Body Segments */}
            <polygon points="50,60 20,110 50,130" fill="#ef4444" stroke="#000000" strokeWidth="4" />
            <polygon points="50,60 80,110 50,130" fill="#f97316" stroke="#000000" strokeWidth="4" />
            <polygon points="20,110 50,130 5,140" fill="#ca8a04" stroke="#000000" strokeWidth="4" />
            <polygon points="80,110 50,130 95,140" fill="#eab308" stroke="#000000" strokeWidth="4" />

            {/* Sacred Stained Glass Monkey Head */}
            <polygon points="50,10 20,35 50,55" fill="#facc15" stroke="#000000" strokeWidth="4" />
            <polygon points="50,10 80,35 50,55" fill="#f59e0b" stroke="#000000" strokeWidth="4" />
            
            {/* Jewel-Toned Ears */}
            <polygon points="20,35 0,25 10,50" fill="#ec4899" stroke="#000000" strokeWidth="3.5" />
            <polygon points="80,35 100,25 90,50" fill="#ec4899" stroke="#000000" strokeWidth="3.5" />

            {/* Emerald Gem Eyes */}
            <polygon points="35,32 30,36 38,40" fill="#10b981" stroke="#000000" strokeWidth="2" />
            <polygon points="65,32 70,36 62,40" fill="#10b981" stroke="#000000" strokeWidth="2" />
          </g>

          {/* Golden Radiant Light Beam Overlay */}
          <polygon points="160,20 100,220 220,220" fill="#ffffff" opacity="0.12" />

          {/* Label Badge */}
          <rect x="10" y="10" width="145" height="22" rx="6" fill="#000000" stroke="#eab308" strokeWidth="1" />
          <text x="16" y="25" fill="#facc15" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Cathedral Stained Glass</text>
        </svg>
      );

    case 'papercut-shadowbox-art':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="shadowbox-drop" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
            </filter>
            <filter id="shadowbox-deep" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="5" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>
          {/* Deep Ambient Backlight Layer 1 (Base Amber Glow) */}
          <rect width="320" height="220" fill="#fff7ed" rx="16" />
          
          {/* Layer 2: Sun and distant canopy (Pale Apricot) */}
          <circle cx="160" cy="90" r="50" fill="#fed7aa" />
          <path d="M 0 140 Q 80 100 160 120 Q 240 140 320 110 L 320 220 L 0 220 Z" fill="#fdba74" filter="url(#shadowbox-drop)" />

          {/* Layer 3: Middle Jungle Foliage Tier (Vibrant Orange) */}
          <path d="M 0 160 Q 90 125 180 150 Q 260 160 320 135 L 320 220 L 0 220 Z" fill="#fb923c" filter="url(#shadowbox-drop)" />

          {/* Layer 4: Multi-Layer Cutout Paper Monkey sitting on Branch */}
          <g transform="translate(115, 60)" filter="url(#shadowbox-deep)">
            {/* Cutout Branch */}
            <path d="M -50 90 Q 30 75 120 85 L 120 105 L -50 110 Z" fill="#ea580c" />
            
            {/* Papercut Monkey Silhouette */}
            <ellipse cx="40" cy="55" rx="26" ry="28" fill="#c2410c" />
            <path d="M 25 70 Q -5 75 -2 45 Q 0 25 -15 30" fill="none" stroke="#c2410c" strokeWidth="8" strokeLinecap="round" />
            
            {/* Head */}
            <circle cx="40" cy="25" r="22" fill="#c2410c" />
            <circle cx="18" cy="22" r="10" fill="#c2410c" />
            <circle cx="62" cy="22" r="10" fill="#c2410c" />

            {/* Inner Paper Cutout Mask */}
            <ellipse cx="40" cy="27" rx="13" ry="12" fill="#fdba74" />
            <circle cx="34" cy="25" r="3" fill="#7c2d12" />
            <circle cx="46" cy="25" r="3" fill="#7c2d12" />
          </g>

          {/* Layer 5: Foreground Silhouette Vines & Leaves (Deep Terracotta) */}
          <g filter="url(#shadowbox-deep)">
            <path d="M 0 0 L 70 0 Q 30 50 0 70 Z" fill="#7c2d12" />
            <path d="M 320 0 L 250 0 Q 280 60 320 80 Z" fill="#7c2d12" />
            <path d="M 0 220 L 0 190 Q 80 180 120 220 Z" fill="#7c2d12" />
            <path d="M 320 220 L 320 180 Q 240 180 200 220 Z" fill="#7c2d12" />
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="145" height="22" rx="6" fill="#7c2d12" stroke="#ea580c" strokeWidth="1" />
          <text x="16" y="25" fill="#ffedd5" fontSize="10" fontWeight="bold" fontFamily="sans-serif">3D Papercut Shadowbox</text>
        </svg>
      );

    case 'watercolor-botanical':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Natural Unbleached Parchment Background */}
          <rect width="320" height="220" fill="#fefce8" rx="16" />
          
          {/* Botanical Field Herbarium Pressed Leaves (Translucent Washes) */}
          <g opacity="0.6">
            <path d="M 30 180 Q 20 80 80 40 Q 70 120 30 180 Z" fill="#86efac" />
            <path d="M 80 40 L 30 180" stroke="#15803d" strokeWidth="1" />
            
            <path d="M 290 190 Q 280 90 230 50 Q 240 130 290 190 Z" fill="#a7f3d0" />
            <path d="M 230 50 L 290 190" stroke="#047857" strokeWidth="1" />
          </g>

          {/* Delicate Naturalist Botanical Watercolor Primate */}
          <g transform="translate(110, 50)">
            {/* Transparent watercolor wash body with stippled edges */}
            <ellipse cx="50" cy="70" rx="30" ry="34" fill="#bbf7d0" opacity="0.75" />
            <ellipse cx="50" cy="70" rx="26" ry="30" fill="#86efac" opacity="0.8" />
            
            {/* Head with fine ink contour */}
            <circle cx="50" cy="30" r="24" fill="#a7f3d0" opacity="0.85" stroke="#14532d" strokeWidth="1.2" strokeDasharray="3,1" />
            <circle cx="26" cy="26" r="10" fill="#86efac" stroke="#14532d" strokeWidth="1" />
            <circle cx="74" cy="26" r="10" fill="#86efac" stroke="#14532d" strokeWidth="1" />

            {/* Expressive Botanical Stippled Eyes */}
            <circle cx="42" cy="28" r="3.5" fill="#14532d" />
            <circle cx="58" cy="28" r="3.5" fill="#14532d" />

            {/* Delicate Botanical Foliage Wreath on Head */}
            <path d="M 32 14 Q 50 6 68 14" stroke="#15803d" strokeWidth="2" fill="none" />
            <circle cx="40" cy="10" r="2.5" fill="#f43f5e" opacity="0.8" />
            <circle cx="50" cy="8" r="3" fill="#fbbf24" opacity="0.8" />
            <circle cx="60" cy="10" r="2.5" fill="#f43f5e" opacity="0.8" />

            {/* Latin Classification Script */}
            <text x="0" y="118" fill="#15803d" fontSize="9" fontStyle="italic" fontFamily="serif">Simia botanica naturalis</text>
          </g>

          {/* Fine Ink Grid & Ruler Scale Markings */}
          <line x1="20" y1="200" x2="100" y2="200" stroke="#78716c" strokeWidth="1" />
          <line x1="20" y1="196" x2="20" y2="204" stroke="#78716c" strokeWidth="1" />
          <line x1="60" y1="197" x2="60" y2="203" stroke="#78716c" strokeWidth="1" />
          <line x1="100" y1="196" x2="100" y2="204" stroke="#78716c" strokeWidth="1" />
          <text x="35" y="212" fill="#78716c" fontSize="8" fontFamily="serif">Scale: 10cm</text>

          {/* Label Badge */}
          <rect x="10" y="10" width="145" height="22" rx="6" fill="#14532d" stroke="#22c55e" strokeWidth="1" />
          <text x="16" y="25" fill="#f0fdf4" fontSize="10" fontWeight="bold" fontFamily="serif">Watercolor Botanical Guide</text>
        </svg>
      );

    case 'vintage-fantasy-map':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Aged Tolkien Parchment Vellum */}
          <rect width="320" height="220" fill="#f5ebe0" rx="16" />
          
          {/* Map Grid & Latitude Coordinates */}
          <rect x="10" y="10" width="300" height="200" fill="none" stroke="#78350f" strokeWidth="1.5" />
          <rect x="14" y="14" width="292" height="192" fill="none" stroke="#92400e" strokeWidth="0.8" strokeDasharray="6,3" />

          {/* Topographic Mountain Ridges */}
          <g stroke="#78350f" strokeWidth="1.5" fill="#eed9c4">
            <polygon points="30,160 50,120 70,160" />
            <polygon points="60,165 80,130 100,165" />
            <polygon points="220,160 240,125 260,160" />
            <polygon points="250,165 270,135 290,165" />
          </g>

          {/* Ornate Nautical Compass Rose */}
          <g transform="translate(250, 60)">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#78350f" strokeWidth="1" />
            <polygon points="0,-22 4,0 0,4 -4,0" fill="#78350f" />
            <polygon points="0,22 4,0 0,-4 -4,0" fill="#92400e" />
            <polygon points="-22,0 0,4 4,0 0,-4" fill="#92400e" />
            <polygon points="22,0 0,4 -4,0 0,-4" fill="#78350f" />
            <text x="-3" y="-25" fill="#78350f" fontSize="8" fontWeight="bold">N</text>
          </g>

          {/* Mythical Ink Etched Primate Deity on Map */}
          <g transform="translate(115, 45)">
            {/* Scroll Ribbon Banner */}
            <path d="M 0 110 Q 45 100 90 110 L 85 125 Q 45 115 5 125 Z" fill="#eed9c4" stroke="#78350f" strokeWidth="1.5" />
            <text x="18" y="120" fill="#78350f" fontSize="8" fontWeight="bold" fontFamily="serif">KINGDOM OF APES</text>

            {/* Hand-drawn ink contour monkey */}
            <ellipse cx="45" cy="55" rx="26" ry="30" fill="#ebd4be" stroke="#78350f" strokeWidth="2" />
            <circle cx="45" cy="25" r="20" fill="#ebd4be" stroke="#78350f" strokeWidth="2" />
            <circle cx="22" cy="22" r="8" fill="#ebd4be" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="68" cy="22" r="8" fill="#ebd4be" stroke="#78350f" strokeWidth="1.5" />
            
            <circle cx="38" cy="22" r="3" fill="#78350f" />
            <circle cx="52" cy="22" r="3" fill="#78350f" />
            <path d="M 38 32 Q 45 38 52 32" stroke="#78350f" strokeWidth="1.5" fill="none" />

            {/* Antique Crown */}
            <polygon points="35,8 40,2 45,6 50,2 55,8" fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
          </g>

          {/* Label Badge */}
          <rect x="18" y="18" width="140" height="20" rx="4" fill="#78350f" />
          <text x="24" y="32" fill="#fef3c7" fontSize="10" fontWeight="bold" fontFamily="serif">Ancient Fantasy Map</text>
        </svg>
      );

    case 'blueprint-technical-drawing':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Authentic Prussian Blue CAD Canvas */}
          <rect width="320" height="220" fill="#172554" rx="16" />
          
          {/* Engineering Drafting Grid */}
          <g stroke="#3b82f6" strokeWidth="0.5" opacity="0.4">
            <line x1="0" y1="40" x2="320" y2="40" />
            <line x1="0" y1="80" x2="320" y2="80" />
            <line x1="0" y1="120" x2="320" y2="120" />
            <line x1="0" y1="160" x2="320" y2="160" />
            <line x1="0" y1="200" x2="320" y2="200" />
            <line x1="40" y1="0" x2="40" y2="220" />
            <line x1="80" y1="0" x2="80" y2="220" />
            <line x1="120" y1="0" x2="120" y2="220" />
            <line x1="160" y1="0" x2="160" y2="220" />
            <line x1="200" y1="0" x2="200" y2="220" />
            <line x1="240" y1="0" x2="240" y2="220" />
            <line x1="280" y1="0" x2="280" y2="220" />
          </g>

          {/* White CAD Schematic of Bionic Mechanical Primate */}
          <g transform="translate(110, 45)" stroke="#ffffff" strokeWidth="1.5" fill="none">
            {/* Center Axis Dimension Line */}
            <line x1="50" y1="0" x2="50" y2="130" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="8,4,2,4" />
            <line x1="0" y1="35" x2="100" y2="35" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="8,4,2,4" />

            {/* Torso Chassis */}
            <ellipse cx="50" cy="75" rx="28" ry="32" />
            <circle cx="50" cy="75" r="14" strokeDasharray="3,3" />

            {/* Cranial Assembly */}
            <circle cx="50" cy="35" r="24" />
            <circle cx="24" cy="30" r="10" />
            <circle cx="76" cy="30" r="10" />

            {/* Optical Sensor Apertures */}
            <circle cx="40" cy="32" r="5" fill="#60a5fa" fillOpacity="0.4" />
            <circle cx="60" cy="32" r="5" fill="#60a5fa" fillOpacity="0.4" />

            {/* Caliper Dimension Dimension Lines & Arrows */}
            <g stroke="#93c5fd" strokeWidth="1">
              <line x1="10" y1="12" x2="90" y2="12" />
              <polyline points="14,9 10,12 14,15" fill="#93c5fd" />
              <polyline points="86,9 90,12 86,15" fill="#93c5fd" />
              <text x="35" y="9" fill="#93c5fd" fontSize="7" fontFamily="monospace">Ø 48.00 mm</text>
            </g>
          </g>

          {/* Engineering Title Block */}
          <g transform="translate(180, 165)">
            <rect x="0" y="0" width="130" height="45" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
            <text x="8" y="14" fill="#93c5fd" fontSize="8" fontFamily="monospace">DWG: BIONIC-PRIME-01</text>
            <text x="8" y="26" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">PATENT SCHEMATIC</text>
            <text x="8" y="38" fill="#93c5fd" fontSize="7" fontFamily="monospace">SCALE: 1:1 • REV B</text>
          </g>

          {/* Label Badge */}
          <rect x="10" y="10" width="140" height="22" rx="4" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1" />
          <text x="16" y="25" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">Blueprint CAD Drawing</text>
        </svg>
      );

    case 'steampunk':
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Victorian Sepia & Burnished Iron Backdrop */}
          <rect width="320" height="220" fill="#1c1917" rx="16" />
          
          {/* Interlocking Brass Clockwork Gears in Background */}
          <g transform="translate(50, 60)" fill="#78350f" stroke="#d97706" strokeWidth="1.5">
            <circle cx="0" cy="0" r="30" />
            <circle cx="0" cy="0" r="10" fill="#1c1917" />
            <rect x="-35" y="-5" width="70" height="10" rx="2" />
            <rect x="-5" y="-35" width="10" height="70" rx="2" />
          </g>
          <g transform="translate(260, 150)" fill="#92400e" stroke="#b45309" strokeWidth="1.5">
            <circle cx="0" cy="0" r="35" />
            <circle cx="0" cy="0" r="12" fill="#1c1917" />
            <rect x="-40" y="-6" width="80" height="12" rx="2" />
            <rect x="-6" y="-40" width="12" height="80" rx="2" />
          </g>

          {/* Steam Pressure Dial / Manometer */}
          <g transform="translate(260, 45)">
            <circle cx="0" cy="0" r="20" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
            <line x1="0" y1="0" x2="8" y2="-10" stroke="#dc2626" strokeWidth="2" />
            <text x="-12" y="8" fill="#78350f" fontSize="6" fontWeight="bold">PSI x100</text>
          </g>

          {/* Steampunk Brass Automaton Mechanical Monkey */}
          <g transform="translate(110, 45)">
            {/* Riveted Boiler Plate Torso */}
            <ellipse cx="50" cy="75" rx="28" ry="32" fill="#78350f" stroke="#d97706" strokeWidth="2.5" />
            {/* Brass Rivets on Torso */}
            <circle cx="30" cy="60" r="2" fill="#fde047" />
            <circle cx="70" cy="60" r="2" fill="#fde047" />
            <circle cx="30" cy="90" r="2" fill="#fde047" />
            <circle cx="70" cy="90" r="2" fill="#fde047" />
            
            {/* Exposed Glowing Clockwork Heart */}
            <circle cx="50" cy="75" r="10" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
            <polygon points="50,70 54,78 46,78" fill="#fde047" />

            {/* Automaton Cranium */}
            <circle cx="50" cy="35" r="24" fill="#92400e" stroke="#d97706" strokeWidth="2.5" />
            
            {/* Brass Cog Ears */}
            <circle cx="24" cy="30" r="10" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="76" cy="30" r="10" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />

            {/* Victorian Brass Welding Goggles */}
            <circle cx="40" cy="32" r="8" fill="#0284c7" stroke="#ca8a04" strokeWidth="3" />
            <circle cx="60" cy="32" r="8" fill="#0284c7" stroke="#ca8a04" strokeWidth="3" />
            <line x1="48" y1="32" x2="52" y2="32" stroke="#ca8a04" strokeWidth="3" />
            
            {/* Goggle glass reflections */}
            <line x1="37" y1="28" x2="43" y2="34" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="57" y1="28" x2="63" y2="34" stroke="#ffffff" strokeWidth="1.5" />

            {/* Steam Exhaust Pipes on Shoulders */}
            <rect x="18" y="48" width="6" height="14" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
            <rect x="76" y="48" width="6" height="14" fill="#b45309" stroke="#f59e0b" strokeWidth="1" />
          </g>

          {/* Steam Cloud Puffs */}
          <circle cx="125" cy="85" r="8" fill="#ffffff" opacity="0.25" />
          <circle cx="120" cy="75" r="12" fill="#ffffff" opacity="0.2" />
          <circle cx="195" cy="85" r="8" fill="#ffffff" opacity="0.25" />
          <circle cx="200" cy="75" r="12" fill="#ffffff" opacity="0.2" />

          {/* Label Badge */}
          <rect x="10" y="10" width="145" height="22" rx="6" fill="#451a03" stroke="#d97706" strokeWidth="1" />
          <text x="16" y="25" fill="#fde047" fontSize="10" fontWeight="bold" fontFamily="serif">Victorian Steampunk Brass</text>
        </svg>
      );

    default:
      // High quality generic artist representation
      return (
        <svg viewBox="0 0 320 220" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="220" fill="#1e1b4b" rx="16" />
          <circle cx="160" cy="110" r="70" fill="#3b82f6" opacity="0.3" />
          <g transform="translate(120, 60)">
            <ellipse cx="40" cy="55" rx="26" ry="28" fill="#6366f1" />
            <circle cx="40" cy="25" r="20" fill="#818cf8" />
            <circle cx="20" cy="22" r="8" fill="#4f46e5" />
            <circle cx="60" cy="22" r="8" fill="#4f46e5" />
            <circle cx="34" cy="22" r="3" fill="#ffffff" />
            <circle cx="46" cy="22" r="3" fill="#ffffff" />
          </g>
          <rect x="10" y="10" width="130" height="22" rx="6" fill="#0f172a" fillOpacity="0.7" />
          <text x="16" y="25" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Art Masterwork</text>
        </svg>
      );
  }
};

export default ArtistMonkeySample;
