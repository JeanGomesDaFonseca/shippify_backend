const request = require('supertest');
const app = require('../../server'); 

describe('Driver Routes', () => {
  it('Deve listar todos os motoristas por empresa', async () => {
    const companyId = 1; 
    const response = await request(app).get(`/api/drivers/${companyId}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Deve retornar erro 404 se nenhum motorista for encontrado', async () => {
    const companyId = 999; 
    const response = await request(app).get(`/api/drivers/${companyId}`);
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Nenhum motorista encontrado.' });
  });
});
