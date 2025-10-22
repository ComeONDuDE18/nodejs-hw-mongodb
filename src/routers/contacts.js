import {Router} from "express";
import { getContactByIdController, createContactController, putchContactController, deleteContactController, getContactsController }  from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";    

const contactsRouter = Router();

contactsRouter.get("/contacts",ctrlWrapper(getContactsController) );
contactsRouter.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post("/contacts",validateBody(createContactSchema), ctrlWrapper(createContactController));
contactsRouter.patch("/contacts/:contactId", validateBody(updateContactSchema), isValidId, ctrlWrapper(putchContactController));
contactsRouter.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));


export default contactsRouter;




