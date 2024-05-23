import { Module } from '@nestjs/common';
import { ResultadosLabController } from './resultados-lab.controller';
import { ResultadosLabService } from './resultados-lab.service';

@Module({
  controllers: [ResultadosLabController],
  providers: [ResultadosLabService]
})
export class ResultadosLabModule {}
