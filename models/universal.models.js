const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);
const Department = mongoose.model("Department", departmentSchema);
const Product = mongoose.model("Product", productSchema);

module.exports = { Employee, Department, Product };
