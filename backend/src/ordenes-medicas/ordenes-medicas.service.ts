// orden-medica.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { OrdenMedica } from './ordenes-medicas.entity';
import { Cita } from '../citas/citas.entity';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';

import { CrearOrdenMedicaDto } from './dto/ordenes-medicas.dto';

@Injectable()
export class OrdenMedicaService implements DocumentoMedico {
    constructor(
        @InjectRepository(OrdenMedica)
        private readonly ordenMedicaRepository: Repository<OrdenMedica>,
        
        @InjectRepository(Cita)
        private readonly citaRepository: Repository<Cita>,
        
        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,
        
        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,
    ) {}

    async crearDocumentoMedico(crearOrdenMedicaDto: CrearOrdenMedicaDto): Promise<OrdenMedica> {
        const { observacion, citaId, medicoId, pacienteId } = crearOrdenMedicaDto;

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

        if (medicoId) {
            const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });
            if (!medico) {
                throw new NotFoundException(`No se encontró el médico con ID ${medicoId}`);
            }
            nuevaOrden.medico = medico;
        }

        if (pacienteId) {
            const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
            if (!paciente) {
                throw new NotFoundException(`No se encontró el paciente con ID ${pacienteId}`);
            }
            nuevaOrden.paciente = paciente;
        }

        const ordenGuardada = await this.ordenMedicaRepository.save(nuevaOrden);

        if (citaId) {
            const cita = await this.citaRepository.findOne({ where: { id: citaId } });
            if (cita) {
                cita.ordenMedica = ordenGuardada;
                await this.citaRepository.save(cita); // Actualizar la cita
            }
        }

        return ordenGuardada;
    }

    async obtenerTodasOrdenes(): Promise<OrdenMedica[]> {
        return await this.ordenMedicaRepository.find();
    }
}
