const FormData = require('../models/MyOrderSchema');

const CreateOrderDetails = async (req, res) => {
    try {
        const formData = req.body;
        // Save form data to MongoDB
        const cartData = await FormData.create(formData);

        
        res.send({ message: 'Form data saved to MongoDB', cartData });
    } catch (error) {
        console.error('Error saving form data to MongoDB:', error);
        res.status(500).send({ error: 'An error occurred while saving form data' });
    }
}


// Get all form data
const getAllOrderDetails = async (req, res) => {
  try {
    const formData = await FormData.find();
    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single form data by ID
const getOrderDetailsById = async (req, res) => {
  try {
    const formData = await FormData.findById(req.params.id);
    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }
    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a form data by ID
const updateOrderDetails = async (req, res) => {
  try {
    const formData = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }
    res.json(formData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a form data by ID
const deleteOrderDetails = async (req, res) => {
  try {
    const formData = await FormData.findByIdAndDelete(req.params.id);
    if (!formData) {
      return res.status(404).json({ message: 'Form data not found' });
    }
    res.json({ message: 'Form data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { CreateOrderDetails, getAllOrderDetails, getOrderDetailsById, updateOrderDetails, deleteOrderDetails };