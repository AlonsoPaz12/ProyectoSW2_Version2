import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadoLab } from './resultados-lab.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ResultadoLab])],
    providers: [], 
    controllers: [],
    exports: [TypeOrmModule],
})
export class ResultadoLabModule {}
