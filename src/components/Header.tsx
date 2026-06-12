import React from 'react';
import { AppState } from '../types';
import { Button } from './Button';
import { BookOpen, Map, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export const Header = ({
  state,
  onNavigate
}: {
  state: AppState;
  onNavigate: (screen: AppState['screen']) => void;
}) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white border-b border-slate-200 shrink-0">
      <div className="flex items-center gap-3">
        {state.screen !== 'welcome' && (
          <button 
            onClick={() => onNavigate('welcome')} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="w-10 h-10 bg-blue-600 rounded-lg hidden md:flex items-center justify-center text-white font-bold text-xl leading-none">
          Σ
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold leading-tight text-slate-800">Simulador de Diagramas</h1>
          <p className="text-xs text-slate-500 font-medium hidden sm:block">Turismo y Gastronomía • ISO 5807 / ANSI X3.5</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm font-medium">
        {state.standard && (
          <div className="flex bg-slate-100 p-1 rounded-full px-2 border border-slate-200 hidden sm:flex">
            <div className={cn("px-3 py-1 rounded-full transition-colors text-xs", state.standard === 'ISO 5807:1985' ? "bg-white shadow-sm text-blue-600 font-bold" : "text-slate-500")}>
              ISO 5807
            </div>
            <div className={cn("px-3 py-1 rounded-full transition-colors text-xs", state.standard === 'ANSI X3.5' ? "bg-white shadow-sm text-blue-600 font-bold" : "text-slate-500")}>
              ANSI
            </div>
          </div>
        )}
        
        {state.diagramType && (
          <>
            <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-xs text-slate-600 font-bold hidden sm:inline-block">
                {state.mode === 'practice' ? 'Práctica Guiada' : 'Modo Libre'}
              </span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
