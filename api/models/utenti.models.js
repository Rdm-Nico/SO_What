/* Here we rappresent the table fo the users*/
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("utenti", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        rule: {
            type: Sequelize.STRING
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    }, {
        // questo permette di evitare di cambiare il nome della tabella in: "Schedes"
        freezeTableName: true,

        // questo evita di non aggiungere gli attributi updateAt e createAt automatici
        timestamps: false,
    });
}