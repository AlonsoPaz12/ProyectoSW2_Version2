// medicos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';

import { Medico } from './medicos.entity';
import { Cita } from '../citas/citas.entity';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import { HoraDisponible } from 'src/horario-disponible/hora-disponible.entity';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';
import { ResultadoLab } from '../resultados-lab/resultados-lab.entity';
import { ImagenMedica } from '../imagenes-medicas/imagenes-medicas.entity';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { Especialidad } from 'src/especialidades/especialidades.entity';

import { AgregarMedicamentoDto, CrearMedicoDto } from './dto/medicos.dto';
import { CrearHoraDisponibleDto } from 'src/horario-disponible/dto/horario-disponible.dto';
import { EliminarImagenMedicaDto, EliminarResultadoLabDto } from './dto/medicos.dto';
import { CrearRecetaMedicaDto } from 'src/recetas-medicas/dto/recetas-medicas.dto';
import { CrearOrdenMedicaDto } from 'src/ordenes-medicas/dto/ordenes-medicas.dto';

import { RecetaService } from 'src/recetas-medicas/recetas-medicas.service';
import { OrdenMedicaService } from 'src/ordenes-medicas/ordenes-medicas.service';
import { IniciarSesionDto } from 'src/pacientes/dto/paciente.dto';
import { Paciente } from 'src/pacientes/pacientes.entity';



@Injectable()
export class MedicoService {
    constructor(
        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,

        @InjectRepository(RecetaMedica)
        private readonly recetaMedicaRepository: Repository<RecetaMedica>,

        @InjectRepository(Cita)
        private readonly citaRepository: Repository<Cita>,

        @InjectRepository(Medicamento)
        private readonly medicamentoRepository: Repository<Medicamento>,

        @InjectRepository(HoraDisponible)
        private readonly horaDisponibleRepository: Repository<HoraDisponible>,

        @InjectRepository(OrdenMedica)
        private readonly ordenMedicaRepository: Repository<OrdenMedica>,

        @InjectRepository(ResultadoLab)
        private readonly resultadoLabRepository: Repository<ResultadoLab>,

        @InjectRepository(ImagenMedica)
        private readonly imagenMedicaRepository: Repository<ImagenMedica>,

        @InjectRepository(Especialidad)
        private readonly especialidadRepository: Repository<Especialidad>,

        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>,

        private readonly recetaService: RecetaService,

        private readonly ordenService: OrdenMedicaService,
    ) { }

    async findOneByEmail(correoElectronico: string): Promise<Medico | undefined> {
        return this.medicoRepository.findOne({ where: { correoElectronico } });
      }
    
    async validarMedico(iniciarSesionDto: IniciarSesionDto): Promise<any> {
        const {correoElectronico, contrasena} = iniciarSesionDto;
        const medico = await this.findOneByEmail(correoElectronico);
        if (medico && contrasena === medico.contrasena) {
            const { contrasena, ...result } = medico;
            return result; // Aquí devuelves el médico sin incluir 'role'
        }
        return null;
    }

    async crearMedico(crearMedicoDto: CrearMedicoDto) {
        const { especialidadID, ...medicoData } = crearMedicoDto;

        // Verificar si la especialidad existe
        const especialidad = await this.especialidadRepository.findOne({
            where: { id_especialidad: especialidadID },
        });

        if (!especialidad) {
            throw new NotFoundException(`Especialidad con ID ${especialidadID} no encontrada`);
        }

        // Crear instancia de Medico con la relación a Especialidad
        const nuevoMedico = this.medicoRepository.create({
            ...medicoData,
            especialidad, // Asociación con la especialidad encontrada
        });

        return await this.medicoRepository.save(nuevoMedico);
    }

    async mostrarMedicos() {
        return await this.medicoRepository.find({ relations: ['especialidad'] });
    }

