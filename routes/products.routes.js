const express = require("express");
const router = express.Router();
const { Product } = require("../models/universal.models");

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

router.get("/products/:id", async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name, client });
    await newProduct.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/products/:id", async (req, res) => {
  const { name, client } = req.body;
  try {
    const dep = async () => {
      let x = await Product.findById(req.params.id);
      return x;
    };

    const depFromDb = await dep();
    console.log(depFromDb);
    if (depFromDb) {
      await Product.updateOne(depFromDb, {
        $set: { name, client },
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

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let dep = await Product.findByIdAndDelete({ _id: id });
    res.json({ message: ("OK", dep) });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: ("error: ", err) });
  }
});

module.exports = router;
