const express = require("express");
const router = express.Router();
const EmpCtrl = require("./employees.controller");

router.get("/employees", EmpCtrl.getAll);

router.get("/employees/random", EmpCtrl.getRandom);

router.get("/employees/:id", EmpCtrl.getById);

router.post("/employees", EmpCtrl.postDoc);

router.put("/employees/:id", EmpCtrl.putDoc);

router.delete("/employees/:id", EmpCtrl.delete);

module.exports = router;
