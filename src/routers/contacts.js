import {Router} from "express";
import { getAllContactsController, getContactByIdController, createContactController, putchContactController, deleteContactController }  from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from "../middlewares/validateBody.js";
import { contactSchema } from "../db/models/contacts.js";
import { isValidId } from "../middlewares/isValid.js";

const contactsRouter = Router();

contactsRouter.get("/contacts",ctrlWrapper(getAllContactsController) );
contactsRouter.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post("/contacts",validateBody(contactSchema), ctrlWrapper(createContactController));
contactsRouter.patch("/contacts/:contactId", validateBody(contactSchema), isValidId, ctrlWrapper(putchContactController));
contactsRouter.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));


export default contactsRouter;




