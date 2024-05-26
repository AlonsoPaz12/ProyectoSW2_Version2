import { Injectable } from '@nestjs/common';
import { ResultadoExamen } from 'src/interfaces/ResultadoExamen';
import { ResultadoLab } from './resultados-lab.entity';
import { v4 } from 'uuid';


@Injectable()
export class ResultadosLabService implements ResultadoExamen{

    private resultadosLab: ResultadoLab[] = [
        {
            id: '1',
            tipo: 'VIH',
            resultado: 'positivo',
            Nombrepaciente: 'Becerra'
        }
    ]

    crearResultado(tipo: String, resultado: String, Nombrepaciente: String) {
        const nuevoResultadoLab = {
            id: v4(),
            tipo,
            resultado,
            Nombrepaciente  
        }
        this.resultadosLab.push(nuevoResultadoLab);
        return nuevoResultadoLab;
    }
    LeerResultado(id: String) {
        return this.resultadosLab.find(resultado => resultado.id === id);
    }
    EliminarResultado(id: String): void{
        this.resultadosLab = this.resultadosLab.filter(resultado => resultado.id !== id);
    }

}
