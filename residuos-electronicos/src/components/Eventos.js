import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';
import "./Eventos.css";

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [nuevoEvento, setNuevoEvento] = useState({
    nombre: '',
    fecha: '',
    descripcion: '',
    ubicacion: '',  // 🔹 Ahora todo se maneja con 'ubicacion'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEventos();
    fetchUbicaciones();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/eventos');
      setEventos(response.data);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      setError('Error al cargar los eventos. Inténtalo de nuevo.');
    }
  };

  const fetchUbicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/puntos-recoleccion/direcciones');
      setUbicaciones(response.data);
    } catch (error) {
      console.error("Error al obtener ubicaciones:", error);
      setError('Error al cargar las ubicaciones. Inténtalo de nuevo.');
    }
  };

  const handleOpen = () => {
    setEditMode(false);
    setNuevoEvento({ nombre: '', fecha: '', descripcion: '', ubicacion: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!nuevoEvento.nombre || !nuevoEvento.fecha || !nuevoEvento.descripcion || !nuevoEvento.ubicacion) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      const fechaValida = Date.parse(nuevoEvento.fecha);
      if (isNaN(fechaValida)) {
        setError('La fecha ingresada no es válida.');
        return;
      }

      setLoading(true);

      const eventoData = {
        nombre: nuevoEvento.nombre.trim(),
        fecha: nuevoEvento.fecha,
        descripcion: nuevoEvento.descripcion.trim(),
        ubicacion: nuevoEvento.ubicacion,  // 🔹 Ahora se guarda como 'ubicacion'
      };

      console.log("📤 Enviando evento:", eventoData);

      if (editMode) {
        await axios.put(`http://localhost:5000/api/eventos/${eventoSeleccionado.id}`, eventoData);
      } else {
        await axios.post('http://localhost:5000/api/eventos/agregar', eventoData);
      }

      fetchEventos();
      handleClose();
    } catch (error) {
      console.error("Error al procesar evento:", error.response?.data || error);
      setError('Error al guardar el evento. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/eventos/${id}`);
      fetchEventos();
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      setError('Error al eliminar el evento. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h2>Eventos</h2>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <div className="button-container" style={{ textAlign: "center" }}> {/* 🔹 Se asegura que el botón esté centrado */}
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
          Agregar Evento
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.map((evento) => (
              <TableRow key={evento.id}>
                <TableCell>{evento.nombre}</TableCell>
                <TableCell>{evento.fecha}</TableCell>
                <TableCell>{evento.descripcion}</TableCell>
                <TableCell>{evento.ubicacion}</TableCell> {/* 🔹 Ahora se muestra 'ubicacion' */}
                <TableCell>
                  <Button variant="outlined" color="primary" size="small" onClick={() => handleOpen(evento)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(evento.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Editar Evento' : 'Agregar Evento'}</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" name="nombre" fullWidth margin="normal" onChange={handleChange} value={nuevoEvento.nombre} />
          <TextField label="Fecha" name="fecha" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} value={nuevoEvento.fecha} />
          <TextField label="Descripción" name="descripcion" fullWidth margin="normal" onChange={handleChange} value={nuevoEvento.descripcion} />

          <FormControl fullWidth margin="normal">
            <InputLabel>Ubicación</InputLabel>
            <Select name="ubicacion" value={nuevoEvento.ubicacion} onChange={handleChange}>
              {ubicaciones.map((ubicacion) => (
                <MenuItem key={ubicacion.id} value={ubicacion.direccion}>
                  {ubicacion.direccion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? 'Guardando...' : editMode ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Eventos;
