const express = require('express');
const UserModel = require('../models/User');
const router = express.Router();

/**
 * Synchronized method
 */
router.post('/',async (req, res) => {
    const user = new UserModel({
        surname: req.body.surname,
        user_name: req.body.user_name,
        hashed_password: req.body.hashed_password,
        first_name: req.body.first_name,
        gender: req.body.gender,
        birth_date: req.body.birth_date
    });
    const user_existing = await UserModel.find({
        user_name: req.body.user_name
    });
    
    if (user_existing.length !== 0) {
        res.status(304).json("User exist");
    }
    else {
        user.save().then((data) => {
            res.status(201).json(data);
        }).catch(err => {
            res.status(500).json("Server error");
            console.log(`Error : ${err}`);
        })
    }

});


router.get('/:username/:pw', async (req, res) => {

    try {
        const user = await UserModel.find({
            user_name: req.params.username,
            hashed_password: req.params.pw
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json("Server error");
    }
})

module.exports = router;
