import { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import styles from "./AddInforImagenes.module.css";

const AddInforImagenes = ({ show, closePage, viewSave, initialImageData }) => {
    const [ImageData, setImageData] = useState([{
        testNamePacient: '',
        testDateImg: '',
        diagnostico: '',
        hallazgos: '',
        rayox: '',
        InfoDoc: '',
    }]);
    const [isDateValid, setIsDateValid] = useState(true); // ¿Fecha valida?

    useEffect(() => {
        if (initialImageData) {
            setImageData(initialImageData);
        }
    }, [initialImageData]);

    const viewChange = (e, index) => {
        const { name, value } = e.target;
        const updatedData = [...ImageData];
        updatedData[index] = { ...updatedData[index], [name]: value };
        setImageData(updatedData);
    };

    const viewAddPage = () => {
        setImageData([...ImageData, {
            testNamePacient: '',
            testDateImg: '',
            diagnostico: '',
            hallazgos: '',
            rayox: '',
            InfoDoc: '',
        }]);
    };

    const viewRemovePage = (index) => {
        const updatedData = [...ImageData];
        updatedData.splice(index, 1);
        setImageData(updatedData);
    };

    const viewSubmitData = () => {
    // Validar si la fecha es válida antes de guardar
        const newData = ImageData.filter(data => data.testNamePacient.trim() !== "" || data.testDateImg.trim() !== "" || data.diagnostico.trim() !== "" || data.hallazgos.trim() !== "" || data.rayox.trim() !== "" || data.InfoDoc.trim() !== "");
        if (newData.some(data => data.testDateImg.trim() === "")) {
            setIsDateValid(false);
            return;
        }
        setIsDateValid(true);
        viewSave(newData);
        closePage();
    };

    return (
        <Modal show={show} onHide={() => {}} backdrop="static" keyboard={false} dialogClassName={styles.customModal}>
            <Modal.Header closeButton className={styles.customHeader}>
                <Modal.Title>{initialImageData ? 'Editar Diagnostico' : 'Agregar Diagnostico'}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.customBody}>
                <Form>
                    <Table striped bordered hover responsive className={styles.tableResponsive}>
                        <thead>
                            <tr>
                                <th>Nombre Paciente</th>
                                <th>Fecha</th>
                                <th>Diagnostico</th>
                                <th>Hallazgos</th>
                                <th>Imagenl</th>
                                <th>Doctor Encargado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ImageData.map((imagen, index) => (
                                <tr key={index}>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="testNamePacient"
                                            value={imagen.testNamePacient}
                                            onChange={(e) => viewChange(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="date"
                                            name="testDateImg"
                                            value={imagen.testDateImg}
                                            onChange={(e) => viewChange(e, index)}
                                            isInvalid={!isDateValid} // Fecha invalida
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es obligatorio
                                        </Form.Control.Feedback>
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="diagnostico"
                                            value={imagen.diagnostico}
                                            onChange={(e) => viewChange(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="hallazgos"
                                            value={imagen.hallazgos}
                                            onChange={(e) => viewChange(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="rayox"
                                            value={imagen.rayox}
                                            onChange={(e) => viewChange(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="InfoDoc"
                                            value={imagen.InfoDoc}
                                            onChange={(e) => viewChange(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleRemovePage(index)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={viewAddPage} className={styles.addRowButton}>Agregar Diagnostico</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.customFooter}>
                <Button variant="secondary" onClick={closePage}>Cerrar</Button>
                <Button variant="primary" onClick={viewSubmitData} className={styles.addRowButtonSave}>
                    {initialImageData ? 'Guardar Cambios' : 'Agregar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddInforImagenes;
