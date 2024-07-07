import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';
import { OrdenMedica } from '../ordenes-medicas/ordenes-medicas.entity';
import { ImagenesMedicasService } from './imagenes-medicas.service';
import { ImagenesMedicasController } from './imagenes-medicas.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ImagenMedica, OrdenMedica])],
    providers: [ImagenesMedicasService],
    controllers: [ImagenesMedicasController],
    exports: [TypeOrmModule, ImagenesMedicasService],
})
export class ImagenMedicaModule {}
