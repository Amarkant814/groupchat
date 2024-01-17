
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('UserMessageMap', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      m_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      }
    }, {
      charset: 'utf8mb4', 
      collate: 'utf8mb4_0900_ai_ci',
      tableName: 'user_msg_like_map',
    });
  };
  