const { sequelize,Sequelize } = require("../configs/config")
//const { v4: uuidv4 } = require('uuid');

module.exports=(sequelize,Sequelize)=>{
  const Users = sequelize.define('Users', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4, // Use the uuid module to generate a UUID
      readOnly: true,

    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    account_updated: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    email_sent_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    link_verified_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // assuming default value is false
    },
  },
  {
    timestamps: false,
  });

  return Users;
}