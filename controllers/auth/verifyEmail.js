import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";
import { controllersWrapper } from "../../decorators/index.js";
import dotenv from "dotenv";
dotenv.config();

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404);
  }
  await User.findByIdAndUpdate(user.id, {
    verify: true,
    verificationToken: null,
  });

  res.json({ message: "Verify is success" });
};

export default {
  verifyEmail: controllersWrapper(verifyEmail),
};
