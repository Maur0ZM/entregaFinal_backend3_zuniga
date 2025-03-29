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

export const updatePet = async (req, res, next) => {
  try {
    const { idp } = req.params;
    const obj = req.body;
    const upPet = await services.updatePet(idp, obj);
    res.send({ message: "Success", data: upPet });
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    const { idp } = req.params;
    console.log(idp);
    const delPet = await services.deletePet(idp);
    res.send({ message: "Success", data: delPet });
  } catch (error) {
    next(error);
  }
};

export const getPetById = async (req, res, next) => {
  try {
    const { idp } = req.params;
    const pet = await services.getPetById(idp);
    res.send({ message: "Success", data: pet });
  } catch (error) {
    next(error)
  }
}
