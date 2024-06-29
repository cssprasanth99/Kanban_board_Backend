const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const connection = require("./config/db");
const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskroute");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api/authentication", authRoute);
app.use("/api/tasks", taskRoute);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
