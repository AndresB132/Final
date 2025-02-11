// 📁 routes/materialRoutes.js
const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Obtener todos los materiales reciclables
router.get('/', materialController.getAllMateriales);

// Obtener un material reciclable por ID
router.get('/:id', materialController.getMaterialById);

// Agregar un nuevo material reciclable
router.post('/agregar', materialController.createMaterial);

// Actualizar un material reciclable existente
router.put('/:id', materialController.updateMaterial);

// Eliminar un material reciclable por ID
router.delete('/:id', materialController.deleteMaterial);

module.exports = router;
