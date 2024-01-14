const express = require('express');
const { respData, SERVER_ERROR } = require('../../config/config');
const pool = require('../../connection');
const router = express.Router();
const moment = require('moment')
const db = require('../../models');
const Op = db.Sequelize.Op;



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
            const addedUsers= await db.GroupUserMap.bulkCreate(userGroupMap, {
                transaction:t
            })
        }
        await t.commit();
    } catch (error) {
        await t.rollback();
        res.status(500).json({error: SERVER_ERROR})
    }

    res.status(201).json({info:'Created successfully'})
});

router.get('/groups', async (req,res) => {
    let groupList = []
    try {
        const resp = await db.GroupUserMap.findAll({where:{ user_id: req.user.id}})
        const groupIds = resp.map(item => item.group_id)
        const grp_resp = await db.Groups.findAll({where:{ id: groupIds}, order:[['created_on','DESC']]})
        const msg_resp = await db.Messages.findAll({
            where: { 
                group_id : groupIds
            }, 
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'username', 'email'], 
                    as: 'sender',
                }
            ]
        })
        grp_resp.forEach(item => {
            item = {
                id: item.id,
                name: item.groupname,
                createdAt: item.created_on,
                msgs: [],
            }
            let retVal = [];
            let msg_content = msg_resp.filter(el => {
                if(el.group_id == item.id){
                    retVal.push({
                        id: el.id,
                        content: el.message,
                        sender: el.sender.username,
                        timestamp: el.created_on,
                        likes: el.likes
                    })
                }
                return retVal
            })
            item.msgs = retVal


            groupList.push(item)
        })



    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: SERVER_ERROR})
    }
    res.status(200).json({chats:groupList})
})

router.post('/chat', async (req,res) => {
    const {groupID, content } = req.body
    let payload = {
        message: content,
        sent_by: req.user.id,
        group_id: groupID,
        created_on: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    try {
        const msg_resp = await db.Messages.create(payload)
    } catch (error) {
        console.log('Error: '+error.message)
        res.status(500).json({error: SERVER_ERROR})
    }
    res.status(201).json({info: 'Message Sent'})
})

router.post('/groupinfo', async (req,res) => {
    const {groupID } = req.body
    let user_info = {}
    try {
        const group_info = await db.Groups.findAll({ where: {id: groupID}})
        user_info = await db.GroupUserMap.findAll({
            where: {
                group_id : groupID
            }, 
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'username', 'email'], 
                    as: 'user',
                }
            ]
        })
        user_info = user_info.map(el => el.user)
        user_info = {user_info,group_info}
    } catch (error) {
        console.log('Error: '+error.message)
        res.status(500).json({error: SERVER_ERROR})
    }
    res.status(200).json({groupData:user_info})
})


module.exports = router