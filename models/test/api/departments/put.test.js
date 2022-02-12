const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../../server.js");
const { Department } = require("../../../universal.models");

chai.use(chaiHttp);

describe("PUT /api/departments", () => {
  const expect = chai.expect;
  const request = chai.request;
  before(async () => {
    const testDepOne = new Department({
      _id: "5d9f1140f10a81216cfd4408",
      name: "Department #1",
    });
    await testDepOne.save();
  });

  after(async () => {
    await Department.deleteMany();
  });

  it("/:id should update chosen document and return success", async () => {
    const res = await request(server)
      .put("/api/departments/5d9f1140f10a81216cfd4408")
      .send({ name: "#Department #_put_updated" });
    const newDepartment = await Department.findOne({
      name: "#Department #_put_updated",
    });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal("OK");
    expect(newDepartment).to.not.be.null;
  });
});
