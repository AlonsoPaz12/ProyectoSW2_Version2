import { ImagenMedica } from "src/imagenes-medicas/imagenes-medicas.entity";
import { ResultadoLab } from "src/resultados-lab/resultados-lab.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
    
}