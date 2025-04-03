import * as controllers from "../controllers/adoption.controllers.js";

import { Router } from "express";

const router = Router();

router.post("/createadoption/:idUser/:idPet", controllers.createAdoption);

export default router;