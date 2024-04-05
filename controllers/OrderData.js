const Order = require('../models/OrderModel')

const OrderData = async (req, res) => {
    let data = req.body.order_data
    // console.log("dataarray", data)
    const newData = { ...data, Order_date: req.body.Order_date };
    // console.log(newData);

    let eId = await Order.findOne({ 'email': req.body.email })

    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [newData]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Server Error: " + error.message);
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: newData } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            res.status(500).send("Server Error: " + error.message);
        }
    }

}



module.exports = OrderData;