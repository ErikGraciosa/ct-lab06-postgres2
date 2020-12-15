const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Beer = require('../lib/models/Beer.js');


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

  it('return all beers in database via get', async() => {
    Promise.all([{
        brewery: 'Deschutes',
        beername: 'Mirror Pond'
      },
      {
        brewery: 'Ninkasi',
        beername: 'Tricerahops'
      }
    ].map(beer => Beer.insert(beer)));
    
    const response = await request(app)
        .get('/api/v1/beers');

    console.log('in test' + response)
    expect(response.body).toEqual([{
        id: '1',
        brewery: 'Deschutes',
        beername: 'Mirror Pond'
      },
      {
        id: '2',
        brewery: 'Ninkasi',
        beername: 'Tricerahops'
      }
    ]);
  });

  //get by id

  //put
  
  //delete

});
