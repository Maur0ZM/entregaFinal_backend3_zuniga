import * as controllers from "../controllers/pets.controllers.js";

import { Router } from "express";

const router = Router();

router.post("/createpets", controllers.createPets);

router.get("/getPetById/:idp", controllers.getPetById);

router.post("/updatePets/:idp", controllers.updatePet);

export default router;
