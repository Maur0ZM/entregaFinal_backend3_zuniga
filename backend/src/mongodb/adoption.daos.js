import { adoptionModel } from "./models/adoption.models.js";

class AdoptionDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async createAdoption(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateAdoption(id, obj) {
    try {
      return await this.model.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAdoption(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const adoptionDao = new AdoptionDaoMongo(adoptionModel);
