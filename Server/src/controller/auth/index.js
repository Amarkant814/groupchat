const express = require('express');
const pool = require('../../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport')
const { SECRET_KEY, respData } = require('../../config/config');
const { getUserWithEmailPass } = require('../services/userService');
const db = require('../../models')
const userService = require('../services/userService')


router.post('/login', (req, res, next) => {
    passport.authenticate('json', { session: false }, async (err, user, __) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
        });
      } else if (!user) {
        return res.status(400).json({ token: false , msg:'Invalid Credentials' });
      }
      let token;
      const userDetails = {
        uid: user.id,
        name: user.username,
        email: user.email,
        role: user.role
      }
  
      token = jwt.sign(userDetails, SECRET_KEY);
      return res.json({ token });
    })(req, res, next);
  });



router.post('/signup', (req, res) => {
    const { username, email, password, role} = req.body;

    const c = req?.user?.id
    debugger

    const query = `INSERT INTO users ( email, username, password, role) VALUES ('${email}', '${username}', '${password}', ${role})`

    pool.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).json({ info: 'INTERNAL SERVER ERROR' })
        } else {
            res.status(201).json({ info: 'User added successfully' })
            console.log('Query results:', results);
        }
    });
});

module.exports = router