import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config()

const test = process.env.JWT_SECRET

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    let decodeData = jwt.verify(token, test);
    req.userId = decodeData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;