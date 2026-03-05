
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Info, X } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { Perfume } from '../types';
import { ProductSpecs } from './ProductSpecs';

interface ProductCardProps {
  perfume: Perfume;
}

export const ProductCard: React.FC<ProductCardProps> = ({ perfume }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleConsult = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(50);
    const text = `Olá, me interessei pelo perfume ${perfume.name} da coleção Luminous.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const toggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(20);
    setShowDetails(!showDetails);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative w-full group"
    >
      <div className="glass rounded-[2.5rem] p-4 flex flex-col gap-4 h-full transition-all duration-300 relative overflow-hidden">
        {/* Container da Imagem */}
        <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-800 shimmer-effect">
          <img 
            src={perfume.imageUrl} 
            alt={perfume.name}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          {/* Botão de Informação - Agora Funcional */}
          <button 
            onClick={toggleDetails}
            className="absolute top-4 right-4 glass p-3 rounded-full text-zinc-900 dark:text-white shadow-lg active:scale-90 transition-all opacity-0 group-hover:opacity-100 z-30"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        <div className="px-2">
          <ProductSpecs perfume={perfume} variant="minimal" />
          <div className="mt-5 flex items-center justify-between">
            <span className="font-medium text-zinc-900 dark:text-white text-lg">{perfume.price}</span>
            <button
              onClick={handleConsult}
              className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest font-bold active:scale-95 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar
            </button>
          </div>
        </div>

        {/* Overlay de Detalhes (Ficha Técnica) */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 z-40 bg-white/95 dark:bg-zinc-950/95 p-8 flex flex-col overflow-y-auto hide-scrollbar"
            >
              <div className="flex justify-between items-start mb-6">
                <h4 className="font-serif text-2xl text-zinc-900 dark:text-white leading-tight">Especificações</h4>
                <button 
                  onClick={toggleDetails}
                  className="p-2 bg-zinc-900/5 dark:bg-white/10 rounded-full text-zinc-900 dark:text-white active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <ProductSpecs perfume={perfume} variant="detailed" />

              <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-white/5">
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Valor de Investimento</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-semibold text-zinc-900 dark:text-white">{perfume.price}</span>
                  <button
                    onClick={handleConsult}
                    className="p-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-xl active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <p className="mt-8 text-[9px] uppercase tracking-[0.2em] text-zinc-400 text-center font-medium">
                Edição Limitada Luminous
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
