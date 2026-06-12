import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AppState, ScreenId } from '../types';
import { allSymbols } from '../data/symbols';
import { SymbolSvg } from '../components/SymbolGraphics';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const EvaluationScreen = ({ state, onNavigate }: { state: AppState, onNavigate: (s: ScreenId) => void }) => {
  const [step, setStep] = useState(0); // 0 = intro, 1..10 = questions, 11 = result
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startTest = () => {
    // Generate 5 random questions instead of 10 for brevity in demo
    const shuffled = [...allSymbols].sort(() => 0.5 - Math.random()).slice(0, 5);
    const generatedQuestions = shuffled.map(correctSym => {
      const wrongOptions = [...allSymbols]
        .filter(s => s.id !== correctSym.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const options = [correctSym, ...wrongOptions].sort(() => 0.5 - Math.random());
      return { correct: correctSym, options };
    });
    setQuestions(generatedQuestions);
    setScore(0);
    setStep(1);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (answerId: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    
    if (answerId === questions[step - 1].correct.id) {
      setScore(s => s + 20); // 5 Qs * 20 = 100
    }

    setTimeout(() => {
      if (step < questions.length) {
        setStep(s => s + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setStep(11); // final
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {step === 0 && (
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-slate-800">Evaluación Final</h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Pon a prueba tus conocimientos sobre los símbolos de los diagramas de flujo y proceso según los estándares.
          </p>
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl max-w-lg mx-auto text-left">
            <h3 className="font-semibold text-orange-800 mb-2">Instrucciones:</h3>
            <ul className="list-disc list-inside text-sm text-orange-900/80 space-y-1">
              <li>Parte 1: Identificación rápida de 5 símbolos.</li>
              <li>El puntaje mínimo aprobatorio es de 80/100.</li>
            </ul>
          </div>
          <Button size="lg" onClick={startTest}>Comenzar evaluación</Button>
        </div>
      )}

      {step > 0 && step <= 5 && (
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-center mb-8">
             <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pregunta {step} de 5</span>
             <span className="text-emerald-600 font-bold">Puntaje: {score}</span>
           </div>

           <div className="flex flex-col items-center mb-8">
             <h2 className="text-2xl font-semibold mb-6">Identifica el siguiente símbolo:</h2>
             <div className="w-40 h-40 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-4">
               <SymbolSvg id={questions[step-1].correct.id} width={100} height={100} />
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {questions[step-1].options.map((opt: any) => {
               const isSelected = selectedAnswer === opt.id;
               const isCorrect = opt.id === questions[step-1].correct.id;
               let btnClass = "border-slate-200 hover:border-slate-300 bg-white";
               
               if (showFeedback) {
                 if (isCorrect) btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800";
                 else if (isSelected) btnClass = "border-red-500 bg-red-50 text-red-800";
                 else btnClass = "opacity-50 border-slate-200";
               }

               return (
                 <button
                   key={opt.id}
                   onClick={() => handleAnswer(opt.id)}
                   disabled={showFeedback}
                   className={cn("p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center justify-between", btnClass)}
                 >
                   {opt.name}
                   {showFeedback && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                   {showFeedback && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                 </button>
               );
             })}
           </div>
        </motion.div>
      )}

      {step === 11 && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-6 bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800">Evaluación Completada</h1>
          <p className="text-xl text-slate-600">
            Tu calificación final es: <strong className={score >= 80 ? "text-emerald-600" : "text-orange-600"}>{score}/100</strong>
          </p>
          <div className="pt-8 flex justify-center gap-4">
            <Button variant="outline" onClick={() => onNavigate('welcome')}>Volver al inicio</Button>
            <Button onClick={() => window.print()}>Descargar Reporte PDF</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
