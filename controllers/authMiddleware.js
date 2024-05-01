// authMiddleware.js

// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// module.exports = { verifyToken };
