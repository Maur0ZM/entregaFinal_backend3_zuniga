import { userDao } from "../src/mongodb/users.daos.js";
import { connect } from "mongoose";
import dotenv from "dotenv";
import { expect } from "chai";
dotenv.config();

describe("Users DAO", () => {
  before(async function () {
    this.timeout(10000);
    await connect(process.env.MONGO_URL);
    this.userDao = userDao; // Asegúrate de que sea this.userDao
  });

  beforeEach(function () {
    this.timeout(10000);
  });

  it("El Dao debe poder obtener los usuarios en el formato de arreglo", async function () {
    const result = await this.userDao.getUsers();
    expect(result).to.be.an("array");
  });

  it("El Dao debe agregar correctamente un elemento a la base de datos", async function () {
    const user = {
      name: "Maxi",
      role: "Admin",
      email: "maxi_rosanda@hotmail.com",
      password: "123456",
      age: 25,
    };
    const result = await this.userDao.createUser(user); // Aquí también usas this.userDao
    expect(result).to.have.property("name");
    expect(result.name).to.equal(user.name);
  });

  it("Al agregar un nuevo usuario, éste debe crearse con un arreglo de mascotas vacío por defecto", async function () {
    const user = {
      name: "Maxi",
      role: "Admin",
      email: "maxi_rosanda@hotmail.com",
      password: "123456",
      age: 25,
    };
    const result = await this.userDao.createUser(user);
    expect(result).to.have.property("pets");
    expect(result.pets).to.be.deep.equal([]);
  });

  it("El Dao puede obtener a un usuario por email", async function () {
    const user = {
      name: "Maxi",
      age: 25,
      email: "maxi_rosanda@hotmail.com",
      password: "123456",
      role: "Admin",
    };

    const userCreated = await this.userDao.createUser(user); 
    const userFound = await this.userDao.getUserById(userCreated._id);
    expect(userFound).to.have.property("_id");
    expect(userFound._id.toString()).to.be.equal(userCreated._id.toString());
  });

});
