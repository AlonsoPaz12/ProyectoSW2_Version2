import { Injectable } from '@nestjs/common';
import { Medicamento } from './medicamentos.entity';
import { v4 } from 'uuid';
import { Console } from 'console';

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

    crearMedicamento(tipo: string, frecuencia: string, dosis: string){
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

    eliminarMedicamento(id: string){
        this.medicamentos = this.medicamentos.filter(medicamento => medicamento.id !== id)
    }

}
