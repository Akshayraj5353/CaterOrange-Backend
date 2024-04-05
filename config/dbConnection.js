const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB database connected:", mongoose.connection.host, mongoose.connection.name);

        // Fetch data from the database if needed
        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetchedData;
        console.log(global.food_items);
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.food_category = foodCategory;
        console.log(global.food_category);
    } catch (error) {
        console.error("Unable to establish connection to database:", error.message);
        process.exit(1);
    }
}

module.exports = connectDb;
