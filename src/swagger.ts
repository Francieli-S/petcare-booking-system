import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Petcare Booking System API",
      version: "1.0.0",
      description: "API documentation for the Petcare Booking System",
    },
    servers: [
      {
        url: "http://localhost:5002",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterUser: {
          type: "object",
          required: ["first_name", "last_name", "email", "password"],
          properties: {
            first_name: { type: "string", description: "User's first name" },
            last_name: { type: "string", description: "User's last name" },
            email: { type: "string", format: "email", description: "User's email" },
            password: { type: "string", format: "password", description: "User's password (min 6 chars)" },
          },
        },
        LoginUser: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", description: "User's email" },
            password: { type: "string", format: "password", description: "User's password" },
          },
        },
        UpdateUser: {
          type: "object",
          properties: {
            first_name: { type: "string", description: "User's first name" },
            last_name: { type: "string", description: "User's last name" },
            email: { type: "string", format: "email", description: "User's email" },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            id: { type: "integer" },
            first_name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string", format: "email" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.routes.ts"],
  // but swagger will process only the routes with @swagger comments inside
  // so "./src/routes/*.ts" should be also fine
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger documentation available at: http://localhost:5002/api-docs");
}
