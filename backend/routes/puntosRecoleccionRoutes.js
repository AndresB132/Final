const express = require('express');
const router = express.Router();
const puntosRecoleccionController = require('../controllers/puntosRecoleccionController');

router.post('/agregar', puntosRecoleccionController.agregarPuntoRecoleccion);

router.get('/direcciones', puntosRecoleccionController.getDireccionesPuntosRecoleccion);

module.exports = router;
