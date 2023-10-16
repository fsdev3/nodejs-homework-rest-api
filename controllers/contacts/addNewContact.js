import Contact from "../../models/Contact.js";
import { controllersWrapper } from "../../decorators/index.js";

const addNew = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

export default { addNew: controllersWrapper(addNew) };
