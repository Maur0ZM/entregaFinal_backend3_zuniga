import * as controllers from "../controllers/pets.controllers.js";

import { Router } from "express";

const router = Router();

router.post("/createpets", controllers.createPets);

router.get("/getPetById/:idp", controllers.getPetById);

router.put("/updatePets/:idp", controllers.updatePet);

router.get("/getPetsAdoption", controllers.getPetsAdoption);

export default router;
