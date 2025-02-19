import { userModel } from "./models/users.models.js";

class UserDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getUsers() {
    try {
      return await this.model.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(obj) {
    try {
      return await this.model.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userDao = new UserDaoMongo(userModel);
