import HttpError from "../helpers/HttpError.js";
import { controllersWrapper } from "../decorators/index.js";
import { contactAddSchema } from "../models/Contact.js";
import Contact from "../models/Contact.js";

const getAll = async (req, res) => {
  const result = await Contact.find(); // ({}, "name, email, etc") - if need only special fields
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

const addNew = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  return res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, error, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
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
  updateFavoriteById: controllersWrapper(updateFavoriteById),
  removeById: controllersWrapper(removeById),
};
