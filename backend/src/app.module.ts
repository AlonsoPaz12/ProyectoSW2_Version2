import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { CitasModule } from './citas/citas.module';
import { RecetasMedicasModule } from './recetas-medicas/recetas-medicas.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { OrdenesMedicasModule } from './ordenes-medicas/ordenes-medicas.module';
import { ResultadosLabModule } from './resultados-lab/resultados-lab.module';
import { ImagenesMedicasModule } from './imagenes-medicas/imagenes-medicas.module';

@Module({
  imports: [UsuariosModule, PacientesModule, MedicosModule, CitasModule, RecetasMedicasModule, MedicamentosModule, OrdenesMedicasModule, ResultadosLabModule, ImagenesMedicasModule],
})

export class AppModule {}
