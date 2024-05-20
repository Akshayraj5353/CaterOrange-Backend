const User = require('../models/UserSchema');
const Order = require('../models/OrderSchema')

const createOrder = async (req, res) => {
    const userId = req.params.userId;
    const { products, address, total } = req.body;
    console.log(userId,"test user id for order creation ");

    try {
        // Ensure the user exists
        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }

        // Create a new order
        const newOrder = new Order({
            products,
            address,
            total,
            userId,
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        return res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = createOrder;