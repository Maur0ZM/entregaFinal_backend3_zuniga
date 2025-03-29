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

  async updatePet(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(
        id,
        { $set: obj },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePet(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllPetsAdoption() {
    try {
      return await this.model.find({ adoption: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPetById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const petsDao = new PetDaoMongo(petsModel);
