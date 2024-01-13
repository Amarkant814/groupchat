const pool = require("../../connection");

const db = require('../../models/index')
const Op = db.Sequelize.Op

const getUser = async (data) => {
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



const getAllUserS = () => {
    const query = `Select * from users`;
    pool.query(query,(err,results) => {
        if(err){
            console.log('Error while fetching all users ');
            return null
        }
        else if(results){
            console.log('Fetched uses ')
            return results
        }
    })
}


module.exports = {
    getAllUserS,
    getUser
}