const User = require('../models/user')
const jwt = require('jsonwebtoken');

// Creating Doctor
module.exports.create = async function(req,res){
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", req.body)
    try {
    
        let user = await User.findOne({username:req.body.username});

        if(user){
            return res.status(409).json({
                message: 'UserName Already Exists',
            });
        }

        user = await User.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            type:'Doctor'
        });

        return res.status(201).json({
            message: 'User created successfully',
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

// Login Doctor
module.exports.createSession = async function (req, res) {

    try {
        let user = await User.findOne({ username: req.body.username });

        if (!user || user.password != req.body.password) {
            return res.status(404).json({
                message: "Wrong credentials"
            });
        }

        return res.status(200).json({
            message: "Successful signed. find your token",
            data: {
                    token: jwt.sign(user.toJSON(),'Alert1234',{expiresIn:'1000000'})
                }
            }
        )
    } 
    catch (error) {

        console.log('Error', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
