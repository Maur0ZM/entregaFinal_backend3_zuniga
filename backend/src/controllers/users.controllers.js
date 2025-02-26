import * as services from "../services/users.services.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await services.getUsers();
    res.send({ message: "Success", data: users });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const newPet = await services.createUser();
    res.send({ message: "Success", data: newPet });
  } catch (error) {
    next(error);
  }
};

export const generateData = async (req, res, next) => {
  try {
    const { numUsers, numMascotas } = req.params;
    const data = await services.generateData(numUsers, numMascotas);
    res.send({ message: "Success", data: data });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const user = await services.getUserById(idUser);
    res.send({ message: "Success", data: user });
  } catch (error) {
    next(error);
  }
};
