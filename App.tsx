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
import Dashboard from './components/Dashboard';
import AestheticsCatalog from './components/AestheticsCatalog';
import ArtistsCatalog from './components/ArtistsCatalog';
import RandomCombosShowcase from './components/RandomCombosShowcase';
import { motion, AnimatePresence } from 'motion/react';
import { Search, AlertCircle, History, GraduationCap, Palette, Microscope, Atom, Compass, Globe, Sun, Moon, Key, CreditCard, ExternalLink, DollarSign, Palette as PaletteIcon, X, Maximize, Square, Smartphone, Trash2, LogIn, LogOut, LayoutDashboard, ShieldCheck, Share2, Sparkles, Dices, Lightbulb, SlidersHorizontal, Wand2, RefreshCw, Mic, MicOff, BookOpen, Brush, Eye } from 'lucide-react';
import { auth, db, loginWithGoogle, logout, saveInfographic, getUserInfographics, getAllInfographics } from './services/firebase';
import { getRandomInspiration, getRandomQuickIdeas, InspirationPrompt } from './data/inspirationPrompts';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const ALL_VISUAL_STYLES: VisualStyle[] = [
  'Cyberpunk Neon HUD', 'Solarpunk Utopia', 'Synthwave Retrowave', 'Glassmorphism Aero',
  'Dark Academia', 'Bioluminescent Deep Sea', 'Stained Glass Gothic', 'Papercut Shadowbox',
  'Isometric Voxel', 'Swiss Typographic Grid', 'Claymation Stop-Motion', 'Cosmic Nebula',
  'Blueprint Cyanotype', 'Risograph Grain', 'Ghibli Anime Serenity', 'Liminal Dreamscape',
  'Steampunk Brass Workshop', 'Neon Noir Detective', 'Holographic Iridescent', 'Fantasy Cartography',
  'Realistic', '3D Render', 'Minimalist', 'Sketch', 'Cartoon', 'Vintage', 'Futuristic'
];

const POPULAR_ART_FORMS: ArtForm[] = [
  'None', 'Studio Ghibli', 'Vincent van Gogh', 'Claude Monet', 'Salvador Dali',
  'Pablo Picasso', 'Jean-Michel Basquiat', 'Keith Haring', 'Bauhaus', 'Pop Art',
  'Classic Disney', 'Looney Tunes', 'Rubber Hose Animation', 'Charley Harper',
  'Jack Kirby', 'Moebius', 'Tin Tin', 'Tim Burton', 'Invader Zim', 'Adventure Time',
  'Cyberpunk Anime', 'Retro 90s Anime', 'Claymation', 'Origami Papercraft',
  'Pixel Art', 'Art Deco', 'Ukiyo-e Woodblock', 'Steampunk'
];

