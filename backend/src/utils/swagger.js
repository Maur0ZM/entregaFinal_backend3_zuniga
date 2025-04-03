import { __dirname, basename } from "./index.js"

export const swagger = {
    definition: {
        openapi: "3.0.1",
        info:{
            title: "Documentacion",
            description: "Api Swagger"
        }
    },
    apis: [`${basename}/docs/**/*.yaml`]
}


