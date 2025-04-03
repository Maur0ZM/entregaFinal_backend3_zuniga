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

export const updatePet = async (id, obj) => {
  try {
    const upPet = await petsDao.updatePet(id, obj);
    if (!upPet) throw new CustomError("Error al actualizar la mascota", 400);
    return upPet;
  } catch (error) {
    throw error;
  }
};

export const deletePet = async (id) => {
  try {
    const delPet = await petsDao.deletePet(id);
    if (!delPet) throw new CustomError("Error al eliminar la mascota", 400);
    return delPet;
  } catch (error) {
    throw error;
  }
};

export const getPetById = async (id) => {
  try {
    const pet = await petsDao.getPetById(id);
    if (!pet) throw new CustomError("Mascota no encontrada", 404);
    return pet;
  } catch (error) {
    throw error;
  }
}

export const getPetsAdoption = async () => {
  try {
    const pets = await petsDao.getAdoptedPets();
    if (!pets) throw new CustomError("Error al obtener las adopciones", 404);
    return pets;
  } catch (error) {
    throw error;
  }
};
