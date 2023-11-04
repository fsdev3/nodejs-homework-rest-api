import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import User from "../../models/User.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { controllersWrapper } from "../../decorators/index.js";
import dotenv from "dotenv";
dotenv.config();

const { BASE_URL } = process.env;

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `Email in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email, {
    protocol: "http",
    s: "250",
    d: "identicon",
  });

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}">Click to verify your email</a>`,
  };
  await sendEmail(verifyEmail);

  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

export default {
  signupUser: controllersWrapper(signupUser),
};
