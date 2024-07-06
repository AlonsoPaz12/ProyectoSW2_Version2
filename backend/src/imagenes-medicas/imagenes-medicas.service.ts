import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';
import { CrearImagenMedicaDto, ActualizarImagenMedicaDto } from './dto/imagenes-medicas.dto';

@Injectable()
export class ImagenMedicaService {
  constructor(
    @InjectRepository(ImagenMedica)
    private readonly imagenMedicaRepository: Repository<ImagenMedica>,
  ) {}

  async crearImagenMedica(crearImagenMedicaDto: CrearImagenMedicaDto): Promise<ImagenMedica> {
    const nuevaImagen = this.imagenMedicaRepository.create(crearImagenMedicaDto);
    return this.imagenMedicaRepository.save(nuevaImagen);
  }

  async obtenerTodasImagenesMedicas(): Promise<ImagenMedica[]> {
    return this.imagenMedicaRepository.find();
  }

  async actualizarImagenMedica(id: number, actualizarImagenMedicaDto: ActualizarImagenMedicaDto): Promise<ImagenMedica> {
    const imagenMedica = await this.imagenMedicaRepository.findOne({ where: { id } });
    if (!imagenMedica) {
      throw new NotFoundException('Imagen médica no encontrada');
    }
    await this.imagenMedicaRepository.update(id, actualizarImagenMedicaDto);
    return this.imagenMedicaRepository.findOne({ where: { id } });
  }
}
