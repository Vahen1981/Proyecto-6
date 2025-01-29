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
                expiresIn: 180
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

exports.updateVerifiedUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.user.id;

        if (email) {
            const emailExist = await User.findOne({ email });
            if (emailExist && emailExist.id !== userId) {
                return res.status(400).json({ message: 'El correo ya está registrado por otro usuario' });
            }
        }

        let hashedPassword = password;
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashedPassword = await bcryptjs.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(201).json({ 
            name: updatedUser.name, 
            email: updatedUser.email 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};

exports.deleteVerifiedUser = async(req, res) => {
    try {
        const userId = req.user.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        return res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
}