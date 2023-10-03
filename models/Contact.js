import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
}); // 1 - cr. schema of object

const Contact = model("contact", contactSchema); // 2 cr. class model

export default Contact;
