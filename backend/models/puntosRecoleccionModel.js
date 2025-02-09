const pool = require('../db/db');

const agregarPuntoRecoleccion = async (nombre, direccion, latitud, longitud) => {
  try {
    const result = await pool.query(
      'INSERT INTO PuntosRecoleccion (nombre, direccion, latitud, longitud) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, direccion, latitud, longitud]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(err.message);
  }
};

// Nueva función para obtener las direcciones de puntos de recolección
const obtenerDirecciones = async () => {
  try {
    const result = await pool.query('SELECT id, direccion FROM PuntosRecoleccion');
    return result.rows;
  } catch (err) {
    throw new Error('Error al obtener direcciones: ' + err.message);
  }
};

module.exports = {
  agregarPuntoRecoleccion,
  obtenerDirecciones, // Se exporta la nueva función
};
