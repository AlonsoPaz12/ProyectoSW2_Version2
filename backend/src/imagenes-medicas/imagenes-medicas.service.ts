import { Injectable } from '@nestjs/common';
import { ResultadoExamen } from 'src/interfaces/ResultadoExamen';
import { ImagenMedica } from './imagenes-medicas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CrearImagenMedicaDto, ActualizarImagenMedicaDto} from './dto/imagenes-medicas.dto';
import { OrdenesMedicasService } from 'src/ordenes-medicas/ordenes-medicas.service';

@Injectable()
export class ImagenesMedicasService implements ResultadoExamen{

    constructor(
        @InjectRepository(ImagenMedica)
        private imagenRepository: Repository<ImagenMedica>,
        private readonly ordenService: OrdenesMedicasService
    ){}

    LeerResultados(){
        return this.imagenRepository.find();
    }
    
    async crearResultado(crearImagenDto: CrearImagenMedicaDto) {
        const { tipo, imagen, nombrePaciente, ordenmedicaId } = crearImagenDto;

        const orden = await this.ordenService.LeerOrdenMedicaPorId(ordenmedicaId);
        
        if (!orden) {
            throw new Error(`No se encontró ninguna orden medica con el ID ${ordenmedicaId}`);
          }

        const imagenM = new ImagenMedica();
        imagenM.tipo = tipo;
        imagenM.imagen = imagen;
        imagenM.nombrePaciente = nombrePaciente;
        imagenM.orden = orden; 

        return this.imagenRepository.save(imagenM);

    }

    LeerResultadoPorId(id: number) {
        return this.imagenRepository.findOne({where: {id: id}});
    }

    async ActualizarResultado(id: number, actualizarImagenDto: ActualizarImagenMedicaDto) {
        const imagenM = await this.imagenRepository.findOne({where: {id: id}});
        this.imagenRepository.merge(imagenM,actualizarImagenDto);
        return this.imagenRepository.save(imagenM);
    }

    EliminarResultado(id: number) {
        this.imagenRepository.delete(id);
        return true;
    }

}
