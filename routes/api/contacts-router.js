import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { isEmptyBody } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", contactsControllers.getById);

router.post("/", isEmptyBody, contactsControllers.addNew);

router.delete("/:contactId", contactsControllers.removeById);

router.put("/:contactId", isEmptyBody, contactsControllers.updateById);

export default router;
