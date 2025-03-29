import * as chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Testing", () => {
  describe("Test de mascotas", () => {
    it("Get /getpets obtener", async () => {
      const { statusCode, ok, _body } = await request.get("/api/mocks/getpets");
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Success");
    });

    it("POst /mockingpets obtener", async () => {
      const { statusCode, ok, _body } = await request.post(
        "/api/mocks/mockingpets"
      );
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.equal(true);
      expect(_body).to.have.property("message", "Success");
    });
  });
});
