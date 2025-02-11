// 📁 app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const ubicacionRoutes = require('./routes/ubicacionRoutes');
const materialRoutes = require('./routes/materialRoutes');  // Cambio de "dispositivoRoutes" a "materialRoutes"
const eventoRoutes = require('./routes/eventoRoutes');
const puntosRecoleccionRoutes = require('./routes/puntosRecoleccionRoutes');

// Crear una instancia de express
const app = express();

// Obtener el puerto desde la variable de entorno o por defecto 5000
const port = process.env.PORT || 5000;

// Middleware de seguridad y CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Ajusta la URL de tu frontend si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet());  // Protección contra vulnerabilidades comunes
app.use(express.json());  // Middleware para analizar cuerpos de solicitudes JSON

// Usar las rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);
app.use('/api/materiales', materialRoutes);  // Ruta cambiada a /api/materiales
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
