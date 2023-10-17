import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import HttpError from "../../helpers/HttpError.js";
import { controllersWrapper } from "../../decorators/index.js";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

// const signup = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw HttpError(409, `Email in use`);
//   }

//   const hashPassword = await bcrypt.hash(password, 10);
//   const newUser = await User.create({ ...req.body, password: hashPassword });
//   res
//     .status(201)
//     .json({ email: newUser.email, subscription: newUser.subscription });
// };

// const signinUser = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw HttpError(401, `Email or password is invalid`);
//   }
//   const passwordCompare = await bcrypt.compare(password, user.password);
//   if (!passwordCompare) {
//     throw HttpError(401, `Email or password is invalid`);
//   }

//   const payload = { id: user._id };
//   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
//   await User.findByIdAndUpdate(user._id, { token }); // we save token when login is successful
//   res
//     .status(200)
//     .json({ email: user.email, subscription: user.subscription, token });
// };

// const getCurrent = async (req, res) => {
//   const { subscription, email } = req.user;
//   res.json({ email, subscription });
// };

// const signoutUser = async (req, res) => {
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(_id, { token: "" });
//   res.json({ message: "No content" }); // when I add .status(204) - postman respond is empty
// };

export default {
  // signup: controllersWrapper(signup),
  // signinUser: controllersWrapper(signinUser),
  // signoutUser: controllersWrapper(signoutUser),
  // getCurrent: controllersWrapper(getCurrent),
};
