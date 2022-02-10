const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.db = db;
  next();
});

const employeesRoutes = require("./routes/employee/employees.routes");
const departmentsRoutes = require("./routes/department/departments.routes");
const productsRoutes = require("./routes//product/products.routes");

app.use("/api", employeesRoutes);
app.use("/api", departmentsRoutes);
app.use("/api", productsRoutes);

mongoose.connect(
  "mongodb+srv://przemo41:maslo123@cluster1.oavbq.mongodb.net/Cluster1?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connceted to database");
});
db.on("error", (err) => console.log("Error: ", err));

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});
