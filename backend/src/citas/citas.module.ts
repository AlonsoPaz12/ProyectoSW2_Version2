import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './citas.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Cita])],
    providers: [], 
    controllers: [],
    exports: [TypeOrmModule],
})
export class CitaModule {}
