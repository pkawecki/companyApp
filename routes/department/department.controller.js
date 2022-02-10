const { Department } = require("../../models/universal.models");

exports.getAll = async (req, res) => {
  try {
    const emp = await Department.find();
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
    const dep = await Department.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postDoc = async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name });
    await newDepartment.save();
    res.json({ message: ("New Department added", newDepartment) });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putDoc = async (req, res) => {
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
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    let dep = await Department.findByIdAndDelete({ _id: id });
    res.json({ message: dep || "Not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: ("error: ", err) });
  }
};
