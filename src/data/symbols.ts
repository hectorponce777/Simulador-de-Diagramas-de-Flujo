import { SymbolDef, ExerciseDef } from '../types';

export const flowSymbols: SymbolDef[] = [
  {
    id: 'start_end',
    type: 'flow',
    name: 'Inicio / Fin',
    functionDesc: 'Marca el inicio o fin del proceso.',
    whenToUse: 'Siempre al abrir o cerrar un proceso.',
    example: 'Inicio: "Recibir queja". Fin: "Queja resuelta".',
    commonError: 'Olvidar ponerlo al final del diagrama.',
    miniActivity: 'Identifica dónde empezaría el proceso de "Tomar una orden".',
    isoUsage: 'Terminal. Forma de óvalo o cápsula.',
    ansiUsage: 'Terminal. Forma de rectángulo redondeado.'
  },
  {
    id: 'process',
    type: 'flow',
    name: 'Proceso',
    functionDesc: 'Representa una acción o actividad ejecutada.',
    whenToUse: 'Para cualquier operación o tarea que modifique estado.',
    example: 'Cocinar la carne, limpiar la mesa, registrar huesped.',
    commonError: 'Describir varias acciones en un solo cuadro.',
    miniActivity: 'Redacta como acción: limpiando mesa => Limpiar mesa.',
    isoUsage: 'Identifica operación del programa o procedimiento.',
    ansiUsage: 'Indica cualquier tipo de función de procesamiento.'
  },
  {
    id: 'decision',
    type: 'flow',
    name: 'Decisión',
    functionDesc: 'Punto donde el flujo puede tomar dos o más caminos.',
    whenToUse: 'Cuando se realiza una pregunta, evaluación o verificación.',
    example: '¿Hay habitación disponible? (Sí / No)',
    commonError: 'No etiquetar las flechas con "Sí" o "No".',
    miniActivity: 'Formula en pregunta: Verificar si hay limones.',
    isoUsage: 'Decisión u operación lógica.',
    ansiUsage: 'Punto de decisión.'
  },
  {
    id: 'io',
    type: 'flow',
    name: 'Entrada / Salida',
    functionDesc: 'Representa la lectura de datos o la salida de información.',
    whenToUse: 'Recibir una solicitud, entregar una cuenta o documento.',
    example: 'Ingresar datos de reserva / Entregar menú.',
    commonError: 'Usarlo para acciones operativas (usar proceso).',
    miniActivity: '¿Entregar cambio es entrada o salida?',
    isoUsage: 'Datos en cualquier medio.',
    ansiUsage: 'Operación de entrada/salida general.'
  },
  {
    id: 'flow',
    type: 'flow',
    name: 'Línea de flujo',
    functionDesc: 'Indica la secuencia lógica y dirección del proceso.',
    whenToUse: 'Para conectar, obligatoriamente, todos los símbolos.',
    example: 'Flecha que va de "Tomar orden" a "Preparar orden".',
    commonError: 'Hacer que converjan flechas sin usar conector.',
    miniActivity: 'Dibuja el sentido correcto.',
    isoUsage: 'Transmisión de control.',
    ansiUsage: 'Dirección del flujo procesal.'
  },
  {
    id: 'connector_in',
    type: 'flow',
    name: 'Conector en página',
    functionDesc: 'Conecta diferentes partes de un diagrama en la misma página.',
    whenToUse: 'Para evitar cruces de líneas largos o confusos.',
    example: 'Salto de un flujo extenso A hacia el conector A.',
    commonError: 'Usarlo para cambiar de hoja.',
    miniActivity: 'Busca un punto de cruce conflictivo.',
    isoUsage: 'Puntos de conexión intrínsecos.',
    ansiUsage: 'Punto de entrada o salida dentro de la misma pag.'
  },
  {
    id: 'connector_out',
    type: 'flow',
    name: 'Conector fuera de página',
    functionDesc: 'Conecta diagramas que continúan en otra página.',
    whenToUse: 'Diagramas muy largos.',
    example: 'Fin hoja 1 -> Conector 1. Inicio hoja 2 -> Conector 1.',
    commonError: 'No etiquetar correctamente el número de página.',
    miniActivity: 'Identifica diagrama largo.',
    isoUsage: 'Conexiones a hojas anexas.',
    ansiUsage: 'Continuación fuera de hoja.'
  },
  {
    id: 'document',
    type: 'flow',
    name: 'Documento',
    functionDesc: 'Un documento impreso o comprobante.',
    whenToUse: 'Se imprime ticket, orden, factura, comprobante.',
    example: 'Cuenta del restaurante impresa.',
    commonError: 'Usarlo para "pantallas" digitales.',
    miniActivity: '¿Un email es un documento? (Mejor usar E/S).',
    isoUsage: 'Salida o entrada de documento escrito.',
    ansiUsage: 'Documento en papel.'
  },
  {
    id: 'stored_data',
    type: 'flow',
    name: 'Datos almacenados',
    functionDesc: 'Archivo o base de datos física/digital.',
    whenToUse: 'Guardar registro de huéspedes, inventario maestro.',
    example: 'Registro histórico de clientes.',
    commonError: 'Usarlo para un archivo temporal (papel).',
    miniActivity: 'Piensa dónde guardas las recetas.',
    isoUsage: 'Almacenamiento de datos general.',
    ansiUsage: 'Dispositivo de acceso directo (Disco).'
  },
  {
    id: 'preparation',
    type: 'flow',
    name: 'Preparación',
    functionDesc: 'Ajuste previo o configuración.',
    whenToUse: 'Set-up o inicialización de variables/ambientes.',
    example: 'Acondicionar el salón para evento.',
    commonError: 'Confundirlo con un proceso normal.',
    miniActivity: 'La mise en place encaja bien aquí.',
    isoUsage: 'Operación que modifica otra instrucción.',
    ansiUsage: 'Inicialización de ruitnas.'
  },
  {
    id: 'subprocess',
    type: 'flow',
    name: 'Subproceso',
    functionDesc: 'Un proceso complejo detallado en otro lugar.',
    whenToUse: 'El proceso ya está normalizado y es extenso.',
    example: 'Subproceso "Atender reclamo" dentro de un flujo general.',
    commonError: 'Describirlo nuevamente en lugar de solo citarlo.',
    miniActivity: 'El proceso "Limpieza detallada" se resume aquí.',
    isoUsage: 'Proceso formalmente estructurado aparte.',
    ansiUsage: 'Módulo predefinido.'
  },
  {
    id: 'comment',
    type: 'flow',
    name: 'Comentario',
    functionDesc: 'Información adicional o aclaración.',
    whenToUse: 'Nota aclaratoria para la persona que lee el diagrama.',
    example: '"Revisar alergias del cliente" adjunto a "Tomar orden".',
    commonError: 'Insertarlo como un cuello de botella en el flujo central.',
    miniActivity: 'Anota una alergia hipotética.',
    isoUsage: 'Anotación o comentario descriptivo.',
    ansiUsage: 'Aclaración ligada a un símbolo.'
  }
];

