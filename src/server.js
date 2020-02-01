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
  res.json({ message: "Welcome to access to database application." });
});

app.get('/api/users', (req, res) => {
  console.log(` User en server: ${User.findAll()}`)
  User.findAll().then(users => res.json(users))
})

require("./routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

