
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
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile('ontouchstart' in window);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Converte a inclinação do celular em uma posição de luz na tela
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        
        // Mapeia inclinação para posição (aprox. -45 a 45 graus de range útil)
        const x = (e.gamma / 45) * (winW / 2) + (winW / 2);
        const y = ((e.beta - 45) / 45) * (winH / 2) + (winH / 2);
        
        setPos({ x, y });
      }
    };

    if ('ontouchstart' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Spotlight effect following the cursor or tilt
  const spotlightStyles: React.CSSProperties = {
    background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.5), transparent 60%)`,
    pointerEvents: 'none',
    position: 'fixed',
    inset: 0,
    zIndex: 10,
    transition: isMobile ? 'background 0.1s ease-out' : 'none'
  };

  // Solicitar permissão explicitamente se necessário (iOS)
  const requestMotionPermission = () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            console.log('Motion permission granted');
          }
        })
        .catch(console.error);
    }
  };

  const handleViewChange = (newView: View) => {
    requestMotionPermission(); // Tenta ativar sensores na primeira navegação
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                <span className="text-zinc-400 tracking-[0.6em] text-[10px] font-bold uppercase ml-1">Luminous Collection</span>
                <h1 className="font-serif text-[18vw] leading-none text-zinc-900 tracking-tighter">
                  FIORÉ.
                </h1>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-xl text-zinc-500 max-w-sm font-light leading-relaxed"
              >
                Refrações de luxo em cada nota. 
                <span className="block font-medium text-zinc-900 mt-1">Sua jornada olfativa começa aqui.</span>
              </motion.p>
            </header>

            <section>
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-serif text-3xl text-zinc-800">Curadoria</h2>
                <button 
                  onClick={() => handleViewChange('catalog')}
                  className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-zinc-900 pb-1"
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
            <h2 className="font-serif text-5xl mb-12 text-zinc-900 tracking-tight">O Laboratório</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
      className="relative min-h-screen bg-luminous-50 selection:bg-zinc-200 overflow-x-hidden"
    >
      <LiquidAnimation />
      <div style={spotlightStyles} />
      
      <main className="relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomDock currentView={view} onViewChange={handleViewChange} />
      
      {/* Dynamic Background Accents */}
      <div className="fixed top-0 right-0 -z-10 w-full h-[50vh] bg-gradient-to-b from-luminous-blue/30 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 -z-10 w-full h-[50vh] bg-gradient-to-t from-luminous-amber/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default App;
