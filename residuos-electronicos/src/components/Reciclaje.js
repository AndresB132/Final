import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import "./Dispositivos.css"

const ReciclajeMateriales = () => {
  const [reciclajes, setReciclajes] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoReciclaje, setNuevoReciclaje] = useState({ material: '', descripcion: '', cantidad: '', estado: '', usuario_id: '' });

  useEffect(() => {
    fetchReciclables();
  }, []);

  const fetchReciclables = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/materiales');
      setReciclajes(response.data);
      console.log("📡 Materiales reciclables obtenidos:", response.data);
    } catch (error) {
      console.error("❌ Error al obtener materiales reciclables:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNuevoReciclaje({ material: '', descripcion: '', cantidad: '', estado: '', usuario_id: '' });
  };

  const handleChange = (e) => {
    setNuevoReciclaje(prev => {
      const newState = { ...prev, [e.target.name]: e.target.value };
      console.log("✍ Actualizando campo:", e.target.name, "➡", e.target.value);
      return newState;
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("📤 Enviando datos:", nuevoReciclaje);
      if (!nuevoReciclaje.material || !nuevoReciclaje.descripcion || !nuevoReciclaje.cantidad || !nuevoReciclaje.estado || !nuevoReciclaje.usuario_id) {
        console.error("❌ Todos los campos son obligatorios.");
        alert("Todos los campos son obligatorios.");
        return;
      }
      const response = await axios.post('http://localhost:5000/api/materiales/agregar', nuevoReciclaje);
      console.log("✅ Material reciclable agregado:", response.data);
      fetchReciclables();
      handleClose();
    } catch (error) {
      console.error("❌ Error al agregar material reciclable:", error);
    }
  };

  return (
    <div>
      <h2>Reciclaje de Materiales</h2>
      <div className="button-container">
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Agregar Material</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Material</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>ID de Usuario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reciclajes.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.material}</TableCell>
                <TableCell>{material.descripcion}</TableCell>
                <TableCell>{material.cantidad}</TableCell>
                <TableCell>{material.estado}</TableCell>
                <TableCell>{material.usuario_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Material Reciclable</DialogTitle>
        <DialogContent>
          <TextField label="Material" name="material" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.material} />
          <TextField label="Descripción" name="descripcion" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.descripcion} />
          <TextField label="Cantidad" name="cantidad" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.cantidad} />
          <TextField label="Estado" name="estado" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.estado} />
          <TextField label="ID de Usuario" name="usuario_id" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.usuario_id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReciclajeMateriales;
