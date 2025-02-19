import * as services from "../services/pets.services.js";

export const getPets = async (req, res, next) => {
  try {
    const pets = await services.getPets();
    res.send({ message: "Success", data: pets });
  } catch (error) {
    next(error);
  }
};

export const createPets = async (req, res, next) => {
  try {
    const newPet = await services.createPets();
    res.send({ message: "Success", data: newPet });
  } catch (error) {
    next(error);
  }
};
