const { fetchVehiclesByDriver, insertVehicle, fetchAllVehicles } = require('../models/vehicleModel');
// Listar veículos por motorista
exports.getVehiclesByDriver = async (req, res) => {
  const { companyId, driverId } = req.params;
  try {
      const vehicles = await fetchVehiclesByDriver(Number(companyId), Number(driverId));
      if (!vehicles.length) {
          return res.status(404).json({ message: 'Nenhum veículo encontrado.' });
      }
      res.json(vehicles);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar veículos.', error });
  }
};
// Criar um novo veículo
exports.createVehicle = async (req, res) => {
  const { companyId, driverId, model, plate, type, capacity } = req.body;

  if (!companyId || !driverId || !model || !plate || !type || !capacity) {
      return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
  }

  try {
      await insertVehicle({ companyId, driverId, model, plate, type, capacity });
      res.status(201).json({ message: 'Veículo criado com sucesso!' });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao criar veículo.', error });
  }
};
// Listar todos os veículos (NOVA FUNÇÃO)
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await fetchAllVehicles();
        if (!vehicles.length) {
            return res.status(404).json({ message: 'Nenhum veículo encontrado.' });
        }
        res.json(vehicles);
    } catch (error) {
        console.error("Erro ao buscar veículos:", error); // Adiciona log no terminal
        res.status(500).json({ message: 'Erro ao buscar veículos.', error });
    }
};

  
