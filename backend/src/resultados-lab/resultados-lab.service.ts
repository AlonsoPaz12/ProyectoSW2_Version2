import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResultadoLab } from './resultados-lab.entity';
import { OrdenMedica } from '../ordenes-medicas/ordenes-medicas.entity';
import { CrearResultadoLabDto, ActualizarResultadoLabDto } from './dto/resultados-lab.dto';

@Injectable()
export class ResultadoLabService {
  constructor(
    @InjectRepository(ResultadoLab)
    private readonly resultadoLabRepository: Repository<ResultadoLab>,
    
    @InjectRepository(OrdenMedica)
    private readonly ordenMedicaRepository: Repository<OrdenMedica>,
  ) {}

  async crearResultadoLab(crearResultadoLabDto: CrearResultadoLabDto): Promise<ResultadoLab> {
    const { ordenmedicaId, ...resultadoData } = crearResultadoLabDto;

    const ordenMedica = await this.ordenMedicaRepository.findOne({
      where: { id: ordenmedicaId },
    });

    if (!ordenMedica) {
      throw new NotFoundException(`Orden médica con ID ${ordenmedicaId} no encontrada`);
    }

    const nuevoResultado = this.resultadoLabRepository.create({
      ...resultadoData,
      orden: ordenMedica,
    });

    return await this.resultadoLabRepository.save(nuevoResultado);
  }

  async obtenerResultadosLab(): Promise<ResultadoLab[]> {
    return await this.resultadoLabRepository.find({ relations: ['orden'] });
  }

  async obtenerResultadoLabPorId(id: number): Promise<ResultadoLab> {
    const resultadoLab = await this.resultadoLabRepository.findOne({
      where: { id },
      relations: ['orden'],
    });

    if (!resultadoLab) {
      throw new NotFoundException(`Resultado de laboratorio con ID ${id} no encontrado`);
    }
    return resultadoLab;
  }

  async actualizarResultadoLab(id: number, actualizarResultadoLabDto: ActualizarResultadoLabDto): Promise<ResultadoLab> {
    const resultadoLab = await this.resultadoLabRepository.preload({
      id,
      ...actualizarResultadoLabDto,
    });
    if (!resultadoLab) {
      throw new NotFoundException(`Resultado de laboratorio con ID ${id} no encontrado`);
    }
    return await this.resultadoLabRepository.save(resultadoLab);
  }

  async eliminarResultadoLab(id: number): Promise<void> {
    const resultadoLab = await this.resultadoLabRepository.findOne({ where: { id } });
    if (!resultadoLab) {
      throw new NotFoundException(`Resultado de laboratorio con ID ${id} no encontrado`);
    }
    await this.resultadoLabRepository.remove(resultadoLab);
  }
}
