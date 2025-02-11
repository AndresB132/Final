// 📁 models/materialModel.js
const pool = require('../db/db');

class MaterialModel {
  static async getAll() {
    const result = await pool.query('SELECT * FROM Materiales');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM Materiales WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(materialData) {
    const { material, descripcion, cantidad, estado, usuario_id } = materialData; // Cambié 'material' a 'materialData'
    const result = await pool.query(
      'INSERT INTO Materiales (material, descripcion, cantidad, estado, usuario_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [material, descripcion, cantidad, estado, usuario_id]
    );
    return result.rows[0];
  }

  static async update(id, materialData) {
    const { material: nombre, descripcion, cantidad, estado, usuario_id } = materialData; // Cambié 'material' a 'materialData'
    const result = await pool.query(
      'UPDATE Materiales SET material = $1, descripcion = $2, cantidad = $3, estado = $4, usuario_id = $5 WHERE id = $6 RETURNING *',
      [nombre, descripcion, cantidad, estado, usuario_id, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM Materiales WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = MaterialModel;
