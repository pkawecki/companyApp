// post.routes.js

const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;

router.get("/products", (req, res) => {
  req.db
    .collection("products")
    .find()
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
});

router.get("/products/random", (req, res) => {
  req.db
    .collection("products")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
});

router.get("/products/:id", (req, res) => {
  req.db
    .collection("products")
    .findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
      if (err) res.status(500).json({ message: "Not found in database" });
      else res.json(data);
    });
});

router.post("/products", (req, res) => {
  const { name, client } = req.body;
  req.db.collection("products").insertOne({ name, client }, (err, data) => {
    if (err) res.status(500).json({ message: "Data not insterted" });
    else {
      console.log("Succes! :", data.ops);
      res.json({ message: "OK" });
    }
  });
});

router.put("/products/:id", (req, res) => {
  const { name, client } = req.body;
  req.db
    .collection("products")
    .updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: { name, client } },
      (err, data) => {
        if (err) res.status(500).json({ message: "Data not updated" });
        else {
          console.log("Succes! :", data.ops);
          res.json({ message: "Editing OK" });
        }
      }
    );
});

router.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  req.db.collection("products").deleteOne({ _id: ObjectId(id) }, (err) => {
    if (err) res.status(500).json({ message: "Data not removed" });
    else res.json({ message: "Removal ok" });
  });
});

module.exports = router;
