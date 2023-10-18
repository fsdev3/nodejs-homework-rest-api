import express from "express";
import contactControllers from "../../controllers/contacts/index.js";
import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";
import { validateBody } from "../../decorators/index.js";

const contactAddValidate = validateBody(contactAddSchema);

const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.use(authenticate); //every routes uses middleware authenticate

router.get("/", contactControllers.getAll);

router.get("/:contactId", isValidId, contactControllers.getById);

router.post("/", isEmptyBody, contactAddValidate, contactControllers.addNew);

router.delete("/:contactId", isValidId, contactControllers.removeById);

router.put(
  "/:contactId",
  isEmptyBody,
  isValidId,
  contactAddValidate,
  contactControllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isEmptyBody,
  isValidId,
  contactUpdateFavoriteValidate,
  contactControllers.updateFavoriteById
);

export default router;
