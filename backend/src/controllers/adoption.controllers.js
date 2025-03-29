import * as service from "../services/adoption.services.js";

export const getPetsAdoption = async (req, res, next) => {
  try {
    const pets = await service.getPetsAdoption();
    res.send({ message: "Success", data: pets });
  } catch (error) {
    next(error);
  }
};

export const createAdoption = async (req, res, next) => {
  try {
    const { idUser, idPet } = req.params;
    const newAdoption = await service.createAdoption(idUser, idPet);
    res.send({ message: "Success", data: newAdoption });
  } catch (error) {
    next(error);
  }
};
