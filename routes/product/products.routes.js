const express = require("express");
const router = express.Router();
const DepCtrl = require("./product.controller");

router.get("/products", DepCtrl.getAll);

router.get("/products/random", DepCtrl.getRandom);

router.get("/products/:id", DepCtrl.getById);

router.post("/products", DepCtrl.postDoc);

router.put("/products/:id", DepCtrl.putDoc);

router.delete("/products/:id", DepCtrl.delete);

module.exports = router;
