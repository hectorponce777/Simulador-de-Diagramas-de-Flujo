import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState, ScreenId, StandardType, DiagramType, ModeType } from './types';
import { Header } from './components/Header';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LearnScreen } from './screens/LearnScreen';
import { CompareScreen } from './screens/CompareScreen';
import { SimulatorScreen } from './screens/SimulatorScreen';
import { EvaluationScreen } from './screens/EvaluationScreen';

export default function App() {
  const [state, setState] = useState<AppState>({
    screen: 'welcome',
    standard: null,
    diagramType: null,
    currentExerciseId: null,
    mode: null,
    userName: '',
    score: 0
  });

  const navigate = (screen: ScreenId) => setState(s => ({ ...s, screen }));
  
  const updateState = (updates: Partial<AppState>) => {
    setState(s => ({ ...s, ...updates }));
  };

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-800 font-sans flex flex-col overflow-hidden">
      <Header state={state} onNavigate={navigate} />
      
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {state.screen === 'welcome' && (
            <WelcomeScreen key="welcome" state={state} updateState={updateState} onNavigate={navigate} />
          )}
          {state.screen === 'learn' && (
            <LearnScreen key="learn" state={state} onNavigate={navigate} />
          )}
          {state.screen === 'compare' && (
            <CompareScreen key="compare" onNavigate={navigate} />
          )}
          {state.screen === 'simulator' && (
            <SimulatorScreen key="simulator" state={state} onNavigate={navigate} />
          )}
          {state.screen === 'evaluation' && (
            <EvaluationScreen key="evaluation" state={state} onNavigate={navigate} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
