import { controllersWrapper } from "../../decorators/index.js";

const getCurrentUser = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({ email, subscription });
};

export default {
  getCurrentUser: controllersWrapper(getCurrentUser),
};
