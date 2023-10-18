import { Schema, model } from "mongoose";
import Joi from "joi";
import { handleSaveError, runValidatorsAtUpdate } from "./hooks.js";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveError); // mongoose hook (.post): after save send error

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate); // mongoose pre hook

contactSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
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

const Contact = model("contact", contactSchema);

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default Contact;
