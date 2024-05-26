import { Injectable } from '@nestjs/common';
import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { OrdenMedica } from './ordenes-medicas.entity';
import { v4 } from 'uuid';
import { ResultadoExamen } from 'src/interfaces/ResultadoExamen';
import { ResultadosLabService } from 'src/resultados-lab/resultados-lab.service';


@Injectable()
export class OrdenesMedicasService implements DocumentoMedico{
    variable = new ResultadosLabService().crearResultado('Vih','Positivo', 'Becerra')
    private ordenesMedicas: OrdenMedica[] = [
        {
            id: '1',
            resultadosExamen: [this.variable],
            observacion: 'ga',
        }
    ]

    //Crea la orden medica
    CrearDocumentoMedico(resultadosExamen: any[], observacion: String) {
        const nuevaOrdenMedica = {
            id: v4(),
            resultadosExamen,
            observacion
        }
        this.ordenesMedicas.push(nuevaOrdenMedica);
        return nuevaOrdenMedica;
    }

    
    LeerOrdenMedica(id: String){
        return this.ordenesMedicas.find(orden => orden.id === id);navigator
    }
    EliminarOrdenMedica(id: String): void{
        this.ordenesMedicas = this.ordenesMedicas.filter(orden => orden.id !== id)
    }
    
}