import express from "express";
import config from "./config/config.js";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import petsRouter from "./routes/pets.router.js";
import { connectionMongo } from "./config/config.js";
import cors from "cors";
import { swagger } from "./utils/swagger.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpres from "swagger-ui-express";
import { addLogger } from "./utils/logger.js";

const app = express();

const specs = swaggerJsdoc(swagger);
app.use("/apidocs", swaggerUiExpres.serve, swaggerUiExpres.setup(specs));

app.use(express.json());
app.use(cors());
app.use(addLogger);

app.use("/api/mocks", mocksRouter);
app.use("/users", usersRouter);
app.use("/adoption", adoptionRouter);
app.use("/pets", petsRouter);

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
