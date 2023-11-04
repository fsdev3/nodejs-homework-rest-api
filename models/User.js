import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: { type: String, match: emailRegexp, unique: true, required: true },
    password: { type: String, minlength: 6, required: true },
    avatarURL: { type: String, required: true },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: null },
    verify: { type: Boolean, default: false },
    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError); // mongoose hook (.post): after save send error

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate); // mongoose pre hook

userSchema.post("findOneAndUpdate", handleSaveError);

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const User = model("user", userSchema);

export default User;
