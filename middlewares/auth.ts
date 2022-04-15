import jwt from "jsonwebtoken";
const { JWT_TOKEN } = process.env;

export default (req, res, next) => {
  let playload;
  try {
    playload = jwt.verify(req.cookies.jwt, JWT_TOKEN);
    req.user = playload;
    next();
  } catch (err) {
    next();
  }
};
