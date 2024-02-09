const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Country = require("./country-model");

const Currency = sequelize.define("Currency", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Country,
            key: 'id'
        }
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    
});

Currency.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = Currency;
