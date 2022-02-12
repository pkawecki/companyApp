const { Employee } = require("./../universal.models");
const expect = require("chai").expect;
const mongoose = require("mongoose");

describe("Employee", () => {
  const testEmpOne = new Employee({
    firstName: "John",
    lastName: "Doe",
    department: new mongoose.Types.ObjectId(),
  });
  const testEmpTwo = new Employee({
    firstName: "Johnny",
    lastName: "Deer",
    department: mongoose.Types.ObjectId(),
  });
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
    await testEmpOne.save();
    await testEmpTwo.save();
  });

  describe("Reading data", () => {
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      //   console.log(employees);
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });
    it('should return a proper document by "firstName" with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: "John" });
      const expectedName = "John";
      expect(employee.firstName).to.be.equal(expectedName);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Creating data", () => {
    it('should insert new document with "insertOne" method', async () => {
      const dep = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: new mongoose.Types.ObjectId(),
      });

      console.log(await dep.save());
      expect(testEmpOne.isNew).to.be.false;
    });
    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: new mongoose.Types.ObjectId(),
      });
      const testEmpTwo = new Employee({
        firstName: "Johnny",
        lastName: "Deer",
        department: mongoose.Types.ObjectId(),
      });

      await testEmpOne.save();
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      console.log(await Employee.find());
      await Employee.updateOne(
        { firstName: "John" },
        { $set: { name: "John_updated" } }
      );
      const updatedDep = await Employee.findOne({ name: "John_updated" });
      expect(updatedDep).not.to.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const department = await Employee.findOne({ firstName: "John" });
      department.name = "=Dep1=";
      await department.save();

      const updatedDep = await Employee.findOne({ firstName: "John" });
      expect(updatedDep).not.to.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({ $set: { firstName: "UpdatedFirstName" } });
      const deps = await Employee.find();
      for (let dep of deps) {
        expect(dep.firstName).to.be.equal("UpdatedFirstName");
      }
    });
  });

  describe("Data deletion", () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: new mongoose.Types.ObjectId(),
      });
      const testEmpTwo = new Employee({
        firstName: "Johnny",
        lastName: "Deer",
        department: mongoose.Types.ObjectId(),
      });

      await testEmpOne.save();
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('Should properly remove one document with "deleteOne" method', async () => {
      const firstName = "John";
      const { deletedCount } = await Employee.deleteOne({ firstName });
      expect(deletedCount).to.be.equal(1);
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: "John" });
      const removedDep = await employee.remove();
      expect(removedDep).to.not.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      const removedDeps = await Employee.deleteMany({
        firstName: { $in: ["John", "Johnny"] },
      });
      //   console.log(removedDeps.deletedCount);
      expect(removedDeps.deletedCount).to.be.equal(2);
    });
  });
});
