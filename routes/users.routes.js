const express = require('express');
const UserModel = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Synchronized method
 */
router.post('/', async (req, res) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.hashed_password, salt);
    const user = new UserModel({
        surname: req.body.surname,
        user_name: req.body.user_name,
        hashed_password: hash,
        first_name: req.body.first_name,
        gender: req.body.gender,
        birth_date: req.body.birth_date
    });
    const user_existing = await UserModel.find({
        user_name: req.body.user_name
    });

    if (user_existing.length !== 0) {
        res.status(304).json({
            code: 304
        });
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
            user_name: req.params.username
        });
        if(user.length == 0){
            res.status(500).json("User not found");
        }
        let isPasswordMatch = bcrypt.compareSync(req.params.pw, user[0].hashed_password);
        if(isPasswordMatch){
            res.status(200).json(user);
        }
        else{
            res.status(500).json("Password is incorrect");
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).json("Server error");
    }
})

module.exports = router;