    async crearOrdenMedica(crearOrdenMedicaDto: CrearOrdenMedicaDto) {
        const { imagenMedicaId, resultadoLabId, citaId, medicoId, pacienteId, observacion } = crearOrdenMedicaDto;

        const cita = await this.citaRepository.findOne({
            where: { id: citaId },
        });

        if (!cita) {
            throw new NotFoundException(`No se encontró la cita con ID ${citaId}`);
        }

        // Verificar si existe el médico
        const medico = await this.medicoRepository.findOne({
            where: { id: medicoId },
        });

        if (!medico) {
            throw new NotFoundException(`No se encontró el médico con ID ${medicoId}`);
        }

        // Verificar si existe el paciente
        const paciente = await this.pacienteRepository.findOne({
            where: { id: pacienteId },
        });

        if (!paciente) {
            throw new NotFoundException(`No se encontró el paciente con ID ${pacienteId}`);
        }

        const imagen = await this.imagenMedicaRepository.findOne({
            where: { id: imagenMedicaId }
        });
        if (!imagen) {
            throw new NotFoundException(`No se encontró la imagen medica con ID ${imagenMedicaId}`);
        }


        const resultado = await this.resultadoLabRepository.findOne({
            where: { id: resultadoLabId }
        });
        if (!resultado) {
            throw new NotFoundException(`No se encontró el resultado de laboratorio con ID ${resultadoLabId}`);
        }


        // Crear la orden médica utilizando OrdenService
        return await this.ordenService.crearDocumentoMedico({
        citaId,
        medicoId,
        pacienteId,
        observacion,
        imagenMedicaId,  
        resultadoLabId 
        });
    }


    async crearRecetaMedica(crearRecetaMedicaDto: CrearRecetaMedicaDto) {
        const { citaId, medicoId, pacienteId, observacion } = crearRecetaMedicaDto;

        // Verificar si existe la cita
        const cita = await this.citaRepository.findOne({
            where: { id: citaId },
        });

        if (!cita) {
            throw new NotFoundException(`No se encontró la cita con ID ${citaId}`);
        }

        // Verificar si existe el médico
        const medico = await this.medicoRepository.findOne({
            where: { id: medicoId },
        });

        if (!medico) {
            throw new NotFoundException(`No se encontró el médico con ID ${medicoId}`);
        }

        // Verificar si existe el paciente
        const paciente = await this.pacienteRepository.findOne({
            where: { id: pacienteId },
        });

        if (!paciente) {
            throw new NotFoundException(`No se encontró el paciente con ID ${pacienteId}`);
        }

        // Crear la receta médica utilizando RecetaService
        return await this.recetaService.crearDocumentoMedico({
            citaId,
            medicoId,
            pacienteId,
            observacion,
        });
    }

    async agregarMedicamentoAReceta(
        idReceta: number,
        agregarMedicamentoDto: AgregarMedicamentoDto
    ) {

        const { idMedicamento } = agregarMedicamentoDto;

        //Buscar Receta por su ID
        const receta = await this.recetaMedicaRepository.findOne({
            where: { id: idReceta },
            relations: ['medicamentos'],
        });

        if (!receta) {
            throw new NotFoundException(`No se encontró la receta médica con ID ${idReceta}`);
        }

        //Buscar medicamento por su ID
        const medicamento = await this.medicamentoRepository.findOne({
            where: { id: idMedicamento },
        });

        if (!medicamento) {
            throw new Error(`No se encontró ningún medicamento con el ID ${idMedicamento}`);
        }

        //Verificar si el medicamento ya está asociado a la receta
        const existeMedicamento = receta.medicamentos.some(med => med.id === medicamento.id);
        if (existeMedicamento) {
            throw new Error(`El medicamento con ID ${medicamento.id} ya está asociado a la receta`);
        }

        //Agregar el medicamento a la receta médica
        receta.medicamentos.push(medicamento);

        //Guardar la receta médica actualizada
        return await this.recetaMedicaRepository.save(receta);
    }
/*
    async agregarHoraDisponible(medicoId: number, crearHoraDisponibleDto: CrearHoraDisponibleDto) {
        const { fecha, horarios } = crearHoraDisponibleDto;

        // Buscar al médico por su ID
        const medico = await this.medicoRepository.findOne({
            where: { id: medicoId },
        });

        if (!medico) {
            throw new NotFoundException(`Médico con ID ${medicoId} no encontrado`);
        }

        // Crear una nueva instancia de HoraDisponible
        const nuevaHoraDisponible = new HoraDisponible();
        nuevaHoraDisponible.fecha = fecha;
        nuevaHoraDisponible.horaInicio = horarios.horaInicio;
        nuevaHoraDisponible.horaFin = horaFin;
        nuevaHoraDisponible.medico = medico;

        // Guardar el nuevo horario disponible asociado al médico
        return await this.horaDisponibleRepository.save(nuevaHoraDisponible);
    }
*/
    async verRecetaDeCita(citaId: number) {
        const cita = await this.citaRepository.findOne({
            where: { id: citaId },
            relations: ['recetaMedica'], // Asumiendo que la entidad Cita tiene una relación con RecetaMedica
        });

        if (!cita) {
            throw new NotFoundException(`Cita con ID ${citaId} no encontrada`);
        }

        const receta = await this.recetaMedicaRepository.findOne({
            where: { cita: { id: citaId } },
            relations: ['medico', 'paciente', 'medicamentos'], // Cargar relaciones relevantes
        });

        if (!receta) {
            throw new NotFoundException(`No se encontró receta médica para la cita con ID ${citaId}`);
        }

        return receta;
    }

