const mongoose = require("mongoose");
const express = require("express");

const app = express();

const config = require("./config");

console.log(config);
const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log("App is listening to port", port);
});

// Station api
app.use("/api", require("./Routes/api/Controller/stations"));

// Trip api
app.use("/api", require("./Routes/api/Controller/trips"));

// User api
app.use("/api", require("./Routes/api/Controller/users"));

// Ticket api
app.use("/api", require("./Routes/api/Controller/tickets"));

mongoose
  .connect("mongodb://localhost:27017/vexere-practice", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to vexere server"))
  .catch((err) => console.log(err));
