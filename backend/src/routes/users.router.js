import * as controllers from "../controllers/users.controllers.js";

import { Router } from "express";

const router = Router();

router.post("/register", controllers.register);

router.post("/login", controllers.login);

router.post("/createUser", controllers.createUser);

router.delete("/deleteUser/:idUser", controllers.deleteUser)

export default router;