const ALL_LEVELS: ComplexityLevel[] = ['Elementary', 'High School', 'College', 'Expert'];
const ALL_RATIOS: AspectRatio[] = ['16:9', '1:1', '9:16'];

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [logoVariant, setLogoVariant] = useState<LogoVariant>('synapse');
  const [showBrandPlayground, setShowBrandPlayground] = useState(false);
  const [topic, setTopic] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [complexityLevel, setComplexityLevel] = useState<ComplexityLevel>('High School');
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('Let AI Decide');
  const [artForm, setArtForm] = useState<ArtForm>('None');
  const [language, setLanguage] = useState<Language>('English');
  const [isSurprising, setIsSurprising] = useState(false);
  const [isStyleSurprising, setIsStyleSurprising] = useState(false);
  const [inspirationCategory, setInspirationCategory] = useState<string | null>(null);
  const [quickIdeas, setQuickIdeas] = useState<InspirationPrompt[]>(() => getRandomQuickIdeas(8));
  const [styleShuffledToast, setStyleShuffledToast] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechToast, setSpeechToast] = useState<string | null>(null);
  const recognitionRef = React.useRef<any>(null);

  const SPEECH_LANG_MAP: Record<string, string> = {
    English: 'en-US',
    Spanish: 'es-ES',
    French: 'fr-FR',
    German: 'de-DE',
    Mandarin: 'zh-CN',
    Japanese: 'ja-JP',
    Hindi: 'hi-IN',
    Arabic: 'ar-SA',
    Portuguese: 'pt-BR',
    Russian: 'ru-RU',
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSpeechToast("Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.");
      setTimeout(() => setSpeechToast(null), 4000);
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = SPEECH_LANG_MAP[language] || 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechToast("🎙️ Listening... Speak your research topic clearly");
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((r: any) => r[0].transcript)
          .join('');
        if (transcript) {
          setTopic(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechToast("⚠️ Microphone access denied. Please grant microphone permissions in your browser.");
        } else if (event.error === 'no-speech') {
          setSpeechToast("⚠️ No speech detected. Please try again.");
        } else {
          setSpeechToast(`⚠️ Voice error: ${event.error}`);
        }
        setTimeout(() => setSpeechToast(null), 4000);
      };

      recognition.onend = () => {
        setIsListening(false);
        setTimeout(() => setSpeechToast(null), 2500);
      };

      recognition.start();
    } catch (e: any) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
      setSpeechToast("Could not start speech recognition.");
      setTimeout(() => setSpeechToast(null), 3000);
    }
  };
  
  const handleSurpriseTopic = () => {
    setIsSurprising(true);
    const prompt = getRandomInspiration(topic);
    setTopic(prompt.topic);
    setInspirationCategory(prompt.category);
    if (prompt.suggestedStyle) setVisualStyle(prompt.suggestedStyle);
    if (prompt.suggestedLevel) setComplexityLevel(prompt.suggestedLevel);
    if (prompt.suggestedArtForm) setArtForm(prompt.suggestedArtForm);
    
    // Also roll fresh quick ideas
    setQuickIdeas(getRandomQuickIdeas(8));
    
    setTimeout(() => setIsSurprising(false), 500);
  };

  const handleRandomizeStyle = () => {
    setIsStyleSurprising(true);
    const randomStyle = ALL_VISUAL_STYLES[Math.floor(Math.random() * ALL_VISUAL_STYLES.length)];
    const randomArt = POPULAR_ART_FORMS[Math.floor(Math.random() * POPULAR_ART_FORMS.length)];
    const randomLevel = ALL_LEVELS[Math.floor(Math.random() * ALL_LEVELS.length)];
    const randomRatio = ALL_RATIOS[Math.floor(Math.random() * ALL_RATIOS.length)];
    
    setVisualStyle(randomStyle);
    setArtForm(randomArt);
    setComplexityLevel(randomLevel);
    setAspectRatio(randomRatio);
    
    setStyleShuffledToast(`✨ Shuffled: ${randomStyle} (${randomLevel})`);
    setTimeout(() => {
      setIsStyleSurprising(false);
      setTimeout(() => setStyleShuffledToast(null), 3000);
    }, 400);
  };
  
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
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAestheticsCatalog, setShowAestheticsCatalog] = useState(false);
  const [showArtistsCatalog, setShowArtistsCatalog] = useState(false);
  const [showRandomCombos, setShowRandomCombos] = useState(false);
  const [dbHistory, setDbHistory] = useState<any[]>([]);
  const [adminHistory, setAdminHistory] = useState<any[]>([]);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Fetch user data to check for admin status
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setIsAdmin(userDoc.data().isAdmin === true);
          }
        } catch (e) {
          console.error("Failed to fetch user data", e);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch DB History
  useEffect(() => {
    if (!currentUser) return;
    return getUserInfographics(currentUser.uid, (data) => {
      setDbHistory(data);
    });
  }, [currentUser]);

  // Fetch Admin History
  useEffect(() => {
    if (!isAdmin) return;
    return getAllInfographics((data) => {
      setAdminHistory(data);
    });
  }, [isAdmin]);

  // Handle Shared Links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('v') || params.get('share') || params.get('id');
    if (sharedId) {
      const fetchShared = async () => {
        try {
          const docRef = doc(db, 'infographics', sharedId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const normalized: GeneratedImage = {
              id: docSnap.id,
              data: data.imageUrl || data.data,
              prompt: data.prompt || data.title || 'Infographic',
              level: data.level || 'High School',
              style: data.style || 'Default',
              language: data.language || 'English',
              artForm: data.artForm || 'None',
              hotspots: data.hotspots || [],
              annotations: data.annotations || [],
              annotationHistoryStates: data.annotationHistoryStates || [data.annotations || []],
              historyIndex: data.historyIndex || 0
            };
            setImageHistory([normalized]);
            if (data.prompt) setPrompt(data.prompt);
            if (data.level) setLevel(data.level);
            if (data.style) setStyle(data.style);
            if (data.artForm) setArtForm(data.artForm);
            setShowIntro(false);
          }
        } catch (e) {
          console.error("Failed to fetch shared infographic", e);
        }
      };
      fetchShared();
    }
  }, []);

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
    const saved = localStorage.getItem('infovision_session');
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
        localStorage.setItem('infovision_session', JSON.stringify(sessionData));
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
      
      if (auth.currentUser) {
        saveInfographic(newImage).catch(err => console.error("Auto-save failed", err));
      }
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

      if (auth.currentUser) {
        saveInfographic(newImage).catch(err => console.error("Auto-save failed", err));
      }
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
    {showAestheticsCatalog && (
      <AestheticsCatalog
        currentStyle={visualStyle}
        onSelectStyle={(s) => {
          setVisualStyle(s);
          setShowAestheticsCatalog(false);
          setStyleShuffledToast(`✨ Applied Aesthetic: ${s}`);
          setTimeout(() => setStyleShuffledToast(null), 3000);
        }}
        onClose={() => setShowAestheticsCatalog(false)}
        onOpenRandomCombos={() => {
          setShowAestheticsCatalog(false);
          setShowRandomCombos(true);
        }}
      />
    )}
    {showArtistsCatalog && (
      <ArtistsCatalog
        currentArtForm={artForm}
        onSelectArtForm={(a) => {
          setArtForm(a);
          setShowArtistsCatalog(false);
          setStyleShuffledToast(`🎨 Applied Artist Style: ${a}`);
          setTimeout(() => setStyleShuffledToast(null), 3000);
        }}
        onClose={() => setShowArtistsCatalog(false)}
        onOpenRandomCombos={() => {
          setShowArtistsCatalog(false);
          setShowRandomCombos(true);
        }}
      />
    )}
    {showRandomCombos && (
      <RandomCombosShowcase
        onSelectCombo={(config) => {
          if (config.visualStyle) {
            setVisualStyle(config.visualStyle);
          }
          if (config.artForm) {
            setArtForm(config.artForm);
          }
          if (config.topic) {
            setTopic(config.topic);
          }
          setShowRandomCombos(false);
          const chosen = config.visualStyle || config.artForm || 'Selected Style';
          setStyleShuffledToast(`✨ Applied: ${chosen}${config.topic ? ` with topic "${config.topic}"` : ''}`);
          setTimeout(() => setStyleShuffledToast(null), 3500);
        }}
        onClose={() => setShowRandomCombos(false)}
      />
    )}
    {showDashboard && (
      <Dashboard 
        items={isAdmin ? adminHistory : dbHistory} 
        isAdmin={isAdmin}
        onRestore={(img) => {
          // Normalize data from DB vs Session
          const normalized = {
            ...img,
            id: img.id,
            data: img.imageUrl || img.data, // Map from DB 'imageUrl' or local 'data'
          };
          handleRestoreImage(normalized);
          setShowDashboard(false);
        }}
        onClose={() => setShowDashboard(false)}
      />
    )}

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
                <p className="text-slate-500 text-sm">Select a brand personality for infoVISION</p>
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
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white dark:from-indigo-900 dark:via-slate-950 dark:to-black z-0 pointer-events-none transition-colors"></div>
      <div className="fixed inset-0 opacity-5 dark:opacity-20 z-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
      }}></div>

      {/* Navbar */}
      <header className="border-b border-slate-200 dark:border-white/10 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-950/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          <Logo variant={logoVariant} className="cursor-pointer" />

          <div className="flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                  >
                    {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <LayoutDashboard className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{isAdmin ? 'Admin' : 'Dashboard'}</span>
                  </button>

                  <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-1"></div>

                  <button 
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-600 dark:text-slate-400 text-xs font-medium transition-colors border border-slate-200 dark:border-white/10"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </button>

                  {currentUser.photoURL && (
                    <img src={currentUser.photoURL} alt="" className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 shadow-sm" />
                  )}
                </div>
              ) : (
                <button 
                  onClick={loginWithGoogle}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              <div className="h-8 w-px bg-slate-200 dark:bg-white/10 mx-2 hidden md:block"></div>

              <button 
                onClick={() => setShowAestheticsCatalog(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-bold transition-colors border border-purple-200 dark:border-purple-800/50 shadow-sm"
                title="Browse all visual aesthetics with previews"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Aesthetics Guide</span>
              </button>

              <button 
                onClick={() => setShowArtistsCatalog(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold transition-colors border border-cyan-200 dark:border-cyan-800/50 shadow-sm"
                title="Browse all art forms & masters directory"
              >
                <Brush className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Art Styles</span>
              </button>

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
                  onClick={() => { if(confirm("Clear history?")) { setImageHistory([]); localStorage.removeItem('infovision_session'); setShowHistory(false); } }}
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
              <h1 className="text-2xl sm:text-4xl md:text-7xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-[0.95] md:leading-[0.9]">
                Visualize <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-400 drop-shadow-[0_0_2px_#ec4899] md:drop-shadow-[0_0_5px_rgba(236,72,153,0.4)]">The Unknown.</span>
              </h1>
              <p className="text-sm md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed px-4">
                Generate diagrams and infographics powered by A.I. & WWW
              </p>
            </div>
          )}

          {/* Search Form */}
          <form onSubmit={handleGenerate} className={`relative z-20 transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none scale-95 blur-sm' : 'scale-100'}`}>
            
            {/* SECTION 1: Noticeable Prominent Question / Topic Bar (Lighter Color & Auto-Expanding) */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-3xl opacity-25 dark:opacity-35 group-hover:opacity-50 transition duration-500 blur-xl"></div>
                
                {/* Lighter, high-visibility container for the typing area */}
                <div className="relative bg-slate-50 dark:bg-slate-800/95 backdrop-blur-2xl border-2 border-cyan-500/40 dark:border-cyan-400/40 focus-within:border-cyan-500 dark:focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/20 p-3.5 md:p-4 rounded-3xl shadow-2xl transition-all">
                    
                    {/* Main Input Row */}
                    <div className="flex items-start gap-2.5 md:gap-3.5">
                        <div className="p-2 md:p-2.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 bg-cyan-500/10 rounded-2xl">
                            <Search className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                        
                        {/* Auto-expanding Textarea for questions of any length */}
                        <div className="flex-1 min-w-0 pt-0.5">
                          <textarea
                              value={topic}
                              onChange={(e) => {
                                setTopic(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                              }}
                              onFocus={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                              }}
                              placeholder="What do you want to learn & visualize? Ask any question..."
                              rows={1}
                              className="w-full py-1.5 md:py-2 bg-transparent border-none outline-none resize-none text-base md:text-2xl placeholder:text-slate-400 dark:placeholder:text-slate-400 font-semibold text-slate-900 dark:text-white min-h-[44px] max-h-[220px] overflow-y-auto leading-relaxed"
                          />
                        </div>

                        {topic.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setTopic('')}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0 mt-1 cursor-pointer"
                            title="Clear input"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}

                        {/* Web Speech API Microphone Button */}
                        <button
                          type="button"
                          onClick={toggleVoiceInput}
                          className={`p-2.5 md:p-3 rounded-2xl transition-all shrink-0 mt-0.5 cursor-pointer flex items-center justify-center relative ${
                            isListening
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse ring-4 ring-red-400/40 scale-105'
                              : 'bg-white hover:bg-slate-100 dark:bg-slate-700/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm'
                          }`}
                          title={isListening ? "Stop voice listening" : "Speak research topic (Web Speech API)"}
                          aria-label="Voice input"
                        >
                          {isListening ? (
                            <>
                              <Mic className="w-5 h-5 animate-bounce" />
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                            </>
                          ) : (
                            <Mic className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          )}
                        </button>

                        {/* Random / Creative Question Generator Button */}
                        <button
                          type="button"
                          onClick={handleSurpriseTopic}
                          className="flex items-center gap-2 px-3.5 md:px-5 py-2.5 md:py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-2xl font-bold text-xs md:text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all shrink-0 cursor-pointer mt-0.5"
                          title="Generate a fun, random curiosity question and fresh ideas"
                        >
                          <Dices className={`w-4 h-4 md:w-5 md:h-5 ${isSurprising ? 'animate-spin' : ''}`} />
                          <span className="hidden sm:inline">Inspire Me</span>
                          <span className="sm:hidden">Inspire</span>
                        </button>
                    </div>

                    {/* Speech Recognition Live Status Banner */}
                    {speechToast && (
                      <div className="mt-2.5 px-3.5 py-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-700 text-xs md:text-sm font-semibold text-cyan-900 dark:text-cyan-200 flex items-center gap-2 animate-in fade-in duration-200 shadow-sm">
                        <Mic className={`w-4 h-4 ${isListening ? 'text-red-500 animate-pulse' : 'text-cyan-600 dark:text-cyan-400'} shrink-0`} />
                        <span>{speechToast}</span>
                      </div>
                    )}

                    {/* Quick Curiosity Suggestions Chips (3x Tall Multi-Row Layout - No Horizontal Scroll) */}
                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/60 mt-2">
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Fun Curiosity Ideas (Click any to explore):
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuickIdeas(getRandomQuickIdeas(8))}
                          className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                          title="Roll new idea suggestions"
                        >
                          <RefreshCw className="w-3 h-3" /> Shuffle Ideas
                        </button>
                      </div>

                      {/* Multi-Row Wrapping Pills (No Horizontal Scroll) */}
                      <div className="flex flex-wrap gap-2">
                        {quickIdeas.map((item) => (
                          <button
                            key={item.topic}
                            type="button"
                            onClick={() => {
                              setTopic(item.topic);
                              setInspirationCategory(item.category);
                              if (item.suggestedStyle) setVisualStyle(item.suggestedStyle);
                              if (item.suggestedLevel) setComplexityLevel(item.suggestedLevel);
                            }}
                            className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/60 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 text-xs font-medium transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer text-left"
                          >
                            <span>{item.shortLabel || item.topic}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: Creative Visualization Style & Configuration Studio */}
            <div className="mt-5 md:mt-6 relative group">
                <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-4 md:p-6 rounded-3xl shadow-xl">
                    
                    {/* Section Header with Dedicated Style Randomizer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3.5 border-b border-slate-100 dark:border-white/10">
                      <div className="flex items-center gap-3.5">
                        <div className="p-3 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 shadow-sm">
                          <SlidersHorizontal className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                            Visualization Studio
                          </h3>
                          <p className="text-base md:text-[17px] text-slate-600 dark:text-slate-300 font-medium">
                            Configure learning audience, aesthetics, and artistic rendition
                          </p>
                        </div>
                      </div>

                      {/* Right Header Actions */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {styleShuffledToast && (
                          <span className="text-sm px-3 py-1 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 font-semibold border border-purple-500/30 animate-pulse">
                            {styleShuffledToast}
                          </span>
                        )}

                        {/* Dedicated Randomizer Button for Visualization Section Only */}
                        <button
                          type="button"
                          onClick={handleRandomizeStyle}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/70 hover:bg-purple-200 dark:hover:bg-purple-900/90 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
                          title="Randomize aesthetic, level, art form, and format"
                        >
                          <Wand2 className={`w-4 h-4 ${isStyleSurprising ? 'animate-spin' : ''}`} />
                          <span>🎲 Randomize Style</span>
                        </button>
                      </div>
                    </div>

                    {/* Creative Parameter Controls Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      
                      {/* 1. Audience / Complexity Segmented Control */}
                      <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-white/5 p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2.5">
                          <label className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-cyan-500" /> Learning Depth
                          </label>
                          <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{complexityLevel}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: 'Elementary', emoji: '🎒', val: 'Elementary' },
                            { label: 'High School', emoji: '🎓', val: 'High School' },
                            { label: 'College', emoji: '🏛️', val: 'College' },
                            { label: 'Expert', emoji: '🔬', val: 'Expert' }
                          ].map(lvl => (
                            <button
                              key={lvl.val}
                              type="button"
                              onClick={() => setComplexityLevel(lvl.val as ComplexityLevel)}
                              className={`px-2.5 py-2 rounded-xl text-sm md:text-base font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                                complexityLevel === lvl.val
                                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                                  : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-white/5'
                              }`}
                            >
                              <span>{lvl.emoji}</span>
                              <span className="truncate">{lvl.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 2. Format / Canvas Ratio Segmented Control with Horizontal, Square, Vertical */}
                      <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-white/5 p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-2.5">
                          <label className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Maximize className="w-4 h-4 text-amber-500" /> Aspect Ratio
                          </label>
                          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{aspectRatio}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { ratioLabel: '16:9', orientation: 'Horizontal', icon: Maximize, val: '16:9' },
                            { ratioLabel: '1:1', orientation: 'Square', icon: Square, val: '1:1' },
                            { ratioLabel: '9:16', orientation: 'Vertical', icon: Smartphone, val: '9:16' }
                          ].map(ratio => {
                            const IconComponent = ratio.icon;
                            return (
                              <button
                                key={ratio.val}
                                type="button"
                                onClick={() => setAspectRatio(ratio.val as AspectRatio)}
                                className={`px-2 py-2 rounded-xl transition-all text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                                  aspectRatio === ratio.val
                                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                                    : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-white/5'
                                }`}
                              >
                                <div className="flex items-center gap-1">
                                  <IconComponent className="w-3.5 h-3.5" />
                                  <span className="text-sm md:text-base font-bold">{ratio.ratioLabel}</span>
                                </div>
                                <span className="text-xs font-medium opacity-90 truncate">{ratio.orientation}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3. Art Form & Artist Master Style */}
                      <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-white/5 p-3.5 flex flex-col justify-between">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between mb-2">
                          <span className="flex items-center gap-1.5"><PaletteIcon className="w-4 h-4 text-pink-500" /> Art Form / Artist</span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setShowRandomCombos(true)}
                              className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                              title="Random Aesthetics & Artists with Animals"
                            >
                              <Dices className="w-3 h-3 text-pink-500" />
                              <span>Random Mixer</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowArtistsCatalog(true)}
                              className="text-xs text-pink-600 dark:text-pink-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Brush className="w-3 h-3" />
                              <span>Samples</span>
                            </button>
                          </div>
                        </label>
                        <div className="relative bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-white/10 p-2.5">
                          <select
                            value={artForm}
                            onChange={(e) => setArtForm(e.target.value as ArtForm)}
                            className="bg-transparent border-none text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer p-0 w-full hover:text-pink-600 dark:hover:text-pink-300 transition-colors truncate [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-slate-100"
                          >
                            <option value="None">✨ Standard (None)</option>
                            <option value="Studio Ghibli">Studio Ghibli (Hayao Miyazaki)</option>
                            <option value="Vincent van Gogh">Vincent van Gogh (Post-Impressionism)</option>
                            <option value="Claude Monet">Claude Monet (Impressionism)</option>
                            <option value="Salvador Dali">Salvador Dalí (Surrealism)</option>
                            <option value="Pablo Picasso">Pablo Picasso (Cubism)</option>
                            <option value="Jean-Michel Basquiat">Jean-Michel Basquiat</option>
                            <option value="Keith Haring">Keith Haring (Pop Art)</option>
                            <option value="Bauhaus">Bauhaus Modernism</option>
                            <option value="Pop Art">Pop Art (Andy Warhol)</option>
                            <option value="Watercolor Botanical">Watercolor Botanical (Redouté)</option>
                            <option value="Classic Disney">Classic Disney (Golden Age)</option>
                            <option value="Rubber Hose Animation">Rubber Hose (1920s Fleischer)</option>
                            <option value="Looney Tunes">Looney Tunes (Chuck Jones)</option>
                            <option value="Tom and Jerry">Tom and Jerry (Hanna-Barbera)</option>
                            <option value="Betty Boop">Betty Boop (Fleischer)</option>
                            <option value="Popeye">Popeye (E.C. Segar)</option>
                            <option value="Porky Pig">Porky Pig (Warner Bros)</option>
                            <option value="Yogi Bear">Yogi Bear (Hanna-Barbera)</option>
                            <option value="Charley Harper">Charley Harper (Minimal Realism)</option>
                            <option value="Jack Kirby">Jack Kirby (Cosmic Comics)</option>
                            <option value="Moebius">Moebius (Ligne Claire)</option>
                            <option value="Tin Tin">Hergé / Tintin</option>
                            <option value="Tim Burton">Tim Burton (Gothic Whimsical)</option>
                            <option value="Invader Zim">Invader Zim (Jhonen Vasquez)</option>
                            <option value="Johnny the Homicidal Maniac">Johnny the Homicidal Maniac</option>
                            <option value="Adventure Time">Adventure Time (Pendleton Ward)</option>
                            <option value="Cyberpunk Anime">Cyberpunk Anime (Neo-Tokyo)</option>
                            <option value="Retro 90s Anime">Retro 90s Anime</option>
                            <option value="Claymation">Claymation (Aardman)</option>
                            <option value="Origami Papercraft">Japanese Origami Papercraft</option>
                            <option value="Pixel Art">16-Bit Pixel Art</option>
                            <option value="Vaporwave">Vaporwave 90s</option>
                            <option value="Psychedelic 60s">Psychedelic 60s (Fillmore)</option>
                            <option value="Risograph Print">Risograph Print</option>
                            <option value="Art Deco">Art Deco (1920s)</option>
                            <option value="Art Nouveau">Art Nouveau (Alphonse Mucha)</option>
                            <option value="Ukiyo-e Woodblock">Ukiyo-e Woodblock (Hokusai)</option>
                            <option value="Steampunk">Steampunk (Victorian Brass)</option>
                            <option value="Afrofuturism">Afrofuturism</option>
                            <option value="Dark Fantasy">Dark Fantasy (Frank Frazetta)</option>
                            <option value="WWII Pin-up Art">WWII Pin-up Nose Art</option>
                            <option value="Banksy">Banksy (Street Art)</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 mt-2">
                          <button
                            type="button"
                            onClick={() => setShowArtistsCatalog(true)}
                            className="py-1.5 px-2 rounded-lg bg-pink-50 hover:bg-pink-100 dark:bg-pink-950/60 dark:hover:bg-pink-900/70 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-95 truncate"
                            title="Browse Artist Visual Directory"
                          >
                            <Brush className="w-3 h-3 shrink-0" />
                            <span className="truncate">Artists Directory</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowRandomCombos(true)}
                            className="py-1.5 px-2 rounded-lg bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-cyan-500/15 hover:from-purple-500/25 hover:to-cyan-500/25 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm active:scale-95 truncate"
                            title="Explore Random Aesthetics & Artists with Wildlife"
                          >
                            <Dices className="w-3 h-3 text-pink-500 shrink-0" />
                            <span className="truncate">🎲 Random Mixer</span>
                          </button>
                        </div>
                      </div>

                      {/* 4. Language Selector */}
                      <div className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-white/5 p-3.5 flex flex-col justify-between">
                        <label className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <Globe className="w-4 h-4 text-emerald-500" /> Infographic Language
                        </label>
                        <div className="relative bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-white/10 p-2.5">
                          <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            className="bg-transparent border-none text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 focus:ring-0 cursor-pointer p-0 w-full hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors truncate [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-slate-100"
                          >
                            <option value="English">🇺🇸 English</option>
                            <option value="Spanish">🇪🇸 Spanish</option>
                            <option value="French">🇫🇷 French</option>
                            <option value="German">🇩🇪 German</option>
                            <option value="Mandarin">🇨🇳 Mandarin</option>
                            <option value="Japanese">🇯🇵 Japanese</option>
                            <option value="Hindi">🇮🇳 Hindi</option>
                            <option value="Arabic">🇦🇪 Arabic</option>
                            <option value="Portuguese">🇧🇷 Portuguese</option>
                            <option value="Russian">🇷🇺 Russian</option>
                          </select>
                        </div>
                      </div>

                    </div>

                    {/* Aesthetic Gallery Chips (Alphabetical Order - Multi-Row Wrapped) */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-0.5">
                        <span className="text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <Palette className="w-4 h-4 text-purple-500" /> Featured Aesthetics Gallery ({visualStyle}):
                        </span>
                        
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setShowAestheticsCatalog(true)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950/70 dark:hover:bg-purple-900/90 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 text-xs md:text-sm font-bold transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Browse Catalog with Samples</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setVisualStyle('Let AI Decide')}
                            className="text-xs md:text-sm text-purple-600 dark:text-purple-400 hover:underline font-bold cursor-pointer"
                          >
                            Auto / AI Decide
                          </button>
                        </div>
                      </div>

                      {/* Wrapped aesthetic badges sorted in strict alphabetical order */}
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: '3D Voxel Diorama', value: 'Isometric Voxel', color: 'hover:border-indigo-500' },
                          { name: '80s Synthwave', value: 'Synthwave Retrowave', color: 'hover:border-pink-500' },
                          { name: 'AI Decides (Auto)', value: 'Let AI Decide', color: 'hover:border-purple-400' },
                          { name: 'Bioluminescent Deep Sea', value: 'Bioluminescent Deep Sea', color: 'hover:border-teal-400' },
                          { name: 'Blueprint Cyanotype', value: 'Blueprint Cyanotype', color: 'hover:border-blue-600' },
                          { name: 'Claymation Stop-Motion', value: 'Claymation Stop-Motion', color: 'hover:border-yellow-600' },
                          { name: 'Cosmic Nebula', value: 'Cosmic Nebula', color: 'hover:border-violet-500' },
                          { name: 'Cyberpunk Neon', value: 'Cyberpunk Neon HUD', color: 'hover:border-cyan-500' },
                          { name: 'Dark Academia', value: 'Dark Academia', color: 'hover:border-amber-600' },
                          { name: 'Fantasy Cartography', value: 'Fantasy Cartography', color: 'hover:border-stone-500' },
                          { name: 'Glassmorphism Aero', value: 'Glassmorphism Aero', color: 'hover:border-sky-500' },
                          { name: 'Gothic Stained Glass', value: 'Stained Glass Gothic', color: 'hover:border-purple-500' },
                          { name: 'Holographic Iridescent', value: 'Holographic Iridescent', color: 'hover:border-cyan-400' },
                          { name: 'Liminal Dreamscape', value: 'Liminal Dreamscape', color: 'hover:border-fuchsia-400' },
                          { name: 'Neon Noir Detective', value: 'Neon Noir Detective', color: 'hover:border-yellow-400' },
                          { name: 'Papercut 3D Shadowbox', value: 'Papercut Shadowbox', color: 'hover:border-orange-500' },
                          { name: 'Risograph Grain', value: 'Risograph Grain', color: 'hover:border-rose-500' },
                          { name: 'Solarpunk Utopia', value: 'Solarpunk Utopia', color: 'hover:border-emerald-500' },
                          { name: 'Steampunk Brass', value: 'Steampunk Brass Workshop', color: 'hover:border-amber-700' },
                          { name: 'Studio Ghibli Serenity', value: 'Ghibli Anime Serenity', color: 'hover:border-green-500' },
                          { name: 'Swiss Typographic Grid', value: 'Swiss Typographic Grid', color: 'hover:border-red-500' },
                        ].map((item) => (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => setVisualStyle(item.value as VisualStyle)}
                            className={`px-3.5 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                              visualStyle === item.value
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-md shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/5 ' + item.color
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Bar: CREATE INFOGRAPHIC Button */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-end">
                      <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full md:w-auto bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white px-9 py-4 rounded-2xl font-bold font-display tracking-wide transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_32px_rgba(6,182,212,0.55)] whitespace-nowrap flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer active:scale-95 text-base"
                      >
                          <Microscope className="w-5 h-5" />
                          <span>CREATE INFOGRAPHIC</span>
                      </button>
                    </div>

                </div>
            </div>
          </form>
        </div>

        {isLoading && (
          <Loading 
            status={loadingMessage} 
            step={loadingStep} 
            facts={loadingFacts} 
            topic={topic}
            level={complexityLevel}
            style={visualStyle}
          />
        )}

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
                    onSaveToCloud={async () => {
                      return await saveInfographic(imageHistory[0]);
                    }}
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