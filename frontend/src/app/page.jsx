import ResponsiveAppBar from '@/components/ResponsiveAppBar/ResponsiveAppBar.jsx';
import Footer from "@/components/Footer/Footer.jsx";
import Carrusel from "@/components/Carrusel/Carrusel";
import CustomLink from "@/components/CustomLink/CustomLink";

import { FaCalendarAlt } from "react-icons/fa";

import styles from "./page.module.css";

export default function Home() {
  const imagenes = [
    '/img/FondoCarrusel.png',
    '/img/FondoCarrusel.png',
    '/img/FondoCarrusel.png',
  ];
  
  return (
    <main className={styles.main}>

      <ResponsiveAppBar/>

      <Carrusel images={imagenes} />

      <div className={styles.banner}>

        <h2 className={styles.pregunta}>¿CÓMO TE PODEMOS<br/> AYUDAR HOY?</h2>

        <div className={styles.contenidoLista}>
          <div className={styles.column}>
            <div className={styles.contenidoOpcion}>
              <div className={styles.iconList}>
                <FaCalendarAlt size="2em"/>
              </div>  
              <div className={styles.datos}>
                Quiero agendar una cita
                <div>
                  <CustomLink href={"/agendarCita"} text={"Ver más ↪"}/>
                </div>  
              </div>
            </div>
            <div className={styles.contenidoOpcion}>
              <div className={styles.iconList}>
                <FaCalendarAlt size="2em"/>
              </div>  
              <div className={styles.datos}>
                Quiero ver mis laboratorios
                <div>
                  <CustomLink href={"/agendarCita"} text={"Ver más ↪"}/>
                </div>  
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.contenidoOpcion}>
              <div className={styles.iconList}>
                <FaCalendarAlt size="2em"/>
              </div>  
              <div className={styles.datos}>
                Quiero ver una especialidad
                <div>
                  <CustomLink href={"/agendarCita"} text={"Ver más ↪"}/>
                </div>  
              </div>
            </div>
            <div className={styles.contenidoOpcion}>
              <div className={styles.iconList}>
                <FaCalendarAlt size="2em"/>
              </div>  
              <div className={styles.datos}>
                Quiero ver mis imágenes médicas
                <div>
                  <CustomLink href={"/ImagenesMedicas"} text={"Ver más ↪"}/>
                </div>  
              </div>
            </div>
          </div>
        </div>
        
      </div>
    
      <Footer/>
    </main>

  );
}
