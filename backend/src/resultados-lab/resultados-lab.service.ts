import { Injectable } from '@nestjs/common';
import { ResultadoExamen } from 'src/interfaces/ResultadoExamen';
import { ResultadoLab } from './resultados-lab.entity';
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearResultadoLabDto, ActualizarResultadoLabDto } from './dto/resultados-lab.dto';
import { OrdenesMedicasService } from 'src/ordenes-medicas/ordenes-medicas.service';


@Injectable()
export class ResultadosLabService implements ResultadoExamen{

    constructor(
        @InjectRepository(ResultadoLab)
        private labRepository: Repository<ResultadoLab>,
        private readonly ordenService: OrdenesMedicasService
    ){}
    
    LeerResultados() {
        return this.labRepository.find()
    }

    async crearResultado(crearResultadoDto: CrearResultadoLabDto) {
        const { tipo, resultado, nombrePaciente, ordenmedicaId } = crearResultadoDto;

        const orden = await this.ordenService.LeerOrdenMedicaPorId(ordenmedicaId)

        if (!orden) {
            throw new Error(`No se encontró ninguna orden medica con el ID ${ordenmedicaId}`);
        }

        const labR = new ResultadoLab();
        labR.tipo = tipo;
        labR.resultado = resultado;
        labR.nombrePaciente = nombrePaciente;
        labR.orden = orden;

        return this.labRepository.save(labR);
    }

    LeerResultadoPorId(id: number) {
        return this.labRepository.findOne({where: {id: id}});
    }

    async ActualizarResultado(id: number, actualizarResultadoLabDto: ActualizarResultadoLabDto) {
        const labR = await this.labRepository.findOne({where: {id: id}});
        this.labRepository.merge(labR, actualizarResultadoLabDto);
        return this.labRepository.save(labR);
    }

    EliminarResultado(id: number){
        this.labRepository.delete(id);
        return true;
    }

}
