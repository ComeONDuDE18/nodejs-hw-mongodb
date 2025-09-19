import { ContactCollection } from '../db/models/contacts.js';


export const getAllContacts = async () => {
    return await ContactCollection.find({});
};

export const getContactById = async (contactId) => {
    return await ContactCollection.findById(contactId);
}   ;
