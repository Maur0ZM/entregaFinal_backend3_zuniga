import express from "express";
import config from "./config/config.js";
import mocksRouter from "./routes/mocks.router.js";
import { connectionMongo } from "./config/config.js";
import cors from "cors"
import { swagger } from "./utils/swagger.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpres from "swagger-ui-express";

const app = express();

const specs = swaggerJsdoc(swagger);
app.use("/apidocs", swaggerUiExpres.serve, swaggerUiExpres.setup(specs));

app.use(express.json());
app.use(cors());

app.use("/api/mocks", mocksRouter);

connectionMongo()
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
  });

app.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el purto ${config.PORT}`);
});
