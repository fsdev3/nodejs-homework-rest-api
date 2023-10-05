import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { contactAddSchema } from "../../models/Contact.js";
import { validateBody } from "../../decorators/index.js";

const contactAddValidate = validateBody(contactAddSchema);

const router = express.Router();

router.get("/", contactsControllers.getAll);

// router.get("/:contactId", contactsControllers.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsControllers.addNew);

// router.delete("/:contactId", contactsControllers.removeById);

// router.put(
//   "/:contactId",
//   isEmptyBody,
//   contactAddValidate,
//   contactsControllers.updateById
// );

export default router;
