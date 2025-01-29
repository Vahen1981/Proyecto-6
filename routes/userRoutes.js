const express = require('express');
const { getAllUsers, registerUser } = require('../controllers/userController');
const userRouter = express.Router();

//register
//login
//verify
//update

userRouter.post('/register', registerUser);
userRouter.get('all-users', getAllUsers);

module.exports = userRouter;
