const db = require('../../config/db');

// Buscar veículos por motorista
exports.fetchVehiclesByDriver = async (companyId, driverId) => {
    const [rows] = await db.query(
        `SELECT v.id, v.model, v.plate, v.type, v.capacity
         FROM vehicle v
         JOIN driver d ON v.driver_id = d.id
         WHERE d.company_id = ? AND d.id = ?`,
        [companyId, driverId]
    );
    return rows;
};

// Inserir novo veículo
exports.insertVehicle = async ({ driverId, model, plate, type, capacity }) => {
    await db.query(
        `INSERT INTO vehicle (driver_id, model, plate, type, capacity)
         VALUES (?, ?, ?, ?, ?)`,
        [driverId, model, plate, type, capacity]
    );
};

// Buscar todos os veículos (NOVA FUNÇÃO)
exports.fetchAllVehicles = async () => {
    const [rows] = await db.query(
        `SELECT id, model, plate, type, capacity FROM vehicle`
    );
    return rows;
};


