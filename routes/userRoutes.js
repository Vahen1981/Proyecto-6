const express = require('express');
const { getAllUsers, registerUser, userLogin } = require('../controllers/userController');
const userRouter = express.Router();

//register
//login
//verify
//update

userRouter.post('/register', registerUser);
userRouter.get('/all-users', getAllUsers);
userRouter.post('/login', userLogin);

module.exports = userRouter;
