import { Test, TestingModule } from '@nestjs/testing';
import { HorasDisponiblesService } from './hora_disponible.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medico } from '../medicos/medicos.entity';
import { HoraDisponible } from './hora-disponible.entity';
import { Repository } from 'typeorm';
import { CrearHoraDisponibleDto } from './dto/horario-disponible.dto';

describe('HorasDisponiblesService', () => {
  let service: HorasDisponiblesService;
  let medicoRepository: Repository<Medico>;
  let horaDisponibleRepository: Repository<HoraDisponible>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HorasDisponiblesService,
        {
          provide: getRepositoryToken(Medico),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(HoraDisponible),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<HorasDisponiblesService>(HorasDisponiblesService);
    medicoRepository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
    horaDisponibleRepository = module.get<Repository<HoraDisponible>>(getRepositoryToken(HoraDisponible));
  });

  describe('updateHorarios', () => {
    it('debe actualizar horarios correctamente cuando el médico y horarios son válidos', async () => {
      const medicoId = 1;
      const horarios: CrearHoraDisponibleDto[] = [
        { diaSemana: 'Lunes', horaInicio: '08:00', horaFin: '10:00', seleccionado: true },
      ];
      const medico = { id: medicoId, horasDisponibles: [] } as Medico;
      const horariosExistentes: HoraDisponible[] = [
        { id: 1, diaSemana: 'Lunes', horaInicio: '07:00', horaFin: '09:00', medico } as HoraDisponible,
      ];

      jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);
      jest.spyOn(horaDisponibleRepository, 'find').mockResolvedValue(horariosExistentes);
      jest.spyOn(horaDisponibleRepository, 'save').mockImplementation(async (horaDisponible: HoraDisponible) => {
        return { ...horaDisponible, id: Math.floor(Math.random() * 1000) } as HoraDisponible;
      });

      const result = await service.updateHorarios(medicoId, horarios);

      expect(result.length).toBe(1); // Verifica que se haya actualizado un horario
      expect(result[0].horaInicio).toEqual('08:00'); // Verifica que el horario se haya actualizado correctamente
    });

    it('debe lanzar un error cuando el médico no es encontrado', async () => {
      const medicoId = 1;
      const horarios: CrearHoraDisponibleDto[] = [];

      jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.updateHorarios(medicoId, horarios)).rejects.toThrow('Medico not found');
    });

    it('debe eliminar horarios no seleccionados', async () => {
      const medicoId = 1;
      const horarios: CrearHoraDisponibleDto[] = [
        { diaSemana: 'Lunes', horaInicio: '08:00', horaFin: '9:00', seleccionado: false },
      ];
      const medico = { id: medicoId, horasDisponibles: [] } as Medico;
      const horariosExistentes: HoraDisponible[] = [
        { id: 1, diaSemana: 'Lunes', horaInicio: '08:00', horaFin: '9:00', medico } as HoraDisponible,
      ];

      jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);
      jest.spyOn(horaDisponibleRepository, 'find').mockResolvedValue(horariosExistentes);
      jest.spyOn(horaDisponibleRepository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(horaDisponibleRepository, 'save').mockResolvedValue(horariosExistentes[0]); // Simula el método 'save'

      await service.updateHorarios(medicoId, horarios);

      expect(horaDisponibleRepository.delete).toHaveBeenCalled();
    });

    it('debe agregar nuevos horarios seleccionados', async () => {
      const medicoId = 1;
      const horarios: CrearHoraDisponibleDto[] = [
        { diaSemana: 'Lunes', horaInicio: '08:00', horaFin: '10:00', seleccionado: true },
      ];
      const medico = { id: medicoId, horasDisponibles: [] } as Medico;
      const horariosExistentes: HoraDisponible[] = [];

      jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);
      jest.spyOn(horaDisponibleRepository, 'find').mockResolvedValue(horariosExistentes);
      jest.spyOn(horaDisponibleRepository, 'save').mockImplementation(async (horaDisponible: HoraDisponible) => {
        return { ...horaDisponible, id: Math.floor(Math.random() * 1000) } as HoraDisponible;
      });

      await service.updateHorarios(medicoId, horarios);

      expect(horaDisponibleRepository.save).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({
          diaSemana: 'Lunes',
          horaInicio: '08:00',
          horaFin: '10:00',
        })
      ]));
    });
  });
});