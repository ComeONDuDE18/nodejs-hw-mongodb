import { getAllContacts, getContactById, createContact, putchContact, deleteContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { requestResetToken } from "../services/auth.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';







    export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};


export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: userId } = req.user;
    const contact = await getContactById(contactId, userId);
   if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

res.json({
    status: 200,
    message: `Successfully found student with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
const { _id: userId } = req.user;
const contact = await createContact({...req.body, userId });


  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const putchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const payload = {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  };

  const contact = await putchContact(contactId, payload, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated contact with id ${contactId}!`,
    data: contact.contact,
  });
};
 

  export const deleteContactController = async (req, res, next) => {
    const { _id: userId } = req.user;
    const { contactId } = req.params;
    const result = await deleteContact(contactId, userId);

      if (!result) {
        next (createHttpError(404, 'Contact not found'));
        return;
      }     
       res.status(204).send();
    };  

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: "Reset password email was successfully sent!",
    status: 200,
    data: {},
  });
};



