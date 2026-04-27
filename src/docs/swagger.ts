import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Content Broadcasting System API",
      version: "1.0.0",
      description:
        "Backend API for teacher uploads, principal approvals, and live content broadcasting.",
    },

    servers: [
      {
        url: "http://localhost:3000/api/v1",
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
    },
  },

  apis: ["./src/routes/**/*.ts"],
});