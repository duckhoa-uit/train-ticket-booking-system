import swaggerJsdoc from "swagger-jsdoc";

import { version } from "../../package.json";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Iyyara merchant API Docs",
      version,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    externalDocs: {
      description: "docs.json",
      url: "/api/docs.json",
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/schemas/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);

// function swaggerDocs(app: Express) {
//   // Swagger page
//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//   // Docs in JSON format
//   app.get('/docs.json', (req: Request, res: Response) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
//   });
// }

// export default swaggerDocs;
