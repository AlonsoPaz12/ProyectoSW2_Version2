export class CrearResultadoLabDto {
    imageurl?: string;
    numeroDocumento?: string;
    nombres: string;
    apePaterno: string;
    apeMaterno?: string;
    fechaNacimiento?: Date;
    numCelular?: string;
    correoElectronico?: string;
    contrasena?: string;
    repContrasena?: string;
    genero?: string;
    motivoPrueba: string;
    fecha: Date;
    Resultado: string;
    unidades: string;
    rangoNormal: string;
  }
  
  export class ActualizarResultadoLabDto {
    imageurl?: string;
    numeroDocumento?: string;
    nombres?: string;
    apePaterno?: string;
    apeMaterno?: string;
    fechaNacimiento?: Date;
    numCelular?: string;
    correoElectronico?: string;
    contrasena?: string;
    repContrasena?: string;
    genero?: string;
    motivoPrueba?: string;
    fecha?: Date;
    Resultado?: string;
    unidades?: string;
    rangoNormal?: string;
  }
  