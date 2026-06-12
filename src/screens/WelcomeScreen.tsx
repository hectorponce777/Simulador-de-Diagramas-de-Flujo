import React from 'react';
import { motion } from 'motion/react';
import { AppState, ScreenId, StandardType, DiagramType, ModeType } from '../types';
import { Button } from '../components/Button';
import { BookOpen, Map, ArrowRight, CheckCircle2, Circle, GitMerge, FileText, Blocks, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

interface WelcomeProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const WelcomeScreen = ({ state, updateState, onNavigate }: WelcomeProps) => {
  const [selectedAction, setSelectedAction] = React.useState<{ screen: ScreenId, type?: DiagramType, mode?: ModeType } | null>(null);

  const handleStart = () => {
    if (!state.standard || !selectedAction) return;
    
    updateState({
      diagramType: selectedAction.type || null,
      mode: selectedAction.mode || null,
      screen: selectedAction.screen
    });
  };

  const actions = [
    { id: 'learn', title: 'Aprender símbolos', icon: BookOpen, screen: 'learn' as ScreenId, desc: 'Explora la galería interactiva de símbolos y sus usos.' },
    { id: 'compare', title: 'Comparar estándares', icon: GitMerge, screen: 'compare' as ScreenId, desc: 'Diferencias entre ISO 5807:1985 y ANSI X3.5.' },
    { id: 'pract_flow', title: 'Practicar d. de flujo', icon: GitMerge, screen: 'simulator' as ScreenId, type: 'flow' as DiagramType, mode: 'practice' as ModeType, desc: 'Resuelve 5 ejercicios guiados de lógica secuencial.' },
    { id: 'pract_proc', title: 'Practicar d. de proceso', icon: FileText, screen: 'simulator' as ScreenId, type: 'process' as DiagramType, mode: 'practice' as ModeType, desc: 'Resuelve 5 ejercicios operativos (ASME/ANSI).' },
    { id: 'free', title: 'Modo libre', icon: Blocks, screen: 'simulator' as ScreenId, mode: 'free' as ModeType, desc: 'Lienzo en blanco para armar tus propios procesos.' },
    { id: 'test', title: 'Evaluación final', icon: Trophy, screen: 'evaluation' as ScreenId, desc: 'Pon a prueba tus conocimientos y obtén tu reporte.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-12"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Simulador de Diagramas de Flujo y de Proceso
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Aprende a representar procesos turísticos y gastronómicos mediante símbolos normalizados.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold">1</span>
            Selecciona el estándar
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {(['ISO 5807:1985', 'ANSI X3.5'] as StandardType[]).map((std) => (
              <button
                key={std}
                onClick={() => updateState({ standard: std })}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center justify-between group",
                  state.standard === std ? "border-emerald-500 bg-emerald-50/50" : "border-slate-200 bg-white hover:border-emerald-200"
                )}
              >
                <div>
                  <h3 className={cn("font-medium text-lg", state.standard === std ? "text-emerald-800" : "text-slate-700")}>{std}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {std === 'ISO 5807:1985' ? 'Enfoque en procesamiento de datos y sistemas.' : 'Enfoque versátil en administración y procesamiento.'}
                  </p>
                </div>
                {state.standard === std ? <CheckCircle2 className="w-6 h-6 text-emerald-600" /> : <Circle className="w-6 h-6 text-slate-300 group-hover:text-emerald-300" />}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 text-sm font-bold">2</span>
            ¿Qué deseas hacer?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actions.map((act) => {
              const isSelected = selectedAction?.id === act.id;
              return (
                <button
                  key={act.id}
                  disabled={!state.standard}
                  onClick={() => setSelectedAction({ screen: act.screen, type: act.type, mode: act.mode, ...act })}
                  className={cn(
                    "p-4 rounded-2xl border-2 text-left transition-all duration-200",
                    !state.standard ? "opacity-50 cursor-not-allowed border-slate-200 bg-slate-50" : isSelected ? "border-orange-500 bg-orange-50/50" : "border-slate-200 bg-white hover:border-orange-200"
                  )}
                >
                  <act.icon className={cn("w-6 h-6 mb-3", isSelected ? "text-orange-600" : "text-slate-400")} />
                  <h3 className={cn("font-medium leading-tight mb-1", isSelected ? "text-orange-800" : "text-slate-700")}>{act.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{act.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8 border-t border-slate-200">
        <Button 
          size="lg" 
          disabled={!state.standard || !selectedAction} 
          onClick={handleStart}
          className="w-full max-w-md group"
        >
          Comenzar simulación
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};
