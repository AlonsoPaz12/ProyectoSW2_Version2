import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoraDisponible } from './hora-disponible.entity';


@Module({
    imports: [TypeOrmModule.forFeature([HoraDisponible])],
    providers: [], 
    controllers: [],
    exports: [TypeOrmModule],
})
export class HoraDisponibleModule {}
