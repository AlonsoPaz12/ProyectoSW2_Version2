import { ImagenMedica } from '../imagenes-medicas/imagenes-medicas.entity';
import { Paciente } from "src/pacientes/pacientes.entity";
import { Medico } from "src/medicos/medicos.entity";
import { ResultadoLab } from "src/resultados-lab/resultados-lab.entity";
import { Column, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cita } from 'src/citas/citas.entity';

@Entity()
export class OrdenMedica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    observacion: String;

    @OneToOne(() => ResultadoLab, resultadoLaboratorio => resultadoLaboratorio.orden,{nullable: true})
    @JoinColumn()
    resultadoLaboratorio: ResultadoLab;

    @OneToOne(()=> ImagenMedica, imagenMedica => imagenMedica.orden,{nullable: true})
    @JoinColumn()
    imagenMedica: ImagenMedica;

    @ManyToOne(() => Medico, medico => medico.recetas)
    @JoinColumn({ name: 'medico_id' })
    medico: Medico;

    @ManyToOne(() => Paciente, paciente => paciente.ordenesMedicas)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @OneToOne(() => Cita, cita => cita.receta)
    @JoinColumn({ name: 'cita_id' })
    cita: Cita
    
}