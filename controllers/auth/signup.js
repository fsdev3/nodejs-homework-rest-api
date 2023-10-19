import fs from "fs/promises";
import path from "path";

import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import HttpError from "../../helpers/HttpError.js";
import { controllersWrapper } from "../../decorators/index.js";

const avatarPath = path.resolve("public", "avatars");

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `Email in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);

  const newUser = await User.create({
    ...req.body,
    avatar,
    password: hashPassword,
  });
  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

export default {
  signupUser: controllersWrapper(signupUser),
};
