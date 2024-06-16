import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponenteResultado } from './componentes_resultado.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ComponenteResultado])],
    providers: [], 
    controllers: [],
    exports: [TypeOrmModule],
})
export class ComponentesModule {}
