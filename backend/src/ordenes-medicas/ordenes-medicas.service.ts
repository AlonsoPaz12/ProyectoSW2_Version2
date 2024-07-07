// orden-medica.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { OrdenMedica } from './ordenes-medicas.entity';
import { Cita } from '../citas/citas.entity';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';

import { ActualizarOrdenMedicaDto, CrearOrdenMedicaDto } from './dto/ordenes-medicas.dto';
import { ImagenMedica } from 'src/imagenes-medicas/imagenes-medicas.entity';
import { ResultadoLab } from 'src/resultados-lab/resultados-lab.entity';
import { ActualizarImagenMedicaDto } from 'src/imagenes-medicas/dto/imagenes-medicas.dto';
import { ActualizarResultadoLabDto } from 'src/resultados-lab/dto/resultados-lab.dto';

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
        private readonly imagenRepository: Repository<ImagenMedica>,

        @InjectRepository(ResultadoLab)
        private readonly resultadoRepository: Repository<ResultadoLab>

    ) {}

    async crearDocumentoMedico(crearOrdenMedicaDto: CrearOrdenMedicaDto): Promise<OrdenMedica> {
        const { observacion, imagenMedicaId, resultadoLabId, citaId, medicoId, pacienteId } = crearOrdenMedicaDto;

        // Crear nueva orden médica
        const nuevaOrden = new OrdenMedica();
        nuevaOrden.observacion = observacion;

        // Si se proporciona citaId, buscar la cita y asociarla
        if (imagenMedicaId) {
            const imagen = await this.imagenRepository.findOne({
                where: { id: imagenMedicaId }
            });
            if (!imagen) {
                throw new NotFoundException(`No se encontró la imagen medica con ID ${imagenMedicaId}`);
            }
            nuevaOrden.imagenMedica = imagen;
        }

        if (resultadoLabId) {
            const resultado = await this.resultadoRepository.findOne({
                where: { id: resultadoLabId }
            });
            if (!resultado) {
                throw new NotFoundException(`No se encontró el resultado de laboratorio con ID ${resultadoLabId}`);
            }
            nuevaOrden.resultadoLaboratorio = resultado;
        }

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
        return await this.ordenMedicaRepository.find({relations: ['resultadoLaboratorio', 'imagenMedica', 'medico', 'paciente', 'cita']});
    }

    async actualizarOrdenMedica(idOrden: number, actualizarOrdenDto: ActualizarOrdenMedicaDto, actualizarImagenDto: ActualizarImagenMedicaDto, actualizarResultadoDto: ActualizarResultadoLabDto){
        const orden = await this.ordenMedicaRepository.findOne({
            where: { id: idOrden },
            relations: ['resultadoLaboratorio', 'imagenMedica', 'medico', 'paciente', 'cita']
        });
        if (!orden) {
            throw new NotFoundException(`Orden con ID ${idOrden} no encontrado`);
        }

        const idImagen = orden.imagenMedica.id;
        const imagen = await this.imagenRepository.findOne({
            where: { id: idImagen }
        });

        if (!imagen) {
            throw new NotFoundException(`Imagen con ID ${idImagen} no encontrado`);
        }

        const idResultado = orden.resultadoLaboratorio.id;
        const resultado = await this.resultadoRepository.findOne({
            where: { id: idResultado }
        })

        if (!resultado) {
            throw new NotFoundException(`Resultado con ID ${idResultado} no encontrado`);
        }

        imagen.nombrePaciente = actualizarImagenDto.nombrePaciente;
        imagen.ExamDate = actualizarImagenDto.ExamDate;
        imagen.tipo = actualizarImagenDto.tipo;
        imagen.indicaciones = actualizarImagenDto.indicaciones;
        imagen.NombreDoc = actualizarImagenDto.NombreDoc;
        imagen.NotasMedic = actualizarImagenDto.NotasMedic;
        imagen.imagen = actualizarImagenDto.imagen;

        resultado.imageurl = actualizarResultadoDto.imageurl;
        resultado.numeroDocumento = actualizarResultadoDto.numeroDocumento;
        resultado.nombres = actualizarResultadoDto.nombres;
        resultado.apePaterno = actualizarResultadoDto.apePaterno;
        resultado.apeMaterno = actualizarResultadoDto.apeMaterno;
        resultado.fechaNacimiento = actualizarResultadoDto.fechaNacimiento;
        resultado.numCelular = actualizarResultadoDto.numCelular;
        resultado.correoElectronico = actualizarResultadoDto.correoElectronico;
        resultado.contrasena = actualizarResultadoDto.contrasena;
        resultado.repContrasena = actualizarResultadoDto.repContrasena;
        resultado.genero = actualizarResultadoDto.genero;
        resultado.motivoPrueba = actualizarResultadoDto.motivoPrueba;
        resultado.fecha = actualizarResultadoDto.fecha;
        resultado.Resultado = actualizarResultadoDto.Resultado;
        resultado.unidades = actualizarResultadoDto.unidades;
        resultado.rangoNormal = actualizarResultadoDto.rangoNormal;

        orden.observacion = actualizarOrdenDto.observacion;
        orden.imagenMedica = imagen;
        orden.resultadoLaboratorio = resultado;

        await this.imagenRepository.save(imagen);
        await this.resultadoRepository.save(resultado);
        return await this.ordenMedicaRepository.save(orden);

    }

}
