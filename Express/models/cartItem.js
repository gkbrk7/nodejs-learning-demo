const Sequelize = require("sequelize")
const sequelize = require("../utility/database")

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER,

})

module.exports = CartItem