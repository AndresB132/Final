const pool = require('../db/db');

class EventoModel {
  static async getAll() {
    const result = await pool.query('SELECT id, nombre, fecha, descripcion, ubicacion FROM eventos');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT id, nombre, fecha, descripcion, ubicacion FROM eventos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(evento) {
    const { nombre, fecha, descripcion, ubicacion } = evento;
    const result = await pool.query(
      'INSERT INTO eventos (nombre, fecha, descripcion, ubicacion) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, fecha, descripcion, ubicacion]
    );
    return result.rows[0];
  }

  static async update(id, evento) {
    const { nombre, fecha, descripcion, ubicacion } = evento;
    const result = await pool.query(
      'UPDATE eventos SET nombre = $1, fecha = $2, descripcion = $3, ubicacion = $4 WHERE id = $5 RETURNING *',
      [nombre, fecha, descripcion, ubicacion, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM eventos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = EventoModel;
