import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Paciente } from "src/pacientes/pacientes.entity";
import { Repository } from 'typeorm';
import { Medico } from '../medicos/medicos.entity';
import { Vacuna } from "./vacunas.entity";
import { CrearVacunaDto } from "./dto/vacuna.dto";

@Injectable()
export class VacunaService {
    constructor(
        @InjectRepository(Vacuna)
        private readonly vacunaRepository: Repository<Vacuna>,

        @InjectRepository(Medico)
        private readonly medicoRepository: Repository<Medico>,

        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>
    ){}

    async crearVacuna(crearVacunaDto: CrearVacunaDto){
        const { nombre, fecha, dosis, fabricante, lugarDeVacunacion, medicos, pacientes } = crearVacunaDto;

        const nuevaVacuna = new Vacuna();
        nuevaVacuna.nombre = nombre;
        nuevaVacuna.fecha = fecha;
        nuevaVacuna.dosis = dosis;
        nuevaVacuna.fabricante = fabricante;
        nuevaVacuna.lugarDeVacunacion = lugarDeVacunacion;

        const vacunaGuardada = await this.vacunaRepository.save(nuevaVacuna);

        // Añadir las relaciones Many-to-Many después de guardar la vacuna
        if (medicos && medicos.length > 0) {
            vacunaGuardada.medicos = [];
            for (let i = 0; i < medicos.length; i++) {
                const medico = await this.medicoRepository.findOne({ where: { id: medicos[i] } });
                if (!medico) {
                    throw new NotFoundException(`No se encontró el medico con ID ${medicos[i]}`);
                }
                vacunaGuardada.medicos.push(medico);
            }
        }

        if (pacientes && pacientes.length > 0) {
            vacunaGuardada.pacientes = [];
            for (let j = 0; j < pacientes.length; j++) {
                const paciente = await this.pacienteRepository.findOne({ where: { id: pacientes[j] } });
                if (!paciente) {
                    throw new NotFoundException(`No se encontró el paciente con ID ${pacientes[j]}`);
                }
                vacunaGuardada.pacientes.push(paciente);
            }
        }

        // Guardar las relaciones actualizadas
        return this.vacunaRepository.save(vacunaGuardada);

    }

    async mostrarVacunas(){
        return this.vacunaRepository.find({relations: ['medicos', 'pacientes']});
    }

    async mostrarVacunasPorIdPaciente(pacienteId: number) {
        try {
            const vacunas = await this.vacunaRepository
              .createQueryBuilder('vacuna')
              .innerJoin('vacuna.pacientes', 'paciente')
              .where('paciente.id = :pacienteId', { pacienteId })
              .getMany();
            return vacunas;
          } catch (error) {
            throw new NotFoundException(`No se encontraron vacunas para el paciente con ID ${pacienteId}`);
          }
    }

    async encontrarVacunaId(id: number){
        return this.vacunaRepository.findOne({
            where: {id: id},
            relations: ['medicos', 'pacientes']
        });
    }

    async eliminarVacuna(id:number){
        const resultado = await this.vacunaRepository.delete(id);
        if(resultado.affected === 0){
            throw new NotFoundException(`Vacuna con ID ${id} no encontrado`)
        }
    }
}