// api.test.js
const request = require('supertest');
const chai = require('chai/register-expect');
// import {expect} from 'chai/register-expect'
const app = require('../src/index'); // Import your Express app or replace with your server setup

const expect = chai.expect;

describe('API Tests', () => {
  it('should return a 200 status code for GET /api/getusers', async () => {
    const response = await request(app).get('/api/getusers');
    expect(response.status).toBe(200);
  });

  it('should return a specific response for POST /api/likedusers', async () => {
    const response = await request(app)
      .post('/api/likedusers')
      .send({ m_id: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ users: [
        "admin",
        "User123"
    ] });
  });

  // Add more test cases as needed
});
