import { Test, TestingModule } from '@nestjs/testing';
import { VacunaService } from './vacunas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vacuna } from './vacunas.entity';
import { Medico } from '../medicos/medicos.entity';
import { Paciente } from '../pacientes/pacientes.entity';
import { NotFoundException } from '@nestjs/common';

describe('VacunaService', () => {
  let service: VacunaService;
  let vacunaRepository;
  let medicoRepository;
  let pacienteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacunaService,
        {
          provide: getRepositoryToken(Vacuna),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Medico),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Paciente),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VacunaService>(VacunaService);
    vacunaRepository = module.get(getRepositoryToken(Vacuna));
    medicoRepository = module.get(getRepositoryToken(Medico));
    pacienteRepository = module.get(getRepositoryToken(Paciente));
  });

  it('debe crear una vacuna exitosamente', async () => {
    const crearVacunaDto = {
      nombre: 'Vacuna A',
      fecha: new Date(),
      dosis: 1,
      fabricante: 'Fabricante A',
      lugarDeVacunacion: 'Lugar A',
      medicos: [1],
      pacientes: [1],
    };

    const savedVacuna = {
      ...crearVacunaDto,
      id: 1,
    };

    vacunaRepository.save.mockResolvedValue(savedVacuna);
    medicoRepository.findOne.mockResolvedValue({ id: 1 });
    pacienteRepository.findOne.mockResolvedValue({ id: 1 });

    const result = await service.crearVacuna(crearVacunaDto);

    expect(vacunaRepository.save).toHaveBeenCalledTimes(2);
    expect(result).toEqual(savedVacuna);
  });

  it('debe lanzar una excepción cuando un médico no es encontrado', async () => {
    const crearVacunaDto = {
      nombre: 'Vacuna A',
      fecha: new Date(),
      dosis: 1,
      fabricante: 'Fabricante A',
      lugarDeVacunacion: 'Lugar A',
      medicos: [1],
      pacientes: [1],
    };

    vacunaRepository.save.mockResolvedValue(crearVacunaDto);
    medicoRepository.findOne.mockResolvedValue(null);

    await expect(service.crearVacuna(crearVacunaDto)).rejects.toThrow(NotFoundException);
    expect(vacunaRepository.save).toHaveBeenCalledTimes(1);
  });

  it('debe lanzar una excepción cuando un paciente no es encontrado', async () => {
    const crearVacunaDto = {
      nombre: 'Vacuna A',
      fecha: new Date(),
      dosis: 1,
      fabricante: 'Fabricante A',
      lugarDeVacunacion: 'Lugar A',
      medicos: [1],
      pacientes: [1],
    };

    vacunaRepository.save.mockResolvedValue(crearVacunaDto);
    medicoRepository.findOne.mockResolvedValue({ id: 1 });
    pacienteRepository.findOne.mockResolvedValue(null);

    await expect(service.crearVacuna(crearVacunaDto)).rejects.toThrow(NotFoundException);
    expect(vacunaRepository.save).toHaveBeenCalledTimes(1);
  });

  it('debe crear una vacuna sin médicos ni pacientes', async () => {
    const crearVacunaDto = {
      nombre: 'Vacuna A',
      fecha: new Date(),
      dosis: 1,
      fabricante: 'Fabricante A',
      lugarDeVacunacion: 'Lugar A',
      medicos: [],
      pacientes: [],
    };

    const savedVacuna = {
      ...crearVacunaDto,
      id: 1,
    };

    vacunaRepository.save.mockResolvedValue(savedVacuna);

    const result = await service.crearVacuna(crearVacunaDto);

    expect(vacunaRepository.save).toHaveBeenCalledTimes(2); // Cambiado a 2 para reflejar las dos llamadas al método save
    expect(result).toEqual(savedVacuna);
  });
});
