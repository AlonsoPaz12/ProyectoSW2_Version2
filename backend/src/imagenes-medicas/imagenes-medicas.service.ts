import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';
import { CrearImagenMedicaDto, ActualizarImagenMedicaDto } from './dto/imagenes-medicas.dto';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';

@Injectable()
export class ImagenMedicaService {
  constructor(
    @InjectRepository(ImagenMedica)
    private readonly imagenMedicaRepository: Repository<ImagenMedica>,
    @InjectRepository(OrdenMedica)
    private readonly ordenMedicaRepository: Repository<OrdenMedica>,
  ) {}

  async crearImagenMedica(crearImagenMedicaDto: CrearImagenMedicaDto): Promise<ImagenMedica> {
    const orden = await this.ordenMedicaRepository.findOne({ where: { id: crearImagenMedicaDto.ordenId } });
    if (!orden) {
      throw new Error('Orden médica no encontrada');
    }

    const nuevaImagen = this.imagenMedicaRepository.create({ ...crearImagenMedicaDto, orden });
    return this.imagenMedicaRepository.save(nuevaImagen);
  }

  async obtenerTodasImagenesMedicas(): Promise<ImagenMedica[]> {
    return this.imagenMedicaRepository.find({ relations: ['orden'] });
  }

  async actualizarImagenMedica(id: number, actualizarImagenMedicaDto: ActualizarImagenMedicaDto): Promise<ImagenMedica> {
    const orden = await this.ordenMedicaRepository.findOne({ where: { id: actualizarImagenMedicaDto.ordenId } });
    if (!orden) {
      throw new Error('Orden médica no encontrada');
    }

    await this.imagenMedicaRepository.update(id, { ...actualizarImagenMedicaDto, orden });
    return this.imagenMedicaRepository.findOne({ where: { id }, relations: ['orden'] });
  }
}
