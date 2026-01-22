
import React from 'react';

export const LiquidAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-luminous-blue via-white to-luminous-amber animate-[spin_30s_linear_infinite]" />
      <div 
        className="absolute inset-0 bg-white/20 backdrop-blur-3xl"
        style={{
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          animation: 'liquid-morph 8s ease-in-out infinite alternate',
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
