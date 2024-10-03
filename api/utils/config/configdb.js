module.exports = {
    HOST: "eu-cluster-west-01.k8s.cleardb.net",
    USER: "bc5aeb5001c34e",
    PASSWORD: "c75af258",
    DB: "heroku_aa63a13961bad37",
    dialect: "mysql",
    pool: {
        max: 15,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
