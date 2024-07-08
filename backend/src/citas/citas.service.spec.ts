import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './citas.entity';
import { CitaService } from './cita.service';
import { NotFoundException } from '@nestjs/common';

describe('CitasService', () => {
  let service: CitaService;
  let repository: Repository<Cita>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitaService,
        {
          provide: getRepositoryToken(Cita),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CitaService>(CitaService);
    repository = module.get<Repository<Cita>>(getRepositoryToken(Cita));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      
      const cita = new Cita();
      cita.id = citaId;
      cita.motivo = 'Old Motivo';
      cita.observacion = 'Old Observacion';
      cita.fecha = new Date();
      cita.hora = '09:00';
      cita.diagnostico = 'Diagnóstico antiguo';
      cita.asistio = false;
      cita.medico = null; // Proporcione una instancia válida de Medico si es necesario
      cita.paciente = null; // Proporcione una instancia válida de Paciente si es necesario
      cita.receta = null; // Proporcione una instancia válida de RecetaMedica si es necesario
      cita.ordenMedica = null; // Proporcione una instancia válida de OrdenMedica si es necesario

      jest.spyOn(repository, 'findOne').mockResolvedValue(cita);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...cita, ...updateCitaDto });

      const result = await service.updateCita(citaId, updateCitaDto);

      expect(result).toEqual({ ...cita, ...updateCitaDto });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: citaId } });
      expect(repository.save).toHaveBeenCalledWith({ ...cita, ...updateCitaDto });
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

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.updateCita(citaId, updateCitaDto)).rejects.toThrowError(`Cita con ID ${citaId} no encontrada`);
    });
  });
});
