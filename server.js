const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DATABASE PASS TO REQUEST
app.use((req, res, next) => {
  req.db = db;
  next();
});

//ROUTING
const employeesRoutes = require("./routes/employee/employees.routes");
const departmentsRoutes = require("./routes/department/departments.routes");
const productsRoutes = require("./routes//product/products.routes");

app.use("/api", employeesRoutes);
app.use("/api", departmentsRoutes);
app.use("/api", productsRoutes);

// MONGOOSE CONNECTION CONFIG
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV) NODE_ENV.trim();
let dbUri = "";

if (NODE_ENV === "production") {
  dbUri =
    "mongodb+srv://przemo41:maslo123@cluster1.oavbq.mongodb.net/Cluster1?retryWrites=true";
  console.log("production mode");
} else if (NODE_ENV === "test")
  dbUri = "mongodb://localhost:27017/companyDBtest";
else dbUri = "mongodb://localhost:27017/companyDB";

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// DATABSE CONNECTION LISTENERS
db.once("open", () => {
  console.log(
    "Connceted to database in",
    NODE_ENV == "production" ? "production" : "development",
    "mode"
  );
});
db.on("error", (err) => console.log("Error: ", err));

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

// SERVER STARTUP
const server = app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});

// DEFAULT EXPORT
module.exports = server;
