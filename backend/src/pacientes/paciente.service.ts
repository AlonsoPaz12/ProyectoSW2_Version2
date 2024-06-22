//paciente.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Paciente } from './pacientes.entity';
import { Cita } from 'src/citas/citas.entity';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { Medico } from '../medicos/medicos.entity';

import { CrearPacienteDto, CrearCitaDto, IniciarSesionDto } from './dto/paciente.dto';

@Injectable()
export class PacienteService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,

    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,

    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,

    @InjectRepository(RecetaMedica)
    private readonly recetaMedicaRepository: Repository<RecetaMedica>,
  ) { }

  async findOneByEmail(correoElectronico: string): Promise<Paciente | undefined> {
    return this.pacienteRepository.findOne({ where: { correoElectronico } });
  }
  async validarPaciente(iniciarSesionDto: IniciarSesionDto): Promise<any> {
    const {correoElectronico, contrasena} = iniciarSesionDto;
    const paciente = await this.findOneByEmail(correoElectronico);
    if (paciente &&  contrasena === paciente.contrasena) {
      const { contrasena, ...result } = paciente;
      return result; // Aquí devuelves el paciente sin incluir 'role'
    }
    return null;
  }

  async crearPaciente(crearPacienteDto: CrearPacienteDto) {
    const paciente = this.pacienteRepository.create(crearPacienteDto);
    return this.pacienteRepository.save(paciente);
  }

  async mostrarPacientes() {
    return this.pacienteRepository.find();
  }

  async encontrarPacienteId(id: number) {
    return this.pacienteRepository.findOne({
      where: { id: id }
    });
  }

  async eliminarPaciente(id: number) {
    const resultado = await this.pacienteRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    }
  }

  async agendarCita(crearCitaDto: CrearCitaDto) {
    const { IDpaciente, IDmedico } = crearCitaDto;

    // Verificar si existe el paciente
    const paciente = await this.pacienteRepository.findOne({ where: { id: IDpaciente } });
    if (!paciente) {
      throw new NotFoundException(`Paciente con ID ${IDpaciente} no encontrado`);
    }

    // Verificar si existe el médico (doctor)
    const medico = await this.medicoRepository.findOne({ where: { id: IDmedico } });
    if (!medico) {
      throw new NotFoundException(`Médico con ID ${IDmedico} no encontrado`);
    }

    // Crear la nueva cita asociando paciente y médico
    const nuevaCita = this.citaRepository.create({
      ...crearCitaDto,
      paciente,
      medico,
    });

    return await this.citaRepository.save(nuevaCita);
  }

  async anularCita(idCita: number): Promise<void> {
    const cita = await this.citaRepository.findOne({ where: { id: idCita } });
    if (!cita) {
      throw new NotFoundException(`Cita con ID ${idCita} no encontrada`);
    }
    await this.citaRepository.remove(cita);
  }

  async visualizarCitas(idPaciente: number) {
    return await this.citaRepository.find({
      where: { paciente: { id: idPaciente } },
      relations: ['medico'],
      order: { fecha: 'ASC' },
    });
  }

  async visualizarRecetaMedicaPorCita(idCita: number) {
    const receta = await this.recetaMedicaRepository.findOne({
      where: { cita: { id: idCita } },
      relations: ['medico', 'paciente'],
    });

    if (!receta) {
      throw new NotFoundException(`No se encontró receta médica para la cita con ID ${idCita}`);
    }

    return receta;
  }
}
