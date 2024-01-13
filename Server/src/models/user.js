const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
  }, {
    // hooks: {
    //     beforeSave: (user, _) => bcrypt.hash(user.password, 10).then((hash) => {
    //       user.password = hash;
    //     }),
    //   },
    charset: 'utf8mb4', 
    collate: 'utf8mb4_0900_ai_ci',
    tableName: 'users',
  });
};
