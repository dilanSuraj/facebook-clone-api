const express = require('express');
const UserModel = require('../models/User');
const router = express.Router();

/**
 * Synchronized method
 */
router.post('/', (req, res) => {
    const user = new UserModel({
        surname: req.body.surname,
        user_name: req.body.user_name,
        hashed_password: req.body.hashed_password,
        first_name: req.body.first_name,
        gender: req.body.gender,
        birth_date: req.body.birth_date
    });

    user.save().then((data) => {
        res.json({
            status: 200,
            message: data
        });
    }).catch(err => {
        res.json({
            status: err.code,
            message: err
        });
        console.log(`Error : ${err}`);
    })
});


router.get('/:username/:pw', async (req, res) => {

    try {
        const user = await UserModel.find({
            user_name: req.params.username,
            hashed_password: req.params.pw
        });
        res.json(user);
    } catch (err) {
        res.json({
            status: err.code,
            message: err
        })
    }
})

module.exports = router;
