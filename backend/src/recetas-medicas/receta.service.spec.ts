import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaMedica } from './recetas-medicas.entity';
import { Medicamento } from '../medicamentos/medicamentos.entity';
import { RecetaService } from './recetas-medicas.service';
import { NotFoundException } from '@nestjs/common';
import { Cita } from '../citas/citas.entity';  // Añadido
import { Paciente } from '../pacientes/pacientes.entity';  // Añadido
import { Medico } from '../medicos/medicos.entity';  // Añadido

jest.mock('../pacientes/pacientes.entity');  // Mocking Paciente
jest.mock('../citas/citas.entity');  // Mocking Cita
jest.mock('../medicos/medicos.entity');  // Mocking Medico

describe('RecetaService', () => {
  let service: RecetaService;
  let recetaRepository: Repository<RecetaMedica>;
  let medicamentoRepository: Repository<Medicamento>;
  let citaRepository: Repository<Cita>;  // Añadido
  let pacienteRepository: Repository<Paciente>;  // Añadido
  let medicoRepository: Repository<Medico>;  // Añadido

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecetaService,
        {
          provide: getRepositoryToken(RecetaMedica),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Medicamento),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Cita),  // Añadido
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Paciente),  // Añadido
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Medico),  // Añadido
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RecetaService>(RecetaService);
    recetaRepository = module.get<Repository<RecetaMedica>>(getRepositoryToken(RecetaMedica));
    medicamentoRepository = module.get<Repository<Medicamento>>(getRepositoryToken(Medicamento));
    citaRepository = module.get<Repository<Cita>>(getRepositoryToken(Cita));  // Añadido
    pacienteRepository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));  // Añadido
    medicoRepository = module.get<Repository<Medico>>(getRepositoryToken(Medico));  // Añadido
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('agregarMedicamentoAReceta', () => {
    it('should add a medicamento to a receta successfully', async () => {
      const recetaId = 1;
      const medicamentoId = 1;

      const receta = new RecetaMedica();
      receta.id = recetaId;
      receta.medicamentos = [];

      const medicamento = new Medicamento();
      medicamento.id = medicamentoId;

      jest.spyOn(recetaRepository, 'findOne').mockResolvedValue(receta);
      jest.spyOn(medicamentoRepository, 'findOne').mockResolvedValue(medicamento);
      jest.spyOn(recetaRepository, 'save').mockResolvedValue({ ...receta, medicamentos: [medicamento] });

      const result = await service.agregarMedicamentoAReceta(recetaId, medicamentoId);

      expect(result.medicamentos).toContain(medicamento);
      expect(recetaRepository.findOne).toHaveBeenCalledWith({ where: { id: recetaId }, relations: ['medicamentos'] });
      expect(medicamentoRepository.findOne).toHaveBeenCalledWith({ where: { id: medicamentoId } });
      expect(recetaRepository.save).toHaveBeenCalledWith({ ...receta, medicamentos: [medicamento] });
    });

    it('should throw a NotFoundException if the receta is not found', async () => {
      const recetaId = 1;
      const medicamentoId = 1;

      jest.spyOn(recetaRepository, 'findOne').mockResolvedValue(null);

      await expect(service.agregarMedicamentoAReceta(recetaId, medicamentoId)).rejects.toThrowError(`No se encontró la receta con ID ${recetaId}`);
    });

    it('should throw a NotFoundException if the medicamento is not found', async () => {
      const recetaId = 1;
      const medicamentoId = 1;

      const receta = new RecetaMedica();
      receta.id = recetaId;
      receta.medicamentos = [];

      jest.spyOn(recetaRepository, 'findOne').mockResolvedValue(receta);
      jest.spyOn(medicamentoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.agregarMedicamentoAReceta(recetaId, medicamentoId)).rejects.toThrowError(`No se encontró el medicamento con ID ${medicamentoId}`);
    });
  });

  describe('eliminarMedicamentoDeReceta', () => {
    it('should remove a medicamento from a receta successfully', async () => {
      const recetaId = 1;
      const medicamentoId = 1;

      const medicamento = new Medicamento();
      medicamento.id = medicamentoId;

      const receta = new RecetaMedica();
      receta.id = recetaId;
      receta.medicamentos = [medicamento];

      jest.spyOn(recetaRepository, 'findOne').mockResolvedValue(receta);
      jest.spyOn(recetaRepository, 'save').mockResolvedValue({ ...receta, medicamentos: [] });

      const result = await service.eliminarMedicamentoDeReceta(recetaId, medicamentoId);

      expect(result.medicamentos).not.toContain(medicamento);
      expect(recetaRepository.findOne).toHaveBeenCalledWith({ where: { id: recetaId }, relations: ['medicamentos'] });
      expect(recetaRepository.save).toHaveBeenCalledWith({ ...receta, medicamentos: [] });
    });

    it('should throw a NotFoundException if the receta is not found', async () => {
      const recetaId = 1;
      const medicamentoId = 1;

      jest.spyOn(recetaRepository, 'findOne').mockResolvedValue(null);

      await expect(service.eliminarMedicamentoDeReceta(recetaId, medicamentoId)).rejects.toThrowError(`No se encontró la receta con ID ${recetaId}`);
    });
  });
});
