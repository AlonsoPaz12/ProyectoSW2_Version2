import { ImagenMedica } from "src/imagenes-medicas/imagenes-medicas.entity";
import { Paciente } from "src/pacientes/pacientes.entity";
import { ResultadoLab } from "src/resultados-lab/resultados-lab.entity";
import { Column, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrdenMedica {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => ResultadoLab, {nullable: true})
    @JoinColumn()
    resultadoLaboratorio: ResultadoLab;

    @OneToOne(()=>ImagenMedica, {nullable: true})
    @JoinColumn()
    imagenMedica: ImagenMedica;

    @Column()
    observacion: String;

    @ManyToOne(() => Paciente, paciente => paciente.ordenesMedicas)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;
    
}