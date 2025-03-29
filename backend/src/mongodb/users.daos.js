import { userModel } from "./models/users.models.js";
import { petsDao } from "./pets.daos.js";

class UserDaoMongo {
  constructor(model) {
    this.model = model;
  }

  async getUsers() {
    try {
      return await this.model.find().populate("pets");
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(obj) {
    try {
      const newUser = await this.model.create(obj);
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(idUser) {
    try {
      return await this.model.findById(idUser).populate("pets");
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(idUser, obj) {
    try {
      return await this.model.findByIdAndUpdate(
        idUser,
        { $set: obj },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const userDao = new UserDaoMongo(userModel);
