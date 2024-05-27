import { Injectable } from '@nestjs/common';
import { Cita } from './citas.entity';
import { RecetasMedicasService } from 'src/recetas-medicas/recetas-medicas.service';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { v4 } from 'uuid';

@Injectable()
export class CitasService {
    medicamento = [new MedicamentosService().crearMedicamento('Pastilla', 'Despues de cada comida', 'dos pastillas')]
    doc = new RecetasMedicasService().CrearDocumentoMedico(this.medicamento, 'No tomar en ayunas');
    
    private citas: Cita[] = [
        {
            id: '1',
            motivo: 'Dolor de panza',
            IDmedico: 'MED-1',
            Observacion: 'Llegar Puntual, y con muestra de heces',
            IDpaciente: '1',
            fecha: new Date('2024-02-20'),
            documentoMedico: [this.doc]
        }
    ]

    CrearCita(motivo: String, IDmedico: String, Observacion: String, IDpaciente: String, fecha: Date, documentoMedico: any[]){
        const nuevaCita = {
            id: v4(),
            motivo,
            IDmedico,
            Observacion,
            IDpaciente,
            fecha,
            documentoMedico
        }
        this.citas.push(nuevaCita);
        return nuevaCita;
    }
    LeerCita(id: String){
        return this.citas.find(cita => cita.id === id)
    }
    EliminarCita(id: String){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
}
