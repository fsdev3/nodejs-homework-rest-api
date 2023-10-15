import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpError from "../../helpers/HttpError.js";
import { controllersWrapper } from "../../decorators/index.js";
import User from "../../models/User.js";

const { JWT_SECRET } = process.env;
console.log("JWT_SECRET:", JWT_SECRET);

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} is already registered`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({ username: newUser.username, email: newUser.email });
};

const signin = async (req, res) => {
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
  res.json({ token });
};

export default {
  signup: controllersWrapper(signup),
  signin: controllersWrapper(signin),
};
