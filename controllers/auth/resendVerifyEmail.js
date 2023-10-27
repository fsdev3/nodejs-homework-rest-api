import User from "../../models/User.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { controllersWrapper } from "../../decorators/index.js";
import "dotenv/config";

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Email already verified");
  }

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({ message: "Verification email successfully sent" });
};

export default {
  resendVerifyEmail: controllersWrapper(resendVerifyEmail),
};
