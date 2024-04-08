const mongoose = require("mongoose");


const foodData =async (req,res)=>{
    try{
        const fetchedData_items = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const food_Category = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        res.send([fetchedData_items,food_Category])
    } catch (error) {
        console.log(error);
        res.send("server error")
    }
}

module.exports = foodData;