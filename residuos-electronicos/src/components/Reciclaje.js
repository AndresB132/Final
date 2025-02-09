import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import "./Dispositivos.css"
const Reciclaje = () => {
const [reciclajes, setReciclajes] = useState([]);
const [open, setOpen] = useState(false);
const [nuevoReciclaje, setNuevoReciclaje] = useState({ tipo: '', marca: '', modelo: '', estado: '', usuario_id: '' });
// 🔹 Obtener dispositivos al cargar el componente
useEffect(() => {
fetchReciclables();
}, []);
const fetchReciclables = async () => {
try {
const response = await axios.get('http://localhost:5000/api/dispositivos ');
setReciclajes(response.data);
console.log("📡 Dispositivos obtenidos:", response.data);
} catch (error) {
console.error("❌ Error al obtener dispositivos:", error);
}
};
const handleOpen = () => setOpen(true);
const handleClose = () => {
setOpen(false);
setNuevoReciclaje({ tipo: '', marca: '', modelo: '', estado: '', usuario_id: '' }); // Limpiar formulario al cerrar
};
const handleChange = (e) => {
setNuevoReciclaje(prev => {
const newState = { ...prev, [e.target.name]: e.target.value };
console.log("✍ Actualizando campo:", e.target.name, "➡", e.target.value);
return newState;
});
};
// 🔹 Agregar un nuevo dispositivo
const handleSubmit = async () => {
try {
console.log("📤 Enviando datos:", nuevoReciclaje);
// Validación antes de enviar
if (!nuevoReciclaje.tipo || !nuevoReciclaje.marca || !nuevoReciclaje.modelo || !nuevoReciclaje.estado || !nuevoReciclaje.usuario_id) {
console.error("❌ Todos los campos son obligatorios.");
alert("Todos los campos son obligatorios.");
return;
}
const response = await axios.post('http://localhost:5000/api/dispositivos/agregar ', nuevoReciclaje);

console.log("✅ Dispositivo agregado:", response.data);

fetchReciclables(); // Recargar la lista después de agregar un dispositivo
handleClose();
} catch (error) {
console.error("❌ Error al agregar dispositivo:", error);
}
};
return (
<div>
<h2>Reciclajes</h2>
<div className="button-container">
<Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>Agregar Reciclaje</Button>
</div>
<TableContainer component={Paper}>
<Table>
<TableHead>
<TableRow>
<TableCell>Tipo</TableCell>
<TableCell>Descripción</TableCell>
<TableCell>Cantidad</TableCell>
<TableCell>Estado</TableCell>
<TableCell>ID de Usuario</TableCell>
</TableRow>
</TableHead>
<TableBody>
{reciclajes.map((dispositivo) => (
<TableRow key={dispositivo.id}>
<TableCell>{dispositivo.tipo}</TableCell>
<TableCell>{dispositivo.marca}</TableCell>
<TableCell>{dispositivo.modelo}</TableCell>
<TableCell>{dispositivo.estado}</TableCell>
<TableCell>{dispositivo.usuario_id}</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
{/* Diálogo para agregar dispositivo */}
<Dialog open={open} onClose={handleClose}>
<DialogTitle>Agregar Dispositivo</DialogTitle>
<DialogContent>
<TextField label="Tipo" name="tipo" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.tipo} />
<TextField label="Descripción" name="marca" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.marca} />
<TextField label="Cantidad" name="modelo" fullWidth margin="normal" onChange={handleChange} value={nuevoReciclaje.modelo} />
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
export default Reciclaje;