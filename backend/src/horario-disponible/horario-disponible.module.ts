import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoraDisponible } from './hora-disponible.entity';
import { HorasDisponiblesService } from './hora_disponible.service';
import { HorasDisponiblesController } from './hora_disponible.controller';
import { Medico } from 'src/medicos/medicos.entity';
@Module({
    imports: [TypeOrmModule.forFeature([HoraDisponible, Medico])],
    providers: [HorasDisponiblesService],
    controllers: [HorasDisponiblesController],
    exports: [TypeOrmModule, HorasDisponiblesService],
})
export class HoraDisponibleModule {}
