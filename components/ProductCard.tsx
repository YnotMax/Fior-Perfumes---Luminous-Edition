
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageCircle, Info } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { Perfume } from '../types';

interface ProductCardProps {
  perfume: Perfume;
}

export const ProductCard: React.FC<ProductCardProps> = ({ perfume }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // No mobile, usamos gamma (tilt esq/dir) e beta (frente/tras)
      if (e.gamma !== null && e.beta !== null) {
        // Mapeia -30/30 graus para o range -0.5/0.5
        const gammaNormalized = Math.max(-1, Math.min(1, e.gamma / 30)) * 0.5;
        const betaNormalized = Math.max(-1, Math.min(1, (e.beta - 45) / 30)) * 0.5;
        
        x.set(gammaNormalized);
        y.set(betaNormalized);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [x, y]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    // No mobile, o giroscópio continuará atualizando, no desktop volta ao centro
    if (!('ontouchstart' in window)) {
      x.set(0);
      y.set(0);
    }
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
      <div className="glass rounded-[2rem] p-4 flex flex-col gap-4 h-full transition-all duration-500 group-hover:bg-white/60">
        <div 
          className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
          style={{ transform: "translateZ(30px)" }}
        >
          <img 
            src={perfume.imageUrl} 
            alt={perfume.name}
            className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          <div className="absolute top-3 right-3 glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="w-4 h-4 text-zinc-600" />
          </div>
        </div>

        <div className="flex flex-col gap-1 px-1" style={{ transform: "translateZ(40px)" }}>
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
            {perfume.brand} • {perfume.family}
          </span>
          <h3 className="font-serif text-2xl text-zinc-800 tracking-tight">{perfume.name}</h3>
          <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed h-10 mt-1">
            {perfume.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold text-zinc-900 text-lg">{perfume.price}</span>
            <button
              onClick={handleConsult}
              className="flex items-center gap-2 bg-zinc-900 text-white px-5 py-2.5 rounded-2xl text-xs font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-200"
            >
              <MessageCircle className="w-4 h-4" />
              Consultar
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
