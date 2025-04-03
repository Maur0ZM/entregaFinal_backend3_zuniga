import * as service from "../services/adoption.services.js";

export const getPetsAdoption = async (req, res, next) => {
  try {
    const pets = await service.getPetsAdoption();
    console.log(pets); 
    res.send({ message: "Success", data: pets });
  } catch (error) {
    next(error);
  }
};

export const createAdoption = async (req, res, next) => {
  try {
    const { idUser, idPet } = req.params;
    const newAdoption = await service.createAdoption(idUser, idPet);
    res.send({ status: "success", message: "Pet adopted" });
  } catch (error) {
    next(error);
  }
};
