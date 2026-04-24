/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { GeneratedImage, ComplexityLevel, VisualStyle, Language, SearchResultItem, AspectRatio, ArtForm } from './types';
import { 
  researchTopicForPrompt, 
  generateInfographicImage, 
  editInfographicImage,
  generateInteractiveHotspots
} from './services/geminiService';
import Infographic from './components/Infographic';
import Loading from './components/Loading';
import IntroScreen from './components/IntroScreen';
import SearchResults from './components/SearchResults';
import Logo, { LogoVariant } from './components/Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Search, AlertCircle, History, GraduationCap, Palette, Microscope, Atom, Compass, Globe, Sun, Moon, Key, CreditCard, ExternalLink, DollarSign, Palette as PaletteIcon, X, Maximize, Square, Smartphone, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [logoVariant, setLogoVariant] = useState<LogoVariant>('synapse');
  const [showBrandPlayground, setShowBrandPlayground] = useState(false);
  const [topic, setTopic] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [complexityLevel, setComplexityLevel] = useState<ComplexityLevel>('High School');
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('Default');
  const [artForm, setArtForm] = useState<ArtForm>('None');
  const [language, setLanguage] = useState<Language>('English');
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [loadingFacts, setLoadingFacts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [imageHistory, setImageHistory] = useState<GeneratedImage[]>([]);
  const [currentSearchResults, setCurrentSearchResults] = useState<SearchResultItem[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [pendingSession, setPendingSession] = useState<any>(null);
  const [showRestorePrompt, setShowRestorePrompt] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // API Key State
  const [hasApiKey, setHasApiKey] = useState(false);
  const [checkingKey, setCheckingKey] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check for saved session
  useEffect(() => {
    const saved = localStorage.getItem('infogenius_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.imageHistory && parsed.imageHistory.length > 0) {
          setPendingSession(parsed);
          setShowRestorePrompt(true);
        }
      } catch (e) {
        console.error("Failed to parse saved session", e);
      }
    }
  }, []);

  // Auto-save session
  useEffect(() => {
    if (imageHistory.length > 0) {
      const sessionData = {
        imageHistory: imageHistory.slice(0, 5), // Save up to 5 images
        timestamp: Date.now()
      };
      try {
        localStorage.setItem('infogenius_session', JSON.stringify(sessionData));
      } catch (e) {
        console.warn("Storage full, could not auto-save full session", e);
      }
    }
  }, [imageHistory]);

  // Check for API Key on Mount
  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio && window.aistudio.hasSelectedApiKey) {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(hasKey);
        } else {
          // Development environment fallback or if not running in AI Studio context
          setHasApiKey(true);
        }
      } catch (e) {
        console.error("Error checking API key:", e);
      } finally {
        setCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      try {
        await window.aistudio.openSelectKey();
        // Assume success due to race condition logic mentioned in guidelines
        setHasApiKey(true);
        setError(null);
      } catch (e) {
        console.error("Failed to open key selector:", e);
      }
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!topic.trim()) {
        setError("Please enter a topic to visualize.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStep(1);
    setLoadingFacts([]);
    setCurrentSearchResults([]);
    setLoadingMessage(`Researching topic...`);

    try {
      // Step 1: Research and Construct Prompt
      const researchResult = await researchTopicForPrompt(topic, complexityLevel, visualStyle, language, artForm);
      
      setLoadingFacts(researchResult.facts);
      setCurrentSearchResults(researchResult.searchResults);
      
      setLoadingStep(2);
      setLoadingMessage(`Designing Infographic...`);
      
      // Step 2: Direct Image Generation
      let base64Data = await generateInfographicImage(researchResult.imagePrompt, aspectRatio);
      
      setLoadingStep(3);
      setLoadingMessage(`Adding Interactivity...`);
      
      // Step 3: Generate Hotspots
      const hotspots = await generateInteractiveHotspots(base64Data, topic, language);
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        data: base64Data,
        prompt: topic,
        timestamp: Date.now(),
        level: complexityLevel,
        style: visualStyle,
        language: language,
        artForm: artForm,
        hotspots: hotspots
      };

      setImageHistory([newImage, ...imageHistory]);
    } catch (err: any) {
      console.error(err);
      // Check for specific billing/key errors
      if (err.message && (err.message.includes("Requested entity was not found") || err.message.includes("404") || err.message.includes("403"))) {
          setError("Access denied. The selected API key does not have access to the required models. Please select a project with billing enabled.");
          setHasApiKey(false); // Force the key selection modal to reappear
      } else {
          setError('The image generation service is temporarily unavailable. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handleEdit = async (editPrompt: string, selection?: { x: number, y: number, w: number, h: number }) => {
    if (imageHistory.length === 0) return;
    const currentImage = imageHistory[0];
    setIsLoading(true);
    setError(null);
    setLoadingStep(2);
    setLoadingMessage(selection ? `Editing sub-section: "${editPrompt}"...` : `Processing Modification: "${editPrompt}"...`);

    try {
      const base64Data = await editInfographicImage(currentImage.data, editPrompt, selection);
      
      setLoadingStep(3);
      setLoadingMessage(`Updating Interactivity...`);
      const hotspots = await generateInteractiveHotspots(base64Data, currentImage.prompt, currentImage.language || 'English');

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        data: base64Data,
        prompt: editPrompt,
        timestamp: Date.now(),
        level: currentImage.level,
        style: currentImage.style,
        language: currentImage.language,
        artForm: currentImage.artForm,
        hotspots: hotspots
      };
      setImageHistory([newImage, ...imageHistory]);
    } catch (err: any) {
      console.error(err);
      if (err.message && (err.message.includes("Requested entity was not found") || err.message.includes("404") || err.message.includes("403"))) {
          setError("Access denied. Please select a valid API key with billing enabled.");
          setHasApiKey(false);
      } else {
          setError('Modification failed. Try a different command.');
      }
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handleUpdateImage = (updates: Partial<GeneratedImage>) => {
    setImageHistory(prev => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      newHistory[0] = { ...newHistory[0], ...updates };
      return newHistory;
    });
  };

  const handleRestoreImage = (img: GeneratedImage) => {
     const newHistory = imageHistory.filter(i => i.id !== img.id);
     setImageHistory([img, ...newHistory]);
  };

  const handleRestoreSession = () => {
    if (pendingSession) {
      setImageHistory(pendingSession.imageHistory);
      // Removed logoVariant restoration to enforce the new default choice
      setShowRestorePrompt(false);
      setPendingSession(null);
    }
  };

  const handleRegenerate = async () => {
    if (imageHistory.length === 0) return;
    const current = imageHistory[0];
    
    // Set states to match current image parameters before generating
    setTopic(current.prompt);
    setComplexityLevel(current.level || 'High School');
    if (current.style) setVisualStyle(current.style);
    if (current.artForm) setArtForm(current.artForm);
    if (current.language) setLanguage(current.language);
    
    // Trigger generation using existing handleGenerate logic
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    handleGenerate(fakeEvent);
  };

  // Modal for API Key Selection
  const KeySelectionModal = () => (
    <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-500/50 rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
            
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2 border-4 border-white dark:border-slate-900 shadow-lg">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm border-2 border-white dark:border-slate-900 uppercase tracking-wide">
                        Paid App
                    </div>
                </div>
                
                <div className="space-y-3">
                    <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                        Paid API Key Required
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium">
                        This application uses premium Gemini 3 Pro models which are not available on the free tier.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        You must select a Google Cloud Project with <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-1 py-0.5 rounded">Billing Enabled</span> to proceed.
                    </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 w-full text-left">
                    <div className="flex items-start gap-3">
                         <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400 shrink-0">
                            <DollarSign className="w-4 h-4" />
                         </div>
                         <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-200">Billing Required</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Standard API keys will fail. Please ensure you have set up billing in Google AI Studio.
                            </p>
                             <a 
                                href="https://ai.google.dev/gemini-api/docs/billing"
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline mt-1"
                            >
                                View Billing Documentation <ExternalLink className="w-3 h-3" />
                            </a>
                         </div>
                    </div>
                </div>

                <button 
                    onClick={handleSelectKey}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold shadow-lg shadow-amber-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                    <Key className="w-4 h-4" />
                    <span>Select Paid API Key</span>
                </button>
            </div>
        </div>
    </div>
  );

  const RestoreSessionModal = () => (
    <div className="fixed inset-0 z-[203] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl max-w-sm w-full p-6 md:p-8 relative">
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-2 border border-cyan-500/20 shadow-lg">
                    <History className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">Recover Session?</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">We found your previous workspace with {pendingSession?.imageHistory.length} visualizations.</p>
                </div>
                <div className="flex flex-col w-full gap-2 pt-2">
                    <button 
                        onClick={handleRestoreSession}
                        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        Restore Workspace
                    </button>
                    <button 
                        onClick={() => { setShowRestorePrompt(false); localStorage.removeItem('infogenius_session'); }}
                        className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                        Start Fresh
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <>
    {/* Block usage if key is missing */}
    {!checkingKey && !hasApiKey && <KeySelectionModal />}
    {showRestorePrompt && <RestoreSessionModal />}

    {showIntro ? (
      <IntroScreen 
        onComplete={() => setShowIntro(false)} 
        logoVariant={logoVariant}
      />
    ) : (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-cyan-500 selection:text-white pb-20 relative overflow-x-hidden animate-in fade-in duration-1000 transition-colors">
      
      {/* Brand Playground Modal */}
      <AnimatePresence>
        {showBrandPlayground && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl p-6 md:p-10 relative"
            >
              <button 
                onClick={() => setShowBrandPlayground(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Logo Variations</h2>
                <p className="text-slate-500 text-sm">Select a brand personality for infoGENIUS Vision</p>
              </div>

              <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {(['creative', 'specialist', 'editorial', 'hardware', 'organic', 'cyberpunk', 'swiss', 'vaporwave', 'minimalist', 'luxury', 'midnight', 'playful', 'zen', 'futuristic', 'nature', 'architect', 'metropolis', 'biotech', 'velocity', 'glitch', 'titanium', 'aurora', 'pixel', 'discovery', 'quantum', 'prestige', 'nebula', 'blueprint', 'monolith', 'prismatic', 'emerald', 'obsidian', 'synapse', 'hex', 'silicon', 'atlas', 'catalyst', 'manual', 'horizon', 'lab', 'genome'] as LogoVariant[]).map((v) => (
                  <button 
                    key={v}
                    onClick={() => { setLogoVariant(v); setShowBrandPlayground(false); }}
                    className={`w-full p-4 md:p-6 rounded-2xl border-2 transition-all flex items-center justify-between text-left group ${logoVariant === v ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-500/10' : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/20'}`}
                  >
                    <Logo variant={v} size="md" />
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${logoVariant === v ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {logoVariant === v ? 'Active' : 'Apply'}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Elements */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white dark:from-indigo-900 dark:via-slate-950 dark:to-black z-0 transition-colors"></div>
      <div className="fixed inset-0 opacity-5 dark:opacity-20 z-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
      }}></div>

      {/* Navbar */}
      <header className="border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <Logo variant={logoVariant} className="cursor-pointer" />

          <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-slate-600 dark:text-slate-400 text-xs font-medium transition-colors border border-slate-200 dark:border-white/10"
                title="Lookup History"
              >
                <History className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">History</span>
              </button>

              <button 
                onClick={() => setShowBrandPlayground(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium transition-colors border border-slate-200 dark:border-white/10"
                title="Brand Playground"
              >
                <PaletteIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Variants</span>
              </button>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors border border-slate-200 dark:border-white/10 shadow-sm"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
          </div>
        </div>
      </header>

      {/* History Slide-over */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 z-[150] bg-slate-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 z-[151] shadow-2xl border-l border-slate-200 dark:border-white/10 flex flex-col"
            >
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white leading-none">Lookup History</h2>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Previous Research & Visualization</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {imageHistory.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-sm">No research history yet. Start by typing a topic above!</p>
                  </div>
                ) : (
                  imageHistory.map((img) => (
                    <button 
                      key={img.id}
                      onClick={() => { handleRestoreImage(img); setShowHistory(false); }}
                      className="w-full group text-left p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 hover:border-cyan-500 dark:hover:border-cyan-400/50 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="flex gap-4">
                        <div className="w-24 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0 border border-slate-200 dark:border-white/10">
                          <img src={img.data} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                            {img.prompt}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                              {new Date(img.timestamp).toLocaleTimeString()}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {img.level} • {img.style}
                            </span>
                          </div>
                          {img.annotations && img.annotations.length > 0 && (
                            <div className="flex items-center gap-1 mt-2 text-[10px] text-cyan-500 font-bold uppercase tracking-tighter">
                              <PaletteIcon className="w-3 h-3" />
                              {img.annotations.length} Annotations
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50">
                <button 
                  onClick={() => { if(confirm("Clear history?")) { setImageHistory([]); localStorage.removeItem('infogenius_session'); setShowHistory(false); } }}
                  className="w-full py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All History
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="px-3 sm:px-6 py-4 md:py-8 relative z-10">
        
        <div className={`max-w-6xl mx-auto transition-all duration-500 ${imageHistory.length > 0 ? 'mb-4 md:mb-8' : 'min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center'}`}>
          
          {!imageHistory.length && (
            <div className="text-center mb-6 md:mb-16 space-y-3 md:space-y-8 animate-in slide-in-from-bottom-8 duration-700 fade-in">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-amber-600 dark:text-amber-300 text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-sm dark:shadow-[0_0_20px_rgba(251,191,36,0.1)] backdrop-blur-sm">
                <Compass className="w-3 h-3 md:w-4 md:h-4" /> Explore vast subjects like history, science, and more.
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-[0.95] md:leading-[0.9]">
                Visualize <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400">The Unknown.</span>
              </h1>
              <p className="text-sm md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
                Generate diagrams and infographics powered by A.I. & WWW
              </p>
            </div>
          )}

          {/* Search Form */}
          <form onSubmit={handleGenerate} className={`relative z-20 transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none scale-95 blur-sm' : 'scale-100'}`}>
            
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-amber-500 rounded-3xl opacity-10 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-40 transition duration-500 blur-xl"></div>
                
                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-2 rounded-3xl shadow-2xl">
                    
                    {/* Main Input */}
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 md:left-6 w-5 h-5 md:w-6 md:h-6 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="What do you want to visualize?"
                            className="w-full pl-12 md:pl-16 pr-4 md:pr-6 py-3 md:py-6 bg-transparent border-none outline-none text-base md:text-2xl placeholder:text-slate-400 font-medium text-slate-900 dark:text-white"
                        />
                    </div>

                    {/* Controls Bar */}
                    <div className="flex flex-col md:flex-row gap-2 p-2 mt-2">
                    
                    {/* Level Selector */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-white/5 px-4 py-3 flex items-center gap-3 hover:border-cyan-500/30 transition-colors relative overflow-hidden group/item">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-cyan-600 dark:text-cyan-400 shrink-0 shadow-sm">
                            <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col z-10 w-full overflow-hidden">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Audience</label>
                            <select 
                                value={complexityLevel} 
                                onChange={(e) => setComplexityLevel(e.target.value as ComplexityLevel)}
                                className="bg-transparent border-none text-base font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer p-0 w-full hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors truncate pr-4 [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-slate-100"
                            >
                                <option value="Elementary">Elementary</option>
                                <option value="High School">High School</option>
                                <option value="College">College</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                    </div>

                    {/* Style Selector */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-white/5 px-4 py-3 flex items-center gap-3 hover:border-purple-500/30 transition-colors relative overflow-hidden group/item">
                         <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-purple-600 dark:text-purple-400 shrink-0 shadow-sm">
                            <Palette className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col z-10 w-full overflow-hidden">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Aesthetic</label>
                            <select 
                                value={visualStyle} 
                                onChange={(e) => setVisualStyle(e.target.value as VisualStyle)}
                                className="bg-transparent border-none text-base font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer p-0 w-full hover:text-purple-600 dark:hover:text-purple-300 transition-colors truncate pr-4 [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-slate-100"
                            >
                                <option value="Default">Standard Scientific</option>
                                <option value="Minimalist">Minimalist</option>
                                <option value="Realistic">Photorealistic</option>
                                <option value="Cartoon">Graphic Novel</option>
                                <option value="Vintage">Vintage Lithograph</option>
                                <option value="Futuristic">Cyberpunk HUD</option>
                                <option value="3D Render">3D Isometric</option>
                                <option value="Sketch">Technical Blueprint</option>
                            </select>
                        </div>
                    </div>

                    {/* Language Selector */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-white/5 px-4 py-3 flex items-center gap-3 hover:border-green-500/30 transition-colors relative overflow-hidden group/item">
                         <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-green-600 dark:text-green-400 shrink-0 shadow-sm">
                            <Globe className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col z-10 w-full overflow-hidden">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Language</label>
                            <select 
                                value={language} 
                                onChange={(e) => setLanguage(e.target.value as Language)}
                                className="bg-transparent border-none text-base font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer p-0 w-full hover:text-green-600 dark:hover:text-green-300 transition-colors truncate pr-4 [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-slate-100"
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                                <option value="German">German</option>
                                <option value="Mandarin">Mandarin</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Russian">Russian</option>
                            </select>
                        </div>
                    </div>
                 </div>

                 {/* Row 2: Secondary Controls */}
                 <div className="flex flex-col md:flex-row gap-2 p-2 mt-0">
                    
                    {/* Art Form Selector */}
                    <div className="flex-[2] bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-white/5 px-4 py-3 flex items-center gap-3 hover:border-pink-500/30 transition-colors relative overflow-hidden group/item">
                         <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-pink-600 dark:text-pink-400 shrink-0 shadow-sm">
                            <PaletteIcon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col z-10 w-full overflow-hidden">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Art Form / Artist Style</label>
                            <select 
                                value={artForm} 
                                onChange={(e) => setArtForm(e.target.value as ArtForm)}
                                className="bg-transparent border-none text-base font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer p-0 w-full hover:text-pink-600 dark:hover:text-pink-300 transition-colors truncate pr-4 [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-slate-100"
                            >
                                <option value="None">Let AI Decide</option>
                                <option value="Rubber Hose Animation">Rubber Hose Animation (1920s)</option>
                                <option value="Looney Tunes">Looney Tunes</option>
                                <option value="Tom and Jerry">Tom and Jerry</option>
                                <option value="Betty Boop">Betty Boop</option>
                                <option value="Yogi Bear">Yogi Bear</option>
                                <option value="Porky Pig">Porky Pig</option>
                                <option value="Tin Tin">The Adventures of Tintin</option>
                                <option value="Classic Disney">Classic Disney</option>
                                <option value="Salvador Dali">Salvador Dali</option>
                                <option value="Popeye">Popeye</option>
                                <option value="Tim Burton">Tim Burton</option>
                                <option value="Johnny the Homicidal Maniac">Johnny the Homicidal Maniac</option>
                                <option value="Invader Zim">Invader Zim</option>
                                <option value="WWII Pin-up Art">WWII Pin-up Art</option>
                                <option value="Studio Ghibli">Studio Ghibli</option>
                                <option value="Cyberpunk Anime">Cyberpunk Anime</option>
                                <option value="Art Nouveau">Art Nouveau</option>
                                <option value="Pixel Art">Pixel Art</option>
                                <option value="Jean-Michel Basquiat">Jean-Michel Basquiat</option>
                                <option value="Pop Art">Pop Art / Andy Warhol</option>
                                <option value="Steampunk">Steampunk</option>
                                <option value="Ukiyo-e Woodblock">Ukiyo-e Woodblock</option>
                            </select>
                        </div>
                    </div>

                    {/* Aspect Ratio Selector */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-white/5 px-4 py-3 flex items-center gap-3 hover:border-amber-500/30 transition-colors relative overflow-hidden group/item">
                         <div className="p-2 bg-white dark:bg-slate-800 rounded-lg text-amber-600 dark:text-amber-400 shrink-0 shadow-sm">
                            {aspectRatio === '16:9' ? <Maximize className="w-4 h-4" /> : aspectRatio === '1:1' ? <Square className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                        </div>
                        <div className="flex flex-col z-10 w-full overflow-hidden">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Format</label>
                            <select 
                                value={aspectRatio} 
                                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                                className="bg-transparent border-none text-base font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer p-0 w-full hover:text-amber-600 dark:hover:text-amber-300 transition-colors truncate pr-4 [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-slate-100"
                            >
                                <option value="16:9">Landscape (16:9)</option>
                                <option value="1:1">Square (1:1)</option>
                                <option value="9:16">Portrait (9:16)</option>
                            </select>
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="flex flex-col gap-1 w-full md:w-auto">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full md:w-auto h-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold font-display tracking-wide hover:brightness-110 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            <Microscope className="w-5 h-5" />
                            <span>CREATE</span>
                        </button>
                    </div>

                    </div>
                </div>
            </div>
          </form>
        </div>

        {isLoading && <Loading status={loadingMessage} step={loadingStep} facts={loadingFacts} />}

        {error && (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-2xl flex items-center gap-4 text-red-800 dark:text-red-200 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 shadow-sm">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-500 dark:text-red-400" />
            <div className="flex-1">
                <p className="font-medium">{error}</p>
                {(error.includes("Access denied") || error.includes("billing")) && (
                    <button 
                        onClick={handleSelectKey}
                        className="mt-2 text-xs font-bold text-red-700 dark:text-red-300 underline hover:text-red-900 dark:hover:text-red-100"
                    >
                        Select a different API key
                    </button>
                )}
            </div>
          </div>
        )}

        {imageHistory.length > 0 && !isLoading && (
            <>
                <Infographic 
                    image={imageHistory[0]} 
                    onEdit={handleEdit} 
                    onUpdateImage={handleUpdateImage}
                    onRegenerate={handleRegenerate}
                    isEditing={isLoading}
                />
                <SearchResults results={currentSearchResults} />
            </>
        )}

        {imageHistory.length > 1 && (
            <div className="max-w-7xl mx-auto mt-16 md:mt-24 border-t border-slate-200 dark:border-white/10 pt-12 transition-colors">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <History className="w-4 h-4" />
                    Session Archives
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                    {imageHistory.slice(1).map((img) => (
                        <div 
                            key={img.id} 
                            onClick={() => handleRestoreImage(img)}
                            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 transition-all shadow-lg bg-white dark:bg-slate-900/50 backdrop-blur-sm"
                        >
                            <img src={img.data} alt={img.prompt} className="w-full aspect-video object-cover opacity-90 dark:opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-xs text-white font-bold truncate mb-1 font-display">{img.prompt}</p>
                                <div className="flex gap-2">
                                    {img.level && <span className="text-[9px] text-cyan-100 uppercase font-bold tracking-wide px-1.5 py-0.5 rounded-full bg-cyan-900/60 border border-cyan-500/20">{img.level}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </main>
    </div>
    )}
    </>
  );
};

export default App;