const db = require('../../config/db');
const { fetchDriversByCompany, insertDriver } = require('../../src/models/driverModel');

jest.mock('../../config/db'); 

describe('Driver Model', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('fetchDriversByCompany', () => {
    it('should fetch drivers for a given company', async () => {
      const mockRows = [
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123456789' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987654321' },
      ];

      db.query.mockResolvedValueOnce([mockRows]);

      const companyId = 1;
      const result = await fetchDriversByCompany(companyId);

      expect(db.query).toHaveBeenCalledWith(
        'SELECT * FROM driver WHERE company_id = ?',
        [companyId]
      );
      expect(result).toEqual(mockRows);
    });

    it('should return an empty array if no drivers are found', async () => {
      db.query.mockResolvedValueOnce([[]]);

      const companyId = 999; 
      const result = await fetchDriversByCompany(companyId);

      expect(result).toEqual([]);
      expect(db.query).toHaveBeenCalled();
    });
  });

  describe('insertDriver', () => {
    it('should insert a new driver into the database', async () => {
      const newDriver = {
        companyId: 1,
        cityId: 101,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
        avatarUrl: 'https://example.com/avatar.jpg',
        status: 'active',
      };

      db.query.mockResolvedValueOnce({ affectedRows: 1 });

      await insertDriver(newDriver);

      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO driver (company_id, city_id, first_name, last_name, email, phone, avatar_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          newDriver.companyId,
          newDriver.cityId,
          newDriver.firstName,
          newDriver.lastName,
          newDriver.email,
          newDriver.phone,
          newDriver.avatarUrl,
          newDriver.status,
        ]
      );
    });

    it('should throw an error if the insertion fails', async () => {
      const newDriver = {
        companyId: 1,
        cityId: 101,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
        avatarUrl: 'https://example.com/avatar.jpg',
        status: 'active',
      };

      db.query.mockRejectedValueOnce(new Error('Database Error'));

      await expect(insertDriver(newDriver)).rejects.toThrow('Database Error');
      expect(db.query).toHaveBeenCalled();
    });
  });
});
