import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/).required(),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid("home", "work", "personal").optional(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().pattern(/^\+?[0-9]{10,15}$/),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid("home", "work", "personal"),
});

