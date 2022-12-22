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

    //generate token
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '5hr',
      });
    };

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, image, email, password } = req.body;

    const capitalizedFirsLetter = (str) => {
      const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

      return capitalized;
    };

    const makeFirstLetterCapitalized = capitalizedFirsLetter(name);

    const existingUser = await User.findOne({ email });

    if (existingUser) return next(createError(400, 'User already exist'));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUserRegistered = new User({
      name: makeFirstLetterCapitalized,
      image,
      email,
      password: hash,
    });

    await newUserRegistered.save();

    res.status(200).json({
      _id: newUserRegistered.id,
      name: newUserRegistered.name,
      email: newUserRegistered.email,
      password: newUserRegistered.password,
    });
  } catch (error) {
    next(error);
  }
};
