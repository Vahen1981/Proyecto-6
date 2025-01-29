const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
}

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Este correo ya está registrado' });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        return res.status(201).json({ 
            id: createdUser._id, 
            name: createdUser.name, 
            email: createdUser.email 
        });
    } catch (error){
        console.error(error);
        return res.status(400).json({ message: 'Error al crear usuario' });
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const registeredUser = await User.findOne({ email });
        if(!registeredUser){
            return res.status(400).json({ message: 'El usuario o la contraseña no corresponde' });
        }
        const rightPassword = await bcryptjs.compare(password, registeredUser.password);
        if(!rightPassword){
            return res.status(400).json({ message: 'El usuario o la contraseña no corresponde' });
        }
        const payload = { user: { id: registeredUser.id } };
        jsonwebtoken.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 120
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        )
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

exports.userVerify = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al verificar el usuario' });
    }
}
