const express = require('express');
const { getVehiclesByDriver, createVehicle, getAllVehicles } = require('../controllers/vehicleController');

const router = express.Router();

// Rota para listar TODOS os veículos (CORREÇÃO AQUI)
router.get('/', getAllVehicles);

// Rota para listar veículos por motorista
router.get('/:companyId/drivers/:driverId', getVehiclesByDriver);

// Rota para criar um novo veículo
router.post('/', createVehicle);

module.exports = router;
