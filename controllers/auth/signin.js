import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import HttpError from "../../helpers/HttpError.js";
import { controllersWrapper } from "../../decorators/index.js";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `Email or password is invalid`);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, `Email or password is invalid`);
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token }); // we save token when login is successful
  res
    .status(200)
    .json({ email: user.email, subscription: user.subscription, token });
};

export default {
  signinUser: controllersWrapper(signinUser),
};
