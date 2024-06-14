import { MigrationInterface, QueryRunner } from "typeorm";

export class Commit1718338085720 implements MigrationInterface {
    name = 'Commit1718338085720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicamento" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "tipo" character varying NOT NULL, "frecuencia" character varying NOT NULL, "dosis" character varying NOT NULL, CONSTRAINT "PK_d78d6a102cc6e898c965583d55a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "imagen_medica" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "imagen" character varying NOT NULL, "nombrePaciente" character varying NOT NULL, "orden_medica_id" integer, CONSTRAINT "REL_86ffcb09cef464ae6897d9e133" UNIQUE ("orden_medica_id"), CONSTRAINT "PK_e8009c59a8675d663c5681399ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resultado_lab" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "resultado" character varying NOT NULL, "nombrePaciente" character varying NOT NULL, "orden_medica_id" integer, CONSTRAINT "REL_383bc394486c7547ae52da8ddd" UNIQUE ("orden_medica_id"), CONSTRAINT "PK_bcb902819fd116bb7fc7baf6f4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orden_medica" ("id" SERIAL NOT NULL, "observacion" character varying NOT NULL, "resultadoLaboratorioId" integer, "imagenMedicaId" integer, "medico_id" integer, "paciente_id" integer, "cita_id" integer, CONSTRAINT "REL_985a46a966708e1c592a1d5e91" UNIQUE ("resultadoLaboratorioId"), CONSTRAINT "REL_bcc7cf45152b5c7666543330a9" UNIQUE ("imagenMedicaId"), CONSTRAINT "REL_e948a2e962b242356ad80cc02a" UNIQUE ("cita_id"), CONSTRAINT "PK_a7b646fda2bf0959a2dff01565f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "numeroDocumento" character varying NOT NULL, "nombres" character varying NOT NULL, "apePaterno" character varying NOT NULL, "apeMaterno" character varying NOT NULL, "fechaNacimiento" TIMESTAMP NOT NULL, "numCelular" character varying NOT NULL, "correoElectronico" character varying NOT NULL, "contrasena" character varying NOT NULL, "repContrasena" character varying NOT NULL, "genero" character varying NOT NULL, "rol" character varying NOT NULL, CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paciente" ("id" SERIAL NOT NULL, "numeroDocumento" character varying NOT NULL, "nombres" character varying NOT NULL, "apePaterno" character varying NOT NULL, "apeMaterno" character varying NOT NULL, "fechaNacimiento" TIMESTAMP NOT NULL, "numCelular" character varying NOT NULL, "correoElectronico" character varying NOT NULL, "contrasena" character varying NOT NULL, "repContrasena" character varying NOT NULL, "genero" character varying NOT NULL, "rol" character varying NOT NULL, CONSTRAINT "PK_cbcb7985432e4b49d32c5243867" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cita" ("id" SERIAL NOT NULL, "motivo" character varying NOT NULL, "observacion" character varying NOT NULL, "fecha" TIMESTAMP NOT NULL, "asistio" boolean NOT NULL, "medico_id" integer, "paciente_id" integer, "receta_id" integer, "orden_medica_id" integer, CONSTRAINT "REL_0224b9e81a938a60b8af574058" UNIQUE ("receta_id"), CONSTRAINT "REL_e4757b7108befbec3c68ebcc6d" UNIQUE ("orden_medica_id"), CONSTRAINT "PK_57e1373661f0c185987b03dc6c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medico" ("id" SERIAL NOT NULL, "numeroDocumento" character varying NOT NULL, "nombres" character varying NOT NULL, "apePaterno" character varying NOT NULL, "apeMaterno" character varying NOT NULL, "fechaNacimiento" TIMESTAMP NOT NULL, "numCelular" character varying NOT NULL, "correoElectronico" character varying NOT NULL, "contrasena" character varying NOT NULL, "repContrasena" character varying NOT NULL, "genero" character varying NOT NULL, "rol" character varying NOT NULL, "especialidad" character varying NOT NULL, "centroMedico" character varying NOT NULL, CONSTRAINT "PK_ddc7f4354b3a5098b58a28df187" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "receta_medica" ("id" SERIAL NOT NULL, "observacion" character varying NOT NULL, "medico_id" integer, "cita_id" integer, "paciente_id" integer, CONSTRAINT "REL_930f4875c976845d4d12416c58" UNIQUE ("cita_id"), CONSTRAINT "PK_0547b19ff725e3eed67ee542405" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicamento_recetas_receta_medica" ("medicamentoId" integer NOT NULL, "recetaMedicaId" integer NOT NULL, CONSTRAINT "PK_1f67f32cdfa8d86093a02c17c0a" PRIMARY KEY ("medicamentoId", "recetaMedicaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c62b4340217bb28c21072a89ff" ON "medicamento_recetas_receta_medica" ("medicamentoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9cec07e4a649298cae8b0dca16" ON "medicamento_recetas_receta_medica" ("recetaMedicaId") `);
        await queryRunner.query(`CREATE TABLE "receta_medica_medicamentos_medicamento" ("recetaMedicaId" integer NOT NULL, "medicamentoId" integer NOT NULL, CONSTRAINT "PK_eb6e1e3b6c6e1db9ce0f0e7d74d" PRIMARY KEY ("recetaMedicaId", "medicamentoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cbef6515e3692fad62081b9185" ON "receta_medica_medicamentos_medicamento" ("recetaMedicaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9a0e0775e05b9ad5f0c5b1bb9c" ON "receta_medica_medicamentos_medicamento" ("medicamentoId") `);
        await queryRunner.query(`ALTER TABLE "imagen_medica" ADD CONSTRAINT "FK_86ffcb09cef464ae6897d9e1333" FOREIGN KEY ("orden_medica_id") REFERENCES "orden_medica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_lab" ADD CONSTRAINT "FK_383bc394486c7547ae52da8dddd" FOREIGN KEY ("orden_medica_id") REFERENCES "orden_medica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_medica" ADD CONSTRAINT "FK_985a46a966708e1c592a1d5e91a" FOREIGN KEY ("resultadoLaboratorioId") REFERENCES "resultado_lab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_medica" ADD CONSTRAINT "FK_bcc7cf45152b5c7666543330a9c" FOREIGN KEY ("imagenMedicaId") REFERENCES "imagen_medica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_medica" ADD CONSTRAINT "FK_d7b8889d7bd4f4b55457e883233" FOREIGN KEY ("medico_id") REFERENCES "medico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_medica" ADD CONSTRAINT "FK_dd6ffe47827f7dbbf180c6ec5bd" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orden_medica" ADD CONSTRAINT "FK_e948a2e962b242356ad80cc02a5" FOREIGN KEY ("cita_id") REFERENCES "cita"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "FK_e921678f82163cec1f69ce789a4" FOREIGN KEY ("medico_id") REFERENCES "medico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "FK_573dda8b0ff6310f71cb31de2be" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "FK_0224b9e81a938a60b8af574058e" FOREIGN KEY ("receta_id") REFERENCES "receta_medica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cita" ADD CONSTRAINT "FK_e4757b7108befbec3c68ebcc6d9" FOREIGN KEY ("orden_medica_id") REFERENCES "orden_medica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receta_medica" ADD CONSTRAINT "FK_9eef899e13bdf21000a44bc5a6d" FOREIGN KEY ("medico_id") REFERENCES "medico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receta_medica" ADD CONSTRAINT "FK_930f4875c976845d4d12416c580" FOREIGN KEY ("cita_id") REFERENCES "cita"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receta_medica" ADD CONSTRAINT "FK_506ad30b48b6f04aa923dc93a91" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "medicamento_recetas_receta_medica" ADD CONSTRAINT "FK_c62b4340217bb28c21072a89ff7" FOREIGN KEY ("medicamentoId") REFERENCES "medicamento"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "medicamento_recetas_receta_medica" ADD CONSTRAINT "FK_9cec07e4a649298cae8b0dca162" FOREIGN KEY ("recetaMedicaId") REFERENCES "receta_medica"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "receta_medica_medicamentos_medicamento" ADD CONSTRAINT "FK_cbef6515e3692fad62081b91852" FOREIGN KEY ("recetaMedicaId") REFERENCES "receta_medica"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "receta_medica_medicamentos_medicamento" ADD CONSTRAINT "FK_9a0e0775e05b9ad5f0c5b1bb9ce" FOREIGN KEY ("medicamentoId") REFERENCES "medicamento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "receta_medica_medicamentos_medicamento" DROP CONSTRAINT "FK_9a0e0775e05b9ad5f0c5b1bb9ce"`);
        await queryRunner.query(`ALTER TABLE "receta_medica_medicamentos_medicamento" DROP CONSTRAINT "FK_cbef6515e3692fad62081b91852"`);
        await queryRunner.query(`ALTER TABLE "medicamento_recetas_receta_medica" DROP CONSTRAINT "FK_9cec07e4a649298cae8b0dca162"`);
        await queryRunner.query(`ALTER TABLE "medicamento_recetas_receta_medica" DROP CONSTRAINT "FK_c62b4340217bb28c21072a89ff7"`);
        await queryRunner.query(`ALTER TABLE "receta_medica" DROP CONSTRAINT "FK_506ad30b48b6f04aa923dc93a91"`);
        await queryRunner.query(`ALTER TABLE "receta_medica" DROP CONSTRAINT "FK_930f4875c976845d4d12416c580"`);
        await queryRunner.query(`ALTER TABLE "receta_medica" DROP CONSTRAINT "FK_9eef899e13bdf21000a44bc5a6d"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "FK_e4757b7108befbec3c68ebcc6d9"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "FK_0224b9e81a938a60b8af574058e"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "FK_573dda8b0ff6310f71cb31de2be"`);
        await queryRunner.query(`ALTER TABLE "cita" DROP CONSTRAINT "FK_e921678f82163cec1f69ce789a4"`);
        await queryRunner.query(`ALTER TABLE "orden_medica" DROP CONSTRAINT "FK_e948a2e962b242356ad80cc02a5"`);
        await queryRunner.query(`ALTER TABLE "orden_medica" DROP CONSTRAINT "FK_dd6ffe47827f7dbbf180c6ec5bd"`);
        await queryRunner.query(`ALTER TABLE "orden_medica" DROP CONSTRAINT "FK_d7b8889d7bd4f4b55457e883233"`);
        await queryRunner.query(`ALTER TABLE "orden_medica" DROP CONSTRAINT "FK_bcc7cf45152b5c7666543330a9c"`);
        await queryRunner.query(`ALTER TABLE "orden_medica" DROP CONSTRAINT "FK_985a46a966708e1c592a1d5e91a"`);
        await queryRunner.query(`ALTER TABLE "resultado_lab" DROP CONSTRAINT "FK_383bc394486c7547ae52da8dddd"`);
        await queryRunner.query(`ALTER TABLE "imagen_medica" DROP CONSTRAINT "FK_86ffcb09cef464ae6897d9e1333"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a0e0775e05b9ad5f0c5b1bb9c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cbef6515e3692fad62081b9185"`);
        await queryRunner.query(`DROP TABLE "receta_medica_medicamentos_medicamento"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9cec07e4a649298cae8b0dca16"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c62b4340217bb28c21072a89ff"`);
        await queryRunner.query(`DROP TABLE "medicamento_recetas_receta_medica"`);
        await queryRunner.query(`DROP TABLE "receta_medica"`);
        await queryRunner.query(`DROP TABLE "medico"`);
        await queryRunner.query(`DROP TABLE "cita"`);
        await queryRunner.query(`DROP TABLE "paciente"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "orden_medica"`);
        await queryRunner.query(`DROP TABLE "resultado_lab"`);
        await queryRunner.query(`DROP TABLE "imagen_medica"`);
        await queryRunner.query(`DROP TABLE "medicamento"`);
    }

}