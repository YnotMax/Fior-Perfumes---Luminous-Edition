
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Grid, ScanSearch, UserCheck } from 'lucide-react';
import { View } from '../types';

interface BottomDockProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({ currentView, onViewChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const items: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'home', icon: <Home />, label: 'Início' },
    { id: 'catalog', icon: <Grid />, label: 'Catálogo' },
    { id: 'discovery', icon: <ScanSearch />, label: 'Discovery' },
    { id: 'concierge', icon: <UserCheck />, label: 'Concierge' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none"
        >
          <div className="glass rounded-[2rem] p-1.5 flex items-center justify-between shadow-2xl border-white/60 bg-white/60 max-w-[360px] mx-auto pointer-events-auto">
            {items.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    if (navigator.vibrate) navigator.vibrate(10);
                  }}
                  className={`relative flex flex-col items-center justify-center gap-1 py-2.5 transition-all duration-500 rounded-2xl ${
                    isActive 
                      ? 'text-zinc-900 flex-[1.5] min-w-[70px]' 
                      : 'text-zinc-400 hover:text-zinc-600 flex-1 min-w-[50px]'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="dock-bg"
                      className="absolute inset-0 bg-white shadow-sm rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="relative z-10">
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: `w-5 h-5 transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-100'}`
                    })}
                  </div>
                  <span className={`relative z-10 text-[9px] font-semibold tracking-tight transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
