const chaiHttp = require("chai-http");
const server = require("../../../../server");
const chai = require("chai");
const { Department } = require("../../../universal.models");

chai.use(chaiHttp);

describe("DELETE /api/departments", () => {
  const expect = chai.expect;
  const request = chai.request;
  before(async () => {
    const testDepOne = new Department({
      _id: "5d9f1140f10a81216cfd4408",
      name: "Department #1",
    });
    await testDepOne.save();

    after(async () => {
      await Department.deleteMany();
    });
  });

  it("/delete should remove chosen document and return success ", async () => {
    const res = await request(server).delete(
      "/api/departments/5d9f1140f10a81216cfd4408"
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an("object");
  });
});
