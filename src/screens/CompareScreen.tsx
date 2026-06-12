import React from 'react';
import { motion } from 'motion/react';
import { AppState, ScreenId } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft } from 'lucide-react';

export const CompareScreen = ({ onNavigate }: { onNavigate: (s: ScreenId) => void }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => onNavigate('welcome')}><ArrowLeft className="w-4 h-4 mr-2"/> Volver</Button>
        <h1 className="text-3xl font-bold text-slate-800">Comparador de Estándares</h1>
      </div>
      
      <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl mb-8">
        <p className="text-orange-800 text-center font-medium">
          <strong>Nota educativa:</strong> Ambos estándares ayudan a representar procesos de manera clara, lógica y ordenada; la selección depende del contexto académico o institucional.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
           <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200">
             <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold tracking-wider mb-4">ESTÁNDAR MUNDIAL</div>
             <h2 className="text-2xl font-bold mb-4">ISO 5807:1985</h2>
             <p className="text-slate-600 mb-6">Símbolos y convenciones para diagramas de flujo de datos, programas y sistemas.</p>
             <ul className="space-y-3 text-sm text-slate-700">
               <li className="flex items-start gap-2">✓ <strong>Enfoque:</strong> Sistemas informáticos y procesamiento de datos.</li>
               <li className="flex items-start gap-2">✓ <strong>Formas:</strong> Distingue fuertemente medios físicos de físicos (disco frente a cinta).</li>
               <li className="flex items-start gap-2">✓ <strong>Aplicación Gastronómica:</strong> Sistemas de reservación, facturación electrónica, bases de datos de inventario.</li>
             </ul>
           </div>
           <div className="p-8">
             <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wider mb-4">ESTÁNDAR AMERICANO</div>
             <h2 className="text-2xl font-bold mb-4">ANSI X3.5</h2>
             <p className="text-slate-600 mb-6">Símbolos de diagramas de flujo y su uso en procesamiento de información.</p>
             <ul className="space-y-3 text-sm text-slate-700">
               <li className="flex items-start gap-2">✓ <strong>Enfoque:</strong> Lógica de negocio y programación más genérica.</li>
               <li className="flex items-start gap-2">✓ <strong>Formas:</strong> Formas más generalizadas y estandarizadas (ej. almacenamiento general).</li>
               <li className="flex items-start gap-2">✓ <strong>Aplicación Gastronómica:</strong> Diagramación de servicio al cliente, manual de operaciones, flujo de pisos.</li>
             </ul>
           </div>
        </div>
        
        <div className="overflow-x-auto border-t border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4 font-semibold">Concepto</th>
                <th className="p-4 font-semibold">ISO 5807:1985</th>
                <th className="p-4 font-semibold">ANSI X3.5</th>
                <th className="p-4 font-semibold">Ejemplo turístico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium">Terminal (Inicio/Fin)</td>
                <td className="p-4">Óvalo exacto</td>
                <td className="p-4">Rectángulo redondeado</td>
                <td className="p-4 text-slate-500">Llegada del huésped.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Entrada / Salida</td>
                <td className="p-4">Cualquier medio general (Paralelogramo)</td>
                <td className="p-4">Paralelogramo</td>
                <td className="p-4 text-slate-500">Recibir formulario de queja.</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Almacenamiento de datos</td>
                <td className="p-4">Distinción por dispositivo (Cinta, disco)</td>
                <td className="p-4">Símbolo general de disco</td>
                <td className="p-4 text-slate-500">Guardar perfil de alergias.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
