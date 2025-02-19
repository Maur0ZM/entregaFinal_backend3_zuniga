import express from "express";
import config from "./config/config.js";
import mocksRouter from "./routes/mocks.router.js";
import { connectionMongo } from "./config/config.js";

const app = express();

app.use(express.json());

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
