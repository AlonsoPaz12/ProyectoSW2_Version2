export interface ResultadoExamen{

    crearResultado(tipo: String, resultado: String, Nombrepaciente: String)
    LeerResultado(id: String): any
    EliminarResultado(id: String): void

}