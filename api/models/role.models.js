/* Here we rappresent the table fo the roles*/
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("roles", {
        id: {
          type: Sequelize.INTEGER, primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        // questo permette di evitare di cambiare il nome della tabella in: "roless"
        freezeTableName: true,
    });
}
