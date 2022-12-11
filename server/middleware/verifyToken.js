import jwt from 'jsonwebtoken';

const secret = process.env.JWT;

//middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(404, 'Sorry Not Authenticated'));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is Not Valid'));
    req.user = user;
    next();
  });
};

//user
export const verifyForUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, 'Not Authorized'));
    }
  });
};