export const procSymbols: SymbolDef[] = [
  {
    id: 'op',
    type: 'process',
    name: 'Operación',
    functionDesc: 'Cambio de forma, química o estado físico de algo.',
    whenToUse: 'Tarea principal del trabajo.',
    example: 'Picar cebolla, hornear pan.',
    commonError: 'Confundirla con una inspección ("ver estado de cebolla").',
    miniActivity: 'Imagina freír papas.',
    isoUsage: 'No aplica.',
    ansiUsage: 'Operación ASME.'
  },
  {
    id: 'inspect',
    type: 'process',
    name: 'Inspección',
    functionDesc: 'Examen para verificar calidad, cantidad o características.',
    whenToUse: 'Validaciones sin transformar el producto.',
    example: 'Verificar temperatura de la carne.',
    commonError: 'Aplicar correcciones desde este símbolo (sin decisión).',
    miniActivity: 'Verificar presentación de plato.',
    isoUsage: 'No aplica.',
    ansiUsage: 'Inspección ASME.'
  },
  {
    id: 'transport',
    type: 'process',
    name: 'Transporte',
    functionDesc: 'Movimiento de material, empleado u objeto de un lugar a otro.',
    whenToUse: 'Cuando se traslada físico entre áreas.',
    example: 'Llevar plato bandeja a la mesa.',
    commonError: 'Movimientos cortos de mano',
    miniActivity: 'Camina del refri a la estufa.',
    isoUsage: 'No aplica.',
    ansiUsage: 'Transporte ASME.'
  },
  {
    id: 'delay',
    type: 'process',
    name: 'Espera / demora',
    functionDesc: 'Interrupción temporal del proceso por falta de condiciones.',
    whenToUse: 'Reposando masa, esperando cliente.',
    example: 'Marinar carne (si no modifica propiedad, sino que requiere tiempo).',
    commonError: 'No medir el tiempo de espera asociado.',
    miniActivity: 'Fermentación en reposo.',
    isoUsage: 'No aplica.',
    ansiUsage: 'Demora / Retraso ASME.'
  },
  {
    id: 'storage',
    type: 'process',
    name: 'Almacenamiento',
    functionDesc: 'Retención intencional de objetos o material, protegido de uso no autorizado.',
    whenToUse: 'Guardar en bodega o cuarto frío.',
    example: 'Colocar botellas en cava trasera.',
    commonError: 'Confundirlo con demora.',
    miniActivity: 'Diferencia cuarto frío vs. mesa de trabajo.',
    isoUsage: 'No aplica.',
    ansiUsage: 'Almacenaje ASME.'
  },
  {
    id: 'combined',
    type: 'process',
    name: 'Actividad combinada',
    functionDesc: 'Operación e inspección simultánea.',
    whenToUse: 'El operador revisa mientras transforma.',
    example: 'Verificar término de cocción mientras se revuelve.',
    commonError: 'Usarlo para tareas separadas.',
    miniActivity: 'Sazona y prueba a la vez.',
    isoUsage: 'No aplica.',
    ansiUsage: 'Operación-Inspección combinada.'
  }
];

export const allSymbols = [...flowSymbols, ...procSymbols];
