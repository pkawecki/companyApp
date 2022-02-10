const { Employee } = require("../../models/universal.models");

exports.getAll = async (req, res) => {
  try {
    const emp = await Employee.find().populate("department");
    if (!emp) res.status(404).json({ message: "Not found any employee" });
    else res.json(emp);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.getRandom = (req, res) => {
  req.db
    .collection("employees")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray((err, data) => {
      if (err) res.status(500).json({ message: err });
      else res.json(data);
    });
};

exports.getById = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postDoc = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName, lastName, department });
    await newEmployee.save();
    res.json({ message: ("New Employee added", newEmployee) });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putDoc = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const dep = async () => {
      let x = await Employee.findById(req.params.id);
      return x;
    };

    const depFromDb = await dep();
    if (depFromDb) {
      await Employee.updateOne(depFromDb, {
        $set: { firstName, lastName, department },
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
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    let dep = await Employee.findByIdAndDelete({ _id: id });
    res.json({ message: dep || "Not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: ("error: ", err) });
  }
};
