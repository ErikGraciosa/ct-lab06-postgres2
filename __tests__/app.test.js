const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');


describe('movies routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('create a new movie via POST', async() => {
    
    
    const response = await request(app)
        .post('/api/v1/beers')
        .send({
            brewery: 'Deschutes',
            beername: 'Mirror Pond'
        });

    expect(response.body).toEqual({
        id: '1',
        brewery: 'Deschutes',
        beername: 'Mirror Pond'
    });
  });

  
  //get 

  //get by id

  //put

  //delete

});
