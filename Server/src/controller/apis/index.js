const express = require('express');
const { respData, SERVER_ERROR } = require('../../config/config');
const pool = require('../../connection');
const router = express.Router();
const moment = require('moment')
const db = require('../../models');
const { random } = require('lodash');





router.get('/getusers',(req,res) => {
    const query = `Select * from users`
    const resp = {...respData}
    pool.query(query,(err,results) => {
        if (err) {
            resp['err'] = SERVER_ERROR
            resp['status'] = 500
            return res.status(500).json(resp);
        }
        else {
            resp['results'] = results
            resp['status'] = 200
            return res.status(200).json(resp)
        }
    })
});

router.post('/addgroup',async (req,res) => {
    const t = await db.sequelize.transaction();

    const { groupname, users } = {...req.body}
    const resp = {...respData}

    try {
        const resul = await db.Groups.create({
            groupname: groupname,
            created_by: req.user.id,
            created_on: moment().format('YYYY-MM-DD HH:mm:ss'),
            status:1
        },{
            transaction: t
        });

    
        if(resul){
            let userGroupMap = [];
            users.forEach(item => userGroupMap.push({
                user_id:item,
                group_id: resul.id,
                status: 1,
                role: item == req.user.id?1:2
            }))
            const addedUsers= await db.User.bulkCreate(userGroupMap, {
                transaction:t
            })
        }
        await t.commit();
    } catch (error) {
        await t.rollback();
    }

    res.status(201).json({info:'Created successfully'})
});

module.exports = router