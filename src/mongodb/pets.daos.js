import { petsModel } from "./models/pets.models.js";

class PetDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getPets() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createPets(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const petsDao = new PetDaoMongo(petsModel);
