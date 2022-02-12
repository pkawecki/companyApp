const { Department } = require("./../universal.models");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Department", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
    const testDepOne = new Department({ name: "Department #1" });
    await testDepOne.save();

    const testDepTwo = new Department({ name: "Department #2" });
    await testDepTwo.save();
  });
  describe("Reading data", () => {
    it('should return all the data with "find" method', async () => {
      const departments = await Department.find();
      //   console.log(departments);
      const expectedLength = 2;
      expect(departments.length).to.be.equal(expectedLength);
    });
    it('should return a proper document by "name" with "findOne" method', async () => {
      const department = await Department.findOne({ name: "Department #1" });
      const expectedName = "Department #1";
      expect(department.name).to.be.equal(expectedName);
    });

    after(async () => {
      await Department.deleteMany();
    });
  });

  describe("Creating data", () => {
    it('should insert new document with "insertOne" method', async () => {
      const dep = new Department({ name: "Department #1" });
      await dep.save();
      expect(dep.isNew).to.be.false;
    });
    after(async () => {
      await Department.deleteMany();
    });
  });
  describe("Updating data", () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: "Department #1" });
      await testDepOne.save();

      const testDepTwo = new Department({ name: "Department #2" });
      await testDepTwo.save();
    });

    afterEach(async () => {
      await Department.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Department.updateOne(
        { name: "Department #1" },
        { $set: { name: "=Dep1=" } }
      );
      const updatedDep = await Department.findOne({ name: "=Dep1=" });

      expect(updatedDep).not.to.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const department = await Department.findOne({ name: "Department #1" });
      department.name = "=Dep1=";
      await department.save();

      const updatedDep = await Department.findOne({ name: "=Dep1=" });
      expect(updatedDep).not.to.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Department.updateMany({ $set: { name: "Some Department" } });
      const deps = await Department.find();
      for (let dep of deps) {
        expect(dep.name).to.be.equal("Some Department");
      }
    });
  });

  describe("Data deletion", () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: "Department #1" });
      await testDepOne.save();

      const testDepTwo = new Department({ name: "Department #2" });
      await testDepTwo.save();
    });

    afterEach(async () => {
      await Department.deleteMany();
    });

    it('Should properly remove one document with "deleteOne" method', async () => {
      const depName = "Department #1";
      const { deletedCount } = await Department.deleteOne({ name: depName });
      expect(deletedCount).to.be.equal(1);
    });
    it('should properly remove one document with "remove" method', async () => {
      const department = await Department.findOne({ name: "Department #1" });
      const removedDep = await department.remove();
      expect(removedDep).to.not.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      const removedDeps = await Department.deleteMany({
        name: { $in: ["Department #1", "Department #2"] },
      });
      //   console.log(removedDeps.deletedCount);
      expect(removedDeps.deletedCount).to.be.equal(2);
    });
  });
});
