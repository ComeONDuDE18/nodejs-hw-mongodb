import {Router} from "express";
import { getAllContactsController, getContactByIdController, createContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get("/contacts",ctrlWrapper(getAllContactsController) );
contactsRouter.get("/contacts/:contactId", ctrlWrapper(getContactByIdController));
contactsRouter.post("/contacts", ctrlWrapper(createContactController));
   

export default contactsRouter;

