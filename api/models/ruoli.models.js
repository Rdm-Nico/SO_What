/* Here we rappresent the table fo the roles*/
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("ruoli", {
        name: {
            type: Sequelize.STRING
        }
    }, {
        // questo permette di evitare di cambiare il nome della tabella in: "ruolis"
        freezeTableName: true,

        // questo evita di non aggiungere gli attributi updateAt e createAt automatici
        timestamps: false,
    });
}
