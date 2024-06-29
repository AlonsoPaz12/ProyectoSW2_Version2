import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoraDisponible } from './hora-disponible.entity';
import { UpdateHorariosDto, CrearHoraDisponibleDto } from './dto/horario-disponible.dto';
import { Medico } from '../medicos/medicos.entity';

@Injectable()
export class HorasDisponiblesService {
    constructor(
        @InjectRepository(HoraDisponible)
        private readonly horaDisponibleRepository: Repository<HoraDisponible>,

        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>
    ) {}

    async createHorarios(medicoId: number, horarios: CrearHoraDisponibleDto[]): Promise<HoraDisponible[]> {
        const medico = await this.medicoRepository.findOne({ where: { id: medicoId }, relations: ['horasDisponibles'] });

        if (!medico) {
            throw new Error('Medico not found');
        }

        for (const horario of horarios) {
            const existente = await this.horaDisponibleRepository.findOne({
                where: {
                    medico: { id: medicoId },
                    diaSemana: horario.diaSemana,
                    horaInicio: horario.horaInicio,
                    horaFin: horario.horaFin,
                },
            });
    
            if (existente) {
                throw new Error('Ya existe un horario con estas especificaciones');
            }
        }

        const nuevosHorarios = horarios.map(horario => {
            const nuevaHoraDisponible = new HoraDisponible();
            nuevaHoraDisponible.medico = medico;
            nuevaHoraDisponible.diaSemana = horario.diaSemana;
            nuevaHoraDisponible.horaInicio = horario.horaInicio;
            nuevaHoraDisponible.horaFin = horario.horaFin;
            return nuevaHoraDisponible;
        });

        await this.horaDisponibleRepository.save(nuevosHorarios);

        return nuevosHorarios;
    }

    async deleteHorario(medicoId: number, diaSemana: string, horaInicio: string, horaFin: string): Promise<void> {
        await this.horaDisponibleRepository.delete({
            medico: { id: medicoId },
            diaSemana,
            horaInicio,
            horaFin,
        });
    }

    async updateHorarios(medicoId: number, horarios: CrearHoraDisponibleDto[]): Promise<HoraDisponible[]> {
        const medico = await this.medicoRepository.findOne({ where: { id: medicoId }, relations: ['horasDisponibles'] });

        if (!medico) {
            throw new Error('Medico not found');
        }

        // Obtener horarios existentes
        const horariosExistentes = await this.horaDisponibleRepository.find({ where: { medico: { id: medicoId } } });

        // Crear nuevos horarios y eliminar los desmarcados
        const nuevosHorarios = horarios.map(horario => {
            return {
                diaSemana: horario.diaSemana,
                horaInicio: horario.horaInicio,
                horaFin: horario.horaFin,
                seleccionado: horario.seleccionado,
            };
        });

        for (const horarioExistente of horariosExistentes) {
            const horarioNuevo = nuevosHorarios.find(horario => 
                horario.diaSemana === horarioExistente.diaSemana &&
                horario.horaInicio === horarioExistente.horaInicio &&
                horario.horaFin === horarioExistente.horaFin
            );

            if (horarioNuevo && !horarioNuevo.seleccionado) {
                await this.deleteHorario(medicoId, horarioExistente.diaSemana, horarioExistente.horaInicio, horarioExistente.horaFin);
            }
        }

        const horariosAInsertar = nuevosHorarios.filter(horario => 
            horario.seleccionado &&
            !horariosExistentes.some(existente => 
                existente.diaSemana === horario.diaSemana &&
                existente.horaInicio === horario.horaInicio &&
                existente.horaFin === horario.horaFin
            )
        ).map(horario => {
            const nuevaHoraDisponible = new HoraDisponible();
            nuevaHoraDisponible.medico = medico;
            nuevaHoraDisponible.diaSemana = horario.diaSemana;
            nuevaHoraDisponible.horaInicio = horario.horaInicio;
            nuevaHoraDisponible.horaFin = horario.horaFin;
            return nuevaHoraDisponible;
        });

        await this.horaDisponibleRepository.save(horariosAInsertar);

        return horariosAInsertar;
    }
   
    async findByMedicoId(medicoId: number): Promise<HoraDisponible[]> {
        return this.horaDisponibleRepository.find({ where: { medico: {id: medicoId } }});
    }
}