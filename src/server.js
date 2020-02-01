const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const User = require('./sequelize');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to access to database application. Put /api/users in URL. Put /api/users/username to retrieve only one" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Put /users in URL too" });
});

require("./routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

