import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from './medicamentos.entity';
import { CrearMedicamentoDto } from './dto/medicamento.dto';

@Injectable()
export class MedicamentosService {
    constructor(
        @InjectRepository(Medicamento)
        private medicamentoRepository: Repository<Medicamento>,
    ) { }

    async crearMedicamento(medicamento: CrearMedicamentoDto) {
        return this.medicamentoRepository.save(medicamento);
    }

    async verMedicamentoPorId(id: number) {
        const medicamento = await this.medicamentoRepository.findOne({ where: { id: id } });
        if (!medicamento) {
            throw new NotFoundException(`Medicamento con ID ${id} no encontrado.`);
        }
        return medicamento;
    }

    async verMedicamentos() {
        return this.medicamentoRepository.find();
    }

    async eliminarMedicamento(id: number) {
        await this.medicamentoRepository.delete(id);
    }

    async actualizarMedicamento(id: number, medicamento: Medicamento) {
        await this.medicamentoRepository.update(id, medicamento);
        return this.verMedicamentoPorId(id);
    }

    async buscarMedicamentoPorNombre(nombre: string) {
        return this.medicamentoRepository.find({
            where: { nombre },
        });
    }
}
