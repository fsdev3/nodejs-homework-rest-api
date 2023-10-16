import Contact from "../../models/Contact.js";
import { controllersWrapper } from "../../decorators/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit; //skip - how many need to skip, limit- items quantity
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "username email"); // (, "-createdAt -updatedAt") ??.  ({}, "name, email, etc") - if need only special fields
  res.json(result);
};

export default { getAll: controllersWrapper(getAll) };
