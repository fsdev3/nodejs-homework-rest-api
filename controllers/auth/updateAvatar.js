import jimp from "jimp";
import path from "path";
import fs from "fs/promises";
import { HttpError } from "../../helpers/index.js";
import { controllersWrapper } from "../../decorators/index.js";

const updateAvatar = async (req, res) => {
  const { file, user } = req;

  if (!file) {
    throw HttpError(400, `File is not uploaded`);
  }

  try {
    const image = await jimp.read(file.path);
    image.resize(250, 250);

    const uniqueFileName = `${user._id}_${file.originalname}`;

    const tempAvatarPath = path.join("tmp", uniqueFileName);

    await image.writeAsync(tempAvatarPath);

    const publicAvatarPath = path.join("public", "avatars", uniqueFileName);
    await fs.rename(tempAvatarPath, publicAvatarPath);

    user.avatarURL = `avatars/${uniqueFileName}`;
    await user.save();
    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    res.status(500).json({ message: "Avatar update failed" });
  }
};

export default {
  updateAvatar: controllersWrapper(updateAvatar),
};
