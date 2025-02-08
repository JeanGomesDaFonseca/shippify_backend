const request = require('supertest');
const app = require('../../server');
const { fetchVehiclesByDriver, insertVehicle } = require('../../src/models/vehicleModel');

jest.mock('../../src/models/vehicleModel', () => ({
    fetchVehiclesByDriver: jest.fn(),
    insertVehicle: jest.fn(),
}));

describe('Vehicle Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/vehicles/:companyId/drivers/:driverId', () => {
        it('should return a list of vehicles for the specified driver', async () => {
            const mockVehicles = [
                { id: 1, model: 'Toyota Corolla', plate: 'ABC-1234', type: 'Car', capacity: '500kg' },
                { id: 2, model: 'Ford Ranger', plate: 'XYZ-9876', type: 'Truck', capacity: '1 ton' },
            ];
            fetchVehiclesByDriver.mockResolvedValueOnce(mockVehicles);

            const companyId = '1';
            const driverId = '2';

            const response = await request(app).get(`/api/vehicles/${companyId}/drivers/${driverId}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockVehicles);
            expect(fetchVehiclesByDriver).toHaveBeenCalledWith(Number(companyId), Number(driverId));
        });

        it('should return 404 if no vehicles are found for the driver', async () => {
            fetchVehiclesByDriver.mockResolvedValueOnce([]);

            const companyId = '1';
            const driverId = '999';

            const response = await request(app).get(`/api/vehicles/${companyId}/drivers/${driverId}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Nenhum veículo encontrado.');
            expect(fetchVehiclesByDriver).toHaveBeenCalledWith(Number(companyId), Number(driverId));
        });

        it('should return 500 if an error occurs', async () => {
            fetchVehiclesByDriver.mockRejectedValueOnce(new Error('Database Error'));

            const companyId = '1';
            const driverId = '2';

            const response = await request(app).get(`/api/vehicles/${companyId}/drivers/${driverId}`);

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Erro ao buscar veículos.');
            expect(fetchVehiclesByDriver).toHaveBeenCalledWith(Number(companyId), Number(driverId));
        });
    });

    describe('POST /api/vehicles', () => {
        it('should create a new vehicle and return success', async () => {
            const newVehicle = {
                companyId: 1,
                driverId: 2,
                model: 'Honda Civic',
                plate: 'ZXA-1234',
                type: 'Car',
                capacity: '200kg',
            };

            insertVehicle.mockResolvedValueOnce();

            const response = await request(app).post('/api/vehicles').send(newVehicle);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Veículo criado com sucesso!');
            expect(insertVehicle).toHaveBeenCalledWith(newVehicle);
        });

        it('should return 400 if required fields are missing', async () => {
            const incompleteVehicle = {
                companyId: 1,
                driverId: 2,
                model: 'Toyota Corolla',
                // Plate está faltando
            };
        
            const response = await request(app).post('/api/vehicles').send(incompleteVehicle);
        
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Campos obrigatórios ausentes.');
            expect(insertVehicle).not.toHaveBeenCalled(); 
        });

        it('should return 500 if an error occurs during vehicle creation', async () => {
            const newVehicle = {
                companyId: 1,
                driverId: 2,
                model: 'Toyota Corolla',
                plate: 'ABC-1234',
                type: 'Car',
                capacity: '500kg',
            };

            insertVehicle.mockRejectedValueOnce(new Error('Database Error'));

            const response = await request(app).post('/api/vehicles').send(newVehicle);

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Erro ao criar veículo.');
            expect(insertVehicle).toHaveBeenCalledWith(newVehicle);
        });
    });
});
