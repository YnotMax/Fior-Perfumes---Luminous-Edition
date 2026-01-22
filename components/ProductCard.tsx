
import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageCircle, Info } from 'lucide-react';
// WHATSAPP_NUMBER is a value exported from constants.ts
import { WHATSAPP_NUMBER } from '../constants';
// Perfume is a type exported from types.ts
import { Perfume } from '../types';

interface ProductCardProps {
  perfume: Perfume;
}

export const ProductCard: React.FC<ProductCardProps> = ({ perfume }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleConsult = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    const text = `Olá, me interessei pelo perfume ${perfume.name} da coleção Luminous.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full group"
    >
      <div className="glass rounded-[2rem] p-4 flex flex-col gap-4 h-full transition-all duration-500 group-hover:bg-white/50">
        <div 
          className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          style={{ transform: "translateZ(20px)" }}
        >
          <img 
            src={perfume.imageUrl} 
            alt={perfume.name}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute top-3 right-3 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-4 h-4 text-zinc-600" />
          </div>
        </div>

        <div className="flex flex-col gap-1 px-1" style={{ transform: "translateZ(30px)" }}>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
            {perfume.brand} • {perfume.family}
          </span>
          <h3 className="font-serif text-xl text-zinc-800">{perfume.name}</h3>
          <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed h-10">
            {perfume.description}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-medium text-zinc-900">{perfume.price}</span>
            <button
              onClick={handleConsult}
              className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Consultar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
