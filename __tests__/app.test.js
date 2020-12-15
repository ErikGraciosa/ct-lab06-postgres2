const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Beer = require('../lib/models/Beer.js');


describe('beer routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('create a new beer via POST', async() => {
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
    await request(app)
      .post('/api/v1/beers')
      .send({
          brewery: 'Deschutes',
          beername: 'Mirror Pond'
      });

    await request(app)
      .post('/api/v1/beers')
      .send({
          brewery: 'Ninkasi',
          beername: 'Tricerahops'
      });
    
    const response = await request(app)
        .get('/api/v1/beers');

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
  //having same promise.all as before putting items into db in different order.
  it('insert multiple beers into the db and return a single beer with id=2', async () => {
    // Promise.all([{
    //     brewery: 'Deschutes',
    //     beername: 'Mirror Pond'
    //   },
    //   {
    //     brewery: 'Ninkasi',
    //     beername: 'Tricerahops'
    //   }
    // ].map(beer => Beer.insert(beer)));
    await request(app)
      .post('/api/v1/beers')
      .send({
          brewery: 'Deschutes',
          beername: 'Mirror Pond'
      });

    await request(app)
      .post('/api/v1/beers')
      .send({
          brewery: 'Ninkasi',
          beername: 'Tricerahops'
      });

    const response = await request(app)
      .get('/api/v1/beers/2');

    expect(response.body).toEqual({
      id: '2',
      brewery: 'Ninkasi',
      beername: 'Tricerahops'
    });
  });
  
  it('update a beer via PUT', async() => {
    await request(app)
        .post('/api/v1/beers')
        .send({
            brewery: 'Deschutes',
            beername: 'Mirror Pond'
        });
    
    const response = await request(app)
        .put('/api/v1/beers/1')
        .send({
          brewery: 'Russian River',
          beername: 'Pliny the Elder'
      });

    expect(response.body).toEqual({
        id: '1',
        brewery: 'Russian River',
        beername: 'Pliny the Elder'
    });
  });
  
  it('delete a beer via DELETE', async () => {
    await request(app)
      .post('/api/v1/beers')
      .send({
          brewery: 'Deschutes',
          beername: 'Mirror Pond'
      });

    await request(app)
      .post('/api/v1/beers')
      .send({
          brewery: 'Ninkasi',
          beername: 'Tricerahops'
      });

    await request(app)
      .delete('/api/v1/beers/1');

    const response = await request(app)
      .get('/api/v1/beers')

    expect(response.body).toEqual([{
      id: '2',
      brewery: 'Ninkasi',
      beername: 'Tricerahops'
    }]);
  });
});
