import {StudentCollection} from '../db/models/student.js';

export const getAllContacts = async () => {
    return await StudentCollection.find({});
};

export const getContactById = async (contactId) => {
    return await StudentCollection.findById(contactId);
}   ;
