import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const VaccinationScheduleTable = ({
  vacunas,
  newVacuna,
  setNewVacuna,
  saveNewVaccineRecord,
  setVacunas,
}) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editVacuna, setEditVacuna] = useState(null);

  const handleInputChange = (field, value) => {
    setNewVacuna({ ...newVacuna, [field]: value });
  };

  const handleEditInputChange = (field, value) => {
    setEditVacuna({ ...editVacuna, [field]: value });
  };

  const formatDate = (dateString) => {
    console.log(dateString)
    const [year, month, day] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month)-1, parseInt(day));
    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const formattedYear = date.getFullYear();
    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
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
    const updatedVacunas = vacunas.map((vacuna, i) =>
      i === index ? editVacuna : vacuna
    );
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
                    type="text"
                    value={editVacuna.nombre}
                    onChange={(e) =>
                      handleEditInputChange("nombre", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="date"
                    value={editVacuna.fecha}
                    onChange={(e) =>
                      handleEditInputChange("fecha", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={editVacuna.dosis}
                    onChange={(e) =>
                      handleEditInputChange("dosis", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={editVacuna.Fabricante}
                    onChange={(e) =>
                      handleEditInputChange("fabricante", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={editVacuna.lugarDeVacunacion}
                    onChange={(e) =>
                      handleEditInputChange("lugarDeVacunacion", e.target.value)
                    }
                  />
                </td>
                <td
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="success"
                    style={{ flex: "1 1 100px", margin: "5px" }}
                    onClick={() => saveEdit(index)}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="secondary"
                    style={{ flex: "1 1 100px", margin: "5px" }}
                    onClick={() => setEditIndex(null)}
                  >
                    Cancelar
                  </Button>
                </td>
              </>
            ) : (
              vacunas.length > 0 && (
                <>
                  <td>{vacuna.nombre}</td>
                  <td>{formatDate(vacuna.fecha)}</td>
                  <td>{vacuna.dosis}</td>
                  <td>{vacuna.fabricante}</td>
                  <td>{vacuna.lugarDeVacunacion}</td>
                  <td
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      variant="secondary"
                      style={{ flex: "1 1 100px", margin: "5px" }}
                      onClick={() => handleEdit(index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      style={{ flex: "1 1 100px", margin: "5px" }}
                      onClick={() => handleDelete(index)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </>
              )
            )}
          </tr>
        ))}
        {newVacuna && (
          <tr>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.nombre}
                onChange={(e) =>
                  handleInputChange("nombre", e.target.value)
                }
              />
            </td>
            <td>
              <Form.Control
                type="date"
                value={newVacuna.fecha}
                onChange={(e) => handleInputChange("fecha", e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.dosis}
                onChange={(e) => handleInputChange("dosis", e.target.value)}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.fabricante}
                onChange={(e) =>
                  handleInputChange("fabricante", e.target.value)
                }
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={newVacuna.lugarDeVacunacion}
                onChange={(e) => handleInputChange("lugarDeVacunacion", e.target.value)}
              />
            </td>
            <td
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="success"
                style={{ flex: "1 1 100px", margin: "5px" }}
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
