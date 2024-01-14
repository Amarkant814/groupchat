
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Messages', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sent_by: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      group_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,   
      },
      created_on: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue:0
      },
    }, {
      charset: 'utf8mb4', 
      collate: 'utf8mb4_0900_ai_ci',
      tableName: 'messages',
    });
  };
  