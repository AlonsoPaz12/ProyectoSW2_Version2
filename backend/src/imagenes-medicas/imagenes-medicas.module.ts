import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';
import { ImagenMedicaService } from './imagenes-medicas.service';
import { ImagenMedicaController } from './imagenes-medicas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImagenMedica])],
  providers: [ImagenMedicaService],
  controllers: [ImagenMedicaController],
})
export class ImagenMedicaModule {}
