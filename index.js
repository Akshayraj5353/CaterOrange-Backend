const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require("./config/dbConnection");
const userRoutes = require("./routes/Userroutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
