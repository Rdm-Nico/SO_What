const dbConfig = require("../utils/config/configdb");

const {Sequelize} = require("sequelize");
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

db.istruzioni = require("./istruzioni.models")(sequelize, Sequelize);
db.user = require("./user.models")(sequelize, Sequelize);
db.role = require("./role.models")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.models")(sequelize, Sequelize);

// create association Users and Roles Many-to-Many
db.role.belongsToMany(db.user, {
    through: "user_roles", // this create a new table user_roles as connection between users and roles table
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})
// create the association one-to-one with User model
db.refreshToken.belongsTo(db.user, {
    foreignKey: "userId", targetKey: "id"
});
db.user.hasOne(db.refreshToken, {
    foreignKey: "userId", targetKey: "id"
});

// type of role
db.ROLES = ["user","admin","moderator"];

module.exports = db;
