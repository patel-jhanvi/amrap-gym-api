import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";

export function setupSwagger(app: Express) {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "AMRAP Gym API",
                version: "1.0.0",
                description: "API documentation for AMRAP challenge",
            },
        },
        apis: ["./src/interface/http/routes/*.ts"], // Path to route files
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
