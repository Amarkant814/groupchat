module.exports = (sequelize, DataTypes) => {
    return sequelize.define('InvalidTokens', {
      iSNO:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      dtDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      tokenMD5: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.INTEGER(11),
        defaultValue: 1
      },
      updated_at:{
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      },
    }, {
      charset: 'utf8mb4', 
      collate: 'utf8mb4_0900_ai_ci',
      indexes: [
        {
          unique: true,
          fields: ["token"]
        }
      ],
      tableName: 'invalid_tokens',
    });
  };