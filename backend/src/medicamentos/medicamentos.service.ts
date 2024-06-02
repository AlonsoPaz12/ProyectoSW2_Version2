import { Injectable } from '@nestjs/common';
import { Medicamento } from './medicamentos.entity';
import { v4 } from 'uuid';

@Injectable()
export class MedicamentosService {

    private medicamentos: Medicamento[] = [
        {
            id: '1',
            tipo: 'a',
            frecuencia: 'b',
            dosis: 'c'
        }
    ]

    crearMedicamento(tipo: String, frecuencia: String, dosis: String){
        const nuevoMedicamento = {
            id: v4(),
            tipo,
            frecuencia,
            dosis
        }
        this.medicamentos.push(nuevoMedicamento);

        return nuevoMedicamento;
    }

    verMedicamento(){
        return this.medicamentos;
    }

    eliminarMedicamento(id: String){
        this.medicamentos = this.medicamentos.filter(medicamento => medicamento.id !== id)
    }

}
