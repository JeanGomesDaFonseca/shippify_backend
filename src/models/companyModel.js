const db = require('../../config/db');

// Buscar todas as empresas
exports.fetchAllCompanies = async () => {
    const [rows] = await db.query('SELECT * FROM company');
    return rows;
};
