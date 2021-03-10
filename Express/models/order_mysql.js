const Sequelize = require("sequelize")
const sequelize = require("../utility/database")

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})


module.exports = Order