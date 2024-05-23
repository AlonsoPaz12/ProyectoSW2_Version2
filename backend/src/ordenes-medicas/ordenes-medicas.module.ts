import { Module } from '@nestjs/common';
import { OrdenesMedicasController } from './ordenes-medicas.controller';
import { OrdenesMedicasService } from './ordenes-medicas.service';

@Module({
  controllers: [OrdenesMedicasController],
  providers: [OrdenesMedicasService]
})
export class OrdenesMedicasModule {}
