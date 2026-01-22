
import React, { useEffect, useState } from 'react';

export const LiquidAnimation: React.FC = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Normaliza movimento para um deslocamento suave de até 20px
        setOffset({
          x: (e.gamma / 45) * 20,
          y: (e.beta / 45) * 20
        });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <div 
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-luminous-blue via-white to-luminous-amber animate-[spin_30s_linear_infinite]" 
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) rotate(0deg)`
        }}
      />
      <div 
        className="absolute inset-0 bg-white/20 backdrop-blur-3xl"
        style={{
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          animation: 'liquid-morph 8s ease-in-out infinite alternate',
          transform: `translate(${-offset.x * 1.5}px, ${-offset.y * 1.5}px)`
        }}
      />
      <style>{`
        @keyframes liquid-morph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          100% { border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%; }
        }
      `}</style>
    </div>
  );
};
