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
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 1 },
            first_name: { type: 'string', example: 'John' },
            last_name: { type: 'string', example: 'Doe' },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com',
            },
          },
        },
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
            user_id: { type: 'string', example: 5 },
            sitter_id: { type: 'string', example: 10 },
            service_type: {
              type: 'string',
              enum: ['One visit a day', 'House sitting', 'Dog walking'],
              example: 'One visit a day',
            },
            number_of_days: { type: 'integer', example: 3 },
            total_cost: { type: 'number', format: 'float', example: 45.0 },
            status: {
              type: 'string',
              enum: ['Pending', 'Accepted', 'Completed', 'Canceled'],
              example: 'Pending',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-29T12:45:30.000Z',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-29T14:20:10.000Z',
            },
          },
        },
        CreateBooking: {
          type: 'object',
          required: ['sitter_id', 'service_type', 'number_of_days'],
          properties: {
            sitter_id: { type: 'string', example: 10 },
            service_type: {
              type: 'string',
              enum: ['One visit a day', 'House sitting', 'Dog walking'],
              example: 'One visit a day',
            },
            number_of_days: { type: 'integer', example: 5 },
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
            service_type: {
              type: 'string',
              enum: ['One visit a day', 'House sitting', 'Dog walking'],
              example: 'One visit a day',
            },
            number_of_days: { type: 'integer', example: 2 },
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
