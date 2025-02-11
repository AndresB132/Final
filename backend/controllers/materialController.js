// 📁 controllers/materialController.js
const MaterialModel = require('../models/materialModel');

exports.getAllMateriales = async (req, res, next) => {
  try {
    const materiales = await MaterialModel.getAll();
    res.json(materiales);
  } catch (err) {
    next(err);
  }
};

exports.getMaterialById = async (req, res, next) => {
  try {
    const material = await MaterialModel.getById(req.params.id);
    if (!material) return res.status(404).json({ error: 'Material no encontrado' });
    res.json(material);
  } catch (err) {
    next(err);
  }
};

exports.createMaterial = async (req, res, next) => {
  try {
    const material = req.body;
    const nuevoMaterial = await MaterialModel.create(material);
    res.status(201).json(nuevoMaterial);
  } catch (err) {
    next(err);
  }
};

exports.updateMaterial = async (req, res, next) => {
  try {
    const material = req.body;
    const updatedMaterial = await MaterialModel.update(req.params.id, material);
    if (!updatedMaterial) return res.status(404).json({ error: 'Material no encontrado' });
    res.json(updatedMaterial);
  } catch (err) {
    next(err);
  }
};

exports.deleteMaterial = async (req, res, next) => {
  try {
    const deletedMaterial = await MaterialModel.delete(req.params.id);
    if (!deletedMaterial) return res.status(404).json({ error: 'Material no encontrado' });
    res.json(deletedMaterial);
  } catch (err) {
    next(err);
  }
};
