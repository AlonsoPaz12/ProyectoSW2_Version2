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
    //1
    async updateHorarios(medicoId: number, horarios: CrearHoraDisponibleDto[]): Promise<HoraDisponible[]> {
        //2         //24    //5
        const medico = await this.medicoRepository.findOne({ where: { id: medicoId }, relations: ['horasDisponibles'] });
        //3
        if (!medico) {
            //4
            throw new Error('Medico not found');
        }

        //5 Obtener horarios existentes     //26    //27
        const horariosExistentes = await this.horaDisponibleRepository.find({ where: { medico: { id: medicoId } } });

        // Crear nuevos horarios y eliminar los desmarcados
        //                            6   7
        const nuevosHorarios = horarios.map(horario => {
            // 8
            return {
                diaSemana: horario.diaSemana,
                horaInicio: horario.horaInicio,
                horaFin: horario.horaFin,
                seleccionado: horario.seleccionado,
            };
        });
        //9                  10
        for (const horarioExistente of horariosExistentes) {
            //11    //28        //29
            const horarioNuevo = nuevosHorarios.find(horario => 
                horario.diaSemana === horarioExistente.diaSemana &&
                horario.horaInicio === horarioExistente.horaInicio &&
                horario.horaFin === horarioExistente.horaFin
            );
                //12                // 13
            if (horarioNuevo && !horarioNuevo.seleccionado) {
                //14
                await this.deleteHorario(medicoId, horarioExistente.diaSemana, horarioExistente.horaInicio, horarioExistente.horaFin);
            }
        }
        //                           15              16
        const horariosAInsertar = nuevosHorarios.filter(horario =>
            // 17 
            horario.seleccionado &&
            // 18
            !horariosExistentes.some(existente => 
                existente.diaSemana === horario.diaSemana &&
                existente.horaInicio === horario.horaInicio &&
                existente.horaFin === horario.horaFin
            )
            //19  20
        ).map(horario => {
            //21
            const nuevaHoraDisponible = new HoraDisponible();
            nuevaHoraDisponible.medico = medico;
            nuevaHoraDisponible.diaSemana = horario.diaSemana;
            nuevaHoraDisponible.horaInicio = horario.horaInicio;
            nuevaHoraDisponible.horaFin = horario.horaFin;
            return nuevaHoraDisponible;
        });


        //22
        await this.horaDisponibleRepository.save(horariosAInsertar);
        //23
        return horariosAInsertar;
    }
   
    async findByMedicoId(medicoId: number): Promise<HoraDisponible[]> {
        return this.horaDisponibleRepository.find({ where: { medico: {id: medicoId } }});
    }
}