import { useState, MouseEvent, TouchEvent, useEffect } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trash2, Layers, Sparkles, Flower2, Pause, Play } from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<1 | 2>(1);
  const [isRendering, setIsRendering] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClean = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new Event('clean-screen'));
  };

  const toggleMode = (newMode: 1 | 2) => {
    setMode(newMode);
    if (window.innerWidth < 768) setIsMenuOpen(false);
  };

  const toggleFreeze = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    setIsRendering(!isRendering);
  };

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen bg-neutral-50 overflow-hidden font-sans">
      <CanvasContainer mode={mode} isRendering={isRendering} />

      {/* Drawer Trigger - Top Left (Always present) */}
      <div className="absolute top-6 left-6 z-[60]">
        <button
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
          className="lg:hidden p-4 bg-white/40 hover:bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl transition-all active:scale-95 group pointer-events-auto"
          aria-label="Open menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-black/80 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="w-6 h-6 text-black/80" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm z-[55] lg:hidden pointer-events-auto"
            />
            {/* Menu Content */}
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-white/80 backdrop-blur-3xl z-[58] lg:hidden border-r border-white/40 shadow-2xl flex flex-col p-8 pointer-events-auto"
            >
              <div className="mt-16 space-y-10">
                <section>
                  <h2 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Layers className="w-3 h-3" /> Rendering Engine
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => toggleMode(1)}
                      className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${mode === 1
                          ? 'bg-black text-white border-black shadow-lg'
                          : 'bg-black/5 text-black border-transparent hover:bg-black/10'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Flower2 className={`w-5 h-5 ${mode === 1 ? 'text-white' : 'text-black/60'}`} />
                        <span className="font-bold uppercase tracking-widest">Mod 1</span>
                      </div>
                      {mode === 1 && <motion.div layoutId="active" className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                    <button
                      onClick={() => toggleMode(2)}
                      className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${mode === 2
                          ? 'bg-black text-white border-black shadow-lg'
                          : 'bg-black/5 text-black border-transparent hover:bg-black/10'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className={`w-5 h-5 ${mode === 2 ? 'text-white' : 'text-black/60'}`} />
                        <span className="font-bold uppercase tracking-widest">Mod 2</span>
                      </div>
                      {mode === 2 && <motion.div layoutId="active" className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em] mb-4">Controls</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={toggleFreeze}
                      className={`flex-1 flex items-center justify-center gap-3 p-5 rounded-2xl transition-all border ${!isRendering
                          ? 'bg-amber-500 text-white border-amber-400 shadow-lg'
                          : 'bg-black/5 text-black border-transparent hover:bg-black/10'
                        }`}
                    >
                      {isRendering ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      <span className="font-bold uppercase tracking-widest">{isRendering ? 'FREEZE' : 'RESUME'}</span>
                    </button>
                  </div>
                  <button
                    onClick={(e) => { handleClean(e); setIsMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-3 p-5 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold shadow-xl shadow-red-200 transition-all active:scale-95"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="uppercase tracking-widest font-bold">CLEAN CANVAS</span>
                  </button>
                </section>
              </div>

              <div className="mt-auto pb-6 text-center">
                <p className="text-[10px] font-mono text-black/20 uppercase tracking-[0.3em]">
                  Creative Engine v1.0
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Persistent UI - Top Right */}
      <div className="hidden lg:flex absolute top-8 right-8 z-50 flex-col items-end gap-6 pointer-events-none">
        <div className="flex bg-white/40 backdrop-blur-xl border border-white/40 p-1.5 rounded-3xl shadow-2xl pointer-events-auto">
          <button
            onClick={() => toggleMode(1)}
            className={`px-8 py-3 rounded-2xl transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] ${mode === 1
                ? 'bg-black text-white shadow-lg'
                : 'text-black/60 hover:text-black hover:bg-white/40'
              }`}
          >
            <Flower2 className="w-4 h-4" /> Mod 1
          </button>
          <button
            onClick={() => toggleMode(2)}
            className={`px-8 py-3 rounded-2xl transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-[0.2em] ${mode === 2
                ? 'bg-black text-white shadow-lg'
                : 'text-black/60 hover:text-black hover:bg-white/40'
              }`}
          >
            <Sparkles className="w-4 h-4" /> Mod 2
          </button>
        </div>

        <div className="flex gap-3 pointer-events-auto">
          <button
            onClick={toggleFreeze}
            className={`flex items-center gap-3 px-6 py-4 backdrop-blur-xl border rounded-3xl transition-all font-bold shadow-2xl group active:scale-95 ${!isRendering
                ? 'bg-amber-500 text-white border-amber-400'
                : 'bg-white/40 border-white/40 hover:bg-white/60'
              }`}
          >
            {isRendering ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-xs uppercase tracking-[0.2em]">{isRendering ? 'Freeze' : 'Resume'}</span>
          </button>

          <button
            onClick={handleClean}
            className="flex items-center gap-3 px-8 py-4 bg-white/40 hover:bg-red-500 hover:text-white backdrop-blur-xl border border-white/40 rounded-3xl transition-all duration-300 font-bold shadow-2xl group active:scale-95"
          >
            <Trash2 className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
            <span className="tracking-[0.2em] uppercase text-xs">Clean</span>
          </button>
        </div>
      </div>

      {/* Info Section - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-50 pointer-events-none hidden md:block">
        <div className="text-right space-y-1">
          <h3 className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em]">
            Interactive Experience
          </h3>
          <p className="text-[10px] font-mono text-black/30">
            {mode === 1 ? 'MODE_01_PROCEDURAL_GROWTH' : 'MODE_02_PARTICLE_SIMULATION'}
          </p>
        </div>
      </div>
    </div>
  );
}
