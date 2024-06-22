// src/initial-load/initial-load.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EspecialidadService } from 'src/especialidades/especialidades.service';
import { MedicoService } from 'src/medicos/medicos.service';
import { defaultSpecialties } from './default-specialties';
import { defaultMedicos } from './default-medicos';

@Injectable()
export class InitialLoadService implements OnModuleInit {
  constructor(
    private readonly especialidadService: EspecialidadService,
    private readonly medicoService: MedicoService,  // Inyecta el servicio de médicos
  ) {}

  async onModuleInit() {
    try {
      const specialties = await this.especialidadService.obtenerTodasEspecialidades();
      if (specialties.length === 0) {
        for (const specialty of defaultSpecialties) {
          await this.especialidadService.crearEspecialidad(specialty);
        }
      }

      const doctors = await this.medicoService.mostrarMedicos();
      if (doctors.length === 0) {
        for (const doctor of defaultMedicos) {
          await this.medicoService.crearMedico(doctor);
        }
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }
}
