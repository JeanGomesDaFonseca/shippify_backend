const express = require('express');
const { getAllCompanies } = require('../controllers/companyController');

const router = express.Router();

// Rota para listar todas as empresas
router.get('/', getAllCompanies);

module.exports = router;
