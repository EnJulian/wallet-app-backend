import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Request, Response } from 'express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Wallet API Docs',
      version: "0.1.0",
      description:
        "Wallet Api Documentation",
    },
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [{ apiKeyAuth: [] }],
  servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ['./server/routes/*.ts', './server/types/*.ts'],
};


const swaggerSpec = swaggerJsDoc(options);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const swaggerDocs = (router: any) => {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))
  router.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  
}
