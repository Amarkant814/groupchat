
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('GroupUserMap', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      group_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
    }, {
      charset: 'utf8mb4', 
      collate: 'utf8mb4_0900_ai_ci',
      tableName: 'group_user_map',
    });
  };
  