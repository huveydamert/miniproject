const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Country = sequelize.define("Country", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Country;
