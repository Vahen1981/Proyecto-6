const express = require('express');
const { getAllUsers, registerUser, userLogin, userVerify } = require('../controllers/userController');
const userRouter = express.Router();
const auth = require('../middleware/Authorization');

//register
//login
//verify
//update

userRouter.post('/register', registerUser);
userRouter.get('/all-users', getAllUsers);
userRouter.post('/login', userLogin);
userRouter.get('/verify', auth, userVerify);

module.exports = userRouter;
