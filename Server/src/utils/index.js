const crypto = require('crypto');
const db = require('../models');
const _ = require('lodash');

const convertDBRespToObject = dbResp => _.map(dbResp, item => item.get({ plain: true }));


// Custom middleware to check if the bearer token is present in the invalid_tokens table
const checkTokenValidity = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7); // Remove "Bearer " from the authorization header
    const tokenMD5 = await crypto.createHash('md5').update(token).digest('hex');
    try {
      const invalidToken = await db.InvalidTokens.findOne({ where: { tokenMD5, status: 1 } });

      if (invalidToken) {
        // Token is present in the invalid_tokens table
        return res.status(401).json({ message: 'Invalid token' });
      } else {
        // Token is valid or not present, continue to the next middleware or route handler
        next();
      }
    } catch (error) {
      logger.error(`Error checking token validity: ${error.stack}`);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};


module.exports = {
  checkTokenValidity,
  convertDBRespToObject
}