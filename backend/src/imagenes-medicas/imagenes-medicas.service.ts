import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';
import { CrearImagenMedicaDto, ActualizarImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Injectable()
export class ImagenMedicaService {
  constructor(
    @InjectRepository(ImagenMedica)
    private readonly imagenMedicaRepository: Repository<ImagenMedica>,
  ) {}

    async crearImagenMedica(crearImagenMedicaDto: CrearImagenMedicaDto) {
        const nuevaImagen = this.imagenMedicaRepository.create(crearImagenMedicaDto);
        return await this.imagenMedicaRepository.save(nuevaImagen);
    }

    async mostrarImagenesMedicas() {
        return await this.imagenMedicaRepository.find();
    }

    async obtenerImagenMedicaPorId(id: number) {
        const imagen = await this.imagenMedicaRepository.findOne({
            where: { id }
        });

        if (!imagen) {
            throw new NotFoundException(`Imagen médica con ID ${id} no encontrada`);
        }

        return imagen;
    }

    async actualizarImagenMedica(id: number, actualizarImagenMedicaDto: ActualizarImagenMedicaDto) {
        const imagen = await this.imagenMedicaRepository.findOne({
            where: { id },
        });

        if (!imagen) {
            throw new NotFoundException(`Imagen médica con ID ${id} no encontrada`);
        }

        Object.assign(imagen, actualizarImagenMedicaDto);
        return await this.imagenMedicaRepository.save(imagen);
    }

    async eliminarImagenMedica(id: number) {
        const imagen = await this.imagenMedicaRepository.findOne({
            where: { id }
        });

        if (!imagen) {
            throw new NotFoundException(`Imagen médica con ID ${id} no encontrada`);
        }

        return await this.imagenMedicaRepository.remove(imagen);
    }
}
