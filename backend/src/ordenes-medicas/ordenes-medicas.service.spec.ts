import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { OrdenMedicaService } from './ordenes-medicas.service';
import { OrdenMedica } from './ordenes-medicas.entity';
import { Cita } from '../citas/citas.entity';
import { Medico } from '../medicos/medicos.entity';
import { Paciente } from '../pacientes/pacientes.entity';
import { ImagenMedica } from '../imagenes-medicas/imagenes-medicas.entity';
import { ResultadoLab } from '../resultados-lab/resultados-lab.entity';
import { CrearOrdenMedicaDto } from './dto/ordenes-medicas.dto';

describe('OrdenMedicaService', () => {
    let service: OrdenMedicaService;
    let ordenMedicaRepository: Repository<OrdenMedica>;
    let citaRepository: Repository<Cita>;
    let pacienteRepository: Repository<Paciente>;
    let medicoRepository: Repository<Medico>;
    let imagenRepository: Repository<ImagenMedica>;
    let resultadoRepository: Repository<ResultadoLab>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdenMedicaService,
                {
                    provide: getRepositoryToken(OrdenMedica),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Cita),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Paciente),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Medico),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(ImagenMedica),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(ResultadoLab),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<OrdenMedicaService>(OrdenMedicaService);
        ordenMedicaRepository = module.get<Repository<OrdenMedica>>(getRepositoryToken(OrdenMedica));
        citaRepository = module.get<Repository<Cita>>(getRepositoryToken(Cita));
        pacienteRepository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
        medicoRepository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
        imagenRepository = module.get<Repository<ImagenMedica>>(getRepositoryToken(ImagenMedica));
        resultadoRepository = module.get<Repository<ResultadoLab>>(getRepositoryToken(ResultadoLab));
    });

    it('Debe crear una orden médica con todos los campos válidos', async () => {
        const dto: CrearOrdenMedicaDto = {
            observacion: 'observacion',
            imagenMedicaId: 1,
            resultadoLabId: 1,
            citaId: 1,
            medicoId: 1,
            pacienteId: 1,
        };

        const ordenMedica = new OrdenMedica();
        const imagenMedica = new ImagenMedica();
        const resultadoLab = new ResultadoLab();
        const cita = new Cita();
        const medico = new Medico();
        const paciente = new Paciente();

        jest.spyOn(imagenRepository, 'findOne').mockResolvedValue(imagenMedica);
        jest.spyOn(resultadoRepository, 'findOne').mockResolvedValue(resultadoLab);
        jest.spyOn(citaRepository, 'findOne').mockResolvedValue(cita);
        jest.spyOn(medicoRepository, 'findOne').mockResolvedValue(medico);
        jest.spyOn(pacienteRepository, 'findOne').mockResolvedValue(paciente);
        jest.spyOn(ordenMedicaRepository, 'save').mockResolvedValue(ordenMedica);
        jest.spyOn(citaRepository, 'save').mockResolvedValue(cita);

        const result = await service.crearDocumentoMedico(dto);
        expect(result).toBe(ordenMedica);
    });

    it('Debe lanzar una excepción NotFoundException si la imagen médica no se encuentra', async () => {
        const dto: CrearOrdenMedicaDto = {
            observacion: 'observacion',
            imagenMedicaId: 1,
            resultadoLabId: 1,
            citaId: 1,
            medicoId: 1,
            pacienteId: 1,
        };

        jest.spyOn(imagenRepository, 'findOne').mockResolvedValue(null);

        await expect(service.crearDocumentoMedico(dto)).rejects.toThrow(NotFoundException);
    });

    it('Debe lanzar una excepción NotFoundException si el resultado de laboratorio no se encuentra', async () => {
        const dto: CrearOrdenMedicaDto = {
            observacion: 'observacion',
            imagenMedicaId: 1,
            resultadoLabId: 1,
            citaId: 1,
            medicoId: 1,
            pacienteId: 1,
        };

        jest.spyOn(imagenRepository, 'findOne').mockResolvedValue(new ImagenMedica());
        jest.spyOn(resultadoRepository, 'findOne').mockResolvedValue(null);

        await expect(service.crearDocumentoMedico(dto)).rejects.toThrow(NotFoundException);
    });

    it('Debe lanzar una excepción NotFoundException si la cita no se encuentra', async () => {
        const dto: CrearOrdenMedicaDto = {
            observacion: 'observacion',
            imagenMedicaId: 1,
            resultadoLabId: 1,
            citaId: 1,
            medicoId: 1,
            pacienteId: 1,
        };

        jest.spyOn(imagenRepository, 'findOne').mockResolvedValue(new ImagenMedica());
        jest.spyOn(resultadoRepository, 'findOne').mockResolvedValue(new ResultadoLab());
        jest.spyOn(citaRepository, 'findOne').mockResolvedValue(null);

        await expect(service.crearDocumentoMedico(dto)).rejects.toThrow(NotFoundException);
    });
});
