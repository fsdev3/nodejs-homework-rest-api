import express from "express";
import authControllers from "../../controllers/auth/index.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { userSignupSchema, userSigninSchema } from "../../models/User.js";

const userSignupValidate = validateBody(userSignupSchema);
const userSigninValidate = validateBody(userSigninSchema);

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  isEmptyBody,
  userSignupValidate,
  authControllers.signupUser
);

authRouter.post(
  "/users/login",
  isEmptyBody,
  userSigninValidate,
  authControllers.signinUser
);

authRouter.get("/users/current", authenticate, authControllers.getCurrentUser);

authRouter.post("/users/logout", authenticate, authControllers.signoutUser);

export default authRouter;
