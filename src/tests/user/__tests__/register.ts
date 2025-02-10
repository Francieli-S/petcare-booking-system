import app from '../../../../dist/index.js';
import request from 'supertest';
import { AppDataSource } from '../../../config/database.js';
import { faker } from '@faker-js/faker';

const randomUser = {
  firstName: faker.person.fullName(),
  lastName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const registerEndpoint = '/api/users/register';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('User Tests', () => {
  it('should register a User', async () => {
    const res = await request(app).post(registerEndpoint).send(randomUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toMatchObject({
      firstName: randomUser.firstName,
      lastName: randomUser.lastName,
      email: randomUser.email
    });
  });

  it('should not register a User with duplicate email', async () => {
    const res = await request(app).post(registerEndpoint).send(randomUser);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Email already registered');
  });

  it('should return 400 for a missing name', async () => {
    const invalidUser = {
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const res = await request(app).post(registerEndpoint).send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('First name is required');
  });

  it('should return 400 for missing email', async () => {
    const invalidUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      password: faker.internet.password(),
    };
    const res = await request(app).post(registerEndpoint).send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Email is required');
  });

  it('should return 400 for missing password', async () => {
    const invalidUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    };
    const res = await request(app).post(registerEndpoint).send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Password is required');
  });

  it('should return 400 for invalid email format', async () => {
    const invalidUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: 'notanemail',
      password: faker.internet.password(),
    };
    const res = await request(app).post(registerEndpoint).send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('"email" must be a valid email');
  });

  it('should return 400 for insufficient password length', async () => {
    const invalidUser = {
      email: faker.internet.email(),
      password: 'short',
      name: faker.person.fullName(),
    };
    const res = await request(app).post(registerEndpoint).send(invalidUser);
    expect(res.status).toBe(400);
    expect(res.body.error).toContain(
      '"password" length must be at least 6 characters long',
    );
  });
});