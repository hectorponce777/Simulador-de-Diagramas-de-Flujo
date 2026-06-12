import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, ScreenId } from '../types';
import { allSymbols, flowSymbols, procSymbols } from '../data/symbols';
import { SymbolSvg } from '../components/SymbolGraphics';
import { Button } from '../components/Button';
import { Info, TriangleAlert, Lightbulb } from 'lucide-react';
import { cn } from '../lib/utils';

export const LearnScreen = ({ state, onNavigate }: { state: AppState, onNavigate: (s: ScreenId) => void }) => {
  const [filter, setFilter] = useState<'all' | 'flow' | 'process'>('all');
  const [selectedSymbol, setSelectedSymbol] = useState(allSymbols[0]);

  const displayedSymbols = filter === 'all' ? allSymbols : filter === 'flow' ? flowSymbols : procSymbols;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 h-full flex flex-col md:flex-row gap-4 md:gap-8">
      {/* Sidebar - list of symbols */}
      <div className="w-full md:w-1/3 flex flex-col h-[35vh] md:h-[calc(100vh-8rem)] shrink-0">
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 shrink-0">
          <button onClick={() => setFilter('all')} className={cn("flex-1 py-1.5 text-xs md:text-sm font-medium rounded-lg", filter === 'all' ? "bg-white shadow-sm text-slate-800" : "text-slate-500")}>Todos</button>
          <button onClick={() => setFilter('flow')} className={cn("flex-1 py-1.5 text-xs md:text-sm font-medium rounded-lg", filter === 'flow' ? "bg-white shadow-sm text-slate-800" : "text-slate-500")}>Flujo</button>
          <button onClick={() => setFilter('process')} className={cn("flex-1 py-1.5 text-xs md:text-sm font-medium rounded-lg", filter === 'process' ? "bg-white shadow-sm text-slate-800" : "text-slate-500")}>Proceso</button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 pb-2 border-b border-slate-200 md:border-b-0">
          {displayedSymbols.map(sym => (
            <button
              key={sym.id}
              onClick={() => setSelectedSymbol(sym)}
              className={cn(
                "w-full text-left p-3 rounded-xl border flex items-center gap-4 transition-all",
                selectedSymbol.id === sym.id ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500" : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-50 rounded-lg shrink-0">
                <SymbolSvg id={sym.id} width={28} height={28} stroke={selectedSymbol.id === sym.id ? '#059669' : '#475569'} fill={selectedSymbol.id === sym.id ? '#d1fae5' : '#f1f5f9'} />
              </div>
              <div>
                <div className="font-semibold text-slate-800 text-xs md:text-sm">{sym.name}</div>
                <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-0.5">{sym.type === 'flow' ? 'Flujo' : 'Proceso'}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Detail */}
      <div className="flex-1 overflow-y-auto pb-8 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSymbol.id}
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6 md:gap-8 min-h-max"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 border-b border-slate-100 pb-6 md:pb-8 text-center md:text-left">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-slate-50 rounded-2xl flex items-center justify-center p-6 md:p-8 shrink-0 shadow-inner">
                <SymbolSvg id={selectedSymbol.id} width={120} height={120} stroke="#334155" fill="#e2e8f0" strokeWidth={3} />
              </div>
              <div className="pt-2 space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] md:text-xs font-bold tracking-wider uppercase mb-2">
                  Diagrama de {selectedSymbol.type === 'flow' ? 'Flujo' : 'Proceso'}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{selectedSymbol.name}</h2>
                <p className="text-sm md:text-lg text-slate-600 leading-relaxed font-medium">
                  {selectedSymbol.functionDesc}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 space-y-2">
                <div className="flex items-center gap-2 text-slate-800 font-semibold mb-3">
                  <Info className="w-5 h-5 text-blue-500" />
                  ¿Cuándo se utiliza?
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">{selectedSymbol.whenToUse}</p>
                <div className="pt-4 mt-4 border-t border-slate-200">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Ejemplo aplicado</span>
                  <p className="text-slate-700 italic">"{selectedSymbol.example}"</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-2xl p-6 space-y-2 border border-orange-100">
                <div className="flex items-center gap-2 text-orange-800 font-semibold mb-3">
                  <TriangleAlert className="w-5 h-5 text-orange-500" />
                  Error Común
                </div>
                <p className="text-orange-900/80 leading-relaxed text-sm">{selectedSymbol.commonError}</p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900 mb-1">Mini actividad rápida</h3>
                <p className="text-indigo-800/80 text-sm">{selectedSymbol.miniActivity}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm mt-4">
              {selectedSymbol.isoUsage && (
                <div className="p-4 border border-slate-100 rounded-xl">
                  <span className="font-semibold block mb-1">Uso en ISO 5807:1985:</span>
                  <span className="text-slate-600">{selectedSymbol.isoUsage}</span>
                </div>
              )}
              {selectedSymbol.ansiUsage && (
                <div className="p-4 border border-slate-100 rounded-xl">
                  <span className="font-semibold block mb-1">Uso en ANSI X3.5:</span>
                  <span className="text-slate-600">{selectedSymbol.ansiUsage}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={() => onNavigate('simulator')} variant="secondary" className="gap-2">
                Ir a practicar
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
