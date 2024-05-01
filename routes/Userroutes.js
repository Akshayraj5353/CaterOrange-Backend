const express = require('express');
const router = express.Router();
const {loginData, verifyToken} = require('../controllers/LoginController');
const {signup} = require('../controllers/SignupController')
const {CreateOrderDetails, getAllOrderDetails, getOrderDetailsById, updateOrderDetails, deleteOrderDetails} = require('../controllers/MyOrderController');
// const {verifyToken} = require('../controllers/authMiddleware');

// app.use(verifyToken);

router.post("/login",  loginData);

router.post("/signup", signup)

router.post("/CreateOrderDetails", CreateOrderDetails);

router.get('/getAllOrderDetails', getAllOrderDetails);

// router.post('/checkout', checkOut);

// router.post('/paymentverification', paymentVerification);





router.get('/getOrderDetailsById', getOrderDetailsById);

router.put('/updateOrderDetails', updateOrderDetails);

router.delete('/deleteOrderDetails', deleteOrderDetails);

module.exports = router;