import signup from "./signup.js";
import signin from "./signin.js";
import signout from "./signout.js";
import getCerrent from "./getCerrent.js";
import updateAvatar from "./updateAvatar.js";
import verifyEmail from "./verifyEmail.js";
import resendVerifyEmail from "./resendVerifyEmail.js";

export default {
  signupUser: signup.signupUser,
  signinUser: signin.signinUser,
  signoutUser: signout.signoutUser,
  getCurrentUser: getCerrent.getCurrentUser,
  updateAvatar: updateAvatar.updateAvatar,
  verifyEmail: verifyEmail.verifyEmail,
  resendVerifyEmail: resendVerifyEmail.resendVerifyEmail,
};
