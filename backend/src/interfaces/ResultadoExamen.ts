export interface ResultadoExamen{

    crearResultado(tipo: String, resultado: String, Nombrepaciente: String): void
    LeerResultado(id: String): any
    EliminarResultado(id: String): void

}