// receta-medicas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { RecetaMedica } from './recetas-medicas.entity';
import { Cita } from '../citas/citas.entity';

import { CrearRecetaMedicaDto } from './dto/recetas-medicas.dto';

@Injectable()
export class RecetaService implements DocumentoMedico {
    constructor(
        @InjectRepository(RecetaMedica)
        private readonly recetaMedicaRepository: Repository<RecetaMedica>,

        @InjectRepository(Cita)
        private readonly citaRepository: Repository<Cita>,
    ) { }

    async crearDocumentoMedico(crearOrdenMedicaDto: CrearRecetaMedicaDto) {
        const { observacion, citaId } = crearOrdenMedicaDto;

        // Crear nueva receta médica
        const nuevaReceta = new RecetaMedica();
        nuevaReceta.observacion = observacion;

        // Si se proporciona citaId, buscar la cita y asociarla
        if (citaId) {
            const cita = await this.citaRepository.findOne({
                where: { id: citaId }
            });
            if (!cita) {
                throw new NotFoundException(`No se encontró la cita con ID ${citaId}`);
            }
            nuevaReceta.cita = cita;
        }

        // Guardar la receta médica en la base de datos
        return await this.recetaMedicaRepository.save(nuevaReceta);
    }
}
