const db = require("../../config/db");

exports.fetchAllData = async () => {
  const [rows] = await db.query(`
    SELECT 
        c.id AS company_id, 
        c.name AS company_name, 
        c.status AS company_status, 
        c.plan_type AS company_plan, 
        d.id AS driver_id, 
        d.first_name AS driver_first_name, 
        d.last_name AS driver_last_name, 
        d.email AS driver_email, 
        d.phone AS driver_phone, 
        d.status AS driver_status, 
        v.id AS vehicle_id, 
        v.plate AS vehicle_plate, 
        v.model AS vehicle_model, 
        v.type AS vehicle_type, 
        v.capacity AS vehicle_capacity
    FROM company c
    LEFT JOIN driver d ON c.id = d.company_id
    LEFT JOIN vehicle v ON d.id = v.driver_id;
  `);
  return rows;
};
