const express = require('express');
const { getAllUsers, registerUser, userLogin, userVerify, updateVerifiedUser, deleteVerifiedUser } = require('../controllers/userController');
const userRouter = express.Router();
const auth = require('../middleware/Authorization');


userRouter.post('/register', registerUser);
userRouter.get('/all-users', getAllUsers);
userRouter.post('/login', userLogin);
userRouter.get('/verify', auth, userVerify);
userRouter.put('/update', auth, updateVerifiedUser);
userRouter.delete('/delete', auth, deleteVerifiedUser);

module.exports = userRouter;
