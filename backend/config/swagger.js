const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Usuário',
      version: '1.0.0',
      description: 'Documentação da API de usuários.'
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}