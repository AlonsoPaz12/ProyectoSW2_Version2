import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaDetalle } from './recetas-detalle.entity';
import { CrearRecetaDetalleDto, ActualizarRecetaDetalleDto } from './dto/recetas-detalle.dto';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';

@Injectable()
export class RecetaDetalleService {
  constructor(
    @InjectRepository(RecetaDetalle)
    private readonly recetaDetalleRepository: Repository<RecetaDetalle>,
    
    @InjectRepository(RecetaMedica)
    private readonly recetaMedicaRepository: Repository<RecetaMedica>,

    @InjectRepository(Medicamento)
    private readonly medicamentoRepository: Repository<Medicamento>,
  ) {}

  async crearRecetaDetalle(crearRecetaDetalleDto: CrearRecetaDetalleDto): Promise<RecetaDetalle> {
    const { idReceta, idMedicamento } = crearRecetaDetalleDto;

    const receta = await this.recetaMedicaRepository.findOne({ where: { id: idReceta } });
    if (!receta) {
      throw new NotFoundException(`Receta con ID ${idReceta} no encontrada`);
    }

    const medicamento = await this.medicamentoRepository.findOne({ where: { id: idMedicamento } });
    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${idMedicamento} no encontrado`);
    }

    const recetaDetalle = this.recetaDetalleRepository.create({
      receta,
      medicamento,
    });

    return await this.recetaDetalleRepository.save(recetaDetalle);
  }

  async obtenerRecetaDetalles(): Promise<RecetaDetalle[]> {
    return await this.recetaDetalleRepository.find({ relations: ['receta', 'medicamento'] });
  }

  async obtenerRecetaDetallePorId(id: number): Promise<RecetaDetalle> {
    const recetaDetalle = await this.recetaDetalleRepository.findOne({
      where: { id },
      relations: ['receta', 'medicamento'],
    });

    if (!recetaDetalle) {
      throw new NotFoundException(`RecetaDetalle con ID ${id} no encontrada`);
    }

    return recetaDetalle;
  }

  async actualizarRecetaDetalle(id: number, actualizarRecetaDetalleDto: ActualizarRecetaDetalleDto): Promise<RecetaDetalle> {
    const recetaDetalle = await this.recetaDetalleRepository.preload({
      id,
      ...actualizarRecetaDetalleDto,
    });

    if (!recetaDetalle) {
      throw new NotFoundException(`RecetaDetalle con ID ${id} no encontrada`);
    }

    return await this.recetaDetalleRepository.save(recetaDetalle);
  }

  async eliminarRecetaDetalle(id: number): Promise<void> {
    const recetaDetalle = await this.recetaDetalleRepository.findOne({ where: { id } });

    if (!recetaDetalle) {
      throw new NotFoundException(`RecetaDetalle con ID ${id} no encontrada`);
    }

    await this.recetaDetalleRepository.remove(recetaDetalle);
  }
}