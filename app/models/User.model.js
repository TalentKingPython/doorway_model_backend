module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING
        },
        companyname: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        doorway_model: {
            type: Sequelize.STRING
        },
        doorHandleType: {
            type: Sequelize.STRING
        },
        glassType: {
            type: Sequelize.STRING
        },
        height: {
            type: Sequelize.INTEGER
        },
        width: {
            type: Sequelize.INTEGER
        }
    });
    return User;
};