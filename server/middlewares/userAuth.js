require('dotenv').config();
const jwt = require('jsonwebtoken')

// if validation fails it clears the cookie
const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(403).send("error verifying token");
  }
}

const generateAuthToken = (userId) => {
  const payload = { userId };

  // Sign the token with your secret key
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h', // Set an expiration time for the token
  });

  return token;
};

module.exports = {
  requireAuth,
  generateAuthToken
}