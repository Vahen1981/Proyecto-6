const express = require('express');
const { getAllClothes, createClothes, getClothesById, updateClothesById, deleteClothesById } = require('../controllers/clothesController');
const clothesRouter = express.Router();

clothesRouter.post('/create-clothes', createClothes);
clothesRouter.get('/all-clothes', getAllClothes);
clothesRouter.get('/get-clothes/:id', getClothesById);
clothesRouter.put('/update-clothes/:id', updateClothesById);
clothesRouter.delete('/delete-clothes/:id', deleteClothesById);

module.exports = clothesRouter;
