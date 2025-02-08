const db = require('../../src/config/db');
const { fetchDriversByCompany } = require('../../src/models/driverModel');

jest.mock('../../src/config/db'); 

describe('Driver Model', () => {
  it('Deve buscar motoristas por empresa', async () => {
    const mockDrivers = [
      { id: 1, first_name: 'John', last_name: 'Doe', company_id: 1 },
      { id: 2, first_name: 'Jane', last_name: 'Smith', company_id: 1 }
    ];

    db.query.mockResolvedValue([mockDrivers]); 

    const drivers = await fetchDriversByCompany(1);
    expect(drivers).toEqual(mockDrivers);
  });

  it('Deve retornar vazio se não houver motoristas para a empresa', async () => {
    db.query.mockResolvedValue([[]]); 

    const drivers = await fetchDriversByCompany(999);
    expect(drivers).toEqual([]);
  });
});


//testes concluidos com sucesso