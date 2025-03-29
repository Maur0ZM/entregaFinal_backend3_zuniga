import { userDao } from "../src/mongodb/users.daos.js";
import { connect } from "mongoose";
import assert from "assert";
import dotenv from "dotenv";

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
    console.log(this.userDao);
    const result = await this.userDao.getUsers();
    assert.strictEqual(Array.isArray(result), true);
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
    assert.strictEqual(result.first_name, user.first_name);
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
    assert.deepStrictEqual(result.pets, []);
  });

  it("El Dao puede obtener a un usuario por email", async function () {
    const user = {
      name: "Maxi",
      age: 25,
      email: "maxi_rosanda@hotmail.com",
      password: "123456",
      role: "Admin",
    };

    const userCreated = await this.userDao.createUser(user); // Cambié esto a createUser también

    const userFound = await this.userDao.getUserById(userCreated._id);

    assert.strictEqual(userFound._id.toString(), userCreated._id.toString());
  });
});
