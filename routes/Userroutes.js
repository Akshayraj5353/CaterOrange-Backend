const express = require('express');
const router = express.Router();
const {loginData, verifyToken} = require('../controllers/LoginController');
const {signup} = require('../controllers/SignupController')
const {CreateOrderDetails, getAllOrderDetails, getOrderDetailsById, updateOrderDetails, deleteOrderDetails} = require('../controllers/MenuController');
const {cartDetails} = require('../controllers/CartController');
const addAddress = require('../controllers/adress');
const userAdress = require('../controllers/useradress');
const paymentController =require('../controllers/PaymentController');

// const {verifyToken} = require('../controllers/authMiddleware');

// app.use(verifyToken);

router.post("/login",  loginData);

router.post("/signup", signup)

router.post("/CreateOrderDetails", CreateOrderDetails);

router.post('/userAdress/:userId', addAddress);
router.get('/userAdress/:userId',userAdress);


router.get('/getAllOrderDetails/:userId', getAllOrderDetails);

router.get('/getOrderDetailsById',getOrderDetailsById);

router.put('/updateOrderDetails/:id', updateOrderDetails);

router.delete('/deleteOrderDetails/:id', deleteOrderDetails);

router.post("/createCartDetails/:id",  cartDetails);

router.get('/getOrder', paymentController.renderProductPage);
router.post('/createRazorPayOrder', paymentController.createOrder);

module.exports = router;