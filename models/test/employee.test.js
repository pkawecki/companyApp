const expect = require("chai").expect;
const { Employee } = require("../universal.models");
const mongoose = require("mongoose");

describe("Employee", () => {
  it("should throw an err if no firstName, lastName or department is given", () => {
    const emp = new Employee({});

    emp.validate((err) => {
      expect(err).to.exist;
    });
  });

  it('should throw an error if "firstName" or "lastName" is not a string', () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      for (let lastName of cases) {
        const emp = new Employee({
          firstName,
          lastName,
          id: mongoose.Types.ObjectId(),
        });

        emp.validate((err) => {
          expect(err).to.exist;
        });
      }
    }
  });
  it('should throw an err if "id" is not type of mongoose.Types.ObjectId()', () => {
    const idCases = [1, {}, []];
    for (let idCase of idCases) {
      let emp = new Employee({
        firstName: "John",
        lastName: "Doe",
        id: idCase,
      });

      emp.validate((err) => {
        expect(err).to.exist;
      });
    }
  });
  it("Should not throw any error if firstName, lastName and department id is correct", () => {
    const emp = new Employee({
      firstName: "John",
      lastName: "Doe",
      department: mongoose.Types.ObjectId(),
    });
    emp.validate((err) => {
      expect(err).not.to.exist;
    });
  });

  after(() => {
    mongoose.models = {};
  });
});
