import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { createError } from '../middleware/error.js';
import User from '../models/UserModel.js';

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, 'User not found'));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, 'Invalid credentials'));

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT
    );

    const { password, ...otherDetails } = user._doc;

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails } });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, image, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) return next(createError(400, 'User already exist'));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUserRegistered = new User({
      ...req.body,
      password: hash,
    });

    await newUserRegistered.save();

    res.status(200).json({
      _id: newUserRegistered.id,
      username: newUserRegistered.username,
      email: newUserRegistered.email,
    });
  } catch (error) {
    next(error);
  }
};
