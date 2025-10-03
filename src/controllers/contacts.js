import { getAllContacts, getContactById, createContact, putchContact, deleteContact } from "../services/contacts.js";
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
   if (!contact) {
    throw createHttpError(404, 'Student not found');
  }

res.json({
    status: 200,
    message: `Successfully found student with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const putchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await putchContact(contactId, req.body);

    if (!result) {
      next (createHttpError(404, 'Contact not found'));
      return;
    }
    res.json({
      status: 200,
      message: `Successfully updated contact with id ${contactId}!`,
      data: result.contact,
    });
  };    

  export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await deleteContact(contactId);

      if (!result) {
        next (createHttpError(404, 'Contact not found'));
        return;
      }     
      res.json({
        status: 200,
        message: `Successfully deleted contact with id ${contactId}!`,
      });
    };  






