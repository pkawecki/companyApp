const express = require("express");
const router = express.Router();
const DepCtrl = require("./department.controller");

router.get("/departments", DepCtrl.getAll);

router.get("/departments/random", DepCtrl.getRandom);

router.get("/departments/:id", DepCtrl.getById);

router.post("/departments", DepCtrl.postDoc);

router.put("/departments/:id", DepCtrl.putDoc);

router.delete("/departments/:id", DepCtrl.delete);

module.exports = router;
