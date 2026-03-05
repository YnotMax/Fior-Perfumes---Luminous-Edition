
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { LiquidAnimation } from './components/LiquidAnimation';
import { ProductCard } from './components/ProductCard';
import { BottomDock } from './components/BottomDock';
import { DiscoveryFeed } from './components/DiscoveryFeed';
import { Concierge } from './components/Concierge';
import { View } from './types';
import { PERFUMES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="px-6 pt-32 pb-40">
            <header className="mb-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-2"
              >
                <span className="text-zinc-500 dark:text-zinc-400 tracking-[0.6em] text-[10px] font-bold uppercase ml-1">Luminous Collection</span>
                <h1 className="font-serif text-[18vw] leading-none text-zinc-900 dark:text-white tracking-tighter">
                  FIORÉ.
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-xl text-zinc-500 dark:text-zinc-400 max-w-sm font-light leading-relaxed"
              >
                Refrações de luxo em cada nota. 
                <span className="block font-medium text-zinc-900 dark:text-white mt-1">Sua jornada olfativa começa aqui.</span>
              </motion.p>
            </header>

            <section>
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-serif text-3xl text-zinc-800 dark:text-zinc-200">Curadoria</h2>
                <button 
                  onClick={() => handleViewChange('catalog')}
                  className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-zinc-900 dark:border-white pb-1 text-zinc-900 dark:text-white"
                >
                  Explorar
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {PERFUMES.slice(0, 2).map((p) => (
                  <ProductCard key={p.id} perfume={p} />
                ))}
              </div>
            </section>
          </div>
        );
      case 'catalog':
        return (
          <div className="px-6 pt-32 pb-40">
            <h2 className="font-serif text-5xl mb-12 text-zinc-900 dark:text-white tracking-tight">O Laboratório</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PERFUMES.map((p) => (
                <ProductCard key={p.id} perfume={p} />
              ))}
            </div>
          </div>
        );
      case 'discovery':
        return <DiscoveryFeed theme={theme} />;
      case 'concierge':
        return <Concierge />;
    }
  };

  return (
    <div className="relative min-h-screen bg-luminous-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <LiquidAnimation theme={theme} />
      
      {/* Luz Ambiental Estática - Muito mais leve que Spotlight Dinâmico */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-luminous-amber/20 blur-[150px] rounded-full" />
      </div>
      
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-[60] glass p-3 rounded-full shadow-xl active:scale-95 transition-transform"
      >
        {theme === 'light' ? <Moon className="w-5 h-5 text-zinc-800" /> : <Sun className="w-5 h-5 text-white" />}
      </button>

      <main className="relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomDock currentView={view} onViewChange={handleViewChange} />
    </div>
  );
};

export default App;
