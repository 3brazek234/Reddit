// utils/generateToken.js (مثلاً)
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  // تأكد إن process.env.JWT_SECRET هنا ليه قيمة ومش undefined
  if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    { id: user.id, email: user.email }, // البيانات اللي عايز تخزنها في التوكن
    process.env.JWT_SECRET,             
    { expiresIn: '1h' }
  );
};

module.exports = generateToken;