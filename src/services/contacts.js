import { ContactCollection } from '../db/models/contacts.js';


export const getAllContacts = async () => {
    return await ContactCollection.find({});
};

export const getContactById = async (contactId) => {
    const contact = await ContactCollection.findById(contactId);
    return contact;
}   ;

export const createContact = async (payload) => {
    const newContact = await ContactCollection.create(payload);
    return newContact;
};


