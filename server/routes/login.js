const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptj');
const models = require('../models');
// const secretToken = 'privatetokensecret'

// const authenticate = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (authHeader) {
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token, secretToken, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }
//             req.office = office;
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// };


router.route('/client/login').post(async (req, res) => {
    let user = await models.Clients.findOne({
        where: {
            Client_Email: req.body.email,
            Client_Password: req.body.password
        }
    })  
    if (!user) 
      return (res.json({message: 'Username Or Password Incorrect'}));
    else {
      res.json({
        LoggedIn: true,
        name: user.Client_Name,
        id: user.Client_Id,
        Account_type: user.Account_Type 
      })
    }
});

router.route('/employee/login').post(async (req, res) => {
    let user = await models.Employees.findOne({
        where: {
            Employee_Email: req.body.email,
            Employee_Password: req.body.password
        }
    });
    if (!user) 
      return res.json({message: 'Username Or Password Incorrect'});
    else {
      res.json({
        LoggedIn: true,
        name: user.Employee_Name,
        id: user.Employee_Id,
        Account_type: user.Account_Type 
      })
    }
});


router.route('/logout', (req, res)=> {
    const {user} = req.body;
    res.send('Logout Successful')
})

module.exports = router;