    async verProximasCitas(medicoId: number) {
        // Buscar al médico por su ID
        const medico = await this.medicoRepository.findOne({
            where: { id: medicoId },
        });

        if (!medico) {
            throw new NotFoundException(`Médico con ID ${medicoId} no encontrado`);
        }

        // Buscar las próximas citas del médico
        const proximasCitas = await this.citaRepository.find({
            where: { medico: { id: medicoId }, fecha: MoreThan(new Date()) },
            relations: ['paciente'],
            order: { fecha: 'ASC' },
        });

        return proximasCitas;
    }

    async agregarResultadoLaboratorio(idOrdenMedica: number, idResultadoLab: number) {

        const ordenMedica = await this.ordenMedicaRepository.findOne({
            where: { id: idOrdenMedica },
            relations: ['resultadoLaboratorio'],
        });

        if (!ordenMedica) {
            throw new NotFoundException(`No se encontró la orden médica con ID ${idOrdenMedica}`);
        }

        const resultadoLab = await this.resultadoLabRepository.findOne({
            where: { id: idResultadoLab },
        });

        if (!resultadoLab) {
            throw new NotFoundException(`No se encontró el resultado de laboratorio con ID ${idResultadoLab}`);
        }

        ordenMedica.resultadoLaboratorio = resultadoLab;

        return await this.ordenMedicaRepository.save(ordenMedica);
    }

    async agregarImagenMedica(idOrdenMedica: number, idImagenMedica: number) {
        const ordenMedica = await this.ordenMedicaRepository.findOne({
            where: { id: idOrdenMedica },
            relations: ['imagenMedica'],
        });

        if (!ordenMedica) {
            throw new NotFoundException(`No se encontró la orden médica con ID ${idOrdenMedica}`);
        }

        const imagenMedica = await this.imagenMedicaRepository.findOne({
            where: { id: idImagenMedica },
        });

        if (!imagenMedica) {
            throw new NotFoundException(`No se encontró la imagen médica con ID ${idImagenMedica}`);
        }

        ordenMedica.imagenMedica = imagenMedica;

        return await this.ordenMedicaRepository.save(ordenMedica);
    }

    async eliminarImagenMedica(eliminarImagenMedicaDto: EliminarImagenMedicaDto): Promise<OrdenMedica> {
        const { ordenMedicaId } = eliminarImagenMedicaDto;

        const ordenMedica = await this.ordenMedicaRepository.findOne({
            where: { id: ordenMedicaId },
            relations: ['imagenMedica'],
        });

        if (!ordenMedica) {
            throw new NotFoundException(`No se encontró la orden médica con ID ${ordenMedicaId}`);
        }

        if (!ordenMedica.imagenMedica) {
            throw new NotFoundException(`No se encontró una imagen médica asociada a la orden médica con ID ${ordenMedicaId}`);
        }

        ordenMedica.imagenMedica = null;
        return await this.ordenMedicaRepository.save(ordenMedica);
    }

    // Método para eliminar el resultado de laboratorio de una orden médica
    async eliminarResultadoLab(eliminarResultadoLabDto: EliminarResultadoLabDto): Promise<OrdenMedica> {
        const { ordenMedicaId } = eliminarResultadoLabDto;

        const ordenMedica = await this.ordenMedicaRepository.findOne({
            where: { id: ordenMedicaId },
            relations: ['resultadoLaboratorio'],
        });

        if (!ordenMedica) {
            throw new NotFoundException(`No se encontró la orden médica con ID ${ordenMedicaId}`);
        }

        if (!ordenMedica.resultadoLaboratorio) {
            throw new NotFoundException(`No se encontró un resultado de laboratorio asociado a la orden médica con ID ${ordenMedicaId}`);
        }

        ordenMedica.resultadoLaboratorio = null;
        return await this.ordenMedicaRepository.save(ordenMedica);
    }

    async verHistorialCitas(medicoId: number) {
        const citas = await this.citaRepository.find({
            relations: ['medico', 'paciente']
        });

        const citasFiltradas = citas.filter(cita => cita.medico.id  == medicoId);

        return citasFiltradas;
    }

}
