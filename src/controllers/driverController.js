const { fetchDriversByCompany, insertDriver } = require('../models/driverModel');

// Listar motoristas por empresa
exports.getDriversByCompany = async (req, res) => {
  const companyId = Number(req.params.companyId); 

  try {
      const drivers = await fetchDriversByCompany(companyId);
      if (!drivers.length) {
          return res.status(404).json({ message: 'Nenhum motorista encontrado.' });
      }
      res.json(drivers);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar motoristas.', error });
  }
};

// Criar um novo motorista
exports.createDriver = async (req, res) => {
    const { companyId, cityId, firstName, lastName, email, phone, avatarUrl, status } = req.body;
  
    try {
      await insertDriver({ companyId, cityId, firstName, lastName, email, phone, avatarUrl, status });
      res.status(201).json({ message: 'Motorista criado com sucesso!' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar motorista.', error });
    }
  };
  
