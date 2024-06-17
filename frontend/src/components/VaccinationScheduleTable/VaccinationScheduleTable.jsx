import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Form } from 'react-bootstrap';

const VaccinationScheduleTable = ({ vacunas, newVacuna, setNewVacuna, saveNewVaccineRecord, setVacunas}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editVacuna, setEditVacuna] = useState(null);

  const handleInputChange = (field, value) => {
    setNewVacuna({ ...newVacuna, [field]: value });
  };

  const handleEditInputChange = (field, value) => {
    setEditVacuna({ ...editVacuna, [field]: value});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDelete = (index) => {
    const newVacunas = vacunas.filter((_, i) => i !== index);
    setVacunas(newVacunas);
  };

  const handleEdit = (index) => {
    setEditIndex(index); 
    setEditVacuna(vacunas[index]);
  };

  const saveEdit = (index) => {
    const updatedVacunas = vacunas.map((vacuna, i) => (i === index ? editVacuna : vacuna));
    setVacunas(updatedVacunas);
    setEditIndex(null);
    setEditVacuna(null);
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
            {editIndex === index ? (
              <>
              <td>
                <Form.Control
                  type='text'
                  value={editVacuna.VacunaNombre}
                  onChange={(e) => handleEditInputChange('VacunaNombre', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type='date'
                  value={editVacuna.fecha}
                  onChange={(e) => handleEditInputChange('fecha', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type='text'
                  value={editVacuna.Dosis}
                  onChange={(e) => handleEditInputChange('Dosis', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type='text'
                  value={editVacuna.Fabricante}
                  onChange={(e) => handleEditInputChange('Fabricante', e.target.value)}
                />
              </td>
              <td>
                <Form.Control
                  type='text'
                  value={editVacuna.Lugar}
                  onChange={(e) => handleEditInputChange('Lugar', e.target.value)}
                />
              </td>
              <td style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <Button variant='success' style={{ flex: '1 1 100px', margin: '5px' }} onClick={() => saveEdit(index)}>Guardar</Button>
              <Button variant='secondary' style={{ flex: '1 1 100px', margin: '5px' }} onClick={() => setEditIndex(null)}>Cancelar</Button>
              </td>
              </>
            ) : (
            <>
            <td>{vacuna.VacunaNombre}</td>
            <td>{formatDate(vacuna.fecha)}</td>
            <td>{vacuna.Dosis}</td>
            <td>{vacuna.Fabricante}</td>
            <td>{vacuna.Lugar}</td>
            <td style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              <Button variant='secondary' style={{ flex: '1 1 100px', margin: '5px' }} onClick= {() => handleEdit(index)}>Editar</Button>
              <Button variant='danger'
               style={{ flex: '1 1 100px', margin: '5px' }}
               onClick={() => handleDelete(index)} >Eliminar</Button>
            </td>
            </>
            )}
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
