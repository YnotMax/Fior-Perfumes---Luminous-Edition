
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, MessageCircle } from 'lucide-react';
import { PERFUMES, WHATSAPP_NUMBER } from '../constants';

export const DiscoveryFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (navigator.vibrate) navigator.vibrate(direction === 'right' ? 80 : 30);
    
    if (direction === 'right') {
      setFavorites(prev => [...prev, PERFUMES[currentIndex].id]);
    }
    setCurrentIndex(prev => Math.min(prev + 1, PERFUMES.length));
  };

  const handleConsult = () => {
    const p = PERFUMES[currentIndex];
    const text = `Olá, amei o perfume ${p.name} no Discovery. Gostaria de saber mais.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (currentIndex >= PERFUMES.length) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center gap-4">
        <div className="glass p-8 rounded-3xl">
          <h2 className="font-serif text-3xl mb-2 text-zinc-800">Sua jornada continua</h2>
          <p className="text-zinc-500 mb-6">Você explorou toda a coleção atual. Deseja falar com um especialista agora?</p>
          <button 
            onClick={() => setCurrentIndex(0)}
            className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-medium"
          >
            Ver catálogo completo
          </button>
        </div>
      </div>
    );
  }

  const currentPerfume = PERFUMES[currentIndex];

  return (
    <div className="relative h-[calc(100vh-160px)] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-sm aspect-[4/5] px-4">
        <AnimatePresence>
          <motion.div
            key={currentPerfume.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) handleSwipe('right');
              else if (info.offset.x < -100) handleSwipe('left');
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ 
              x: 500, 
              opacity: 0, 
              rotate: 20,
              transition: { duration: 0.3 } 
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div className="glass rounded-[2.5rem] p-5 h-full flex flex-col gap-4 shadow-xl border-white/40">
              <div className="relative flex-1 rounded-3xl overflow-hidden shadow-inner">
                <img 
                  src={currentPerfume.imageUrl} 
                  alt={currentPerfume.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-serif text-3xl">{currentPerfume.name}</h3>
                  <p className="text-white/80 text-sm italic">{currentPerfume.notes.join(' • ')}</p>
                </div>
              </div>
              <p className="text-zinc-600 text-center text-sm px-4 leading-relaxed">
                {currentPerfume.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 mt-12">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full glass flex items-center justify-center text-zinc-400 border-white/50 hover:bg-rose-50 hover:text-rose-400 transition-all shadow-lg"
        >
          <X className="w-8 h-8" />
        </button>
        <button 
          onClick={handleConsult}
          className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-xl"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 rounded-full glass flex items-center justify-center text-zinc-400 border-white/50 hover:bg-emerald-50 hover:text-emerald-400 transition-all shadow-lg"
        >
          <Heart className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
