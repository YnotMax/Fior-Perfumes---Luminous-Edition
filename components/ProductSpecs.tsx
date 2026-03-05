
import React from 'react';
import { Perfume } from '../types';

interface ProductSpecsProps {
  perfume: Perfume;
  variant?: 'minimal' | 'detailed';
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ perfume, variant = 'minimal' }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
            {perfume.brand}
          </span>
          <div className="h-[1px] w-4 bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            {perfume.family}
          </span>
        </div>
        <h3 className={`font-serif text-zinc-900 dark:text-white tracking-tight mt-1 ${
          variant === 'detailed' ? 'text-3xl' : 'text-2xl'
        }`}>
          {perfume.name}
        </h3>
      </div>

      <p className={`text-zinc-600 dark:text-zinc-400 leading-relaxed font-light ${
        variant === 'minimal' ? 'text-xs line-clamp-2 h-8' : 'text-sm'
      }`}>
        {perfume.description}
      </p>

      {variant === 'detailed' && (
        <div className="space-y-3 mt-2">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Composição Olfativa</p>
          <div className="flex flex-wrap gap-2">
            {perfume.notes.map((note) => (
              <span key={note} className="px-3 py-1.5 glass rounded-full text-[10px] text-zinc-800 dark:text-zinc-200 font-medium">
                {note}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
