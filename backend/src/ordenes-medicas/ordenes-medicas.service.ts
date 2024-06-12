import { Injectable } from '@nestjs/common';
import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { OrdenMedica } from './ordenes-medicas.entity';
import { ResultadosLabService } from 'src/resultados-lab/resultados-lab.service';
import { ResultadoLab } from 'src/resultados-lab/resultados-lab.entity';
import { ImagenMedica } from 'src/imagenes-medicas/imagenes-medicas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearOrdenMedicaDto, ActualizarOrdenMedicaDto } from './dto/ordenes-medicas.dto';
import { ImagenesMedicasService } from 'src/imagenes-medicas/imagenes-medicas.service';


@Injectable()
export class OrdenesMedicasService implements DocumentoMedico{

    constructor(
        @InjectRepository(OrdenMedica)
        private ordenRepository: Repository<OrdenMedica>,
        private readonly resultLabService: ResultadosLabService,
        private readonly imagenMedService: ImagenesMedicasService
    ){}

    async CrearDocumentoMedico(crearDocumentoDto: CrearOrdenMedicaDto) {
        const {resultadoLabId, imagenMedicasId, observacion} = crearDocumentoDto;

        const resLab = await this.resultLabService.LeerResultadoPorId(resultadoLabId);
        const imgMed = await this.imagenMedService.LeerResultadoPorId(imagenMedicasId);

        const orden = new OrdenMedica();
        orden.resultadoLaboratorio = resLab;
        orden.imagenMedica = imgMed;
        orden.observacion = observacion;

        return this.ordenRepository.save(orden);

    }

    LeerOrdenMedica(){
        return this.ordenRepository.find();
    }

    LeerOrdenMedicaPorId(id: number){
        return this.ordenRepository.findOne({where: {id: id}})
    }

    async ActualizarOrdenMedica(id: number, actualizarOrdenMedicaDto: ActualizarOrdenMedicaDto){
        const orden = await this.ordenRepository.findOne({where: {id: id}});
        this.ordenRepository.merge(orden, actualizarOrdenMedicaDto);
        return this.ordenRepository.save(orden);
    }

    EliminarOrdenMedica(id: number){
        this.ordenRepository.delete(id);
    }
    
}