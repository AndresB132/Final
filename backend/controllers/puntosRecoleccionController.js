const puntosRecoleccionModel = require('../models/puntosRecoleccionModel');

const agregarPuntoRecoleccion = async (req, res) => {
  const { nombre, direccion, latitud, longitud } = req.body;

  console.log("Datos recibidos en el backend:", req.body);

  if (!nombre || !direccion || latitud === undefined || longitud === undefined) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios',
      details: 'Los campos requeridos son: nombre, direccion, latitud y longitud.',
    });
  }

  try {
    const nuevoPunto = await puntosRecoleccionModel.agregarPuntoRecoleccion(
      nombre, direccion, parseFloat(latitud), parseFloat(longitud)
    );

    if (nuevoPunto) {
      res.status(201).json(nuevoPunto);
    } else {
      throw new Error('No se pudo agregar el punto de recolección');
    }
  } catch (err) {
    console.error('Error en el backend:', err.message);
    res.status(500).json({
      error: 'Error al agregar punto de recolección',
      details: err.message,
    });
  }
};

// Nueva función para obtener las direcciones
const getDireccionesPuntosRecoleccion = async (req, res) => {
  try {
    const direcciones = await puntosRecoleccionModel.obtenerDirecciones();
    res.json(direcciones);
  } catch (err) {
    console.error('Error al obtener direcciones:', err.message);
    res.status(500).json({ error: 'Error al obtener direcciones', details: err.message });
  }
};

module.exports = {
  agregarPuntoRecoleccion,
  getDireccionesPuntosRecoleccion, // Se exporta la nueva función
};
