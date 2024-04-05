const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/Registeruser');
const loginUser = require('../controllers/Loginuser')
const { viewOrders, placeOrders, Payments, currentUser } = require("../controllers/usercontroller");
const validateToken = require('../middileware/validateToken');
const foodData = require('../controllers/FoodData')
const OrderData = require('../controllers/OrderData')
const MyOrders = require('../controllers/Myorders')

// router.route("/Vieworders").get(validateToken,viewOrders);

// router.route("/Placeorders").post(validateToken,placeOrders);
router.route("/OrderData").post(validateToken,OrderData)
router.route("/Myorders").get(validateToken,MyOrders)

// router.route("/Payments").get(validateToken,Payments);

router.post("/Register",registerUser);

router.post("/Login",loginUser);

router.post("/foodData",foodData)

// router.get("/current", validateToken , currentUser);

module.exports = router;