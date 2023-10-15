import bcryptjs from "bcryptjs";
import HttpError from "../../helpers/HttpError.js";
import { controllersWrapper } from "../../decorators/index.js";
import User from "../../models/User.js";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} is already registered`);
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({ username: newUser.username, email: newUser.email });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, `Email is invalid`);
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, `password is invalid`);
  }
  const token = "sgsfd.45234.3333";
  res.json({ token });
};

export default {
  signup: controllersWrapper(signup),
  signin: controllersWrapper(signin),
};
