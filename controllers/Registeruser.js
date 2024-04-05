const bcrypt = require("bcrypt");
const User = require('../models/UserModel');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, PhoneNumber, companyName } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { PhoneNumber }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'User already exists' });
            } else {
                return res.status(400).json({ error: 'User with this phone number already exists' });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            PhoneNumber,
            companyName
        });
        // console.log('New User:', newUser);
        await newUser.save();
        res.status(201).json({ message: 'registration successfull' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = registerUser;
