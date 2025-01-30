import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { configs } from './config/env.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Petcare Booking System API',
      version: '1.0.0',
      description: 'API documentation for the Petcare Booking System',
    },
    servers: [
      {
        url: `http://localhost:${configs.PORT}`,
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        RegisterUser: {
          type: 'object',
          required: ['first_name', 'last_name', 'email', 'password'],
          properties: {
            first_name: { type: 'string', description: "User's first name" },
            last_name: { type: 'string', description: "User's last name" },
            email: {
              type: 'string',
              format: 'email',
              description: "User's email",
            },
            password: {
              type: 'string',
              format: 'password',
              description: "User's password (min 6 chars)",
            },
          },
        },
        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: "User's email",
            },
            password: {
              type: 'string',
              format: 'password',
              description: "User's password",
            },
          },
        },
        UpdateUser: {
          type: 'object',
          properties: {
            first_name: { type: 'string', description: "User's first name" },
            last_name: { type: 'string', description: "User's last name" },
            email: {
              type: 'string',
              format: 'email',
              description: "User's email",
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string' },
          },
        },
        Sitter: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user: {
              type: 'object',
              properties: {
                id: { type: 'integer', example: 2 },
                first_name: { type: 'string', example: 'John' },
                last_name: { type: 'string', example: 'Doe' },
                email: { type: 'string', example: 'john@example.com' },
              },
            },
            bio: { type: 'string', example: 'I love taking care of pets.' },
          },
        },
        CreateSitter: {
          type: 'object',
          required: ['bio'],
          properties: {
            bio: {
              type: 'string',
              example: 'I have 5 years of experience as a pet sitter.',
            },
          },
        },
        UpdateSitter: {
          type: 'object',
          required: ['bio'],
          properties: {
            bio: {
              type: 'string',
              example: 'I am now offering overnight pet sitting services.',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.routes.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    '📄 Swagger documentation available at: http://localhost:5002/api-docs'
  );
}
