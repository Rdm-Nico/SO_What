const dbConfig = require("../utils/config/configdb");

const {Sequelize, DataTypes} = require("sequelize");
// Connecting to the db
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.istruzioni = require("./istruzioni.models")(sequelize, Sequelize);
db.utenti = require("./utenti.models")(sequelize, Sequelize, DataTypes);
db.ruoli = require("./ruoli.models")(sequelize, Sequelize)
// type of role
db.ROLES = ["user","admin","moderator"];

module.exports = db;
