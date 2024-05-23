/* Here we rappresent the table fo the users*/
module.exports = (sequelize, Sequelize, DataTypes) => {
    return sequelize.define("utenti", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role_id:
            {
                type: DataTypes.INTEGER,
                references: {
                    model: "ruoli",
                    key:"id"
                }
            }
        ,
        updatedAt: {
            type: Sequelize.DATE
        }
    }, {
        // questo permette di evitare di cambiare il nome della tabella in: "utentis"
        freezeTableName: true,

        // questo evita di non aggiungere gli attributi updateAt e createAt automatici
        timestamps: false,
    });
}
