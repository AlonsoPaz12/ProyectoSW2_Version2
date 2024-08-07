import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import axios from 'axios';
import styles from "./AddInforImagenes.module.css";

const AddInforImagenes = ({ show, handleClose, handleSave, initialAnalysisData, doctorActivo }) => {
  const [analysisData, setAnalysisData] = useState([{
    id: null,
    nombrePaciente: '',
    ExamDate: '',
    tipo: '',
    indicaciones: '',
    NombreDoc: doctorActivo,
    NotasMedic: '',
    imagen: '',
  }]);
  const [isDateValid, setIsDateValid] = useState(true);

  useEffect(() => {
    if (initialAnalysisData) {
      console.log('Datos iniciales:', initialAnalysisData); // Log de los datos iniciales
      setAnalysisData(initialAnalysisData.map(data => ({
        ...data,
        id: data.id || null,
        NombreDoc: data.NombreDoc || doctorActivo
      })));
    }
  }, [initialAnalysisData, doctorActivo]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...analysisData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setAnalysisData(updatedData);
  };

  const handleAddRow = () => {
    setAnalysisData([...analysisData, {
      id: null,
      nombrePaciente: '',
      ExamDate: '',
      tipo: '',
      indicaciones: '',
      NombreDoc: doctorActivo,
      NotasMedic: '',
      imagen: '',
    }]);
  };

  const handleRemoveRow = async (id, index) => {
    if (id) {
      try {
        await axios.delete(`http://localhost:3000/imagenes-medicas/${id}`);
        const updatedData = [...analysisData];
        updatedData.splice(index, 1);
        setAnalysisData(updatedData);
      } catch (error) {
        console.error('Error al eliminar la imagen médica:', error);
      }
    } else {
      console.error('ID de la imagen médica es undefined.');
    }
  };

  const handleSubmit = async () => {
    const newData = analysisData.filter(data => data.nombrePaciente.trim() !== "" || data.ExamDate.trim() !== "" || data.tipo.trim() !== "" || data.indicaciones.trim() !== "" || data.NombreDoc.trim() !== "" || data.NotasMedic.trim() !== "");
    if (newData.some(data => data.ExamDate.trim() === "")) {
      setIsDateValid(false);
      return;
    }
    setIsDateValid(true);

    console.log('Datos a enviar:', newData);

    try {
      const response = await axios.post('http://localhost:3000/imagenes-medicas', newData);
      console.log('Datos enviados exitosamente:', response.data);
      handleSave(response.data);
      setAnalysisData(response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }

    handleClose();
  };

  const handleImageUpload = (index, file) => {
    const imageUrl = URL.createObjectURL(file);
    const updatedData = [...analysisData];
    updatedData[index].imagen = imageUrl;
    setAnalysisData(updatedData);
  };

  const handleImageRemove = (index) => {
    const updatedData = [...analysisData];
    updatedData[index].imagen = '';
    setAnalysisData(updatedData);
  };

  const handleImageUpdate = (index) => {
    document.getElementById(`image-upload-${index}`).click();
  };

  return (
    <Modal show={show} onHide={() => { }} backdrop="static" keyboard={false} dialogClassName={styles.customModal}>
      <Modal.Header closeButton className={styles.customHeader}>
        <Modal.Title>{initialAnalysisData ? 'Editar Imagen' : 'Agregar Imagen'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.customBody}>
        <Form>
          <Table striped bordered hover responsive className={styles.tableResponsive}>
            <thead>
              <tr>
                <th>Nombre del Doctor</th>
                <th>Nombre del Paciente</th>
                <th>Tipo de examen</th>
                <th>Fecha de examen</th>
                <th>Indicaciones</th>
                <th>Notas Medicas</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {analysisData.map((analysis, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      name="NombreDoc"
                      value={analysis.NombreDoc}
                      onChange={(e) => handleChange(e, index)}
                      readOnly
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="nombrePaciente"
                      value={analysis.nombrePaciente}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="tipo"
                      value={analysis.tipo}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="ExamDate"
                      value={analysis.ExamDate}
                      onChange={(e) => handleChange(e, index)}
                      isInvalid={!isDateValid}
                    />
                    <Form.Control.Feedback type="invalid">
                      La fecha es obligatoria.
                    </Form.Control.Feedback>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="indicaciones"
                      value={analysis.indicaciones}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="NotasMedic"
                      value={analysis.NotasMedic}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    {analysis.imagen ? (
                      <div className={styles.imageLab}>
                        <img src={analysis.imagen} alt="uploaded" width={50} height={50} />
                        <div>
                          <Button variant='danger' onClick={() => handleImageRemove(index)}>Eliminar</Button>
                          <Button variant='info' onClick={() => handleImageUpdate(index)}>Actualizar</Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          id={`image-upload-${index}`}
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageUpload(index, e.target.files[0])}
                        />
                        <Button variant="primary" onClick={() => handleImageUpdate(index)} className={styles.addRowButton} >Subir</Button>
                      </div>
                    )}
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveRow(analysis.id, index)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={handleAddRow} className={styles.addRowButton}>Agregar Fila</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.customFooter}>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleSubmit} className={styles.addRowButtonSave}>
          {initialAnalysisData ? 'Guardar Cambios' : 'Agregar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddInforImagenes;
