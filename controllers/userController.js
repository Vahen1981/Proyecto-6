const Users = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
}