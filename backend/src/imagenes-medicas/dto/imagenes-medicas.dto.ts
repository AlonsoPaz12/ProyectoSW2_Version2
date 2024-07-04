export class CrearImagenMedicaDto {
  nombrePaciente: string;
  ExamDate: string;
  tipo: string;
  indicaciones: string;
  NombreDoc: string;
  NotasMedic: string;
  imagen: string;
  ordenid: number; 
}


export class ActualizarImagenMedicaDto {
  nombrePaciente?: string;
  ExamDate?: string;
  tipo?: string;
  indicaciones?: string;
  NombreDoc?: string;
  NotasMedic?: string;
  imagen?: string;
  ordenid?: number;  
}