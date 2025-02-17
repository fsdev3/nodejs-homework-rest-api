import express from "express";
import authControllers from "../../controllers/auth/index.js";
import { upload, isEmptyBody, authenticate } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
} from "../../models/User.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);
const userEmailValidate = validateBody(userEmailSchema);

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  upload.single("avatar"),
  isEmptyBody,
  userSignupValidate,
  authControllers.signupUser
); //.single - have to be after contactAddValidate!, in the field avatar will be only one file. if need to send 5 files - .array("avatar", 5)

authRouter.post(
  "/users/login",
  isEmptyBody,
  userSigninValidate,
  authControllers.signinUser
);

authRouter.get("/users/verify/:verificationToken", authControllers.verifyEmail);

authRouter.post(
  "/users/verify",
  isEmptyBody,
  userEmailValidate,
  authControllers.resendVerifyEmail
);

authRouter.post("/users/logout", authenticate, authControllers.signoutUser);

authRouter.get("/users/current", authenticate, authControllers.getCurrentUser);

authRouter.patch(
  "/users/avatars",
  upload.single("avatar"),
  authenticate,
  authControllers.updateAvatar
);

export default authRouter;
