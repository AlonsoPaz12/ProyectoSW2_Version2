//recetas-medicas.service
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';
import { RecetaMedica } from './recetas-medicas.entity';
import { DocumentoMedico } from 'src/interfaces/DocumentoMedico';
import { CrearRecetaMedicaDto, ActualizarRecetaMedicaDto } from './dto/recetas-medicas.dto';
import { Cita } from 'src/citas/citas.entity';

@Injectable()
export class RecetasMedicasService implements DocumentoMedico {

    constructor(
        @InjectRepository(RecetaMedica)
        private recetaRepository: Repository<RecetaMedica>,
        @InjectRepository(Cita)
        private citaRepository: Repository<Cita>,
    ) { }

    async crearDocumentoMedico(recetaDto: CrearRecetaMedicaDto) {
        const nuevaReceta = new RecetaMedica();
        nuevaReceta.observacion = recetaDto.observacion;
        nuevaReceta.medicamentos = recetaDto.medicamento; 

        return this.recetaRepository.save(nuevaReceta);
    }

    async agregarRecetaACita(idCita: number, recetaDto: CrearRecetaMedicaDto): Promise<RecetaMedica> {

        const cita = await this.citaRepository.findOne({
            where: { id:idCita },
            relations: ['medico', 'paciente', 'receta']
        });

        if (!cita) {
            throw new NotFoundException(`Cita con ID ${idCita} no encontrada.`);
        }

        const nuevaReceta = await this.crearDocumentoMedico(recetaDto);

        cita.receta = nuevaReceta;

        await this.citaRepository.save(cita);

        return nuevaReceta;
    }

    async actualizarReceta(id: number, actualizarRecetaDto: ActualizarRecetaMedicaDto) {
        const receta = await this.recetaRepository.findOne({
            where: { id: id },
        });
        if (!receta) {
            throw new NotFoundException(`Receta médica con ID ${id} no encontrada.`);
        }

        if (actualizarRecetaDto.observacion) {
            receta.observacion = actualizarRecetaDto.observacion;
        }
        if (actualizarRecetaDto.medicamento) {
            receta.medicamentos = actualizarRecetaDto.medicamento;
        }

        return this.recetaRepository.save(receta);
    }

    async obtenerRecetaPorId(id: number) {
        const receta = await this.recetaRepository.findOne({ where: { id: id } });
        if (!receta) {
            throw new NotFoundException(`Receta médica con ID ${id} no encontrada`);
        }
        return receta;
    }

    async agregarMedicamentoAReceta(recetaId: number, medicamento: Medicamento) {
        const receta = await this.recetaRepository.findOne({
            where: { id : recetaId },
            relations: ['medicamentos']
        });
        
        if (!receta) {
            throw new NotFoundException(`Receta médica con ID ${recetaId} no encontrada`);
        }

        receta.medicamentos.push(medicamento);
        return this.recetaRepository.save(receta);
    }

    async eliminarReceta(id: number) {
        const receta = await this.recetaRepository.findOne({ where: { id: id } });
        if (!receta) {
            throw new NotFoundException(`Receta médica con ID ${id} no encontrada`);
        }
        await this.recetaRepository.delete(id);
    }

    async obtenerRecetasPorMedico(idMedico: number): Promise<RecetaMedica[]> {
        try {
            const recetas = await this.recetaRepository
                .createQueryBuilder('receta')
                .leftJoinAndSelect('receta.medico', 'medico')
                .where('medico.id = :idMedico', { idMedico })
                .getMany();
            
            if (!recetas || recetas.length === 0) {
                throw new NotFoundException(`No se encontraron recetas médicas para el médico con ID ${idMedico}`);
            }

            return recetas;
        } catch (error) {
            throw new NotFoundException(`No se encontraron recetas médicas para el médico con ID ${idMedico}`);
        }
    }
}

