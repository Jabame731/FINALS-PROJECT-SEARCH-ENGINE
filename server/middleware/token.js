import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

import createError from '../middleware/error.js';

export const verifyUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decodedToken = jwt.verify(token, process.env.JWT);

      req.user = await User.findById(decodedToken.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      next(createError(401, 'Not Authorized'));
    }
  }
};
