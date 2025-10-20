import { ContactCollection } from '../db/models/contacts.js';
import {calculatePaginationData} from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';




export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  
  const contactsQuery = ContactCollection.find();
  const [contactsCount, contacts] = await Promise.all([
    ContactCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};


export const getContactById = async (contactId) => {
    const contact = await ContactCollection.findById(contactId);
    return contact;
}   ;

export const createContact = async (payload) => {
    const newContact = await ContactCollection.create(payload);
    return newContact;
};

export const putchContact = async (contactId, payload) => {
  const contact = await ContactCollection.findByIdAndUpdate(contactId, payload, { new: true });
  return contact;
};    

export const deleteContact = async (contactId) => {
    const contact = await ContactCollection.findByIdAndDelete(contactId);   
    return contact;
};






