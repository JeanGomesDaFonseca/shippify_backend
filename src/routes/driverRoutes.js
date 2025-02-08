const express = require('express');
const { getDriversByCompany, createDriver } = require('../controllers/driverController');

const router = express.Router();

// Rota para listar motoristas por empresa
router.get('/:companyId', getDriversByCompany);

// Rota para criar um novo motorista
router.post('/', createDriver);

module.exports = router;
