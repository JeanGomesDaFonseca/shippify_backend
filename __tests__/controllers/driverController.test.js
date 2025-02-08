const request = require('supertest');
const app = require('../../server'); 
const { fetchDriversByCompany, insertDriver } = require('../../src/models/driverModel');

jest.mock('../../src/models/driverModel', () => ({
  fetchDriversByCompany: jest.fn(),
  insertDriver: jest.fn(),
}));

describe('Driver Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  describe('GET /api/drivers/:companyId', () => {
    it('should return a list of drivers for the specified company', async () => {
        const mockDrivers = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123456789' },
            { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987654321' },
        ];
        fetchDriversByCompany.mockResolvedValueOnce(mockDrivers);

        const companyId = 1;

        const response = await request(app).get(`/api/drivers/${companyId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockDrivers);
        expect(fetchDriversByCompany).toHaveBeenCalledWith(companyId); // Já está correto
    });

    it('should return 404 if no drivers are found', async () => {
        fetchDriversByCompany.mockResolvedValueOnce([]);

        const companyId = 999; 

        const response = await request(app).get(`/api/drivers/${companyId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message', 'Nenhum motorista encontrado.');
        expect(fetchDriversByCompany).toHaveBeenCalledWith(companyId); 
    });

    it('should return 500 if an error occurs', async () => {
        fetchDriversByCompany.mockRejectedValueOnce(new Error('Database Error'));

        const companyId = 1;

        const response = await request(app).get(`/api/drivers/${companyId}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Erro ao buscar motoristas.');
        expect(fetchDriversByCompany).toHaveBeenCalledWith(companyId);
    });
});


  describe('POST /api/drivers', () => {
    it('should create a new driver and return success', async () => {
      insertDriver.mockResolvedValueOnce();

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

      const response = await request(app).post('/api/drivers').send(newDriver);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Motorista criado com sucesso!');
      expect(insertDriver).toHaveBeenCalledWith(newDriver);
    });

    it('should return 500 if an error occurs during driver creation', async () => {
      insertDriver.mockRejectedValueOnce(new Error('Database Error'));

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

      const response = await request(app).post('/api/drivers').send(newDriver);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Erro ao criar motorista.');
      expect(insertDriver).toHaveBeenCalledWith(newDriver);
    });
  });
});
