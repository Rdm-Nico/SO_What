/* Here we rappresent the table fo the users*/
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        // questo permette di evitare di cambiare il nome della tabella in: "userss"
        freezeTableName: true,

    })
}
