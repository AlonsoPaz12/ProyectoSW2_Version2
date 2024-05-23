import { Module } from '@nestjs/common';
import { ImagenesMedicasController } from './imagenes-medicas.controller';
import { ImagenesMedicasService } from './imagenes-medicas.service';

@Module({
  controllers: [ImagenesMedicasController],
  providers: [ImagenesMedicasService]
})
export class ImagenesMedicasModule {}
