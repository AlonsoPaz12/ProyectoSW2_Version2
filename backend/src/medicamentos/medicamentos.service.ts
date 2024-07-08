import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from './medicamentos.entity';
import { CrearMedicamentoDto, ActualizarMedicamentoDto } from './dto/medicamento.dto';

@Injectable()
export class MedicamentoService {
    constructor(
        @InjectRepository(Medicamento)
        private readonly medicamentoRepository: Repository<Medicamento>,
    ) {}

    async crearMedicamento(crearMedicamentoDto: CrearMedicamentoDto) {
        const { nombre, tipo, frecuencia, dosis } = crearMedicamentoDto;

        const medicamento = new Medicamento();
        medicamento.nombre = nombre;
        medicamento.tipo = tipo;
        medicamento.frecuencia = frecuencia;
        medicamento.dosis = dosis;

        return await this.medicamentoRepository.save(medicamento);
    }

    async editarMedicamento(id: number, actualizarMedicamentoDto: ActualizarMedicamentoDto) {
        const medicamento = await this.medicamentoRepository.findOne({
            where: { id: id },
        });
        if (!medicamento) {
            throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
        }

        // Actualizar propiedades del medicamento
        medicamento.nombre = actualizarMedicamentoDto.nombre;
        medicamento.tipo = actualizarMedicamentoDto.tipo;
        medicamento.frecuencia = actualizarMedicamentoDto.frecuencia;
        medicamento.dosis = actualizarMedicamentoDto.dosis;

        return await this.medicamentoRepository.save(medicamento);
    }

    async eliminarMedicamento(id: number): Promise<void> {
        const medicamento = await this.medicamentoRepository.findOne({
            where: { id: id },
        });
        if (!medicamento) {
            throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
        }
        await this.medicamentoRepository.remove(medicamento);
    }
    // Nuevo método para obtener todos los medicamentos
    async obtenerTodosLosMedicamentos(): Promise<Medicamento[]> {
        return await this.medicamentoRepository.find();
    }
}
