
const db = require('../../models/index')
const Op = db.Sequelize.Op

const getGroups = async (data) => {
    try {
      const user = await db.User.findOne({
        attributes:[
            'id',
            'email',
            'username',
            'password',
            'role'
        ],
        where: {
          [Op.or]: {
            email: data.email,
          }
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  };



const addGroup = async (req,res) => {
    await db
}


module.exports = {
    getAllUserS,
    getGroups
}