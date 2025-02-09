// 📁 app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes');
const dispositivoRoutes = require('./routes/dispositivoRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const puntosRecoleccionRoutes = require('./routes/puntosRecoleccionRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware de seguridad y CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(helmet());
app.use(express.json());

// Usar las rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/puntos-recoleccion', puntosRecoleccionRoutes);

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err.message);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend en http://localhost:${port}`);
});
