/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { GeneratedImage, Hotspot } from '../types';
import { 
  Download, 
  Sparkles, 
  Edit3, 
  Maximize2, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RefreshCcw, 
  Info, 
  Share2, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Twitter, 
  Facebook, 
  Linkedin,
  Check,
  Pencil,
  Type as TypeIcon,
  MousePointer2,
  Trash2,
  Palette,
  Undo2,
  Redo2,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Maximize,
  Cloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// Using the central Annotation type instead of redefining it to prevent property mismatch
import type { Annotation } from '../types';

interface InfographicProps {
  image: GeneratedImage;
  onEdit: (prompt: string, selection?: { x: number, y: number, w: number, h: number }) => void;
  onUpdateImage: (updates: Partial<GeneratedImage>) => void;
  onRegenerate: () => void;
  onSaveToCloud?: () => Promise<string | undefined>;
  isEditing: boolean;
}

const Infographic: React.FC<InfographicProps> = ({ image, onEdit, onUpdateImage, onRegenerate, onSaveToCloud, isEditing }) => {
  const [editPrompt, setEditPrompt] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [expandedHotspot, setExpandedHotspot] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Annotation & Mode State
  const [tool, setTool] = useState<'view' | 'edit' | 'draw' | 'text'>('view');
  const [annotations, setAnnotations] = useState<Annotation[]>(image.annotations || []);
  const [annotationHistory, setAnnotationHistory] = useState<Annotation[][]>(image.annotationHistoryStates || [image.annotations || []]);
  const [historyIndex, setHistoryIndex] = useState(image.historyIndex || 0);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState('#06b6d4'); // cyan-500
  const [activeStrokeWidth, setActiveStrokeWidth] = useState(3);
  const [activeFontSize, setActiveFontSize] = useState(14);
  const [filterMode, setFilterMode] = useState<'none' | 'sepia' | 'grayscale' | 'invert' | 'blur'>('none');

  // Sync state when image changes
  useEffect(() => {
    setAnnotations(image.annotations || []);
    setAnnotationHistory(image.annotationHistoryStates || [image.annotations || []]);
    setHistoryIndex(image.historyIndex || 0);
    setTool('view');
    setSelection(null);
    setSelectedAnnotation(null);
    setFilterMode('none');
  }, [image.id]);

  // Notify parent of updates
  const notifyParent = (newAnnos: Annotation[], newHist: Annotation[][], newIdx: number) => {
    onUpdateImage({
      annotations: newAnnos,
      annotationHistoryStates: newHist,
      historyIndex: newIdx
    });
  };

  // Helper to push new state to history
  const pushHistory = (newAnnotations: Annotation[]) => {
    const newHistory = annotationHistory.slice(0, historyIndex + 1);
    newHistory.push(newAnnotations);
    setAnnotationHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setAnnotations(newAnnotations);
    notifyParent(newAnnotations, newHistory, newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setAnnotations(annotationHistory[newIndex]);
      notifyParent(annotationHistory[newIndex], annotationHistory, newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < annotationHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setAnnotations(annotationHistory[newIndex]);
      notifyParent(annotationHistory[newIndex], annotationHistory, newIndex);
    }
  };
  
  // Selection Logic
  const [selection, setSelection] = useState<{ x: number, y: number, w: number, h: number } | null>(null);
  const [isInteractionActive, setIsInteractionActive] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPath, setCurrentPath] = useState<{ x: number, y: number }[] | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectionMode = tool === 'edit';

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.clientWidth,
          height: imageRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [image.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPrompt.trim()) return;
    onEdit(editPrompt, selection || undefined);
    setEditPrompt('');
    setSelection(null);
    setTool('view');
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (tool === 'view' || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (tool === 'text') {
      const newText: Annotation = {
        id: Date.now().toString(),
        type: 'text',
        x,
        y,
        content: 'New Annotation',
        color: activeColor,
        fontSize: activeFontSize
      };
      pushHistory([...annotations, newText]);
      setSelectedAnnotation(newText.id);
      return;
    }
    
    setStartPos({ x, y });
    setIsInteractionActive(true);

    if (tool === 'edit') {
      setSelection({ x, y, w: 0, h: 0 });
    } else if (tool === 'draw') {
      setCurrentPath([{ x, y }]);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteractionActive || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;
    
    const x = Math.max(0, Math.min(100, currentX));
    const y = Math.max(0, Math.min(100, currentY));
    
    if (tool === 'edit') {
      setSelection({
        x: Math.min(startPos.x, x),
        y: Math.min(startPos.y, y),
        w: Math.abs(startPos.x - x),
        h: Math.abs(startPos.y - y)
      });
    } else if (tool === 'draw') {
      setCurrentPath(prev => prev ? [...prev, { x, y }] : [{ x, y }]);
    }
  };

  const handleMouseUp = () => {
    if (tool === 'draw' && currentPath) {
      const newDrawing: Annotation = {
        id: Date.now().toString(),
        type: 'drawing',
        points: currentPath,
        color: activeColor,
        strokeWidth: activeStrokeWidth
      };
      pushHistory([...annotations, newDrawing]);
      setCurrentPath(null);
    }
    setIsInteractionActive(false);
  };

  const deleteAnnotation = (id: string) => {
    pushHistory(annotations.filter(a => a.id !== id));
    if (selectedAnnotation === id) setSelectedAnnotation(null);
  };

  const updateText = (id: string, content: string) => {
    setAnnotations(annotations.map(a => a.id === id ? { ...a, content } : a));
  };

  const finalizeTextUpdate = () => {
    if (selectedAnnotation) {
      const target = annotations.find(a => a.id === selectedAnnotation);
      if (target) {
        pushHistory([...annotations]);
      }
      setSelectedAnnotation(null);
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, annotationHistory]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1);
  };

  const captureVisual = async () => {
    if (!containerRef.current) return null;
    
    // Temporarily hide elements we don't want in the export
    const hotspots = containerRef.current.querySelectorAll('.group\\/hotspot');
    const cornerMarkers = containerRef.current.querySelectorAll('.pointer-events-none.z-20');
    
    hotspots.forEach(h => (h as HTMLElement).style.display = 'none');
    cornerMarkers.forEach(cm => (cm as HTMLElement).style.display = 'none');
    
    try {
      const canvas = await html2canvas(containerRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2 // High resolution
      });
      return canvas;
    } finally {
      hotspots.forEach(h => (h as HTMLElement).style.display = 'block');
      cornerMarkers.forEach(cm => (cm as HTMLElement).style.display = 'block');
    }
  };

  const exportPNG = async () => {
    const canvas = await captureVisual();
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `infographic-${image.id}-annotated.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setIsDownloadMenuOpen(false);
  };

  const exportPDF = async () => {
    const canvas = await captureVisual();
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png');
    const width = canvas.width;
    const height = canvas.height;
    
    const doc = new jsPDF({
      orientation: width > height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [width, height]
    });
    
    doc.addImage(imgData, 'PNG', 0, 0, width, height);
    doc.save(`infographic-${image.id}-annotated.pdf`);
    setIsDownloadMenuOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent(`Check out this AI-generated infographic about ${image.prompt}! #InfoGenius #AI`);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl = '';
    switch(platform) {
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
    }
    
    if (shareUrl) window.open(shareUrl, '_blank');
    setIsShareMenuOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(image.data);
        const blob = await response.blob();
        const file = new File([blob], 'infographic.png', { type: 'image/png' });
        
        await navigator.share({
          files: [file],
          title: 'InfoGenius Infographic',
          text: `Visualizing: ${image.prompt}`,
        });
      } catch (err) {
        console.error('Sharing failed', err);
      }
    }
    setIsShareMenuOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto animate-in fade-in zoom-in duration-700 mt-8">
      
      {/* Image Container */}
      <div 
        ref={containerRef}
        className="relative group w-full bg-slate-100 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700/50"
      >
        {/* Decorative Corner Markers */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl z-20 pointer-events-none"></div>

        <div 
          className="relative inline-block w-full h-full min-h-[400px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img 
            ref={imageRef}
            src={image.data} 
            alt={image.prompt} 
            onClick={() => tool === 'view' && setIsFullscreen(true)}
            onLoad={() => {
              if (imageRef.current) {
                setImageSize({
                  width: imageRef.current.clientWidth,
                  height: imageRef.current.clientHeight
                });
              }
            }}
            className={`w-full h-auto object-contain max-h-[80vh] bg-checkered relative z-10 transition-[filter] duration-500 ease-in-out ${tool !== 'view' ? 'cursor-crosshair' : 'cursor-zoom-in'} ${
              filterMode === 'sepia' ? 'sepia-[.8]' :
              filterMode === 'grayscale' ? 'grayscale' :
              filterMode === 'invert' ? 'invert-[.85] hue-rotate-180' :
              filterMode === 'blur' ? 'blur-[3px]' : ''
            }`}
          />

          {/* Canvas Layers */}
          <svg className={`absolute inset-0 w-full h-full z-20 ${tool === 'view' ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            {annotations.filter(a => a.type === 'drawing').map(a => (
              <polyline
                key={a.id}
                points={a.points?.map(p => `${p.x}%,${p.y}%`).join(' ')}
                fill="none"
                stroke={a.color}
                strokeWidth={a.strokeWidth || 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-all duration-200 cursor-pointer ${selectedAnnotation === a.id ? 'opacity-100' : 'opacity-80 hover:opacity-100'} ${tool === 'view' ? 'pointer-events-auto' : 'pointer-events-none'}`}
                onClick={(e) => {
                    if (tool === 'view') {
                        e.stopPropagation();
                        setSelectedAnnotation(a.id);
                    }
                }}
              />
            ))}
            {currentPath && (
              <polyline
                points={currentPath.map(p => `${p.x}%,${p.y}%`).join(' ')}
                fill="none"
                stroke={activeColor}
                strokeWidth={activeStrokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>

          {/* Text Annotations */}
          {annotations.filter(a => a.type === 'text').map(a => (
            <motion.div 
              key={a.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: selectedAnnotation === a.id ? 1.05 : 1, 
                opacity: 1,
                boxShadow: selectedAnnotation === a.id ? '0 0 20px rgba(6, 182, 212, 0.4)' : 'none'
              }}
              className={`absolute z-20 group/text transition-all duration-200 rounded-md ${selectedAnnotation === a.id ? 'ring-2 ring-white ring-offset-2 ring-offset-cyan-500' : ''}`}
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedAnnotation(a.id);
              }}
            >
              {selectedAnnotation === a.id ? (
                <motion.div 
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex flex-col gap-1"
                >
                  <input
                    autoFocus
                    value={a.content}
                    onChange={(e) => updateText(a.id, e.target.value)}
                    onBlur={finalizeTextUpdate}
                    style={{ color: a.color, fontSize: `${a.fontSize || 14}px` }}
                    className="bg-black/40 backdrop-blur-md border border-white/20 rounded px-2 py-1 font-bold shadow-lg focus:outline-none focus:ring-1 ring-cyan-500 min-w-[100px]"
                  />
                  <div className="flex flex-col gap-2 bg-black/60 p-2 rounded-xl backdrop-blur-xl border border-white/10 shadow-2xl">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex gap-1">
                            {['#ffffff', '#06b6d4', '#ef4444', '#f59e0b', '#10b981'].map(c => (
                                <button 
                                    key={c}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateText(a.id, a.content || '');
                                        setAnnotations(prev => prev.map(pa => pa.id === a.id ? { ...pa, color: c } : pa));
                                    }}
                                    className={`w-4 h-4 rounded-full border border-white/20 ${a.color === c ? 'ring-2 ring-white scale-110' : ''}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                        <button 
                            onClick={() => deleteAnnotation(a.id)}
                            className="bg-red-500/80 text-white p-1.5 rounded-lg hover:bg-red-600 transition-colors pointer-events-auto shadow-md"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2 px-1">
                        <span className="text-[10px] font-bold text-white/60">SIZE</span>
                        <input 
                            type="range" min="10" max="80" 
                            value={a.fontSize || 14}
                            onChange={(e) => {
                                const newSize = parseInt(e.target.value);
                                setAnnotations(prev => prev.map(pa => pa.id === a.id ? { ...pa, fontSize: newSize } : pa));
                            }}
                            className="w-full accent-cyan-500 h-1"
                        />
                        <input 
                             type="number" 
                             min="10" 
                             max="80"
                             value={a.fontSize || 14}
                             onChange={(e) => {
                                 const newSize = Math.max(10, Math.min(80, parseInt(e.target.value) || 10));
                                 setAnnotations(prev => prev.map(pa => pa.id === a.id ? { ...pa, fontSize: newSize } : pa));
                             }}
                             className="w-10 bg-white/10 text-white text-[10px] font-mono font-bold rounded px-1 py-0.5 focus:ring-1 ring-cyan-500 border-none"
                        />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <span 
                  style={{ color: a.color, fontSize: `${a.fontSize || 14}px` }}
                  className="px-2 py-1 font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] cursor-pointer block"
                >
                  {a.content}
                </span>
              )}
            </motion.div>
          ))}

          {/* Selection Box */}
          {selection && tool === 'edit' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute border-2 border-cyan-500 bg-cyan-500/10 z-30 pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              style={{
                left: `${selection.x}%`,
                top: `${selection.y}%`,
                width: `${selection.w}%`,
                height: `${selection.h}%`
              }}
            >
               <motion.div 
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-cyan-500/20"
               />
               <div className="absolute -top-6 left-0 bg-cyan-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg uppercase tracking-wider flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  Target Area
               </div>
            </motion.div>
          )}

          {/* Hotspots Overlay */}
          {image.hotspots && image.hotspots.map((hotspot) => (
            <div 
              key={hotspot.id}
              className="absolute z-30 group/hotspot"
              style={{ 
                left: `${hotspot.x}%`, 
                top: `${hotspot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <button
                onMouseEnter={() => !expandedHotspot && setActiveHotspot(hotspot.id)}
                onMouseLeave={() => !expandedHotspot && setActiveHotspot(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(hotspot.id);
                  setExpandedHotspot(hotspot.id);
                }}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  activeHotspot === hotspot.id 
                  ? 'bg-cyan-500 text-white scale-125' 
                  : 'bg-white/80 dark:bg-slate-800/80 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white'
                }`}
              >
                <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20 group-hover/hotspot:opacity-40"></span>
              </button>

              {/* Tooltip */}
              <AnimatePresence>
                {activeHotspot === hotspot.id && !expandedHotspot && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 10, x: '-50%' }}
                    className="absolute bottom-full left-1/2 mb-3 w-64 sm:w-80 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 pointer-events-auto"
                  >
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-2">{hotspot.title}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{hotspot.description}</p>
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedHotspot(hotspot.id);
                            }}
                            className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                        >
                            Deep Dive <ChevronRight className="w-3 h-3" />
                        </button>
                        {hotspot.url && (
                             <a 
                                href={hotspot.url} 
                                target="_blank" 
                                referrerPolicy="no-referrer"
                                rel="noopener noreferrer"
                                className="p-1 px-1.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-500 transition-colors"
                            >
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white dark:border-t-slate-800"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        {/* Hover Overlay for Quick Actions */}
        <div className="absolute top-6 right-6 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-30 items-start">
          <div className="relative">
            <button 
              onClick={() => { setIsDownloadMenuOpen(!isDownloadMenuOpen); setIsShareMenuOpen(false); }}
              className="bg-black/60 backdrop-blur-md text-white p-3 rounded-xl shadow-lg hover:bg-cyan-600 transition-colors border border-white/10 block relative"
              title="Download & Export"
            >
              <Download className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {isDownloadMenuOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsDownloadMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-50"
                  >
                    <div className="p-4 space-y-4">
                      {/* Save Options */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Export Visual</p>
                        <button 
                          onClick={exportPNG}
                          className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-200 group"
                        >
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold leading-tight">High Res PNG</p>
                            <p className="text-[10px] opacity-60">Visual + Markup</p>
                          </div>
                        </button>
                        <button 
                          onClick={exportPDF}
                          className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-200 group"
                        >
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg group-hover:scale-110 transition-transform">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold leading-tight">Document PDF</p>
                            <p className="text-[10px] opacity-60">Full Annotation Export</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button 
              onClick={() => { setIsShareMenuOpen(!isShareMenuOpen); setIsDownloadMenuOpen(false); }}
              className="bg-black/60 backdrop-blur-md text-white p-3 rounded-xl shadow-lg hover:bg-cyan-600 transition-colors border border-white/10 block relative"
              title="Share Infographic"
            >
              <Share2 className="w-5 h-5" />
            </button>

            <AnimatePresence>
              {isShareMenuOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsShareMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden z-50"
                  >
                    <div className="p-4 space-y-4">
                      {/* Share Options */}
                      <div className="space-y-4">
                         <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Share To</p>
                         
                         {onSaveToCloud && (
                            <button 
                                onClick={async () => {
                                    const id = await onSaveToCloud();
                                    if (id) {
                                        const url = `${window.location.origin}${window.location.pathname}?v=${id}`;
                                        try {
                                            await navigator.clipboard.writeText(url);
                                            setCopied(true);
                                            setTimeout(() => setCopied(false), 2000);
                                        } catch (e) {
                                            prompt('Copy this link to share:', url);
                                        }
                                    }
                                }}
                                className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-colors group border ${copied ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400' : 'bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400'}`}
                            >
                                <div className={`p-2 rounded-lg group-hover:scale-110 transition-transform shadow-sm ${copied ? 'bg-white dark:bg-slate-800 text-green-600 dark:text-green-400' : 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400'}`}>
                                    {copied ? <Check className="w-4 h-4" /> : <Cloud className="w-4 h-4" />}
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold leading-tight">{copied ? 'Link Copied!' : 'Cloud Share'}</p>
                                    <p className="text-[10px] opacity-60">Save & Get Share Link</p>
                                </div>
                            </button>
                         )}

                         <div className="flex justify-between gap-1 px-1">
                            <button onClick={handleNativeShare} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-cyan-50 dark:hover:bg-cyan-900/20 text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-colors" title="Device Share"><Share2 className="w-5 h-5"/></button>
                            <button onClick={() => handleSocialShare('twitter')} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-[#1DA1F2]/10 text-slate-600 dark:text-slate-300 hover:text-[#1DA1F2] transition-colors" title="Twitter"><Twitter className="w-5 h-5"/></button>
                            <button onClick={() => handleSocialShare('facebook')} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-[#4267B2]/10 text-slate-600 dark:text-slate-300 hover:text-[#4267B2] transition-colors" title="Facebook"><Facebook className="w-5 h-5"/></button>
                            <button onClick={() => handleSocialShare('linkedin')} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-[#0077b5]/10 text-slate-600 dark:text-slate-300 hover:text-[#0077b5] transition-colors" title="LinkedIn"><Linkedin className="w-5 h-5"/></button>
                         </div>
                         <button 
                          onClick={handleCopyLink}
                          className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-200 group"
                        >
                          <div className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/30 group-hover:text-cyan-600'}`}>
                            {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold leading-tight">{copied ? 'Link Copied!' : 'Copy Link'}</p>
                            <p className="text-[10px] opacity-60">Share application access</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setIsFullscreen(true)}
            className="bg-black/60 backdrop-blur-md text-white p-3 rounded-xl shadow-lg hover:bg-cyan-600 transition-colors border border-white/10 block"
            title="Fullscreen View"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Toolbar & Edit Bar */}
      <div className="w-full max-w-4xl -mt-6 sm:-mt-8 relative z-40 px-4 space-y-4">
        {/* Tool Selector Bar */}
        <div className="flex justify-center flex-wrap gap-2">
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 flex items-center gap-1">
            <button 
              onClick={() => { setTool('view'); setSelection(null); setSelectedAnnotation(null); }}
              className={`p-2.5 rounded-xl transition-all relative ${tool === 'view' ? 'bg-cyan-600 text-white shadow-lg ring-2 ring-cyan-500/50' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              title="View & Interact"
            >
              <motion.div
                animate={tool === 'view' ? { y: [0, -2, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <MousePointer2 className="w-5 h-5" />
              </motion.div>
              {tool === 'view' && (
                <motion.div 
                    layoutId="toolPulse"
                    className="absolute inset-0 rounded-xl bg-cyan-400/30 -z-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
            <button 
              onClick={() => { setTool('edit'); }}
              className={`p-2.5 rounded-xl transition-all relative ${tool === 'edit' ? 'bg-cyan-600 text-white shadow-lg ring-2 ring-cyan-500/50' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              title="Selective Edit"
            >
              <motion.div
                animate={tool === 'edit' ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Maximize2 className="w-5 h-5" />
              </motion.div>
              {tool === 'edit' && (
                <motion.div 
                    layoutId="toolPulse"
                    className="absolute inset-0 rounded-xl bg-cyan-400/30 -z-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </button>
            <button 
              onClick={() => { setTool('draw'); setSelection(null); }}
              className={`p-2.5 rounded-xl transition-all relative ${tool === 'draw' ? 'bg-cyan-600 text-white shadow-lg ring-2 ring-cyan-500/50' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              title="Draw Pencil"
            >
              <motion.div
                animate={tool === 'draw' ? { rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Pencil className="w-5 h-5" />
              </motion.div>
              {tool === 'draw' && (
                <motion.div 
                    layoutId="toolPulse"
                    className="absolute inset-0 rounded-xl bg-cyan-400/30 -z-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </button>
            <button 
              onClick={() => { setTool('text'); setSelection(null); }}
              className={`p-2.5 rounded-xl transition-all relative ${tool === 'text' ? 'bg-cyan-600 text-white shadow-lg ring-2 ring-cyan-500/50' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              title="Add Text"
            >
              <motion.div
                animate={tool === 'text' ? { y: [-1, 1, -1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <TypeIcon className="w-5 h-5" />
              </motion.div>
              {tool === 'text' && (
                <motion.div 
                    layoutId="toolPulse"
                    className="absolute inset-0 rounded-xl bg-cyan-400/30 -z-10"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </button>
            
            {(tool === 'draw' || tool === 'text') && (
              <>
                <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
                <div className="flex flex-col sm:flex-row items-center gap-3 px-2 py-1">
                  <div className="flex items-center gap-1.5 flex-wrap max-w-[120px] sm:max-w-none justify-center">
                    {['#06b6d4', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#ffffff', '#000000'].map(c => (
                        <button 
                        key={c}
                        onClick={() => setActiveColor(c)}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/10 transition-all ${activeColor === c ? 'scale-125 ring-2 ring-cyan-500 shadow-md' : 'hover:scale-110 opacity-80 hover:opacity-100'}`}
                        style={{ backgroundColor: c }}
                        title={`Select ${c} color`}
                        />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700/50 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/5">
                    {tool === 'draw' ? (
                        <>
                            <div className="flex items-center gap-1 text-slate-500 mr-1" title="Stroke Width">
                                <Edit3 className="w-3 h-3" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Width</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="range" min="1" max="40" 
                                    value={activeStrokeWidth} 
                                    onChange={(e) => setActiveStrokeWidth(parseInt(e.target.value))}
                                    className="w-16 sm:w-24 accent-cyan-500 h-1 cursor-pointer"
                                />
                                <input 
                                    type="number"
                                    min="1"
                                    max="40"
                                    value={activeStrokeWidth}
                                    onChange={(e) => setActiveStrokeWidth(Math.max(1, Math.min(40, parseInt(e.target.value) || 1)))}
                                    className="w-8 sm:w-10 bg-slate-50 dark:bg-slate-950/50 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-bold rounded px-1 py-0.5 focus:ring-1 ring-cyan-500 border border-slate-200 dark:border-white/10"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-1 text-slate-500 mr-1" title="Font Size">
                                <TypeIcon className="w-3 h-3" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Size</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="range" min="10" max="120" 
                                    value={activeFontSize} 
                                    onChange={(e) => setActiveFontSize(parseInt(e.target.value))}
                                    className="w-16 sm:w-24 accent-cyan-500 h-1 cursor-pointer"
                                />
                                <input 
                                    type="number"
                                    min="10"
                                    max="120"
                                    value={activeFontSize}
                                    onChange={(e) => setActiveFontSize(Math.max(10, Math.min(120, parseInt(e.target.value) || 10)))}
                                    className="w-10 sm:w-12 bg-slate-50 dark:bg-slate-950/50 text-cyan-600 dark:text-cyan-400 text-[10px] font-mono font-bold rounded px-1 py-0.5 focus:ring-1 ring-cyan-500 border border-slate-200 dark:border-white/10"
                                />
                            </div>
                        </>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
            <div className="flex items-center gap-0.5">
              <button 
                onClick={undo}
                disabled={historyIndex === 0}
                className={`p-2 sm:p-2.5 rounded-xl transition-all ${historyIndex > 0 ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95' : 'text-slate-300 dark:text-slate-600 opacity-50 cursor-not-allowed'}`}
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button 
                onClick={redo}
                disabled={historyIndex === annotationHistory.length - 1}
                className={`p-2 sm:p-2.5 rounded-xl transition-all ${historyIndex < annotationHistory.length - 1 ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95' : 'text-slate-300 dark:text-slate-600 opacity-50 cursor-not-allowed'}`}
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {annotations.length > 0 && (
              <>
                 <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-1"></div>
                 <button 
                    onClick={() => {
                        if (confirm('Are you sure you want to clear all annotations?')) {
                            pushHistory([]);
                        }
                    }}
                    className="p-2 sm:p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all flex items-center gap-1 group"
                    title="Clear All Annotations"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:shake" />
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">Clear All</span>
                  </button>
              </>
            )}
          </div>

          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 flex items-center gap-1">
            <button 
              onClick={onRegenerate}
              disabled={isEditing}
              className={`p-2.5 rounded-xl transition-all flex items-center gap-2 group ${isEditing ? 'text-slate-300 dark:text-slate-600 opacity-50' : 'text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 hover:text-cyan-600'}`}
              title="Regenerate Infographic"
            >
              <RotateCcw className={`w-5 h-5 ${isEditing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              <span className="text-xs font-bold px-1 hidden lg:block">Regenerate</span>
            </button>
          </div>

          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 flex items-center gap-1 hidden md:flex">
             <div className="flex items-center gap-1 px-1">
               <Palette className="w-4 h-4 text-slate-400 mr-1" />
               {(['none', 'sepia', 'grayscale', 'invert', 'blur'] as const).map(f => (
                 <button
                   key={f}
                   onClick={() => setFilterMode(f)}
                   className={`px-2.5 py-1.5 rounded-lg transition-all text-[11px] font-bold uppercase tracking-wider ${filterMode === f ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                   title={`Apply ${f === 'none' ? 'Normal' : f} filter`}
                 >
                   {f === 'none' ? 'Normal' : f}
                 </button>
               ))}
             </div>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl p-3 sm:p-2 sm:pr-3 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-2 items-center ring-1 ring-black/5 dark:ring-white/5">
            <div className="pl-4 text-cyan-600 dark:text-cyan-400 hidden sm:block">
                <Edit3 className="w-5 h-5" />
            </div>

            <form onSubmit={handleSubmit} className="flex-1 w-full flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <input
                      type="text"
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder={tool === 'edit' && selection ? "What should change in the selected area?" : "Refine with AI Globally..."}
                      className="w-full bg-slate-50 dark:bg-slate-950/50 sm:bg-transparent border border-slate-200 dark:border-white/5 sm:border-none rounded-xl sm:rounded-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 px-4 py-3 sm:px-2 sm:py-2 font-medium text-base"
                      disabled={isEditing}
                  />
                  {selection && tool === 'edit' && (
                    <button 
                      type="button"
                      onClick={() => setSelection(null)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-500 transition-colors"
                      title="Clear selection"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {/* Wrapped button in div to allow tooltip on disabled state */}
                <div className="w-full sm:w-auto" title={!editPrompt.trim() ? "Please enter a prompt to enhance" : "Enhance image"}>
                    <button
                        type="submit"
                        disabled={isEditing || !editPrompt.trim()}
                        className={`w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                            isEditing || !editPrompt.trim() 
                            ? 'bg-slate-200 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                            : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-500/20'
                        }`}
                    >
                        {isEditing ? (
                            <span className="animate-spin w-5 h-5 block border-2 border-white/30 border-t-white rounded-full"></span>
                        ) : (
                            <>
                                <span>Enhance</span>
                                <Sparkles className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
      </div>
      
      <div className="mt-8 text-center space-y-2 px-4">
        <p className="text-xs text-slate-500 dark:text-slate-500 font-mono max-w-xl mx-auto truncate opacity-60">
            PROMPT: {image.prompt}
        </p>
      </div>

      {/* Hotspot Deep Dive Modal */}
      <AnimatePresence>
        {expandedHotspot && image.hotspots && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setExpandedHotspot(null)}
               className="fixed inset-0 z-[150] bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[151] p-0"
            >
              {(() => {
                const hotspot = image.hotspots.find(h => h.id === expandedHotspot);
                if (!hotspot) return null;
                return (
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 overflow-hidden">
                    <div className="relative h-48 sm:h-64 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        {/* Abstract background element */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500 via-indigo-500 to-transparent animate-pulse" />
                        <div className="p-8 text-cyan-600 dark:text-cyan-400 relative z-10 flex flex-col items-center gap-4">
                            <Info className="w-16 h-16 opacity-20" />
                            <div className="text-center">
                                <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white leading-tight">
                                    {hotspot.title}
                                </h2>
                                <p className="text-xs text-slate-500 uppercase tracking-widest mt-2">Data Point Detailed Analysis</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setExpandedHotspot(null)}
                            className="absolute top-6 right-6 p-2 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>

                    <div className="p-6 sm:p-10 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Elaborated Analysis</h3>
                            <div className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium whitespace-pre-line space-y-4">
                                {hotspot.description}
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                             {hotspot.url && (
                                <a 
                                    href={hotspot.url}
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-2 group"
                                >
                                    <span>Explore External Resource</span>
                                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                             )}
                             <button 
                                onClick={() => setExpandedHotspot(null)}
                                className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 font-bold py-4 px-6 rounded-2xl transition-all"
                             >
                                Back to Visual
                             </button>
                        </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-slate-100/95 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
            {/* Toolbar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-50 pointer-events-none">
                <div className="flex gap-2 pointer-events-auto bg-white/10 backdrop-blur-md p-1 rounded-lg border border-black/5 dark:border-white/10">
                    <button onClick={handleZoomOut} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-md text-slate-800 dark:text-slate-200 transition-colors" title="Zoom Out">
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <button onClick={handleResetZoom} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-md text-slate-800 dark:text-slate-200 transition-colors" title="Reset Zoom">
                        <span className="text-xs font-bold">{Math.round(zoomLevel * 100)}%</span>
                    </button>
                    <button onClick={handleZoomIn} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-md text-slate-800 dark:text-slate-200 transition-colors" title="Zoom In">
                        <ZoomIn className="w-5 h-5" />
                    </button>
                </div>

                <button 
                    onClick={handleCloseFullscreen}
                    className="pointer-events-auto p-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shadow-lg"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8">
                <img 
                    src={image.data} 
                    alt={image.prompt}
                    style={{ 
                        transform: `scale(${zoomLevel})`,
                        transition: 'transform 0.2s ease-out'
                    }}
                    className={`max-w-full max-h-full object-contain shadow-2xl rounded-lg origin-center ${
                      filterMode === 'sepia' ? 'sepia-[.8]' :
                      filterMode === 'grayscale' ? 'grayscale' :
                      filterMode === 'invert' ? 'invert-[.85] hue-rotate-180' :
                      filterMode === 'blur' ? 'blur-[3px]' : ''
                    }`}
                />
            </div>
        </div>
      )}
    </div>
  );
};

export default Infographic;