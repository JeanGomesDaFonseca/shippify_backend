const db = require('../../config/db');

// Buscar motoristas por empresa
exports.fetchDriversByCompany = async (companyId) => {
    const [rows] = await db.query(
        'SELECT * FROM driver WHERE company_id = ?',
        [companyId]
    );
    return rows;
};

// Inserir um novo motorista
exports.insertDriver = async ({ companyId, cityId, firstName, lastName, email, phone, avatarUrl, status }) => {
    await db.query(
      'INSERT INTO driver (company_id, city_id, first_name, last_name, email, phone, avatar_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [companyId, cityId, firstName, lastName, email, phone, avatarUrl, status]
    );
  };
  
