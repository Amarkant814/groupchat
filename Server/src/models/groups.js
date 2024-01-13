
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Groups', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    groupname: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
  }, {
    charset: 'utf8mb4', 
    collate: 'utf8mb4_0900_ai_ci',
    tableName: 'groups',
  });
};
