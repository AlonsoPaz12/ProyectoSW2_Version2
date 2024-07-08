// receta-medicas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { RecetaMedica } from './recetas-medicas.entity';
import { Paciente } from '../pacientes/pacientes.entity';

import { Cita } from '../citas/citas.entity';
import { Medico } from '../medicos/medicos.entity';

import { CrearRecetaMedicaDto } from './dto/recetas-medicas.dto';
import { Medicamento } from '../medicamentos/medicamentos.entity';
@Injectable()
export class RecetaService implements DocumentoMedico {
    constructor(
        @InjectRepository(RecetaMedica)
        private readonly recetaMedicaRepository: Repository<RecetaMedica>,

        @InjectRepository(Cita)
        private readonly citaRepository: Repository<Cita>,

        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,

        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,

        @InjectRepository(Medicamento)
        private readonly medicamentoRepository: Repository<Medicamento>, // Nueva línea
    ) { }
    //...


    async crearDocumentoMedico(crearRecetaMedicaDto: CrearRecetaMedicaDto) {
        const { observacion, citaId, medicoId, pacienteId } = crearRecetaMedicaDto;

        const nuevaReceta = new RecetaMedica();
        nuevaReceta.observacion = observacion;

        if (citaId) {
            const cita = await this.citaRepository.findOne({ where: { id: citaId } });
            if (!cita) {
                throw new NotFoundException(`No se encontró la cita con ID ${citaId}`);
            }
            nuevaReceta.cita = cita;
        }

        if (medicoId) {
            const medico = await this.medicoRepository.findOne({ where: { id: medicoId } });
            if (!medico) {
                throw new NotFoundException(`No se encontró el médico con ID ${medicoId}`);
            }
            nuevaReceta.medico = medico;
        }

        if (pacienteId) {
            const paciente = await this.pacienteRepository.findOne({ where: { id: pacienteId } });
            if (!paciente) {
                throw new NotFoundException(`No se encontró el paciente con ID ${pacienteId}`);
            }
            nuevaReceta.paciente = paciente;
        }

        const recetaGuardada = await this.recetaMedicaRepository.save(nuevaReceta);

        if (citaId) {
            const cita = await this.citaRepository.findOne({ where: { id: citaId } });
            if (cita) {
                cita.receta = recetaGuardada;
                await this.citaRepository.save(cita); // Actualizar la cita con la receta
            }
        }

        return recetaGuardada;
    }

    async obtenerTodasRecetas(): Promise<RecetaMedica[]> {
        return await this.recetaMedicaRepository.find({ relations: ['medicamentos'] });
    }
    async agregarMedicamentoAReceta(recetaId: number, medicamentoId: number) {
        const receta = await this.recetaMedicaRepository.findOne({ where: { id: recetaId }, relations: ['medicamentos'] });
        if (!receta) {
            throw new NotFoundException(`No se encontró la receta con ID ${recetaId}`);
        }

        const medicamento = await this.medicamentoRepository.findOne({ where: { id: medicamentoId } });
        if (!medicamento) {
            throw new NotFoundException(`No se encontró el medicamento con ID ${medicamentoId}`);
        }

        receta.medicamentos.push(medicamento);
        await this.recetaMedicaRepository.save(receta);

        return receta;
    }
    async eliminarMedicamentoDeReceta(recetaId: number, medicamentoId: number) {
        const receta = await this.recetaMedicaRepository.findOne({ where: { id: recetaId }, relations: ['medicamentos'] });
        if (!receta) {
            throw new NotFoundException(`No se encontró la receta con ID ${recetaId}`);
        }

        receta.medicamentos = receta.medicamentos.filter(med => med.id !== medicamentoId);
        await this.recetaMedicaRepository.save(receta);

        return receta;
    }
}
