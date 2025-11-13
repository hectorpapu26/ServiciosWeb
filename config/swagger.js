const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'ProgramacionWeb', version: '1.0.0' },
    servers: [{ url: '/api' }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            username: { type: 'string' },
            email: { type: 'string', format: 'email' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['usernameOrEmail','password'],
          properties: {
            usernameOrEmail: { type: 'string' },
            password: { type: 'string', format: 'password' }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: { $ref: '#/components/schemas/User' }
          }
        }
      }
    }
  },
  apis: ['./routes/**/*.js'], // <- aquí leerá tus comentarios JSDoc
};

module.exports = require('swagger-jsdoc')(options);
