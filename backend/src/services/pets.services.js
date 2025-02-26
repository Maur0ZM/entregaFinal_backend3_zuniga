import { petsDao } from "../mongodb/pets.daos.js";
import { CustomError } from "../utils/error.custom.js";
import { faker } from "@faker-js/faker";

export const getPets = async () => {
  try {
    const pets = await petsDao.getPets();
    if (!pets) throw new CustomError("Error al obtener las mascotas", 404);
    return pets;
  } catch (error) {
    throw error;
  }
};

export const createPets = async () => {
  try {
    const petData = {
      name: faker.animal.petName(),
      type: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 }),
    };

    const newPet = await petsDao.createPets(petData);
    if (!newPet) throw new CustomError("Error al crear la mascota", 400);

    return newPet;
  } catch (error) {
    throw error;
  }
};
