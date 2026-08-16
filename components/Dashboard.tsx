import React from 'react';
import { GeneratedImage } from '../types';
import { motion } from 'motion/react';
import { Trash2, Share2, Calendar, LayoutDashboard, LayoutGrid, List, ShieldCheck, User } from 'lucide-react';

interface DashboardProps {
  items: any[];
  isAdmin?: boolean;
  onRestore: (img: any) => void;
  onClose: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ items, isAdmin, onRestore, onClose }) => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
      <div className="w-full max-w-7xl h-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${isAdmin ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400'} shadow-lg`}>
              {isAdmin ? <ShieldCheck className="w-8 h-8" /> : <LayoutDashboard className="w-8 h-8" />}
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white leading-none">
                {isAdmin ? 'Master Archive' : 'Personal Vision Board'}
              </h2>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                {isAdmin ? 'Admin Dashboard' : 'User History'} • {items.length} Explorations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex gap-1 border border-slate-200 dark:border-white/5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-cyan-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-cyan-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={onClose}
              className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-slate-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">The archive is empty</h3>
                <p className="text-slate-500">Generate your first infographic to start building your library.</p>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {items.map((img, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={img.id}
                  className="group relative bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-cyan-500/50 transition-all flex flex-col"
                >
                  <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img src={img.data || img.imageUrl} alt={img.prompt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => onRestore(img)}
                        className="p-3 bg-white text-slate-900 rounded-full shadow-xl hover:scale-110 transition-transform"
                        title="View Details"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1 flex-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {img.prompt}
                      </h4>
                      {isAdmin && img.userId && (
                         <div className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[8px] font-bold rounded uppercase tracking-tighter" title={`User: ${img.userId}`}>
                            Creator Key
                         </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-medium">
                        {img.level}
                      </span>
                      <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">
                        {img.style}
                      </span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[10px] font-medium">
                          {img.createdAt?.toDate ? img.createdAt.toDate().toLocaleDateString() : new Date(img.timestamp || img.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                         <button 
                            onClick={async () => {
                                const url = `${window.location.origin}${window.location.pathname}?v=${img.id}`;
                                try {
                                    await navigator.clipboard.writeText(url);
                                    alert('Link copied to clipboard!');
                                } catch (e) {
                                    prompt('Copy this link to share:', url);
                                }
                            }}
                            className="p-2 text-slate-400 hover:text-cyan-500 transition-colors"
                            title="Share Link"
                        >
                            <Share2 className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
               {items.map((img) => (
                 <div 
                  key={img.id}
                  className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 rounded-2xl hover:shadow-lg transition-all group"
                 >
                   <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
                      <img src={img.data || img.imageUrl} alt="" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">
                        {img.prompt}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {img.level} • {img.style} • {img.createdAt?.toDate ? img.createdAt.toDate().toLocaleString() : new Date(img.timestamp || img.createdAt).toLocaleString()}
                      </p>
                   </div>
                   <div className="flex items-center gap-2 px-4 shadow-sm">
                      <button 
                        onClick={() => onRestore(img)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold hover:bg-cyan-500 hover:text-white transition-all"
                      >
                        Open
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default Dashboard;
