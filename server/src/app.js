const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const planetsRouter = require("./routes/planets/planets.route");
const launchRouter = require("./routes/launches/launches.router");

const app = express();

app.use(morgan("combined"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/planets", planetsRouter);
app.use("/launches", launchRouter);

app.use(express.static(path.join(__dirname, "..", "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

module.exports = app;
