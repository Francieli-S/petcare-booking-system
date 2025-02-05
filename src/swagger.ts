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
        url: `http://localhost:${configs.PORT}/api`,
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
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 1 },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
          },
        },
        RegisterUser: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: { type: 'string', description: "User's first name" },
            lastName: { type: 'string', description: "User's last name" },
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
            firstName: { type: 'string', description: "User's first name" },
            lastName: { type: 'string', description: "User's last name" },
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
            status: { type: 'string', example: 'success' },
            data: { $ref: '#/components/schemas/User' },
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
            id: { type: 'string', example: 1 },
            user: { $ref: '#/components/schemas/User' },
            bio: { type: 'string', example: 'I love taking care of pets.' },
          },
        },
        ErrorSitterResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Sitter profile not found' },
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
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 1 },
            userId: { type: 'string', example: 5 },
            sitterId: { type: 'string', example: 10 },
            serviceType: {
              type: 'string',
              enum: ['One visit a day', 'House sitting', 'Dog walking'],
              example: 'One visit a day',
            },
            numberOfDays: { type: 'integer', example: 3 },
            totalCost: { type: 'number', format: 'float', example: 45.0 },
            status: {
              type: 'string',
              enum: ['Pending', 'Accepted', 'Completed', 'Canceled'],
              example: 'Pending',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-29T12:45:30.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-29T14:20:10.000Z',
            },
          },
        },
        CreateBooking: {
          type: 'object',
          required: ['sitterId', 'serviceType', 'numberOfDays'],
          properties: {
            sitterId: { type: 'string', example: 10 },
            serviceType: {
              type: 'string',
              enum: ['One visit a day', 'House sitting', 'Dog walking'],
              example: 'One visit a day',
            },
            numberOfDays: { type: 'integer', example: 5 },
          },
        },
        UpdateBookingBySitter: {
          type: 'object',
          required: ['status'],
          properties: {
            status: {
              type: 'string',
              enum: ['Accepted', 'Completed', 'Canceled'],
              example: 'Accepted',
            },
          },
        },
        UpdateBookingByUser: {
          type: 'object',
          properties: {
            serviceType: {
              type: 'string',
              enum: ['One visit a day', 'House sitting', 'Dog walking'],
              example: 'One visit a day',
            },
            numberOfDays: { type: 'integer', example: 2 },
            status: {
              type: 'string',
              enum: ['Canceled'],
              example: 'Canceled',
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
    `📄 Swagger documentation available at: http://localhost:${configs.PORT}/api-docs`
  );
}
