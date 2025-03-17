import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Application } from 'express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Animus docs',
            version: '1.0.0',
            description: 'API animus documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/shared/routes/*.ts'],
}

const specs = swaggerJsdoc(options)

export const setupSwagger = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}
