const dbConfig = require("./config.js");
const model = require('./model');
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.Dialect,
  operatorsAliases: false,
  logging: false,
});

//connection authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully. Sequalize');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = model(sequelize, Sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Load Database & tables!`)
  })

module.exports = User;

