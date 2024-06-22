// src/default-citas.ts

import { CrearCitaDto } from "src/pacientes/dto/paciente.dto";

export const defaultCitas: CrearCitaDto[] = [
    {
        motivo: "Consulta de rutina",
        observacion: "Paciente con historial de hipertensión",
        IDmedico: 1,
        IDpaciente: 1,
        fecha: new Date("2024-06-20"),
        hora: "10:00",
        diagnostico: "tos"
    },
    {
        motivo: "Revisión anual",
        observacion: "Paciente sin antecedentes importantes",
        IDmedico: 2,
        IDpaciente: 2,
        fecha: new Date("2024-06-21"),
        hora: "11:00",
        diagnostico: "sin diagnóstico"
    },
    {
        motivo: "Chequeo post-operatorio",
        observacion: "Recuperación de cirugía de rodilla",
        IDmedico: 3,
        IDpaciente: 3,
        fecha: new Date("2024-06-22"),
        hora: "09:00",
        diagnostico: "sin complicaciones"
    },
    {
        motivo: "Consulta de control",
        observacion: "Control de diabetes",
        IDmedico: 4,
        IDpaciente: 4,
        fecha: new Date("2024-06-23"),
        hora: "14:00",
        diagnostico: "estabilidad"
    },
    {
        motivo: "Revisión de resultados",
        observacion: "Resultados de análisis de sangre",
        IDmedico: 5,
        IDpaciente: 5,
        fecha: new Date("2024-06-24"),
        hora: "08:30",
        diagnostico: "sin diagnóstico"
    },
    {
        motivo: "Consulta de seguimiento",
        observacion: "Seguimiento de tratamiento para asma",
        IDmedico: 6,
        IDpaciente: 6,
        fecha: new Date("2024-06-25"),
        hora: "15:00",
        diagnostico: "mejoría"
    },
    {
        motivo: "Consulta de rutina",
        observacion: "Paciente con colesterol alto",
        IDmedico: 7,
        IDpaciente: 7,
        fecha: new Date("2024-06-26"),
        hora: "13:00",
        diagnostico: "controlado"
    },
    {
        motivo: "Evaluación inicial",
        observacion: "Paciente nuevo con antecedentes familiares de cáncer",
        IDmedico: 8,
        IDpaciente: 8,
        fecha: new Date("2024-06-27"),
        hora: "10:30",
        diagnostico: "sin diagnóstico"
    },
    {
        motivo: "Consulta de control",
        observacion: "Control de hipertensión",
        IDmedico: 9,
        IDpaciente: 9,
        fecha: new Date("2024-06-28"),
        hora: "11:30",
        diagnostico: "mejoría"
    },
    {
        motivo: "Consulta de seguimiento",
        observacion: "Seguimiento de tratamiento para artritis",
        IDmedico: 10,
        IDpaciente: 10,
        fecha: new Date("2024-06-29"),
        hora: "09:30",
        diagnostico: "estabilidad"
    }
];