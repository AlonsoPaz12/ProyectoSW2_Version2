import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';
import { ComponenteResultado } from 'src/componentes-resultado/componentes_resultado.entity';

@Entity()
export class ResultadoLab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  imageurl: string;

  @Column({ nullable: true })
  numeroDocumento: string;

  @Column()
  nombres: string;

  @Column()
  apePaterno: string;

  @Column({ nullable: true })
  apeMaterno: string;

  @Column({ nullable: true })
  fechaNacimiento: Date;

  @Column({ nullable: true })
  numCelular: string;

  @Column({ nullable: true })
  correoElectronico: string;

  @Column({ nullable: true })
  contrasena: string;

  @Column({ nullable: true })
  repContrasena: string;

  @Column({ nullable: true })
  genero: string;

  @Column()
  motivoPrueba: string;

  @Column()
  fecha: Date;

  @Column()
  Resultado: string;

  @Column()
  unidades: string;

  @Column()
  rangoNormal: string;

  @ManyToOne(() => OrdenMedica, orden => orden.resultadoLaboratorio)
  @JoinColumn({ name: 'orden_medica_id' })
  orden: OrdenMedica;

  @OneToMany(() => ComponenteResultado, componente => componente.resultadoLab)
  componentes: ComponenteResultado[];
}
