import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import "./PuntoRecoleccion.css";

// Icono personalizado para los puntos
const markerIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const PuntosRecoleccion = () => {
  const [puntos, setPuntos] = useState([]);
  const [open, setOpen] = useState(false);
  const [nuevoPunto, setNuevoPunto] = useState({ nombre: '', direccion: '', latitud: '', longitud: '' });

  const fetchPuntos = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/puntos-recoleccion');
      setPuntos(response.data);
    } catch (error) {
      console.error("Error al obtener puntos de recolección:", error);
    }
  }, []);

  useEffect(() => {
    fetchPuntos();
  }, [fetchPuntos]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNuevoPunto({ ...nuevoPunto, [e.target.name]: e.target.value });
  };

  // Función para obtener la dirección a partir de latitud y longitud
  const obtenerDireccion = async (lat, lon) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      if (response.data && response.data.display_name) {
        return response.data.display_name;
      } else {
        return "Dirección desconocida";
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      return "Dirección no disponible";
    }
  };

  // Componente para manejar clics en el mapa y actualizar los campos automáticamente
  const LocationMarker = () => {
    useMapEvents({
      click: async (e) => {
        const direccion = await obtenerDireccion(e.latlng.lat, e.latlng.lng);
        setNuevoPunto({
          ...nuevoPunto,
          direccion: direccion,
          latitud: e.latlng.lat,
          longitud: e.latlng.lng
        });
      },
    });

    return nuevoPunto.latitud && nuevoPunto.longitud ? (
      <Marker position={[nuevoPunto.latitud, nuevoPunto.longitud]} icon={markerIcon}>
        <Popup>Ubicación seleccionada</Popup>
      </Marker>
    ) : null;
  };

  const handleSubmit = async () => {
    try {
      if (!nuevoPunto.nombre || !nuevoPunto.latitud || !nuevoPunto.longitud) {
        alert("Por favor, ingresa un nombre y selecciona una ubicación en el mapa.");
        return;
      }

      const response = await axios.post('http://localhost:5000/api/puntos-recoleccion/agregar', {
        nombre: nuevoPunto.nombre,
        direccion: nuevoPunto.direccion,
        latitud: nuevoPunto.latitud,
        longitud: nuevoPunto.longitud
      });

      console.log("Punto guardado correctamente:", response.data);
      fetchPuntos();
      handleClose();
    } catch (error) {
      console.error("Error al agregar punto de recolección:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Puntos de Recolección</h2>

      <div className="agregar-punto-container">
        <Button
          className="agregar-punto-button"
          variant="contained"
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
          Agregar Punto de Recolección
        </Button>
      </div>

      <MapContainer center={[-0.225219, -78.524883]} zoom={13} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {puntos.map((punto, index) => (
          <Marker key={index} position={[punto.latitud, punto.longitud]} icon={markerIcon}>
            <Popup>{punto.nombre}<br />{punto.direccion}</Popup>
          </Marker>
        ))}
        <LocationMarker />
      </MapContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Punto de Recolección</DialogTitle>
        <DialogContent>
          <TextField 
            label="Nombre" 
            name="nombre" 
            fullWidth 
            margin="normal" 
            value={nuevoPunto.nombre} 
            onChange={handleChange} 
          />
          <TextField label="Dirección" name="direccion" fullWidth margin="normal" value={nuevoPunto.direccion} disabled />
          <TextField label="Latitud" name="latitud" fullWidth margin="normal" value={nuevoPunto.latitud || ''} disabled />
          <TextField label="Longitud" name="longitud" fullWidth margin="normal" value={nuevoPunto.longitud || ''} disabled />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PuntosRecoleccion;
