const mongoose = require('mongoose');

const { Schema } = mongoose;


// const ProductSchema = new Schema({
//     addOns: {
//         gulabJamoon: { type: Number, default: 0 }
//     },
//     itemDetails: { type: String, required: true },
//     itemName: { type: String, required: true },
//     itemPrice: { type: Number, required: true },
//     mealPlan: { type: String, default: '' },
//     mealQuantity: { type: Number, required: true },
//     mealType: { type: String, default: '' },
//     selectedItemIndex: { type: Number, required: true },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// });


const OrderSchema = new Schema({
    products: { type: Array, required: true },
    address: { type: Object, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
    total: { type: Number, required: true }, // Changed to Number to support decimals
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User collection
    createdAt: { type: Number, default: Math.floor(Date.now() / 1000) },
    updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = Math.floor(Date.now() / 1000);
    }
    next();
});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;