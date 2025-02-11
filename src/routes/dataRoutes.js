const express = require("express");
const { getAllData } = require("../controllers/dataController");

const router = express.Router();

// Rota para buscar empresas, motoristas e veículos juntos
router.get("/", getAllData);

module.exports = router;
