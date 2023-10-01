import contactsService from "../models/index.js";
import HttpError from "../helpers/HttpError.js";
import { controllersWrapper } from "../decorators/index.js";
import Joi from "joi";

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
});

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

const addNew = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  return res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

export default {
  getAll: controllersWrapper(getAll),
  getById: controllersWrapper(getById),
  addNew: controllersWrapper(addNew),
  updateById: controllersWrapper(updateById),
  removeById: controllersWrapper(removeById),
};
