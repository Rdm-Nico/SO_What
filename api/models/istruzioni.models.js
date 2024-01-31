
// here we rapresents the  schede table in Mysql database.
// The columns will be generated auto: id, path,name,reparto,CreateAt, updatedAt
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("schede", {
        path: {
            type: Sequelize.STRING
        },
        title: {
            type: Sequelize.STRING
        },
        reparto: {
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