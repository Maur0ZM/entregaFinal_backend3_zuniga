import * as petsControllers from "../controllers/pets.controllers.js";
import * as usersControllers from "../controllers/users.controllers.js";

import { Router } from "express";

const router = Router();

router.get("/getusers", usersControllers.getUsers);

router.get("/getpets", petsControllers.getPets);

router.post("/mockingpets", petsControllers.createPets);

router.post("/mockingusers", usersControllers.createUser);

router.post("/generateData/:numUsers/:numMascotas", usersControllers.generateData);

export default router;
