import { userDao } from "../mongodb/users.daos.js";
import { CustomError } from "../utils/error.custom.js";
import { faker } from "@faker-js/faker";
import * as petService from "./pets.services.js";

export const getUsers = async () => {
  try {
    const users = await userDao.getUsers();
    if (!users) throw new CustomError("Error al obtener las mascotas", 404);
    return users;
  } catch (error) {
    throw error;
  }
};

export const createUser = async () => {
  try {
    let countUser = 50;
    let usersCreated = [];

    for (let index = 0; index < countUser; index++) {
      const name = faker.person.fullName();
      const cleanName = name.replace(/\s+/g, "").toLowerCase();
      const email = `${cleanName}@gmail.com`;
      const pet = await petService.createPets();
      const petId = pet ? pet._id : null;

      const userData = {
        name,
        email,
        role: faker.helpers.arrayElement(["user", "admin"]),
        password: "coder123",
        age: faker.number.int({ min: 1, max: 90 }),
        pets: petId ? [petId] : [],
        image: faker.image.personPortrait({sex:""})
      };

      const newUser = await userDao.createUser(userData);
      if (!newUser) throw new CustomError("Error al crear el usuario", 400);

      usersCreated.push(newUser);
    }

    return usersCreated;
  } catch (error) {
    throw error;
  }
};

export const generateData = async (numUsers, numMascotas) => {
  try {
    let usersCreated = [];
    for (let index = 0; index < numUsers; index++) {
      const name = faker.person.fullName();
      const cleanName = name.replace(/\s+/g, "").toLowerCase();
      const email = `${cleanName}@gmail.com`;

      const pets = await Promise.all(
        Array.from({ length: numMascotas }, async () => {
          try {
            return await petService.createPets();
          } catch (error) {
            console.error("Error al crear mascota:", error);
            return null;
          }
        })
      );

      const validPets = pets.filter((pet) => pet !== null);

      const userData = {
        name,
        email,
        role: faker.helpers.arrayElement(["user", "admin"]),
        password: "coder123",
        age: faker.number.int({ min: 1, max: 90 }),
        pets: validPets,
      };

      const newUser = await userDao.createUser(userData);
      if (!newUser) throw new CustomError("Error al crear el usuario", 400);

      usersCreated.push(newUser);
    }

    return usersCreated;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (idUser) => {
  try {
    const user = await userDao.getUserById(idUser);
    if (!user) throw new CustomError("Error al buscar el usuario", 400);
    return user;
  } catch (error) {
    throw error;
  }
};
