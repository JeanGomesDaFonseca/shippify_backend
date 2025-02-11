const { fetchAllCompanies } = require('../models/companyModel');

// Listar todas as empresas
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await fetchAllCompanies();
        if (!companies.length) {
            return res.status(404).json({ message: 'Nenhuma empresa encontrada.' });
        }
        res.json(companies);
    } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        res.status(500).json({ message: 'Erro ao buscar empresas.', error });
    }
};
