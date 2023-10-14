import HttpError from "../../helpers/HttpError.js";
import { controllersWrapper } from "../../decorators/index.js";
import User from "../../models/User.js";

const signup = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({ username: user.username, email: user.email });
};

export default {
  signup: controllersWrapper(signup),
};
