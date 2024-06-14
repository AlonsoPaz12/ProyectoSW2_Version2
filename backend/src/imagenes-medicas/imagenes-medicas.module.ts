//imagenes-medicas.module
import { Module } from '@nestjs/common';
import { ImagenesMedicasController } from './imagenes-medicas.controller';
import { ImagenesMedicasService } from './imagenes-medicas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';
import { OrdenesMedicasModule } from 'src/ordenes-medicas/ordenes-medicas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImagenMedica]),
    OrdenesMedicasModule,
  ],
  controllers: [ImagenesMedicasController],
  providers: [ImagenesMedicasService],
  exports: [ImagenesMedicasService],
})
export class ImagenesMedicasModule {}
