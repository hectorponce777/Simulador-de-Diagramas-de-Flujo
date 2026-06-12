export type StandardType = 'ISO 5807:1985' | 'ANSI X3.5';
export type DiagramType = 'flow' | 'process';
export type ScreenId = 'welcome' | 'learn' | 'compare' | 'simulator' | 'evaluation' | 'report';
export type ModeType = 'practice' | 'free' | null;

export interface SymbolDef {
  id: string;
  type: DiagramType;
  name: string;
  functionDesc: string;
  whenToUse: string;
  example: string;
  commonError: string;
  miniActivity: string;
  isoUsage?: string;
  ansiUsage?: string;
}

export interface ExerciseDef {
  id: string;
  type: DiagramType;
  title: string;
  context: string;
  objective: string;
  expectedSteps: string[];
  requiredSymbols: string[];
}

export interface AppState {
  screen: ScreenId;
  standard: StandardType | null;
  diagramType: DiagramType | null;
  mode: ModeType;
  currentExerciseId: string | null;
  userName: string;
  score: number;
}
