import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import styles from "./AddInforImagenes.module.css";

const testReasons = [ 
  { value: 'Dr. Juan Pérez', label: 'Dr. Juan Pérez' },
  { value: 'Dra. María González', label: 'Dra. María González' },
  { value: 'Dr. Luis Méndez', label: 'Dr. Luis Méndez' },
  { value: 'Dr. Roberto Martínez', label: 'Dr. Roberto Martínez' }, 
];

const AddInforImagenes = ({ show, handleClose, handleSave, initialAnalysisData }) => {
  const [analysisData, setAnalysisData] = useState([{
    NombrePaciente: '',
    ExamDate: '',
    ExamTipo: '',
    ParteCuerpo: '',
    indicaciones: '',
    AnatomicasEstruc: '',
    NombreDoc: '',
    NotasMedic: '',
    image: '', 
  }]);
  const [isDateValid, setIsDateValid] = useState(true); 

  useEffect(() => {
    if (initialAnalysisData) {
      setAnalysisData(initialAnalysisData);
    }
  }, [initialAnalysisData]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...analysisData];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setAnalysisData(updatedData);
  };

  const handleAddRow = () => {
    setAnalysisData([...analysisData, {
        NombrePaciente: '',
        ExamDate: '',
        ExamTipo: '',
        ParteCuerpo: '',
        indicaciones: '',
        AnatomicasEstruc: '',
        NombreDoc: '',
        NotasMedic: '',
        image: '', 
    }]);
  };

  const handleRemoveRow = (index) => {
    const updatedData = [...analysisData];
    updatedData.splice(index, 1);
    setAnalysisData(updatedData);
  };

  const handleSubmit = () => {
    const newData = analysisData.filter(data => data.NombrePaciente.trim() !== "" || data.ExamDate.trim() !== "" || data.ExamTipo.trim() !== "" || data.ParteCuerpo.trim() !== "" || data.indicaciones.trim() !== "" || data.AnatomicasEstruc.trim() !== "" ||  data.NombreDoc.trim() !== "" || data.NotasMedic.trim() !== "");
    if (newData.some(data => data.ExamDate.trim() === "")) {
      setIsDateValid(false);
      return;
    }
    setIsDateValid(true);
    handleSave(newData);
    handleClose();
  };

  const handleImageUpload = async (index, file) => {
    const imageUrl = URL.createObjectURL(file); 
    const updatedData = [...analysisData];
    updatedData[index].image = imageUrl;
    setAnalysisData(updatedData);
  };

  const handleImageRemove = (index) => {
    const updatedData = [...analysisData];
    updatedData[index].image = '';
    setAnalysisData(updatedData);
  };

  const handleImageUpdate = (index) => {
    document.getElementById(`image-upload-${index}`).click();
  };

  return (
    <Modal show={show} onHide={() => {}} backdrop="static" keyboard={false} dialogClassName={styles.customModal}>
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
                <th>Parte de cuerpo</th>
                <th>Indicaciones</th>
                <th>Estructuras anatomicas</th>
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
                      as="select"
                      name="NombreDoc"
                      value={analysis.NombreDoc}
                      onChange={(e) => handleChange(e, index)}
                    >
                      {testReasons.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="NombrePaciente"
                      value={analysis.NombrePaciente}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="ExamTipo"
                      value={analysis.ExamTipo}
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
                      name="ParteCuerpo"
                      value={analysis.ParteCuerpo}
                      onChange={(e) => handleChange(e, index)}
                    />
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
                      name="AnatomicasEstruc"
                      value={analysis.AnatomicasEstruc}
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
                    {analysis.image ? (
                      <div className={styles.imageLab}>
                        <img src={analysis.image} alt="uploaded" width={50} height={50} />
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
                    <Button variant="danger" onClick={() => handleRemoveRow(index)}>Eliminar</Button>
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