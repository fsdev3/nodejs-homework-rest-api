import User from "../../models/User.js";
import { controllersWrapper } from "../../decorators/index.js";

const signoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({ message: "No content" }); // when I add .status(204) - postman respond is empty
};

export default {
  signoutUser: controllersWrapper(signoutUser),
};
