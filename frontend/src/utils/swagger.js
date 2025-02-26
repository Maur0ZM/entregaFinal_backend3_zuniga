import { basename } from "./index.js"

export const swagger = {
    definition: {
        openapi: "3.0.1",
        info:{
            title: "Documentacion del poder y del saber",
            description: "Api pensada para clase de Swagger"
        }
    },
    apis: [`${basename}/docs/**/*.ymal`]
}



