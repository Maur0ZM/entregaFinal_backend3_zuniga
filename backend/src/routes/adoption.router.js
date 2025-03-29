import * as controllers from "../controllers/adoption.controllers.js";

import { Router } from "express";

const router = Router();

router.get("/getpetsadoption", controllers.getPetsAdoption);

router.post("/createadoption/:idUser/:idPet", controllers.createAdoption);

export default router;