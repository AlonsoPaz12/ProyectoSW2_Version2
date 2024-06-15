import React from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';

const VaccinationScheduleTable = ({ vacunas, newVacuna, setNewVacuna, saveNewVaccineRecord }) => {
  const handleInputChange = (field, value) => {
    setNewVacuna({ ...newVacuna, [field]: value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Vacuna</th>
          <th>Fecha</th>
          <th>Dosis</th>
          <th>Fabricante</th>
          <th>Lugar de vacunación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {vacunas.map((vacuna, index) => (
          <tr key={index}>
            <td>{vacuna.VacunaNombre}</td>
            <td>{formatDate(vacuna.fecha)}</td>
            <td>{vacuna.Dosis}</td>
            <td>{vacuna.Fabricante}</td>
            <td>{vacuna.Lugar}</td>
            <td style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <Button variant='secondary' style={{ flex: '1 1 100px', margin: '5px' }}>Editar</Button>
              <Button variant='danger' style={{ flex: '1 1 100px', margin: '5px' }}>Eliminar</Button>
            </td>
          </tr>
        ))}
        {newVacuna && (
          <tr>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.VacunaNombre}
                onChange={(e) => handleInputChange('VacunaNombre', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="date"
                value={newVacuna.fecha}
                onChange={(e) => handleInputChange('fecha', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.Dosis}
                onChange={(e) => handleInputChange('Dosis', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.Fabricante}
                onChange={(e) => handleInputChange('Fabricante', e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.Lugar}
                onChange={(e) => handleInputChange('Lugar', e.target.value)}
              />
            </td>
            <td style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <Button 
                variant='success' 
                style={{ flex: '1 1 100px', margin: '5px' }}
                onClick={() => saveNewVaccineRecord(newVacuna)}
              >
                Guardar
              </Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default VaccinationScheduleTable;
