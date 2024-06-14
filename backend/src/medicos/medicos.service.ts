//medicos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Medico } from './medicos.entity';

import { CrearMedicoDto } from '../medicos/dto/medicos.dto';
import { CrearRecetaMedicaDto } from 'src/recetas-medicas/dto/recetas-medicas.dto';
import { CrearImagenMedicaDto } from 'src/imagenes-medicas/dto/imagenes-medicas.dto';
import { CrearResultadoLabDto } from 'src/resultados-lab/dto/resultados-lab.dto';

import { RecetasMedicasService } from 'src/recetas-medicas/recetas-medicas.service';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { CitasService } from 'src/citas/citas.service';
import { ResultadosLabService } from 'src/resultados-lab/resultados-lab.service';
import { ImagenesMedicasService } from 'src/imagenes-medicas/imagenes-medicas.service';
import { OrdenesMedicasService } from 'src/ordenes-medicas/ordenes-medicas.service';

@Injectable()
export class MedicosService {
    constructor(
        @InjectRepository(Medico)
        private medicoRepository: Repository<Medico>,
        private readonly recetasMedicasService: RecetasMedicasService,
        private readonly citasService: CitasService,
        private readonly medicamentosService: MedicamentosService,
        private readonly ordenesMedicasService: OrdenesMedicasService,
        private readonly imagenesMedicasService: ImagenesMedicasService,
        private readonly resultadosLabService: ResultadosLabService,
    ) { }

    async crearMedico(crearMedicoDto: CrearMedicoDto) {
        const nuevoMedico = this.medicoRepository.create(crearMedicoDto);
        return this.medicoRepository.save(nuevoMedico);
    }

    async obtenerMedicoPorId(id: number) {
        const medico = await this.medicoRepository.findOne({
            where: { id: id },
        });

        if (!medico) {
            throw new NotFoundException(`Medico con ID ${id} no encontrado`);
        }
        return medico;
    }

    async eliminarMedico(id: number) {
        const result = await this.medicoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Medico con ID ${id} no encontrado`);
        }
    }

    async verMedicos() {
        return this.medicoRepository.find();
    }

    async obtenerRecetasDelMedico(idMedico: number) {
        try {
            const medico = await this.medicoRepository.findOne({
                where: { id: idMedico },
                relations: ['recetas'],
            });

            if (!medico) {
                throw new NotFoundException(`Médico con ID ${idMedico} no encontrado`);
            }

            return medico.recetas;
        } catch (error) {
            throw new NotFoundException(`No se encontraron recetas médicas para el médico con ID ${idMedico}`);
        }
    }

    async agregarRecetaACita(idMedico: number, idCita: number, recetaDto: CrearRecetaMedicaDto) {
        const medico = await this.medicoRepository.findOne({
            where: { id: idMedico },
        });

        if (!medico) {
            throw new NotFoundException(`Médico con ID ${idMedico} no encontrado.`);
        }

        return this.recetasMedicasService.agregarRecetaACita(idCita, recetaDto);
    }

    async agregarMedicamentoAReceta(recetaId: number, medicamentoId: number) {
        const receta = await this.recetasMedicasService.obtenerRecetaPorId(recetaId);
        if (!receta) {
            throw new NotFoundException(`Receta médica con ID ${recetaId} no encontrada.`);
        }

        const medicamento = await this.medicamentosService.verMedicamentoPorId(medicamentoId);

        receta.medicamentos.push(medicamento);

        return this.recetasMedicasService.actualizarReceta(recetaId, receta);
    }

    async visualizacionProximasCitas(idMedico: number) {
        return this.citasService.obtenerProximasCitasMedico(idMedico);
    }

    async agregarImagenMedicaACita(idCita: number, crearImagenDto: CrearImagenMedicaDto) {
        const cita = await this.citasService.obtenerCitaPorId(idCita);
        
        if (!cita) {
            throw new NotFoundException(`Cita con ID ${idCita} no encontrada.`);
        }

        try {
            const nuevaImagen = await this.imagenesMedicasService.crearResultado({
                ...crearImagenDto,
                ordenmedicaId: cita.ordenMedica.id,
            });

            cita.ordenMedica.imagenMedica = nuevaImagen;
            await this.citasService.actualizarCita(cita.id, cita);

            return nuevaImagen;
        } catch (error) {
            throw new Error(`Error al agregar imagen médica a la cita: ${error.message}`);
        }
    }

    async agregarResultadoLabACita(idCita: number, crearResultadoLabDto: CrearResultadoLabDto) {
        const cita = await this.citasService.obtenerCitaPorId(idCita);
        
        if (!cita) {
            throw new NotFoundException(`Cita con ID ${idCita} no encontrada.`);
        }

        try {
            const nuevoResultadoLab = await this.resultadosLabService.crearResultado(crearResultadoLabDto);

            cita.ordenMedica.resultadoLaboratorio = nuevoResultadoLab;
            await this.citasService.actualizarCita(cita.id, cita);

            return nuevoResultadoLab;
        } catch (error) {
            throw new Error(`Error al agregar resultado de laboratorio a la cita: ${error.message}`);
        }
    }


    async eliminarImagenMedica(idImagenMedica: number) {
        const imagenMedica = await this.imagenesMedicasService.LeerResultadoPorId(idImagenMedica);

        if (!imagenMedica) {
            throw new NotFoundException(`Imagen médica con ID ${idImagenMedica} no encontrada.`);
        }

        const ordenMedica = imagenMedica.orden; 

        if (!ordenMedica) {
            throw new NotFoundException(`No se encontró la orden médica asociada a la imagen médica con ID ${idImagenMedica}.`);
        }

        try {
            await this.imagenesMedicasService.EliminarResultado(idImagenMedica);
            
            ordenMedica.imagenMedica = null; 
            await this.ordenesMedicasService.ActualizarOrdenMedica(ordenMedica.id, ordenMedica);

            return true; 
        } catch (error) {
            throw new Error(`Error al eliminar la imagen médica con ID ${idImagenMedica}: ${error.message}`);
        }
    }
}
