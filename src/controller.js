const User = require('./sequelize');
console.log(`User en controller:${User.findAll()}`)
//Create new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(404).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const usu = {
    username: req.body.username,
    password: req.body.password,
    description: req.body.description
  };

  //Save user in the database
  User.create(usu)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).send({
        message:
          err.message || "Some error occurred while creating the new User."
      });
    });
};

//Find All
exports.findAll = (req, res) => {
  console.log("DENTRO DE LA FUNCION DE FIND ALL")
  User.findAll().then(users => {
    res.send(users);
    console.log(users)
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findByPk(username)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with username=" + username
      });
    });
};

exports.update = (req, res) => {
  const username = req.params.username;

  User.update(req.body, {
    where: { username: username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with username=${username}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with username=" + username
      });
    });
};

//Delete by username
exports.delete = (req, res) => {
  const username = req.params.username;

  User.destroy({
    where: { username: username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `${username} was deleted successfully!`
        });
      } else {
        res.send({
          message: `Cannot delete user with username=${username}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with username=" + username
      });
    });
};

//Delete All
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};