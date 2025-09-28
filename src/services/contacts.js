import { ContactCollection } from '../db/models/contacts.js';


export const getAllContacts = async () => {
    return await ContactCollection.find({});
};

export const getContactById = async (contactId) => {
    const contact = await ContactCollection.findById(contactId);
    return contact;
}   ;
