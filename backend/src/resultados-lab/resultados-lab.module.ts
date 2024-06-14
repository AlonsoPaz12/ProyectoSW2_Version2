import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadosLabController } from './resultados-lab.controller';
import { ResultadosLabService } from './resultados-lab.service';
import { ResultadoLab } from './resultados-lab.entity';
import { OrdenesMedicasModule } from '../ordenes-medicas/ordenes-medicas.module'; // Asumiendo que necesitas integrar con OrdenesMedicasModule

@Module({
  imports: [
    TypeOrmModule.forFeature([ResultadoLab]),
    OrdenesMedicasModule,
  ],
  controllers: [ResultadosLabController],
  providers: [ResultadosLabService],
  exports: [ResultadosLabService],
})
export class ResultadosLabModule {}
