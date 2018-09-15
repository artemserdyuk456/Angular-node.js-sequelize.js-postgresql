'use strict';
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          returning: true
      },
      role: {
          type: DataTypes.ENUM,
          values: ['User', 'Moderator', 'Administrator'],
          defaultValue: 'User'
      },
      // creator: {
      //   type: DataTypes.Schema.TYPES.objectId
      // },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lookingFor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    between: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateDay: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateMonth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateYear: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    education: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    children: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
    },

      image: {
          type: DataTypes.STRING
      },
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};