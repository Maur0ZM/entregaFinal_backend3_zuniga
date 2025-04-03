import * as chai from "chai";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Testing", () => {
  let idUser = null;
  let idPet = null;

  const name = faker.person.fullName();
  const cleanName = name.replace(/\s+/g, "").toLowerCase();
  const email = `${cleanName}@gmail.com`;

  const userMock = {
    name,
    email,
    role: faker.helpers.arrayElement(["user", "admin"]),
    password: "coder123",
    age: faker.number.int({ min: 1, max: 90 }),
  };

  describe("Crear Mascota", () => {
    it("Post /getpets crear", async () => {
      const { statusCode, ok, _body } = await request.post("/pets/createpets");
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Success");
      idPet = _body.data._id;
    });
  });

  describe("Crear Usuario", () => {
    it("Post /register obtener", async () => {
      const { statusCode, ok, _body } = await request
        .post("/users/register")
        .send(userMock);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Usuario creado y registrado");
      idUser = _body.data._id;
    });
  });

  describe("Test adopcion", () => {
    it("Post /adoption obtener", async () => {
      const { statusCode, ok, _body } = await request.post(
        `/adoption/createadoption/${idUser}/${idPet}`
      );
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Pet adopted");
    });
  });
});
