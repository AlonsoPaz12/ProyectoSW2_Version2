import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ImagenMedica } from './imagenes-medicas.entity';
import { OrdenMedica } from '../ordenes-medicas/ordenes-medicas.entity';
import { CrearImagenMedicaDto, ActualizarImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Injectable()
export class ImagenesMedicasService {
    constructor(
        @InjectRepository(ImagenMedica)
        private readonly imagenMedicaRepository: Repository<ImagenMedica>,
        
        @InjectRepository(OrdenMedica)
        private readonly ordenMedicaRepository: Repository<OrdenMedica>,
    ) {}

    async crearImagenMedica(crearImagenMedicaDto: CrearImagenMedicaDto) {
        const { ordenmedicaId, ...imagenData } = crearImagenMedicaDto;

        const ordenMedica = await this.ordenMedicaRepository.findOne({
            where: { id: ordenmedicaId },
        });

        if (!ordenMedica) {
            throw new NotFoundException(`Orden médica con ID ${ordenmedicaId} no encontrada`);
        }

        const nuevaImagen = this.imagenMedicaRepository.create({
            ...imagenData,
            orden: ordenMedica,
        });

        return await this.imagenMedicaRepository.save(nuevaImagen);
    }

    async mostrarImagenesMedicas() {
        return await this.imagenMedicaRepository.find({ relations: ['orden'] });
    }

    async obtenerImagenMedicaPorId(id: number) {
        const imagen = await this.imagenMedicaRepository.findOne({
            where: { id },
            relations: ['orden'],
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
            where: { id },
        });

        if (!imagen) {
            throw new NotFoundException(`Imagen médica con ID ${id} no encontrada`);
        }

        return await this.imagenMedicaRepository.remove(imagen);
    }
}
