const Clothes = require('../models/Clothes');

exports.createClothes = async (req, res) => {
    const { clothingType, brand, size, price, description } = req.body;
    try {
        const newClothes = await Clothes.create({ clothingType, brand, size, price, description });
        res.json({ newClothes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear ropa' });
    }
}

exports.getAllClothes = async (req, res) => {
    try {
        const clothes = await Clothes.find({})
        return res.json({ clothes })
    } catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener ropa' });
    }
}

exports.getClothesById = async (req, res) => {
    const { id } = req.params;
    try {
        const clothes = await Clothes.findById(id);
        return res.json({ clothes });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener ropa por ID' });
    }
}

exports.updateClothesById = async (req, res) => {
    const { id } = req.params;
    const { clothingType, brand, size, price, description } = req.body;
    try {
        const clothesUpdated = await Clothes.findByIdAndUpdate(id, { clothingType, brand, size, price, description }, { new: true });
        return res.json({ clothesUpdated });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar ropa' });
    }
}

exports.deleteClothesById = async (req, res) => {
    const { id } = req.params;
    try {
        const clothesDeleted = await Clothes.findByIdAndDelete(id);
        return res.json({ clothesDeleted });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar ropa' });
    }
}