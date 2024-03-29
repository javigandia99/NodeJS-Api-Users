module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        username: { type: Sequelize.STRING, primaryKey: true },
        password: Sequelize.STRING,
        description: Sequelize.STRING
    },{
        timestamps: false,
    });

    return User;
};