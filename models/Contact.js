import { Schema, model } from "mongoose";
import Joi from "joi";
import handleSaveError from "./hooks.js";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError); // mongoose hook (.post): after save send error

const Contact = model("contact", contactSchema);

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  favorite: Joi.boolean(),
});

export default { Contact, contactAddSchema };
