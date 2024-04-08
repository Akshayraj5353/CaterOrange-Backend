const express = require('express');
const router = express.Router();
const validateToken = require('../middileware/validateToken');
const {loginData, token} = require('../controllers/LoginController');
const {signup} = require('../controllers/SignupController')
const {CreateOrderDetails, getAllOrderDetails, getOrderDetailsById, updateOrderDetails, deleteOrderDetails} = require('../controllers/MyOrderController')


router.post("/login", loginData);

router.post("/signup", signup)

router.post("/CreateOrderDetails", CreateOrderDetails);

router.get('/getAllOrderDetails', getAllOrderDetails);

router.get('/getOrderDetailsById', getOrderDetailsById);

router.put('/updateOrderDetails', updateOrderDetails);

router.delete('deleteOrderDetails', deleteOrderDetails);

module.exports = router;