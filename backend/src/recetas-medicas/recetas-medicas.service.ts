import { Injectable } from '@nestjs/common';
import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { ResultadoExamen } from 'src/interfaces/ResultadoExamen';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { RecetaMedica } from './recetas-medicas.entity';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import { v4 } from 'uuid';

@Injectable()
export class RecetasMedicasService implements DocumentoMedico{
    
    variable = new MedicamentosService().crearMedicamento('Pastilla', 'Despues de cada comida', 'dos pastillas')
    
    private recetasMedicas: RecetaMedica[] = [
        {
            id: '1',
            medicamento: [this.variable],
            observacion: 'Contraindicación: La pastilla da sueño',
        }
    ]
    
    CrearDocumentoMedico(medicamento: any[], observacion: String) {
        const nuevaRecetaMedica = {
            id: v4(),
            medicamento,
            observacion
        }
        this.recetasMedicas.push(nuevaRecetaMedica);
        return nuevaRecetaMedica;
    }

    LeerReceta(id: String){
        return this.recetasMedicas.find(receta => receta.id === id)
    }

    EliminarReceta(id: String){
        this. recetasMedicas = this.recetasMedicas.filter(receta => receta.id !== id)
    }

}
