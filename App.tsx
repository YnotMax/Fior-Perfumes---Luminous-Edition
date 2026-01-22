
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidAnimation } from './components/LiquidAnimation';
import { ProductCard } from './components/ProductCard';
import { BottomDock } from './components/BottomDock';
import { DiscoveryFeed } from './components/DiscoveryFeed';
import { Concierge } from './components/Concierge';
import { View } from './types';
import { PERFUMES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spotlight effect following the cursor
  const spotlightStyles: React.CSSProperties = {
    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 40%)`,
    pointerEvents: 'none',
    position: 'fixed',
    inset: 0,
    zIndex: 10,
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="px-6 pt-32 pb-40">
            <header className="mb-20">
              <motion.div
                initial={{ filter: 'blur(20px)', opacity: 0 }}
                animate={{ filter: 'blur(0px)', opacity: 1 }}
                transition={{ duration: 1.5, staggerChildren: 0.1 }}
                className="flex flex-col gap-2"
              >
                <span className="text-zinc-400 tracking-[0.4em] text-xs font-medium uppercase">Edition 2024</span>
                <h1 className="font-serif text-[15vw] leading-none text-zinc-900 tracking-tighter">
                  FIORÉ.
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-lg text-zinc-500 max-w-sm font-light leading-relaxed"
              >
                Fragrâncias que redefinem a física do luxo. 
                <span className="block font-medium text-zinc-900">Jardim Eldorado, Palhoça.</span>
              </motion.p>
            </header>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl text-zinc-800">Destaques</h2>
                <button 
                  onClick={() => setView('catalog')}
                  className="text-xs uppercase tracking-widest font-semibold border-b border-zinc-200 pb-1"
                >
                  Ver Tudo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <h2 className="font-serif text-5xl mb-12 text-zinc-900">Catálogo Completo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {PERFUMES.map((p) => (
                <ProductCard key={p.id} perfume={p} />
              ))}
            </div>
          </div>
        );
      case 'discovery':
        return <DiscoveryFeed />;
      case 'concierge':
        return <Concierge />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-luminous-50 selection:bg-zinc-200"
    >
      <LiquidAnimation />
      <div style={spotlightStyles} />
      
      <main className="relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomDock currentView={view} onViewChange={setView} />
      
      {/* Dynamic Background Accents */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-luminous-blue/20 blur-[120px] rounded-full" />
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-luminous-amber/20 blur-[120px] rounded-full" />
    </div>
  );
};

export default App;
