import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Testing", () => {
  let idUser = null;
  let idPet = null;

  const petMock = {
    name: "Firulais",
    age: 5,
    type: "Dog",
    adopted: false,
  };

  const cookie = {
    name: null,
    value: null,
  };

  const userMock = {
    name: "test",
    email: "test@example.com",
    role: "user",
    password: "123456",
    age: 30,
  };

  describe("Test de mascotas", () => {
    it("Post /getpets crear", async () => {
      const { statusCode, ok, _body } = await request.post("/pets/createpets");
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Success");
      idPet = _body.data._id;
    });

    it("Get /mockingpets obtener", async () => {
      const { statusCode, ok, _body } = await request.get(
        `/pets/getPetById/${idPet}`
      );
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Success");
    });

    it("Put /getpetsadoption actualizar", async () => {
      const { statusCode, ok, _body } = await request
        .put(`/pets/updatePets/${idPet}`)
        .send(petMock);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Success");
    });
  });

  describe("Test de usuarios", () => {
    it("Post /register obtener", async () => {
      const { statusCode, ok, _body } = await request
        .post("/users/register")
        .send(userMock);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Usuario creado y registrado");
      idUser = _body.data._id;
    });

    it("Post /login obtener", async () => {
      const { statusCode, ok, _body, headers } = await request
        .post("/users/login")
        .send(userMock);

      const cookieResult = headers["set-cookie"][0];
      cookie.name = cookieResult.split("=")[0];
      cookie.value = cookieResult.split("=")[1].split(";")[0];

      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Logeado con exito");
    });

    it("Delete /deleteUser/:idUser eliminar", async () => {
      const { statusCode, ok, _body } = await request.delete(
        `/users/deleteUser/${idUser}`
      );
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Success");
    });
  });
});
