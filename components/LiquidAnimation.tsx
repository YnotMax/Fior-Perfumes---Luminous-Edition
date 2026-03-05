
import React from 'react';

interface LiquidAnimationProps {
  theme?: 'light' | 'dark';
}

export const LiquidAnimation: React.FC<LiquidAnimationProps> = ({ theme = 'dark' }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Círculos de gradiente leves em vez de blur pesado na tela toda */}
      <div 
        className={`absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-pulse transition-colors duration-1000 ${
          theme === 'dark' ? 'bg-zinc-800' : 'bg-luminous-blue'
        }`}
      />
      <div 
        className={`absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-bounce transition-colors duration-1000`}
        style={{ animationDuration: '15s', backgroundColor: theme === 'dark' ? '#27272a' : '#f59e0b' }}
      />
      <div 
        className={`absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-pulse transition-colors duration-1000`}
        style={{ animationDuration: '20s', backgroundColor: theme === 'dark' ? '#18181b' : '#ec4899' }}
      />
      
      {/* Overlay sutil para textura */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${theme === 'dark' ? 'bg-black/20' : 'bg-white/10'}`} />
    </div>
  );
};
