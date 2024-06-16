import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagenMedica } from './imagenes-medicas.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ImagenMedica])],
    providers: [], 
    controllers: [],
    exports: [TypeOrmModule],
})
export class ImagenMedicaModule {}
