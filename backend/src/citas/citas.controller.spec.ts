import { Test, TestingModule } from '@nestjs/testing';
import { CitaController } from './citas.controller';
import { CitaService } from './cita.service';
import { NotFoundException } from '@nestjs/common';
import { Cita } from './citas.entity';

describe('CitasController', () => {
  let controller: CitaController;
  let service: CitaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitaController],
      providers: [
        {
          provide: CitaService,
          useValue: {
            updateCita: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CitaController>(CitaController);
    service = module.get<CitaService>(CitaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateCita', () => {
    it('should update a cita successfully', async () => {
      const citaId = 1;
      const updateCitaDto = {
        motivo: 'New Motivo',
        observacion: 'New Observacion',
        fecha: new Date(),
        hora: '10:00',
        diagnostico: 'Diagnóstico actualizado',
        asistio: true,
      };
      const updatedCita: Cita = {
        id: citaId,
        motivo: 'New Motivo',
        observacion: 'New Observacion',
        fecha: new Date(),
        hora: '10:00',
        diagnostico: 'Diagnóstico actualizado',
        asistio: true,
        medico: null, // Proporcione una instancia válida de Medico si es necesario
        paciente: null, // Proporcione una instancia válida de Paciente si es necesario
        receta: null, // Proporcione una instancia válida de RecetaMedica si es necesario
        ordenMedica: null, // Proporcione una instancia válida de OrdenMedica si es necesario
      };

      jest.spyOn(service, 'updateCita').mockResolvedValue(updatedCita);

      const result = await controller.updateCita(citaId, updateCitaDto);

      expect(result).toEqual({
        status: 'success',
        ok: true,
        data: updatedCita,
      });
    });

    it('should throw a NotFoundException if the cita is not found', async () => {
      const citaId = 1;
      const updateCitaDto = {
        motivo: 'New Motivo',
        observacion: 'New Observacion',
        fecha: new Date(),
        hora: '10:00',
        diagnostico: 'Diagnóstico actualizado',
        asistio: true,
      };

      jest.spyOn(service, 'updateCita').mockRejectedValue(new NotFoundException(`Cita con ID ${citaId} no encontrada`));

      const result = await controller.updateCita(citaId, updateCitaDto);

      expect(result).toEqual({
        status: 'error',
        ok: false,
        message: `Cita con ID ${citaId} no encontrada`,
      });
    });
  });
});