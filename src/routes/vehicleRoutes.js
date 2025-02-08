const express = require('express');
const { getVehiclesByDriver, createVehicle } = require('../controllers/vehicleController');

const router = express.Router();

// Rota para listar veículos por motorista
router.get('/:companyId/drivers/:driverId', getVehiclesByDriver);

// Rota para criar um novo veículo
router.post('/', createVehicle);

module.exports = router;
