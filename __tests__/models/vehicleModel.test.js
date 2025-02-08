const db = require('../../config/db');
const { fetchVehiclesByDriver, insertVehicle } = require('../../src/models/vehicleModel');

jest.mock('../../config/db'); 

describe('Vehicle Model', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('fetchVehiclesByDriver', () => {
    it('should fetch vehicles for a given driver and company', async () => {
      const mockRows = [
        { id: 1, model: 'Toyota Corolla', plate: 'ABC-1234', type: 'Car', capacity: '500kg' },
        { id: 2, model: 'Ford Transit', plate: 'XYZ-7890', type: 'Van', capacity: '750kg' },
      ];

      // Simula o comportamento do db.query
      db.query.mockResolvedValueOnce([mockRows]);

      const companyId = 1;
      const driverId = 2;
      const result = await fetchVehiclesByDriver(companyId, driverId);

      expect(db.query).toHaveBeenCalledWith(
        `SELECT v.id, v.model, v.plate, v.type, v.capacity
         FROM vehicle v
         JOIN driver d ON v.driver_id = d.id
         WHERE d.company_id = ? AND d.id = ?`,
        [companyId, driverId]
      );
      expect(result).toEqual(mockRows);
    });

    it('should return an empty array if no vehicles are found', async () => {
      db.query.mockResolvedValueOnce([[]]);

      const companyId = 1;
      const driverId = 999;
      const result = await fetchVehiclesByDriver(companyId, driverId);

      expect(result).toEqual([]);
      expect(db.query).toHaveBeenCalled();
    });
  });

  describe('insertVehicle', () => {
    it('should insert a new vehicle into the database', async () => {
      const newVehicle = {
        driverId: 2,
        model: 'Toyota Corolla',
        plate: 'ABC-1234',
        type: 'Car',
        capacity: '500kg',
      };

      db.query.mockResolvedValueOnce({ affectedRows: 1 });

      await insertVehicle(newVehicle);

      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO vehicle (driver_id, model, plate, type, capacity)
         VALUES (?, ?, ?, ?, ?)`,
        [newVehicle.driverId, newVehicle.model, newVehicle.plate, newVehicle.type, newVehicle.capacity]
      );
    });

    it('should throw an error if the insertion fails', async () => {
      const newVehicle = {
        driverId: 2,
        model: 'Toyota Corolla',
        plate: 'ABC-1234',
        type: 'Car',
        capacity: '500kg',
      };

      db.query.mockRejectedValueOnce(new Error('Database Error'));

      await expect(insertVehicle(newVehicle)).rejects.toThrow('Database Error');
      expect(db.query).toHaveBeenCalled();
    });
  });
});
