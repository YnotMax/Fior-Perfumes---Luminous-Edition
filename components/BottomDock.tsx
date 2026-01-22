
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
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md"
        >
          <div className="glass rounded-[2.5rem] p-2 flex items-center justify-between shadow-2xl border-white/60 bg-white/60">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id);
                  if (navigator.vibrate) navigator.vibrate(10);
                }}
                className={`relative flex flex-col items-center gap-1 p-3 rounded-[2rem] transition-all duration-500 ${
                  currentView === item.id 
                    ? 'text-zinc-900 w-24' 
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {currentView === item.id && (
                  <motion.div 
                    layoutId="dock-bg"
                    className="absolute inset-0 bg-white shadow-sm rounded-3xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10">
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: `w-5 h-5 transition-transform duration-500 ${currentView === item.id ? 'scale-110' : ''}`
                  })}
                </div>
                <span className={`relative z-10 text-[10px] font-medium transition-all duration-500 ${
                  currentView === item.id ? 'opacity-100' : 'opacity-0 h-0 scale-0'
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
