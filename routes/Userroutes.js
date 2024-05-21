const express = require('express');
const router = express.Router();
const { loginData, verifyToken } = require('../controllers/LoginController');
const { signup } = require('../controllers/SignupController')
const { CreateOrderDetails, getAllOrderDetails, getOrderDetailsById, updateOrderDetails, deleteOrderDetails } = require('../controllers/MenuController');
const { cartDetails } = require('../controllers/CartController');
const addAddress = require('../controllers/adress');
const userAdress = require('../controllers/useradress');
// const paymentController = require('../controllers/PaymentController');
const deleteaddress = require('../controllers/deleteaddress')
const createOrder = require('../controllers/Createorder');
const { deleteCartDetails } = require('../controllers/deletecartdetails');
const axios = require('axios');
const sha256 = require('sha256');
const crypto = require('crypto');

const uniqid = require('uniqid');

// const {verifyToken} = require('../controllers/authMiddleware');

// app.use(verifyToken);

router.post("/login", loginData);

router.post("/signup", signup)

router.post("/CreateOrderDetails", CreateOrderDetails);

router.post('/userAdress/:userId', addAddress);
router.get('/userAdress/:userId', userAdress);
router.delete('/userAdress/:userId/:addressId', deleteaddress);


router.get('/getAllOrderDetails/:userId', getAllOrderDetails);

router.get('/getOrderDetailsById', getOrderDetailsById);

router.put('/updateOrderDetails/:id', updateOrderDetails);

router.delete('/deleteOrderDetails/:userId', deleteOrderDetails);

router.post("/createCartDetails/:id", cartDetails);

// router.get('/getOrder', paymentController.renderProductPage);
// router.post('/createRazorPayOrder', paymentController.createOrder);


//
router.post('/createOrder/:userId', createOrder)
// router.delete('/deleteUserCart/:userId', deleteCartDetails)


//payment testing 
router.post('/pay', (req, res) => {
    const payEndpoint = "/pg/v1/pay"
    const amount = req.body.amount * 100;
    const userid = req.body.userId;
    const merchantTransactionId = uniqid()
    const salt_key = process.env.SALT_KEY;
    const salt_Index = process.env.SALT_INDEX;


    const payload = {
        "merchantId": `${process.env.MERCHANT_ID}`,
        "merchantTransactionId": merchantTransactionId,
        "merchantUserId": "USER_123",
        "amount": 100,
        "redirectUrl": `http://localhost:3000/`,
        "redirectMode": "REDIRECT",
        "callbackUrl": "http://localhost:5001/api/phonepe/webhook",
        "mobileNumber": "9999999999",
        "paymentInstrument": {
            "type": "PAY_PAGE"
        }
    }

    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    const base64Encodedpayload = bufferObj.toString("base64");
    // console.log(base64Encodedpayload);
    const xVerify = sha256(base64Encodedpayload + payEndpoint + salt_key) + "###" + salt_Index
    // console.log(xVerify);

    const options = {
        method: 'post',
        url: `${process.env.PHONE_PE_HOST_URL}${payEndpoint}`,
        headers: {
            'Content-Type': 'application/json',
            "X-VERIFY": xVerify
        },
        data: {
            "request": base64Encodedpayload,
        }
    };
    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            // res.redirect(response.data.instrumentResponse.redirectInfo.url)
            res.send(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
})


router.post('/phonepe/webhook', (req, res) => {
    const callbackHeaders = req.headers;
    const base64response = req.body.response;
    const xVerifyHeader = callbackHeaders['X-VERIFY'];
    const decodedResponse = Buffer.from(base64response, 'base64').toString('utf8');
    console.log(decodedResponse);
    res.send(decodedResponse);
})


router.post("/status/:merchantTransactionId", (req, res) => {
    const { merchantTransactionId } = req.params;
    const merchantId = process.env.MERCHANT_ID;
    if (merchantTransactionId) {
        const xVerify = sha256(`/pg/v1/status/${merchantId}/${merchantTransactionId}`+ process.env.SALT_KEY)+"###"+process.env.SALT_INDEX
        const axios = require('axios');
        const options = {
            method: 'get',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
            headers: {
                'Content-Type': 'application/json',
                'X-MERCHANT-ID':merchantId,	
                'X-VERIFY': xVerify,
            },

        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                res.send(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });

    }
})



module.exports = router;