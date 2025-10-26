import { ContactCollection } from '../db/models/contacts.js';
import {calculatePaginationData} from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';


export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find({ userId });

  if (filter.type) {
    contactsQuery.where("contactType").equals(filter.type);
  }

  if (typeof filter.value !== "undefined") {
    contactsQuery.where("isFavourite").equals(filter.value);
  }

  const [contactsCount, contacts] = await Promise.all([
    contactsQuery.clone().countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .lean()
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};


export const getContactById = async (contactId, userId) => {
  const contact = await ContactCollection.findOne({
    _id: contactId,
    userId: userId,
  });
  return contact;
};

export const createContact = async (payload) => {
    const newContact = await ContactCollection.create(payload);
    return newContact;
};

export const putchContact = async (contactId, payload, userId, options = {}) => {
  const contact = await ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true, 
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!contact || !contact.value) return null;

  return {
    contact: contact.value,
    isNew: Boolean(contact?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactCollection.findOneAndDeletegh({
    _id: contactId, userId
  });
 
    return contact;
};






