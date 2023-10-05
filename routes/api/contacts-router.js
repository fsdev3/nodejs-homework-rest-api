import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";
import { validateBody } from "../../decorators/index.js";

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", isValidId, contactsControllers.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsControllers.addNew);

router.delete("/:contactId", isValidId, contactsControllers.removeById);

router.put(
  "/:contactId",
  isEmptyBody,
  isValidId,
  contactAddValidate,
  contactsControllers.updateById
);

router.patch(
  "/:contactId/favorite",
  isEmptyBody,
  isValidId,
  contactUpdateFavoriteValidate,
  contactsControllers.updateFavoriteById
);

export default router;
