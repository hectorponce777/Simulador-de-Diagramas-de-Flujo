import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppState, ScreenId, DiagramType } from '../types';
import { allSymbols, flowSymbols, procSymbols } from '../data/symbols';
import { allExercises } from '../data/exercises';
import { SymbolSvg } from '../components/SymbolGraphics';
import { Button } from '../components/Button';
import { cn } from '../lib/utils';
import { MousePointer2, MoveRight, Trash2, Copy, Download, Save, Route } from 'lucide-react';

interface Node {
  id: string;
  symbolId: string;
  x: number;
  y: number;
  text: string;
}

interface Edge {
  id: string;
  from: string;
  to: string;
}

export const SimulatorScreen = ({ state, onNavigate }: { state: AppState, onNavigate: (s: ScreenId) => void }) => {
  const [activeExerciseId, setActiveExerciseId] = useState<string | undefined>(
    state.currentExerciseId || allExercises.find(e => e.type === state.diagramType)?.id
  );
  
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  
  // Custom Drag logic
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Connecting Logic
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectStartNode, setConnectStartNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const symbolsList = state.diagramType === 'flow' ? flowSymbols : state.diagramType === 'process' ? procSymbols : allSymbols;
  
  const currentExercise = state.mode === 'practice' && activeExerciseId
    ? allExercises.find(e => e.id === activeExerciseId)
    : null;

  const handlePointerDownSymbol = (e: React.PointerEvent, symbolId: string) => {
    // In a real DND we'd drag from sidebar. For simplicity: click sidebar adds to center.
    addNode(symbolId);
  };

  const addNode = (symbolId: string) => {
    // Center it roughly
    setNodes([...nodes, {
      id: uuidv4(),
      symbolId,
      x: 300 + Math.random() * 50,
      y: 200 + Math.random() * 50,
      text: 'Nuevo texto'
    }]);
  };

  // Node pointer events
  const onNodePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    if (isConnecting) {
      if (connectStartNode && connectStartNode !== id) {
        setEdges([...edges, { id: uuidv4(), from: connectStartNode, to: id }]);
        setConnectStartNode(null);
        setIsConnecting(false);
      } else {
        setConnectStartNode(id);
      }
      return;
    }

    setSelectedNode(id);
    setDraggingNode(id);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const node = nodes.find(n => n.id === id);
      if (node) {
        // Calculate offset so cursor stays where it clicked
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        setDragOffset({ x: mouseX - node.x, y: mouseY - node.y });
      }
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });

      if (draggingNode) {
        setNodes(nodes.map(n => 
          n.id === draggingNode 
            ? { ...n, x: x - dragOffset.x, y: y - dragOffset.y }
            : n
        ));
      }
    }
  };

  const onPointerUp = () => {
    setDraggingNode(null);
  };

  const clearSelection = () => {
    setSelectedNode(null);
    if (isConnecting && connectStartNode) {
      setConnectStartNode(null);
      setIsConnecting(false);
    }
  };

  const deleteSelected = () => {
    if (selectedNode) {
      setNodes(nodes.filter(n => n.id !== selectedNode));
      setEdges(edges.filter(e => e.from !== selectedNode && e.to !== selectedNode));
      setSelectedNode(null);
    }
  };

  const toggleConnectMode = () => {
    setIsConnecting(!isConnecting);
    setConnectStartNode(null);
    setSelectedNode(null);
  };

  const renderEdges = () => {
    return edges.map(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      if (!fromNode || !toNode) return null;

      const x1 = fromNode.x + 60;
      const y1 = fromNode.y + 40;
      const tX = toNode.x + 60;
      const tY = toNode.y + 40;
      
      const dx = tX - x1;
      const dy = tY - y1;
      const length = Math.sqrt(dx*dx + dy*dy);
      // Reduce length by ~55px to make arrow stop at the edge of the node
      const ratio = length > 0 ? Math.max(0, (length - 55) / length) : 0;
      const x2 = x1 + dx * ratio;
      const y2 = y1 + dy * ratio;

      return (
        <g key={edge.id}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        </g>
      );
    });
  };

  const handleExportPNG = async () => {
    if (!containerRef.current) return;
    try {
      // Small timeout to ensure no lingering drag visual state
      await new Promise(resolve => setTimeout(resolve, 50));
      const canvas = await import('html2canvas').then(m => m.default(containerRef.current!, { backgroundColor: '#ffffff', scale: 2 }));
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'diagrama.png';
      link.href = imgData;
      link.click();
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Error al exportar a PNG');
    }
  };

  const handleExportPDF = async () => {
    if (!containerRef.current) return;
    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const canvas = await import('html2canvas').then(m => m.default(containerRef.current!, { backgroundColor: '#ffffff', scale: 2 }));
      const imgData = canvas.toDataURL('image/png');
      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('diagrama.pdf');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar a PDF');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] p-2 md:p-4 flex flex-col md:grid md:grid-cols-12 md:grid-rows-6 gap-2 md:gap-4 overflow-x-hidden bg-slate-50">
      
      {/* Left Sidebar - Symbols */}
      <aside className="md:col-span-3 md:row-span-6 bg-white rounded-2xl border border-slate-200 p-3 md:p-4 flex flex-col shadow-sm shrink-0 md:overflow-hidden text-slate-800 font-sans">
        <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 md:mb-4 shrink-0">
          Paleta de Símbolos
        </div>
        <div className="flex flex-row md:grid md:grid-cols-2 gap-2 md:gap-3 overflow-x-auto md:overflow-y-auto pb-2 pr-1 flex-1">
          {symbolsList.map(sym => (
            <button 
              key={sym.id}
              onClick={(e) => handlePointerDownSymbol(e, sym.id)}
              className="shrink-0 w-24 md:w-auto p-2 md:p-3 border border-slate-100 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-300 transition-colors cursor-grab bg-slate-50 hover:bg-white text-blue-600 group"
              title={sym.name}
            >
              <div className="shrink-0 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <SymbolSvg id={sym.id} width={32} height={32} stroke="currentColor" fill="none" strokeWidth={2}/>
              </div>
              <span className="block text-[9px] md:text-[10px] font-bold text-slate-700 text-center leading-tight">{sym.name.toUpperCase()}</span>
            </button>
          ))}
        </div>
        {currentExercise && (
          <div className="hidden md:block mt-4 pt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Ejercicio Actual</div>
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <p className="text-xs text-orange-800 font-medium leading-tight">{currentExercise.title}</p>
            </div>
          </div>
        )}
      </aside>

      {/* Center Base - Canvas */}
      <section className="md:col-span-6 md:row-span-6 bg-white rounded-2xl border border-slate-200 shadow-lg relative flex flex-col min-h-[450px] md:min-h-0 overflow-hidden flex-1">
          <div className="flex flex-wrap items-center justify-between p-2 md:p-4 bg-slate-50 border-b border-slate-200 shrink-0 gap-2">
             <div className="flex gap-1 md:gap-2">
                <button 
                  className={cn("p-2 rounded-lg transition-colors flex items-center justify-center", !isConnecting ? "bg-slate-200 text-slate-800" : "hover:bg-slate-200 text-slate-600")}
                  onClick={() => setIsConnecting(false)}
                  title="Seleccionar (Mouse)"
                >
                  <MousePointer2 className="w-4 h-4" />
                </button>
                <button 
                  className={cn("p-2 rounded-lg transition-colors flex items-center justify-center", isConnecting ? "bg-slate-200 text-slate-800" : "hover:bg-slate-200 text-slate-600")}
                  onClick={toggleConnectMode}
                  title="Conectar"
                >
                  <Route className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-slate-300 self-center mx-1"></div>
                <button 
                  className="p-2 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors flex items-center justify-center disabled:opacity-30 disabled:hover:bg-transparent"
                  onClick={deleteSelected} 
                  disabled={!selectedNode}
                  title="Eliminar elemento"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="w-px h-6 bg-slate-300 self-center mx-1"></div>
                <button 
                  className="p-2 flex hover:bg-slate-200 text-slate-600 rounded-lg transition-colors items-center justify-center gap-1 text-xs font-bold"
                  onClick={handleExportPNG}
                  title="Exportar como PNG"
                >
                  <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">PNG</span>
                </button>
                <button 
                  className="p-2 flex hover:bg-slate-200 text-slate-600 rounded-lg transition-colors items-center justify-center gap-1 text-xs font-bold"
                  onClick={handleExportPDF}
                  title="Exportar como PDF"
                >
                  <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">PDF</span>
                </button>
             </div>
             
             <div className="text-[10px] md:text-xs font-mono text-slate-400 hidden sm:block">
               LIENZO INTERACTIVO
             </div>

             <div className="flex justify-end relative">
                {state.mode === 'practice' ? (
                  <select 
                    value={activeExerciseId || ''}
                    className="bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 py-1.5 shadow-sm max-w-[150px] md:max-w-[200px] truncate"
                    onChange={(e) => setActiveExerciseId(e.target.value)}
                  >
                    {allExercises.filter(e => e.type === state.diagramType).map((ex, i) => (
                      <option key={ex.id} value={ex.id}>Práctica {i+1}: {ex.title}</option>
                    ))}
                  </select>
                ) : (
                  <div className="text-xs font-mono text-slate-400 font-bold uppercase py-1.5">Modo Libre</div>
                )}
             </div>
          </div>

        {/* The SVG Canvas */}
        <div 
          className="flex-1 bg-white relative overflow-hidden touch-none"
          ref={containerRef}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerDown={clearSelection}
          style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        >
           <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
             <defs>
               <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                 <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
               </marker>
             </defs>
             {renderEdges()}
             {isConnecting && connectStartNode && (
               <line 
                 x1={(nodes.find(n => n.id === connectStartNode)?.x || 0) + 60} 
                 y1={(nodes.find(n => n.id === connectStartNode)?.y || 0) + 40} 
                 x2={mousePos.x} 
                 y2={mousePos.y} 
                 stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2"
               />
             )}
           </svg>

           {nodes.map(node => (
             <div 
               key={node.id}
               onPointerDown={(e) => onNodePointerDown(e, node.id)}
               className={cn(
                 "absolute cursor-grab select-none w-[120px] h-[80px] z-10",
                 draggingNode === node.id ? "cursor-grabbing opacity-90" : "",
                 selectedNode === node.id ? "ring-2 ring-blue-500 ring-offset-2 rounded-lg" : "",
                 isConnecting ? "hover:ring-2 hover:ring-emerald-500 hover:ring-offset-2 hover:rounded-lg cursor-crosshair" : ""
               )}
               style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
             >
               <SymbolSvg id={node.symbolId} width={120} height={80} fill={selectedNode === node.id ? '#eff6ff' : '#ffffff'} stroke={selectedNode === node.id ? '#2563eb' : '#3b82f6'} strokeWidth={3} />
               <div className="absolute inset-0 flex items-center justify-center p-2 text-center pointer-events-none z-20">
                 <textarea
                    className="w-full bg-transparent text-[10px] leading-tight text-center font-bold resize-none focus:outline-none placeholder-blue-300 text-blue-900 pointer-events-auto"
                    value={node.text}
                    onChange={(e) => {
                      setNodes(nodes.map(n => n.id === node.id ? { ...n, text: e.target.value } : n));
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    placeholder="Escribir..."
                    rows={3}
                 />
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Right Column - Context & Feedback */}
      {state.mode === 'practice' && currentExercise ? (
        <div className="flex flex-col md:col-span-3 md:row-span-6 gap-4 overflow-hidden shrink-0 mt-2 md:mt-0">
          
          <aside className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col shadow-sm flex-1 md:overflow-y-auto">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 shrink-0">Contexto Operativo</div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">📝</div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-xs font-bold text-slate-800 leading-tight">{currentExercise.title}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 leading-tight">{currentExercise.objective}</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">{currentExercise.context}</p>
              </div>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Checklist del Ejercicio</div>
              <ul className="space-y-2 mt-2">
                {currentExercise.expectedSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-[10px] font-medium text-slate-600">
                    <div className="w-3 h-3 mt-0.5 rounded-sm border border-slate-300 shrink-0 flex items-center justify-center bg-white"></div>
                    <span className="flex-1 leading-tight">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <footer className="bg-slate-800 rounded-2xl p-4 flex flex-col shadow-xl text-white shrink-0 min-h-[140px] mb-4 md:mb-0">
             <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Validación</div>
                <span className="px-2 py-0.5 bg-blue-500 rounded text-[9px] font-black text-white">LISTO</span>
             </div>
             <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
               "Construye tu diagrama en el lienzo y presiona <strong>Validar</strong> para evaluar tus conexiones lógicas y los símbolos empleados."
             </p>
             <div className="mt-auto flex items-center justify-between">
                <button 
                  onClick={() => alert('¡Diagrama evaluado! (Simulación de resultado)')} 
                  className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs py-2 h-auto rounded-lg font-bold shadow-md"
                >
                   Validar Diagrama
                </button>
             </div>
          </footer>
        </div>
      ) : (
        <div className="hidden md:flex flex-col md:col-span-3 md:row-span-6 gap-4 overflow-hidden">
          <aside className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center shadow-sm flex-1 text-center">
            <div className="text-slate-200 mb-4"><MousePointer2 className="w-12 h-12" /></div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Modo Libre</div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[200px]">
              Arrastra símbolos desde la paleta hacia el lienzo de trabajo para crear tus propios procesos personalizados.
            </p>
          </aside>
        </div>
      )}

    </div>
  );
};
