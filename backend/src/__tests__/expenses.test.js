//TThis file tests the core expense features—creating, viewing, and deleting entries—by sending real requests to the app and checking the database results.
//It automatically clears out the database after every test so old data doesn't mess up the next checks.

require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => await mongoose.connect(process.env.MONGO_URI));
afterEach(async () => await mongoose.connection.collections.expenses.deleteMany({}));
afterAll(async () => await mongoose.connection.close());

const sampleExpense = { amount: 100, category: 'Food', date: '2026-06-05' };

test('creates an expense', async () => {
  const res = await request(app).post('/api/expenses').send(sampleExpense);
  expect(res.statusCode).toBe(201);
  expect(res.body.category).toBe('Food');
});

test('fetches all expenses', async () => {
  await request(app).post('/api/expenses').send(sampleExpense);
  const res = await request(app).get('/api/expenses');
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
});

test('deletes an expense', async () => {
  const created = await request(app).post('/api/expenses').send(sampleExpense);
  await request(app).delete(`/api/expenses/${created.body._id}`);
  const res = await request(app).get('/api/expenses');
  expect(res.body.length).toBe(0);
});