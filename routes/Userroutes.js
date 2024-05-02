const express = require('express');
const router = express.Router();
const {loginData, verifyToken} = require('../controllers/LoginController');
const {signup} = require('../controllers/SignupController')
const {CreateOrderDetails, getAllOrderDetails, getOrderDetailsById, updateOrderDetails, deleteOrderDetails} = require('../controllers/MenuController');
const {cartDetails} = require('../controllers/CartController');
// const {verifyToken} = require('../controllers/authMiddleware');

// app.use(verifyToken);

router.post("/login",  loginData);

router.post("/signup", signup)

router.post("/CreateOrderDetails", CreateOrderDetails);

router.get('/getAllOrderDetails/:userId', getAllOrderDetails);

router.get('/getOrderDetailsById',getOrderDetailsById);

router.put('/updateOrderDetails/:id', updateOrderDetails);

router.delete('/deleteOrderDetails/:id', deleteOrderDetails);

router.post("/createCartDetails/:id",  cartDetails)

module.exports = router;