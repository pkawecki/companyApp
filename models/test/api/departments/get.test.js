const chaiHttp = require("chai-http");
const server = require("../../../../server");
const chai = require("chai");
const { Department } = require("../../../universal.models");

chai.use(chaiHttp);

describe("GET /api/departments", () => {
  const expect = chai.expect;
  const request = chai.request;
  before(async () => {
    const testDepOne = new Department({
      _id: "5d9f1140f10a81216cfd4408",
      name: "Department #1",
    });
    await testDepOne.save();

    const testDepTwo = new Department({
      _id: "5d9f1159f81ce8d1ef2bee48",
      name: "Department #2",
    });
    await testDepTwo.save();
  });

  after(async () => {
    await Department.deleteMany();
  });

  it("/ should return all departments", async () => {
    const res = await request(server).get("/api/departments");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(2);
  });

  it("/:id should return one department by :id ", async () => {
    const id = "5d9f1140f10a81216cfd4408";
    const res = await request(server).get(`/api/departments/${id}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
  });

  it("/random should return one random department", async () => {
    const res = await request(server).get(`/api/departments/random`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.equal(1);
  });
});
