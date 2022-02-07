const express = require("express");
const router = express.Router();
const db = require("./../db");
const ObjectId = require("mongodb").ObjectId;

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

router.get("/employees/:id", (req, res) => {
  req.db
    .collection("employees")
    .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
      if (err) res.status(500).json({ message: "Not found in database" });
      else res.json(data);
    });
});

router.post("/employees", (req, res) => {
  const { firstName, lastName } = req.body;
  req.db
    .collection("employees")
    .insertOne({ firstName, lastName }, (err, data) => {
      if (err) res.status(500).json({ message: "Data not insterted" });
      else {
        console.log("Succes! :", data.ops);
        res.json({ message: "OK" });
      }
    });
});

router.put("/employees/:id", (req, res) => {
  const { firstName, lastName } = req.body;
  req.db
    .collection("employees")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { firstName, lastName } },
      (err, data) => {
        if (err) res.status(500).json({ message: "Data not updated" });
        else {
          console.log("Succes! :", data.ops);
          res.json({ message: "Editing OK" });
        }
      }
    );
});

router.delete("/employees/:id", (req, res) => {
  const id = req.params.id;
  req.db.collection("employees").deleteOne({ _id: ObjectId(id) }, (err) => {
    if (err) res.status(500).json({ message: "Data not removed" });
    else res.json({ message: "Removal ok" });
  });
});

module.exports = router;
