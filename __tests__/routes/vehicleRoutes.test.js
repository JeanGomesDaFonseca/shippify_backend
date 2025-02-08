const request = require('supertest');
const app = require('../../server'); // Certifique-se que o caminho está correto

describe('Vehicle Routes', () => {
  describe('GET /:companyId/drivers/:driverId', () => {
    it('should return a list of vehicles for the specified driver', async () => {
      const companyId = 1;
      const driverId = 2;

      const response = await request(app).get(`/api/vehicles/${companyId}/drivers/${driverId}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array); 
      expect(response.body.length).toBeGreaterThan(0); 
      expect(response.body[0]).toHaveProperty('id');
    });

    it('should return 404 if no vehicles are found for the driver', async () => {
      const companyId = 1;
      const driverId = 999;

      const response = await request(app).get(`/api/vehicles/${companyId}/drivers/${driverId}`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Nenhum veículo encontrado.');
    });
  });

  // Teste para a rota POST /
  describe('POST /', () => {
    it('should create a new vehicle and return success', async () => {
      const newVehicle = {
        companyId: 1,
        driverId: 2,
        model: 'Toyota Corolla',
        plate: 'ABC-1234',
        type: 'Car',
        capacity: '500kg',
      };

      const response = await request(app).post('/api/vehicles').send(newVehicle);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Veículo criado com sucesso!');
    });

    it('should return 400 if required fields are missing', async () => {
      const incompleteVehicle = {
        companyId: 1,
        driverId: 2,
        model: 'Toyota Corolla',
      };

      const response = await request(app).post('/api/vehicles').send(incompleteVehicle);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Campos obrigatórios ausentes.');
    });
  });
});
