import jwt from "jsonwebtoken";

import { HttpError } from "../helpers/index.js";
import controllersWrapper from "../decorators/controllersWrapper.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers; // if no token: = "" - postman: "message": "Unauthorized"
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    throw HttpError(401);
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw HttpError(401);
    }

    req.user = user; //add info to main request about user to get _id to Schema
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

export default controllersWrapper(authenticate); // wrapper breaks the func, no need to write return after error.
