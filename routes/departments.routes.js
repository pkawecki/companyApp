const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

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

router.get("/departments/:id", (req, res) => {
  req.db
    .collection("departments")
    .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
      if (err) res.status(500).json({ message: "Not found in database" });
      else res.json(data);
    });
});

router.post("/departments", (req, res) => {
  const { name } = req.body;
  req.db.collection("departments").insertOne({ name }, (err, data) => {
    if (err) res.status(500).json({ message: "Data not insterted" });
    else {
      console.log("Succes! :", data.ops);
      res.json({ message: "OK" });
    }
  });
});

router.put("/departments/:id", (req, res) => {
  const { name } = req.body;
  req.db
    .collection("departments")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { name } },
      (err, data) => {
        if (err) res.status(500).json({ message: "Data not updated" });
        else {
          console.log("Succes! :", data.ops);
          res.json({ message: "Editing OK" });
        }
      }
    );
});

router.delete("/departments/:id", (req, res) => {
  const id = req.params.id;
  req.db.collection("departments").deleteOne({ _id: ObjectId(id) }, (err) => {
    if (err) res.status(500).json({ message: "Data not removed" });
    else res.json({ message: "Removal ok" });
  });
});

module.exports = router;
