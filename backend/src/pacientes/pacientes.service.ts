//pacientes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitasService } from 'src/citas/citas.service';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { RecetasMedicasService } from 'src/recetas-medicas/recetas-medicas.service';

import { Paciente } from './pacientes.entity';
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";

import { CrearPacienteDto, ActualizarPacienteDto } from './dto/paciente.dto';

@Injectable()
export class PacientesService {

    constructor(
        @InjectRepository(Paciente)
        private pacienteRepository: Repository<Paciente>,
        private readonly recetasMedicasService: RecetasMedicasService,
        private readonly citasService: CitasService,
        private readonly medicamentosService: MedicamentosService,
    ) {}

    async crearPaciente(crearPacienteDto: CrearPacienteDto) {
        const nuevoPaciente = this.pacienteRepository.create(crearPacienteDto);
        return this.pacienteRepository.save(nuevoPaciente);
    }

    async actualizarPaciente(idPaciente: number, actualizarPacienteDto: ActualizarPacienteDto) {
        let paciente = await this.pacienteRepository.findOne({
            where: { id: idPaciente },
            relations: ['citas']
        });

        if (!paciente) {
            throw new NotFoundException(`Paciente con ID ${idPaciente} no encontrado.`);
        }

        Object.assign(paciente, actualizarPacienteDto);

        return this.pacienteRepository.save(paciente);
    }

    async verPacientes() {
        return this.pacienteRepository.find();
    }

    async obtenerPacientePorId(id: number) {
        return this.pacienteRepository.findOne({
            where: { id },
            relations: ['citas']
        });
    }

    async registrarCita(motivo: string, IDmedico: number, observacion: string, IDpaciente: number, fecha: Date, documentoMedico: (RecetaMedica | any)[]) {
        const nuevaCita = await this.citasService.crearCita({
            motivo,
            IDmedico,
            observacion,
            IDpaciente,
            fecha,
            documentoMedico,
        });

        try {
            let paciente = await this.pacienteRepository.findOne({
                where: { id: IDpaciente },
                relations: ['citas']
            });

            if (!paciente) {
                throw new Error(`No se encontró al paciente con ID ${IDpaciente}`);
            }

            paciente.citas.push(nuevaCita);
            await this.pacienteRepository.save(paciente);
            return nuevaCita;
        } catch (error) {
            throw new Error(`Error al registrar la cita: ${error.message}`);
        }
    }


    async anularCita(idCita: number, IDpaciente: number) {
        try {
            let paciente = await this.pacienteRepository
                .createQueryBuilder('paciente')
                .leftJoinAndSelect('paciente.citas', 'cita')
                .where('paciente.id = :id', { id: IDpaciente })
                .getOneOrFail();

            paciente.citas = paciente.citas.filter(cita => cita.id !== idCita);
            await this.pacienteRepository.save(paciente);
            await this.citasService.eliminarCita(idCita);
        } catch (error) {
            throw new Error(`No se pudo encontrar al paciente con ID ${IDpaciente}`);
        }
    }

    async visualizarHistorialCitas(IDpaciente: number) {
        try {
            const paciente = await this.pacienteRepository.findOneOrFail({
                where: { id: IDpaciente },
                relations: ['citas'],
            });
            return paciente.citas.filter(cita => cita.asistio === true);
        } catch (error) {
            throw new Error(`No se pudo encontrar al paciente con ID ${IDpaciente}`);
        }
    }

    async visualizarMedicamentos(IDpaciente: number, idcita: number) {
        try {
            const paciente = await this.pacienteRepository.findOneOrFail({
                where: { id: IDpaciente },
                relations: ['citas'],
            });

            const cita = paciente.citas.find(c => c.id === idcita);

            if (!cita) {
                throw new Error(`No se encontró la cita con ID ${idcita} para el paciente con ID ${IDpaciente}`);
            }

            return cita.receta.medicamentos;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error al obtener los medicamentos: ${error.message}`);
            }
            throw new Error(`No se pudo encontrar al paciente con ID ${IDpaciente} o la cita con ID ${idcita}`);
        }
    }


    async visualizarRecetasMedicas(IDpaciente: number) {
        try {
            const paciente = await this.pacienteRepository.findOneOrFail({
                where: { id: IDpaciente },
                relations: ['citas'],
            });
    
            const recetasMedicas: RecetaMedica[] = [];
            paciente.citas.forEach(cita => {
                if (cita.receta) {
                    recetasMedicas.push(cita.receta);
                }
            });
    
            return recetasMedicas;
        } catch (error) {
            throw new Error(`No se pudo encontrar al paciente con ID ${IDpaciente}`);
        }
    }

}