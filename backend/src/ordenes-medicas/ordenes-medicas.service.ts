// orden-medica.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { OrdenMedica } from './ordenes-medicas.entity';
import { Cita } from '../citas/citas.entity';

import { CrearOrdenMedicaDto } from './dto/ordenes-medicas.dto';

@Injectable()
export class OrdenMedicaService implements DocumentoMedico {
    constructor(
        @InjectRepository(OrdenMedica)
        private readonly ordenMedicaRepository: Repository<OrdenMedica>,
        
        @InjectRepository(Cita)
        private readonly citaRepository: Repository<Cita>,
    ) {}

    async crearDocumentoMedico(crearOrdenMedicaDto: CrearOrdenMedicaDto): Promise<OrdenMedica> {
        const { observacion, citaId } = crearOrdenMedicaDto;

        // Crear nueva orden médica
        const nuevaOrden = new OrdenMedica();
        nuevaOrden.observacion = observacion;

        // Si se proporciona citaId, buscar la cita y asociarla
        if (citaId) {
            const cita = await this.citaRepository.findOne({
                where: { id: citaId }
            });
            if (!cita) {
                throw new NotFoundException(`No se encontró la cita con ID ${citaId}`);
            }
            nuevaOrden.cita = cita;
        }

        // Guardar la orden médica en la base de datos
        return await this.ordenMedicaRepository.save(nuevaOrden);
    }
}
