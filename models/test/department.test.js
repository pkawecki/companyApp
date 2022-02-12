const expect = require("chai").expect;
const mongoose = require("mongoose");
const { Department } = require("../universal.models");

describe("Department", () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // ceate new Department, w/o setting name

    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });
  it('should throw en error if "name" is not in between 5 to 20 chars', () => {
    const cases = ["abc", "123456789012345678901"];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }

    after(() => {
      mongoose.models = {};
    });
  });
  it("Should not throw any error if name is correct", () => {
    const dep = new Department({ name: "SomeDepart" });
    dep.validate((err) => {
      expect(err).not.to.exist;
    });
  });
});
