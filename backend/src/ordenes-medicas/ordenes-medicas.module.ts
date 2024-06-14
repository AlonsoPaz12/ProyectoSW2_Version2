import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenMedica } from './ordenes-medicas.entity';
import { OrdenesMedicasController } from './ordenes-medicas.controller';
import { OrdenesMedicasService } from './ordenes-medicas.service';
import { ResultadosLabModule } from '../resultados-lab/resultados-lab.module';
import { ImagenesMedicasModule } from '../imagenes-medicas/imagenes-medicas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdenMedica]),
    ResultadosLabModule,
    ImagenesMedicasModule,
  ],
  controllers: [OrdenesMedicasController],
  providers: [OrdenesMedicasService],
  exports: [OrdenesMedicasService], 
})

export class OrdenesMedicasModule {}
