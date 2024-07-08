import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Paciente } from "../pacientes/pacientes.entity";
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
        const { nombre, fecha, dosis, fabricante, lugarDeVacunacion, medicos, pacientes } = crearVacunaDto; // nodo 1

        const nuevaVacuna = new Vacuna(); //nodo 2
        nuevaVacuna.nombre = nombre; //nodo3
        nuevaVacuna.fecha = fecha; //nodo3
        nuevaVacuna.dosis = dosis; //nodo3
        nuevaVacuna.fabricante = fabricante; //nodo3
        nuevaVacuna.lugarDeVacunacion = lugarDeVacunacion; //nodo3

        const vacunaGuardada = await this.vacunaRepository.save(nuevaVacuna); //nodo 4

        // Añadir las relaciones Many-to-Many después de guardar la vacuna
        if (medicos && medicos.length > 0) { //nodo 5 y nodo 6
            vacunaGuardada.medicos = []; //nodo 7
            for (let i = 0; i < medicos.length; i++) { //nodo 8, nodo 9 y nodo 10
                const medico = await this.medicoRepository.findOne({ where: { id: medicos[i] } }); //nodo 11 (declaracion), nodo 12 (incremento), nodo 13 (comparacion)
                if (!medico) { //nodo 14 
                    throw new NotFoundException(`No se encontró el medico con ID ${medicos[i]}`); //nodo 15
                }
                vacunaGuardada.medicos.push(medico); //nodo 16
            }
        }

        if (pacientes && pacientes.length > 0) { //nodo 17 y nodo 18
            vacunaGuardada.pacientes = []; //nodo 19
            for (let j = 0; j < pacientes.length; j++) { //nodo 20, nodo 21 y nodo 22
                const paciente = await this.pacienteRepository.findOne({ where: { id: pacientes[j] } }); //nodo 23, nodo 24 y nodo 25
                if (!paciente) { //nodo 26
                    throw new NotFoundException(`No se encontró el paciente con ID ${pacientes[j]}`); //nodo 27
                }
                vacunaGuardada.pacientes.push(paciente); //nodo 28
            }
        }

        // Guardar las relaciones actualizadas
        return this.vacunaRepository.save(vacunaGuardada); //nodo 29

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