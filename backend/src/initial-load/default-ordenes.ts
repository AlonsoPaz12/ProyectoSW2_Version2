// src/default-ordenes.ts

import { CrearOrdenMedicaDto } from 'src/ordenes-medicas/dto/ordenes-medicas.dto';

export const defaultOrdenes: CrearOrdenMedicaDto[] = [
  {
    observacion: "Orden para análisis de sangre",
    citaId: 1,
    medicoId: 1,
    pacienteId: 1,
  },
  {
    observacion: "Orden para radiografía de tórax",
    citaId: 2,
    medicoId: 2,
    pacienteId: 2,
  },
  {
    observacion: "Orden para resonancia magnética",
    citaId: 3,
    medicoId: 3,
    pacienteId: 3,
  },
  {
    observacion: "Orden para prueba de esfuerzo",
    citaId: 4,
    medicoId: 4,
    pacienteId: 4,
  },
  {
    observacion: "Orden para ecografía abdominal",
    citaId: 5,
    medicoId: 5,
    pacienteId: 5,
  },
  {
    observacion: "Orden para prueba de función pulmonar",
    citaId: 6,
    medicoId: 6,
    pacienteId: 6,
  },
  {
    observacion: "Orden para electrocardiograma",
    citaId: 7,
    medicoId: 7,
    pacienteId: 7,
  },
  {
    observacion: "Orden para colonoscopia",
    citaId: 8,
    medicoId: 8,
    pacienteId: 8,
  },
  {
    observacion: "Orden para prueba de alergias",
    citaId: 9,
    medicoId: 9,
    pacienteId: 9,
  },
  {
    observacion: "Orden para examen de la vista",
    citaId: 10,
    medicoId: 10,
    pacienteId: 10,
  }
];
