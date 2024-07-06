import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { OrdenMedica } from './ordenes-medicas.entity';
import { Cita } from '../citas/citas.entity';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';
import { ImagenMedica } from '../imagenes-medicas/imagenes-medicas.entity';

import { CrearOrdenMedicaDto, ActualizarOrdenMedicaDto } from './dto/ordenes-medicas.dto';

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

        @InjectRepository(ImagenMedica)
        private readonly imagenMedicaRepository: Repository<ImagenMedica>,
    ) {}

    async crearDocumentoMedico(crearOrdenMedicaDto: CrearOrdenMedicaDto): Promise<OrdenMedica> {
        const { observacion, citaId, medicoId, pacienteId } = crearOrdenMedicaDto;

        const nuevaOrden = new OrdenMedica();
        nuevaOrden.observacion = observacion;

        if (citaId) {
            const cita = await this.citaRepository.findOne({ where: { id: citaId } });
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
                await this.citaRepository.save(cita);
            }
        }

        return ordenGuardada;
    }

    async obtenerTodasOrdenes(): Promise<OrdenMedica[]> {
        return await this.ordenMedicaRepository.find();
    }

    async findAll(): Promise<OrdenMedica[]> {
        return this.ordenMedicaRepository.find({ relations: ['imagenesMedicas', 'cita', 'medico', 'paciente'] });
    }

    async findOne(id: number): Promise<OrdenMedica> {
        const ordenMedica = await this.ordenMedicaRepository.findOne({ where: { id }, relations: ['imagenesMedicas', 'cita', 'medico', 'paciente'] });
        if (!ordenMedica) {
            throw new NotFoundException(`Orden Medica con ID ${id} no encontrada`);
        }
        return ordenMedica;
    }

    async update(id: number, updateOrdenMedicaDto: ActualizarOrdenMedicaDto): Promise<OrdenMedica> {
        const { imagenMedicasId, citaId, ...updateData } = updateOrdenMedicaDto;

        if (imagenMedicasId) {
            const imagenesMedicas = await this.imagenMedicaRepository.findByIds(imagenMedicasId);
            updateData['imagenesMedicas'] = imagenesMedicas;
        }

        if (citaId) {
            const cita = await this.citaRepository.findOne({ where: { id: citaId } });
            updateData['cita'] = cita;
        }

        await this.ordenMedicaRepository.update(id, updateData);
        const updatedOrdenMedica = await this.ordenMedicaRepository.findOne({ where: { id }, relations: ['imagenesMedicas', 'cita', 'medico', 'paciente'] });
        if (!updatedOrdenMedica) {
            throw new NotFoundException(`Orden Medica con ID ${id} no encontrada`);
        }
        return updatedOrdenMedica;
    }

    async remove(id: number): Promise<void> {
        const result = await this.ordenMedicaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Orden Medica con ID ${id} no encontrada`);
        }
    }
}
