const Order = require('../models/OrderModel')

const MyOrders = async (req, res) => {
    try {
        const userEmail = req.query.email; // Extract email from query parameters
        let myData = await Order.findOne({ 'email': userEmail });
        res.json({ orderData: myData });
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
};

module.exports = MyOrders;