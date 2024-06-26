import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import styles from "./AddAnalysisModal.module.css";

const testReasons = [ // Array of common test reasons
  { value: 'cancer', label: 'Sospecha de Cáncer' },
  { value: 'infeccion', label: 'Sospecha de Infección' },
  { value: 'control', label: 'Control Rutina' },
  { value: 'otro', label: 'Otro' }, // Add an "Other" option
];

const AddAnalysisModal = ({ show, handleClose, handleSave, initialAnalysisData }) => {
  const [analysisData, setAnalysisData] = useState([{
    MotivoPrueba: '',
    testName: '',
    testLastName: '',
    testDate: '',
    result: '',
    unit: '',
    normalRange: '',
  }]);
  const [isDateValid, setIsDateValid] = useState(true); // Estado para verificar si la fecha es válida

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
      MotivoPrueba: '',
      testName: '',
      testLastName: '',
      testDate: '',
      result: '',
      unit: '',
      normalRange: '',
    }]);
  };

  const handleRemoveRow = (index) => {
    const updatedData = [...analysisData];
    updatedData.splice(index, 1);
    setAnalysisData(updatedData);
  };

  const handleSubmit = () => {
    // Validar si la fecha es válida antes de guardar
    const newData = analysisData.filter(data => data.testName.trim() !== "" || data.testDate.trim() !== "" || data.result.trim() !== "" || data.unit.trim() !== "" || data.normalRange.trim() !== "");
    if (newData.some(data => data.testDate.trim() === "")) {
      setIsDateValid(false);
      return;
    }
    setIsDateValid(true);
    handleSave(newData);
    handleClose();
  };

  const handleImageUpload = async (index, file) => {
    // Handle image upload logic, e.g., uploading to a server or cloud storage
    const imageUrl = URL.createObjectURL(file); // Use URL.createObjectURL for demo purposes
    const updatedData = [...analysisData];
    updatedData[index].image = imageUrl;
    setAnalysisData(updatedData);
  };

  return (
    <Modal show={show} onHide={() => {}} backdrop="static" keyboard={false} dialogClassName={styles.customModal}>
      <Modal.Header closeButton className={styles.customHeader}>
        <Modal.Title>{initialAnalysisData ? 'Editar Análisis' : 'Agregar Análisis'}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.customBody}>
        <Form>
          <Table striped bordered hover responsive className={styles.tableResponsive}>
            <thead>
              <tr>
                <th>Motivo de la Prueba</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Fecha</th>
                <th>Resultado</th>
                <th>Unidades</th>
                <th>Rango Normal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {analysisData.map((analysis, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      as="select"
                      name="MotivoPrueba"
                      value={analysis.MotivoPrueba}
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
                      name="testName"
                      value={analysis.testName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="testLasName"
                      value={analysis.testLasName}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="date"
                      name="testDate"
                      value={analysis.testDate}
                      onChange={(e) => handleChange(e, index)}
                      isInvalid={!isDateValid} // Marca la fecha como inválida si no está llena
                    />
                    <Form.Control.Feedback type="invalid">
                      La fecha es obligatoria.
                    </Form.Control.Feedback>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="result"
                      value={analysis.result}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="unit"
                      value={analysis.unit}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="normalRange"
                      value={analysis.normalRange}
                      onChange={(e) => handleChange(e, index)}
                    />
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

export default AddAnalysisModal;