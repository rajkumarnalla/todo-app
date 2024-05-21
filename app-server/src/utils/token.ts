const jwt = require('jsonwebtoken');

interface userParams {
    id: number;
    firstName: string;
    email: string;
}

// Function to generate an access token with expiry date
export const generateAccessToken = (user: userParams) => {
  try {  
    const payload = {
      id: user.id,
      username: user.firstName,
      email: user.email
    };

    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '6h' // Token will expire in 6 hours
    };

    return jwt.sign(payload, secretKey, options);
  } catch(err) {
    throw err;
  }
};

export const decodeAccessToken = (token: string) => {
    try {
      const secretKey = process.env.ACCESS_TOKEN_SECRET;
      const decoded = jwt.verify(token, secretKey);

      return decoded;
    } catch (err: any) {
      console.error('Error decoding token:', err.message);
      throw err;
    }
};