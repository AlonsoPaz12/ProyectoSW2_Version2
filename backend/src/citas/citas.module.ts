import { Module } from '@nestjs/common';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';

@Module({
  controllers: [CitasController],
  providers: [CitasService]
})
export class CitasModule {}
