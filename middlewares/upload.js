import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const filename = `${nanoid()}_${file.originalname}`; // or with Date.now: const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`

    cb(null, filename);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const upload = multer({
  storage,
  limits,
});

export default upload;
