const bcrypt = require("bcrypt");
const User = require('../models/UserModel');
const generateToken = require("../middileware/Auth");



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        
        res.json({
          _id: user._id,
          name: user.name,
          email:user.email,
          phone: user.phone,
          image: user.image,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        });
        
        
        } else {
          res.status(401).json({ message: 'Invalid username or password' });
        }
    }
    
 catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  module.exports = loginUser;