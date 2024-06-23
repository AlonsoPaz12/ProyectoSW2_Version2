import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoLab } from './resultados-lab.entity';
import { ResultadoLabService } from './resultados-lab.service';
import { ResultadoLabController } from './resultados-lab.controller';
import { OrdenMedica } from '../ordenes-medicas/ordenes-medicas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoLab, OrdenMedica])],
  providers: [ResultadoLabService],
  controllers: [ResultadoLabController],
})
export class ResultadoLabModule {}
