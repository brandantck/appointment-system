// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const patients = require("./routes/patients");
const doctors = require("./routes/doctors");
const appointments = require("./routes/appointments");

const db = require("./db/db");
const initdb = require("./db/initdb");
initdb(db);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/patients", patients);
app.use("/doctors", doctors);
app.use("/appointments", appointments);

app.get("/", (req, res) => {
  res.send("hi there");
});

app.listen(PORT, (err) => {
  console.log(`Listening at port: ${PORT}`);
});
