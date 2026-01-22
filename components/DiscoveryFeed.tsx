
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MessageCircle, Info, ChevronRight, RotateCcw } from 'lucide-react';
import { PERFUMES, WHATSAPP_NUMBER } from '../constants';
import { Perfume } from '../types';

export const DiscoveryFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Perfume[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (navigator.vibrate) navigator.vibrate(direction === 'right' ? 80 : 30);
    
    if (direction === 'right') {
      const alreadyInFavs = favorites.find(p => p.id === PERFUMES[currentIndex].id);
      if (!alreadyInFavs) {
        setFavorites(prev => [...prev, PERFUMES[currentIndex]]);
      }
    }
    setShowDetails(false);
    setCurrentIndex(prev => prev + 1);
  };

  const handleConsult = (perfume: Perfume) => {
    const text = `Olá, amei o perfume ${perfume.name} no Discovery. Gostaria de saber mais.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const resetFeed = () => {
    setCurrentIndex(0);
    setFavorites([]);
  };

  if (currentIndex >= PERFUMES.length) {
    return (
      <div className="min-h-screen pt-32 pb-40 px-6 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2.5rem] text-center"
        >
          <h2 className="font-serif text-3xl mb-2 text-zinc-800">Fim da Curadoria</h2>
          <p className="text-zinc-500 mb-6 text-sm leading-relaxed">Você explorou toda a coleção atual da Luminous Edition.</p>
          <button 
            onClick={resetFeed}
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar Jornada
          </button>
        </motion.div>

        {favorites.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-serif text-2xl text-zinc-800 ml-2">Seus Favoritos</h3>
            <div className="flex flex-col gap-3">
              {favorites.map((fav) => (
                <div key={fav.id} className="glass p-4 rounded-3xl flex items-center gap-4">
                  <img src={fav.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt={fav.name} />
                  <div className="flex-1">
                    <h4 className="font-serif text-lg text-zinc-800 leading-none">{fav.name}</h4>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{fav.family}</p>
                  </div>
                  <button 
                    onClick={() => handleConsult(fav)}
                    className="p-3 bg-emerald-50 text-emerald-600 rounded-full active:scale-90 transition-transform"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  const currentPerfume = PERFUMES[currentIndex];

  return (
    <div className="relative min-h-screen pt-28 pb-44 overflow-y-auto hide-scrollbar">
      <div className="flex flex-col items-center px-6">
        {/* Card Principal */}
        <div className="relative w-full max-w-sm aspect-[3.8/5] mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPerfume.id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ 
                x: 300, 
                opacity: 0, 
                rotate: 15,
                transition: { duration: 0.3 } 
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x > 100) handleSwipe('right');
                else if (info.offset.x < -100) handleSwipe('left');
              }}
              className="absolute inset-0 z-10"
            >
              <div className="glass rounded-[2.5rem] p-4 h-full flex flex-col shadow-2xl border-white/60 relative overflow-hidden">
                <div className="relative flex-1 rounded-[2rem] overflow-hidden group">
                  <img 
                    src={currentPerfume.imageUrl} 
                    alt={currentPerfume.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Badge de Info */}
                  <button 
                    onClick={() => setShowDetails(true)}
                    className="absolute top-4 right-4 glass p-3 rounded-full text-zinc-800 shadow-lg active:scale-90 transition-transform"
                  >
                    <Info className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/70">{currentPerfume.brand}</span>
                    <h3 className="font-serif text-3xl leading-tight">{currentPerfume.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-[1px] flex-1 bg-white/30" />
                      <p className="text-white/80 text-[10px] italic tracking-wider uppercase">{currentPerfume.family}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Overlay de Detalhes */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                className="absolute inset-0 z-20 bg-white/40 rounded-[2.5rem] p-8 flex flex-col overflow-y-auto hide-scrollbar"
              >
                <div className="flex justify-between items-start mb-6">
                  <h4 className="font-serif text-2xl text-zinc-900 leading-tight">Notas e Essência</h4>
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="p-2 bg-zinc-900/10 rounded-full text-zinc-900 active:scale-90"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Descrição</p>
                    <p className="text-zinc-600 text-sm leading-relaxed">{currentPerfume.description}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Composição Olfativa</p>
                    <div className="flex flex-wrap gap-2">
                      {currentPerfume.notes.map((note) => (
                        <span key={note} className="px-3 py-1.5 glass rounded-full text-[10px] text-zinc-700 font-medium">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900/5">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Preço Estimado</p>
                    <span className="text-xl font-semibold text-zinc-900">{currentPerfume.price}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Barra de Ações - Posicionamento Melhorado */}
        <div className="flex items-center gap-5 sm:gap-8 pb-10">
          <button 
            onClick={() => handleSwipe('left')}
            className="w-16 h-16 rounded-full glass flex items-center justify-center text-zinc-400 border-white/50 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-xl active:scale-90"
            title="Passar"
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            onClick={() => handleConsult(currentPerfume)}
            className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:scale-105 active:scale-90 transition-all shadow-2xl shadow-zinc-300"
            title="Consultar Specialist"
          >
            <MessageCircle className="w-10 h-10" />
          </button>
          
          <button 
            onClick={() => handleSwipe('right')}
            className="w-16 h-16 rounded-full glass flex items-center justify-center text-zinc-400 border-white/50 hover:bg-emerald-50 hover:text-emerald-500 transition-all shadow-xl active:scale-90"
            title="Favoritar"
          >
            <Heart className="w-8 h-8" />
          </button>
        </div>
        
        <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 font-bold text-center">
          Deslize para descobrir
        </p>
      </div>
    </div>
  );
};
