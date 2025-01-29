const express = require('express');
const { getAllUsers } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('all-users', getAllUsers);

module.exports = userRouter;
