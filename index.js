const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const connection = require("./config/db");
const authRoute = require("./routes/authRoute");
const taskRoute = require("./routes/taskRoute");

app.use(express.json());
const corsOptions = {
  origin: "http://127.0.0.1:5173/", // Allow only this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these methods
  credentials: true, // Allow credentials
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

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
