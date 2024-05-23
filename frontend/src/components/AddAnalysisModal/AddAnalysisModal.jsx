import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import styles from "./AddAnalysisModal.module.css";

const AddAnalysisModal = ({ show, handleClose, handleSave, initialAnalysisData }) => {
  const [analysisData, setAnalysisData] = useState([{
    testName: '',
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
      testName: '',
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
                <th>Nombre</th>
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
                      type="text"
                      name="testName"
                      value={analysis.testName}
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
