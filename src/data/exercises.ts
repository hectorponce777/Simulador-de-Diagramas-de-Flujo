import { ExerciseDef } from '../types';

export const flowExercises: ExerciseDef[] = [
  {
    id: 'fe1',
    type: 'flow',
    title: 'Reservación de habitación en hotel',
    context: 'Un cliente llama para reservar una semana en el hotel.',
    objective: 'Mapear la validación y confirmación de reserva.',
    requiredSymbols: ['start_end', 'process', 'decision', 'start_end'],
    expectedSteps: [
      'Inicio',
      'Cliente solicita habitación',
      'Verificar disponibilidad',
      '¿Hay habitación disponible?',
      'Si sí: registrar datos del cliente',
      'Confirmar reservación',
      'Enviar comprobante',
      'Fin',
      'Si no: ofrecer otra fecha o categoría',
      'Fin'
    ]
  },
  {
    id: 'fe2',
    type: 'flow',
    title: 'Toma de orden en restaurante',
    context: 'Un cliente llega a una mesa y el mesero atiende.',
    objective: 'Diagramar el flujo lógico desde recibir comensal hasta enviar comanda.',
    requiredSymbols: ['start_end', 'process', 'io', 'decision', 'start_end'],
    expectedSteps: [
      'Inicio',
      'Mesero recibe al cliente',
      'Entrega menú',
      'Cliente elige platillo',
      'Verificar disponibilidad del platillo',
      '¿Platillo disponible?',
      'Si sí: registrar orden',
      'Enviar orden a cocina',
      'Servir alimento',
      'Fin',
      'Si no: sugerir alternativa',
      'Regresar a elección de platillo'
    ]
  },
  {
    id: 'fe3',
    type: 'flow',
    title: 'Preparación básica de una bebida',
    context: 'Un bartender recibe la comanda de un cóctel.',
    objective: 'Revisar receta y verificar insumos.',
    requiredSymbols: ['start_end', 'process', 'decision', 'start_end'],
    expectedSteps: [
      'Inicio',
      'Revisar receta',
      'Reunir ingredientes',
      'Verificar insumos completos',
      '¿Ingredientes completos?',
      'Si sí: preparar bebida',
      'Presentar bebida',
      'Fin',
      'Si no: solicitar insumo faltante',
      'Esperar reposición',
      'Continuar preparación'
    ]
  },
  {
    id: 'fe4',
    type: 'flow',
    title: 'Atención de queja de huésped',
    context: 'Un huésped llama quejándose porque no hay agua caliente.',
    objective: 'Manejar la queja con decisión de solución inmediata o escalada.',
    requiredSymbols: ['start_end', 'process', 'io', 'decision', 'start_end'],
    expectedSteps: [
      'Inicio',
      'Recibir queja',
      'Registrar información',
      'Clasificar tipo de queja',
      '¿Puede resolverse en recepción?',
      'Si sí: aplicar solución inmediata',
      'Confirmar satisfacción del huésped',
      'Fin',
      'Si no: escalar al área responsable',
      'Dar seguimiento',
      'Confirmar solución',
      'Fin'
    ]
  },
  {
    id: 'fe5',
    type: 'flow',
    title: 'Control de inventario de cocina',
    context: 'El chef llega en la mañana a verificar los insumos del día.',
    objective: 'Revisar existencias y decidir si comprar.',
    requiredSymbols: ['start_end', 'process', 'decision', 'stored_data', 'start_end'],
    expectedSteps: [
      'Inicio',
      'Revisar existencias',
      'Comparar con stock mínimo',
      '¿Hay faltantes?',
      'Si sí: generar solicitud de compra',
      'Enviar solicitud a compras',
      'Fin',
      'Si no: actualizar inventario',
      'Fin'
    ]
  }
];

export const procExercises: ExerciseDef[] = [
  {
    id: 'pe1',
    type: 'process',
    title: 'Recepción de insumos en cocina',
    context: 'Llega un proveedor de carne fresca.',
    objective: 'Trazar la operación e inspección de recepción.',
    requiredSymbols: ['op', 'transport', 'inspect', 'proc_decision', 'storage', 'proc_start'],
    expectedSteps: [
      'Recibir proveedor',
      'Descargar insumos',
      'Transportar insumos al área de revisión',
      'Inspeccionar calidad y cantidad',
      '¿Cumple especificaciones?',
      'Si sí: almacenar en bodega',
      'Registrar entrada',
      'Fin',
      'Si no: rechazar producto',
      'Notificar a compras',
      'Fin'
    ]
  },
  {
    id: 'pe2',
    type: 'process',
    title: 'Mise en place para servicio',
    context: 'Preparativos de cocina antes de abrir el restaurante.',
    objective: 'Preparación, cortes y almacenamiento intermedio.',
    requiredSymbols: ['op', 'storage', 'proc_start'],
    expectedSteps: [
      'Revisar menú del día',
      'Consultar receta estándar',
      'Reunir ingredientes',
      'Lavar y desinfectar',
      'Cortar y porcionar',
      'Colocar en recipientes',
      'Etiquetar',
      'Almacenar temporalmente',
      'Fin'
    ]
  },
  {
    id: 'pe3',
    type: 'process',
    title: 'Servicio de alimentos en restaurante',
    context: 'Entregar la comida de cocina a la mesa.',
    objective: 'Incluir transporte y entrega.',
    requiredSymbols: ['op', 'inspect', 'transport', 'proc_start'],
    expectedSteps: [
      'Recibir comanda',
      'Preparar platillo',
      'Inspeccionar presentación',
      'Transportar platillo a mesa',
      'Entregar al cliente',
      'Confirmar satisfacción',
      'Retirar servicio',
      'Fin'
    ]
  },
  {
    id: 'pe4',
    type: 'process',
    title: 'Limpieza de habitación en hotel',
    context: 'Camarista prepara la habitación entre salidas y entradas.',
    objective: 'Movimientos de la camarista.',
    requiredSymbols: ['op', 'transport', 'inspect', 'proc_start'],
    expectedSteps: [
      'Recibir asignación de habitación',
      'Transportar carrito de limpieza',
      'Verificar estado de habitación',
      'Retirar blancos usados',
      'Limpiar baño',
      'Tender cama',
      'Reponer amenidades',
      'Inspeccionar habitación',
      'Reportar habitación lista',
      'Fin'
    ]
  },
  {
    id: 'pe5',
    type: 'process',
    title: 'Elaboración de receta estándar',
    context: 'El chef diseñando un platillo nuevo.',
    objective: 'Pasos de estandarización documental.',
    requiredSymbols: ['op', 'inspect', 'proc_document', 'proc_start'],
    expectedSteps: [
      'Seleccionar platillo',
      'Listar ingredientes',
      'Definir cantidades',
      'Calcular merma',
      'Establecer procedimiento',
      'Realizar prueba de preparación',
      'Evaluar resultado',
      'Ajustar receta',
      'Registrar receta final',
      'Fin'
    ]
  }
];

export const allExercises = [...flowExercises, ...procExercises];
