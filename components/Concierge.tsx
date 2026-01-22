
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScentFamily } from '../types';
import { PERFUMES } from '../constants';
import { ProductCard } from './ProductCard';

export const Concierge: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [preference, setPreference] = useState<ScentFamily>('All');

  const families: { label: string; value: ScentFamily; color: string }[] = [
    { label: 'Floral & Delicado', value: 'Floral', color: 'from-pink-100 to-rose-200' },
    { label: 'Amadeirado & Nobre', value: 'Woody', color: 'from-amber-100 to-orange-200' },
    { label: 'Fresco & Energético', value: 'Fresh', color: 'from-blue-100 to-cyan-200' },
    { label: 'Âmbar & Sensual', value: 'Amber', color: 'from-purple-100 to-indigo-200' }
  ];

  const results = PERFUMES.filter(p => p.family === preference);

  return (
    <div className="min-h-screen pt-20 pb-32 px-6">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center justify-center gap-8 max-w-lg mx-auto text-center py-12"
          >
            <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center text-white shadow-2xl">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif text-4xl mb-4 text-zinc-900">Concierge Luminous</h2>
              <p className="text-zinc-500 leading-relaxed">
                Utilizamos ciência sensorial e algoritmos de refinamento para encontrar a fragrância que melhor ressoa com sua química pessoal.
              </p>
            </div>
            <button 
              onClick={() => setStep('quiz')}
              className="group flex items-center gap-3 bg-zinc-900 text-white px-8 py-5 rounded-3xl font-medium shadow-lg hover:scale-105 transition-all"
            >
              Iniciar Análise Digital
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-xl mx-auto py-12"
          >
            <h3 className="font-serif text-3xl mb-12 text-center text-zinc-800">Como você deseja se sentir hoje?</h3>
            <div className="grid grid-cols-1 gap-4">
              {families.map((f) => (
                <button
                  key={f.value}
                  onClick={() => {
                    setPreference(f.value);
                    setStep('results');
                  }}
                  className={`relative overflow-hidden glass p-8 rounded-[2.5rem] text-left group transition-all duration-500 hover:border-zinc-400`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-xl font-medium text-zinc-800">{f.label}</span>
                    <ArrowRight className="w-6 h-6 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto py-8"
          >
            <div className="flex items-center gap-4 mb-12 justify-center">
              <CheckCircle2 className="text-emerald-500 w-8 h-8" />
              <h2 className="font-serif text-3xl text-zinc-800">Match Perfeito Encontrado</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.length > 0 ? (
                results.map(perfume => <ProductCard key={perfume.id} perfume={perfume} />)
              ) : (
                <div className="col-span-full glass p-12 rounded-[2.5rem] text-center">
                  <p className="text-zinc-500 italic">Analisando novas remessas de laboratório...</p>
                </div>
              )}
            </div>

            <button 
              onClick={() => setStep('quiz')}
              className="mt-12 mx-auto block text-zinc-400 font-medium hover:text-zinc-900 transition-colors"
            >
              Refazer Análise
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
