// citas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './citas.entity';
import { Medico } from '../medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';


@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async obtenerTodasCitas(): Promise<Cita[]> {
    try {
      const citas = await this.citaRepository.find({
        relations: ['medico', 'paciente', 'receta', 'ordenMedica'],
      });
      if (citas.length === 0) {
        throw new NotFoundException('No se encontraron citas.');
      }
      return citas;
    } catch (error) {
      throw new NotFoundException('Error al obtener las citas.');
    }
  }

  async obtenerCitasPorIdMedico(medicoId: number): Promise<Partial<Cita>[]> {
    try {
      const citas = await this.citaRepository
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.paciente', 'paciente') // Asegúrate de incluir el paciente
        .leftJoinAndSelect('cita.medico', 'medico')
        .select(['cita.id','medico.nombres', 'paciente.nombres', 'paciente.apePaterno', 'cita.fecha', 'cita.hora', 'cita.motivo', 'cita.observacion'])
        .where('medico.id = :medicoId', { medicoId })
        .getMany();

      if (citas.length === 0) {
        throw new NotFoundException(`No se encontraron citas para el médico con ID ${medicoId}`);
      }

      return citas.map(cita => ({
        id: cita.id,
        medico: cita.medico,
        paciente: cita.paciente, // Asegúrate de que `paciente` esté disponible en la consulta
        fecha: cita.fecha,
        hora: cita.hora,
        motivo: cita.motivo,
        observacion: cita.observacion,
      }));
    } catch (error) {
      throw new NotFoundException(`No se encontraron citas para el médico con ID ${medicoId}`);
    }
  }

  
  async obtenerCitasPorFecha(fecha: Date): Promise<Cita[]> {
    try {
      const citas = await this.citaRepository
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.paciente', 'paciente')
        .where('DATE(cita.fecha) = DATE(:fecha)', { fecha })
        .getMany();

      if (!citas.length) {
        throw new NotFoundException(`No se encontraron citas para la fecha ${fecha}`);
      }

      return citas;
    } catch (error) {
      throw new NotFoundException(`No se encontraron citas para la fecha ${fecha}`);
    }
  }
  async obtenerCitasPorMedicoYPaciente(medicoId: number, pacienteId: number): Promise<Partial<Cita>[]> {
    try {
        const citas = await this.citaRepository
            .createQueryBuilder('cita')
            .leftJoinAndSelect('cita.paciente', 'paciente') // Asegúrate de incluir el paciente
            .leftJoinAndSelect('cita.medico', 'medico')
            .select([
                'cita.id', 
                'medico.nombres', 
                'paciente.nombres', 
                'paciente.apePaterno', 
                'cita.fecha', 
                'cita.hora', 
                'cita.motivo', 
                'cita.observacion',
                'cita.asistio' // Incluyendo el campo cita.asistió
            ])
            .where('cita.medico_id = :medicoId', { medicoId })
            .andWhere('cita.paciente_id = :pacienteId', { pacienteId }) // Agregando condición AND para el pacienteId
            .getMany();

        if (citas.length === 0) {
            throw new NotFoundException(`No se encontraron citas para el médico con ID ${medicoId} y el paciente con ID ${pacienteId}`);
        }

        return citas.map(cita => ({
            id: cita.id,
            medico: cita.medico,
            paciente: cita.paciente, // Asegúrate de que `paciente` esté disponible en la consulta
            fecha: cita.fecha,
            hora: cita.hora,
            motivo: cita.motivo,
            observacion: cita.observacion,
            asistio: cita.asistio // Incluyendo el campo cita.asistió en el mapeo
        }));
    } catch (error) {
        throw new NotFoundException('Error al obtener las citas', error.message);
    }
    
}
async updateCita(id: number, updateCitaDto: any): Promise<Cita> {
  const cita = await this.citaRepository.findOne({ where: { id } });

  if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada`);
  }

  cita.motivo = updateCitaDto.motivo;
  cita.observacion = updateCitaDto.observacion;
  cita.fecha = updateCitaDto.fecha;

  return this.citaRepository.save(cita);
}


}
