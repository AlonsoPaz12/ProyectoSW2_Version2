import { Module } from '@nestjs/common';
import { ResultadosLabController } from './resultados-lab.controller';
import { ResultadosLabService } from './resultados-lab.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoLab } from './resultados-lab.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadoLab])],
  controllers: [ResultadosLabController],
  providers: [ResultadosLabService]
})
export class ResultadosLabModule {}
