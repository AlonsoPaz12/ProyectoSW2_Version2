import { Module } from '@nestjs/common';
import { RecetasMedicasController } from './recetas-medicas.controller';
import { RecetasMedicasService } from './recetas-medicas.service';

@Module({
  controllers: [RecetasMedicasController],
  providers: [RecetasMedicasService]
})
export class RecetasMedicasModule {}
