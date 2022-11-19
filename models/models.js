const Sequelize =  require('sequelize')
const sequelize = require('../util/database')
const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    branch: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    batch: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admissionyear: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    admissionnumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    specialinterests: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    careerpreference: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    typeofservice: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    accholdersname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    transactionid: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageurl: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})
module.exports= {
    User:User,
}