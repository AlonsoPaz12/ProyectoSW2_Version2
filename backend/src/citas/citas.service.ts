//citas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';

import { RecetasMedicasService } from 'src/recetas-medicas/recetas-medicas.service';
import { OrdenesMedicasService } from 'src/ordenes-medicas/ordenes-medicas.service';
import { PacientesService } from 'src/pacientes/pacientes.service';
import { MedicosService } from 'src/medicos/medicos.service';

import { CrearCitaDto, ActualizarCitaDto } from './dto/citas.dto';

import { Cita } from './citas.entity';
import { Medico } from 'src/medicos/medicos.entity';
import { Paciente } from 'src/pacientes/pacientes.entity';
import { RecetaMedica } from 'src/recetas-medicas/recetas-medicas.entity';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';

@Injectable()
export class CitasService {

    constructor(
        @InjectRepository(Cita)
        private citaRepository: Repository<Cita>,
        private readonly medicosService: MedicosService,
        private readonly pacienteService: PacientesService,
        private readonly recetasMedicasService: RecetasMedicasService,
        private readonly ordenesMedicasService: OrdenesMedicasService,
    ) { }

    async crearCita(crearCitaDto: CrearCitaDto) {
        const { motivo, IDmedico, IDpaciente, documentoMedico, observacion, fecha } = crearCitaDto;

        const medico: Medico = await this.medicosService.obtenerMedicoPorId(IDmedico);
        const paciente: Paciente = await this.pacienteService.obtenerPacientePorId(IDpaciente);

        const nuevaCita = new Cita();
        nuevaCita.motivo = motivo;
        nuevaCita.medico = medico;
        nuevaCita.paciente = paciente;
        nuevaCita.observacion = observacion;
        nuevaCita.fecha = fecha;
        nuevaCita.asistio = false;

        if (Array.isArray(documentoMedico) && documentoMedico.length > 0) {
            const primerDocumento = documentoMedico[0];

            if (primerDocumento instanceof RecetaMedica) {
                nuevaCita.receta = primerDocumento;
            } else if (primerDocumento instanceof OrdenMedica) {
                nuevaCita.ordenMedica = primerDocumento;
            }
        }

        return this.citaRepository.save(nuevaCita);
    }

    async obtenerCitaPorId(id: number) {
        const cita = await this.citaRepository.findOne({
            where: { id },
            relations: ['medico', 'paciente', 'receta']
        });
        if (!cita) {
            throw new NotFoundException(`Cita con ID ${id} no encontrada`);
        }
        return cita;
    }

    async eliminarCita(id: number) {
        await this.citaRepository.delete(id);
    }

    async actualizarCita(id: number, actualizarCitaDto: ActualizarCitaDto): Promise<Cita> {

        const cita = await this.citaRepository.findOne({
            where: { id: id },
        });

        if (!cita) {
            throw new NotFoundException(`Cita con ID ${id} no encontrada.`);
        }

        this.citaRepository.merge(cita, actualizarCitaDto);

        return this.citaRepository.save(cita);
    }

    async agregarRecetaMedica(idCita: number, recetaId: number) { //Revisar
        const cita = await this.obtenerCitaPorId(idCita);
        if (!cita) {
            throw new NotFoundException(`Cita con ID ${idCita} no encontrada`);
        }

        const receta = await this.recetasMedicasService.obtenerRecetaPorId(recetaId);
        if (!receta) {
            throw new NotFoundException(`Receta médica con ID ${recetaId} no encontrada`);
        }

        cita.receta = receta;
        return this.citaRepository.save(cita);
    }

    async agregarOrdenMedica(idCita: number, ordenId: number) { //Revisar
        const cita = await this.obtenerCitaPorId(idCita);
        if (!cita) {
            throw new NotFoundException(`Cita con ID ${idCita} no encontrada`);
        }

        const ordenMedica = await this.ordenesMedicasService.LeerOrdenMedicaPorId(ordenId);
        if (!ordenMedica) {
            throw new NotFoundException(`Orden médica con ID ${ordenId} no encontrada`);
        }

        cita.ordenMedica = ordenMedica;
        return this.citaRepository.save(cita);
    }

    async obtenerProximasCitasMedico(idMedico: number) {
        const ahora = new Date();
        return this.citaRepository.find({
            where: {
                medico: { id: idMedico },
                fecha: MoreThan(ahora),
            },
            order: {
                fecha: 'ASC',
            },
            relations: ['medico', 'paciente', 'receta', 'ordenMedica']
        });
    }
}