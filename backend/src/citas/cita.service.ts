// citas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './citas.entity';
import { Medico } from '../medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';
import { ActualizarCitaDto } from './dto/citas.dto';


@Injectable()
export class CitaService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}

  async obtenerTodasCitas(): Promise<Cita[]> {
    try {
      return await this.citaRepository.find({
        relations: ['paciente', 'medico', 'receta'], // Agrega aquí las relaciones que necesitas
      });
    } catch (error) {
      throw new Error(`Error al obtener las citas: ${error.message}`);
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

  // Actualizar todas las propiedades de la cita con los valores del DTO
  cita.motivo = updateCitaDto.motivo;
  cita.observacion = updateCitaDto.observacion;
  cita.fecha = updateCitaDto.fecha;
  cita.hora = updateCitaDto.hora;
  cita.diagnostico = updateCitaDto.diagnostico;
  cita.asistio = updateCitaDto.asistio;

  return this.citaRepository.save(cita);
}


async editarCita(citaId: number, actualizarCitaDto: ActualizarCitaDto): Promise<Cita> {
  try {
    let cita = await this.citaRepository.findOne({ where: { id: citaId } });

    if (!cita) {
      throw new NotFoundException(`No se encontró la cita con ID ${citaId}`);
    }

    // Actualiza los campos de la cita con los valores del DTO
    Object.assign(cita, actualizarCitaDto);

    // Guarda los cambios en la base de datos
    await this.citaRepository.save(cita);

    return cita;
  } catch (error) {
    throw new NotFoundException(`Error al editar la cita: ${error.message}`);
  }
}

async guardarCita(cita: Cita): Promise<Cita> {
  try {
    const nuevaCita = await this.citaRepository.save(cita);
    return nuevaCita;
  } catch (error) {
    throw new NotFoundException(`Error al guardar la cita: ${error.message}`);
  }
}

async obtenerCitasConPaciente(pacienteid: number): Promise<Partial<Cita>[]> {
  try {
    const citas = await this.citaRepository
      .createQueryBuilder('cita')
      .leftJoin('cita.paciente', 'paciente')
      .select(['paciente.nombres as nombres', 'cita.fecha as fecha', 'cita.hora as hora', 'paciente.imageurl as imageurl'])
      .where('paciente.id = :pacienteid', { pacienteid })
      .getRawMany();

    if (citas.length === 0) {
      throw new NotFoundException(`No se encontraron citas con ID ${pacienteid}`);
    }

    return citas;
  } catch (error) {
    throw new NotFoundException(`Error al obtener las citas del paciente: ${error.message}`);
  }
}




}
