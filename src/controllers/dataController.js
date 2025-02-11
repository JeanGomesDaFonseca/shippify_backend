const { fetchAllData } = require("../models/dataModel");

exports.getAllData = async (req, res) => {
  try {
    const data = await fetchAllData();

    if (!data.length) {
      return res.status(404).json({ message: "Nenhum dado encontrado." });
    }

    res.json(data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ message: "Erro ao buscar dados.", error });
  }
};
