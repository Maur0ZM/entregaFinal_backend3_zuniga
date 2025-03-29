import * as petsControllers from "../controllers/pets.controllers.js";
import * as usersControllers from "../controllers/users.controllers.js";

import { Router } from "express";

const router = Router();

router.get("/getusers", usersControllers.getUsers);

router.put("/updatePets/:idp", petsControllers.updatePet);

router.delete("/deletePets/:idp", petsControllers.deletePet);

router.get("/getpets", petsControllers.getPets);

router.post("/mockingpets", petsControllers.createPets);

router.post("/mockingusers", usersControllers.createUser);

router.post(
  "/generateData/:numUsers/:numMascotas",
  usersControllers.generateData
);

router.get("/getUserById/:idUser", usersControllers.getUserById);

router.get("/findUserByEmail/:email", usersControllers.findUserByEmail);

export default router;
