'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          returning: true
      },
      role: {
          type: Sequelize.ENUM,
          values: ['User', 'Moderator', 'Administrator'],
          defaultValue: 'User'
      },
      gender: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      lookingFor: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      between: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      location: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      userName: {
          type: Sequelize.STRING,
          allowNull: false,
          // unique: true
      },
      email: {
        type: Sequelize.STRING,
          allowNull: false,
          unique: true,
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      dateDay: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      dateMonth: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      dateYear: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      education: {
        type: Sequelize.STRING
      },
      children: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      region: {
        type: Sequelize.STRING,
          allowNull: false,
      },
      district: {
          type: Sequelize.STRING,
          allowNull: false,
      },
        image: {
            type: Sequelize.STRING
        },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('Users');
  }
};