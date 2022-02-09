const express = require("express");
const router = express.Router();
const { Employee } = require("../models/universal.models");

router.get("/employees", (req, res) => {
  req.db
    .collection("employees")
    .find()
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
});

router.get("/employees/random", (req, res) => {
  req.db
    .collection("employees")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
});

router.get("/employees/:id", async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/employees", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newEmployee = new Employee({ firstName, lastName });
    await newEmployee.save();
    res.json({ message: ("New Employee added", newEmployee) });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/employees/:id", async (req, res) => {
  const { firstName, lastName } = req.body;

  try {
    const dep = async () => {
      let x = await Employee.findById(req.params.id);
      return x;
    };

    const depFromDb = await dep();
    if (depFromDb) {
      await Employee.updateOne(depFromDb, {
        $set: { firstName, lastName },
      });
      res.json({
        message1: await dep(),
      });
    } else {
      res.status(404).json({ message: "Record not foundd in DB" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/employees/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let dep = await Employee.findByIdAndDelete({ _id: id });
    res.json({ message: dep });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: ("error: ", err) });
  }
});

module.exports = router;
