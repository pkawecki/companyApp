const express = require("express");
const { Department } = require("../models/universal.models");
const router = express.Router();

router.get("/departments", (req, res) => {
  req.db
    .collection("departments")
    .find()
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
});

router.get("/departments/random", (req, res) => {
  req.db
    .collection("departments")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
});

router.get("/departments/:id", async (req, res) => {
  try {
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/departments", async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.json({ message: newDepartment });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/departments/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const dep = async () => {
      let x = await Department.findById(req.params.id);
      return x;
    };

    const depFromDb = await dep();
    if (depFromDb) {
      await Department.updateOne(depFromDb, {
        $set: { name },
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

router.delete("/departments/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let dep = await Department.findByIdAndDelete({ _id: id });
    res.json({ message: ("OK", dep) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: ("error: ", err) });
  }
});

module.exports = router;
