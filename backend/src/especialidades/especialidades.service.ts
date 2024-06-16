// especialidades.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from './especialidades.entity';
import { CrearEspecialidadDto } from './dto/especialidad.dto';

@Injectable()
export class EspecialidadService {
    constructor(
        @InjectRepository(Especialidad)
        private readonly especialidadRepository: Repository<Especialidad>,
    ) {}

    async crearEspecialidad(crearEspecialidadDto: CrearEspecialidadDto) {
        const especialidad = this.especialidadRepository.create(crearEspecialidadDto);
        return await this.especialidadRepository.save(especialidad);
    }

    async obtenerTodasEspecialidades() {
        return await this.especialidadRepository.find();
    }

    async obtenerEspecialidadPorId(id: number) {
        return await this.especialidadRepository.findOne({
            where: { id_especialidad: id },
        });
    }

    async buscarEspecialidadesPorNombre(nombre: string) {
        return await this.especialidadRepository.find({ where: { nombre_especialidad: nombre } });
    }
}
