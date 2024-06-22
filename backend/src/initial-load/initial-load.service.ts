// src/initial-load/initial-load.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';

import { EspecialidadService } from 'src/especialidades/especialidades.service';
import { MedicoService } from 'src/medicos/medicos.service';
import { PacienteService } from 'src/pacientes/paciente.service';
import { CitaService } from 'src/citas/cita.service';
import { RecetaService } from 'src/recetas-medicas/recetas-medicas.service';

import { defaultPacientes } from './default-pacientes';
import { defaultSpecialties } from './default-specialties';
import { defaultMedicos } from './default-medicos';
import { defaultCitas } from './default-citas';
import { defaultRecetas } from './default-recetas';

@Injectable()
export class InitialLoadService implements OnModuleInit {
  constructor(
    private readonly especialidadService: EspecialidadService,
    private readonly medicoService: MedicoService, 
    private readonly pacienteService: PacienteService,
    private readonly citaService: CitaService,
    private readonly recetaService: RecetaService,
  ) { }

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

      const pacientes = await this.pacienteService.mostrarPacientes();
      if (pacientes.length === 0) {
        for (const paciente of defaultPacientes) {
          await this.pacienteService.crearPaciente(paciente);
        }
      }

      const citas = await this.citaService.obtenerTodasCitas();
      if (citas.length === 0) {
        for (const cita of defaultCitas) {
          await this.pacienteService.agendarCita(cita);
        }
      }

      const recetas = await this.recetaService.obtenerTodasRecetas();
      if (recetas.length === 0) {
        for (const receta of defaultRecetas) {
          await this.recetaService.crearDocumentoMedico(receta);
        }
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  }
}

