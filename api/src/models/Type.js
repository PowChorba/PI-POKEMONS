const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    })
}