const asyncHandler = require("express-async-handler");
const generateToken = require("../middileware/Auth");
const bcrypt = require("bcrypt");
const User = require('../models/UserModel');
// const expressAsyncHandler = require("express-async-handler");
//import User from "../models/User1";
//@view orders
//@route get ./vieworders
//@access public
const viewOrders =async (req,res)=>{
    res.status(200).json({ message : "order details" });
}

//@Placeorders
//@route post ./PlaceOrders
//@access public
const placeOrders =async (req,res)=>{
  try {
    // Extract order details from request body
    const { mealId, quantity, totalPrice } = req.body;

    // Get user ID from the authenticated user
    const userId = req.user.id;

    // Create a new order document
    const newOrder = new Order({
        userId,
        mealId,
        quantity,
        totalPrice
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
};

//@Payment
//@route get ./Payments
//@access public
const Payments =async (req,res)=>{
    res.json({ message : "payment successfull" });
}

//@Payment
//@route post ./register
//@access public
// const registerUser =async (req,res)=>{
//   try {
//     const { name , email, password, phone , companyName } = req.body;
//     const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
//         if (existingUser) {
//             if (existingUser.email === email) {
//                 return res.status(400).json({ error: 'User already exists' });
//             } else {
//                 return res.status(400).json({ error: 'User with this phone number already exists' });
//             }
//         }    
//   const hashedPassword = await bcrypt.hash(password, 10); 
//   const newUser = new User(name , email, hashedPassword, phone, companyName );
//     console.log('New User:', newUser);
//     await newUser.save();
//     res.status(201).json({ message: 'registration successfull' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

//@Payment
//@route post ./Login
//@access public

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


// const updateProfile = expressAsyncHandler(async(req,res)=>{
//     try {
//       const user = await User.findOne(req.user._id);
//       if(user){
//         user.name = req.body.name || user.name;
//         user.email =req.body.email || user.email;
//         user.phone = req.body.phone || user.phone;
//         user.image = req.body.image || user.image;

//         const updatedUser = await user.save();
//         res.json({
//           _id: updatedUser._id,
//           name: updatedUser.name,
//           email: updatedUser.email,
//           image: updatedUser.image,
//           isAdmin: updatedUser.isAdmin,
//         });
//       }
//     }
//   })
//@desc Current user info
//@route POST ./currentuser
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
  





module.exports = {viewOrders, placeOrders, Payments, currentUser};