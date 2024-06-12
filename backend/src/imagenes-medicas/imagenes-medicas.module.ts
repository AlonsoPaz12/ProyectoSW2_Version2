import { Module } from '@nestjs/common';
import { ImagenesMedicasController } from './imagenes-medicas.controller';
import { ImagenesMedicasService } from './imagenes-medicas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagenMedica])],
  controllers: [ImagenesMedicasController],
  providers: [ImagenesMedicasService]
})
export class ImagenesMedicasModule {}
