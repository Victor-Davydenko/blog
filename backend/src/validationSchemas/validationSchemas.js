import Joi from 'joi';

export const createUserValidationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .alphanum()
    .min(7)
    .max(16)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  role: Joi.string()
    .optional(),
});

export const loginUserValidationSchema = Joi.object({
  email: Joi.string()
    .required(),

  password: Joi.string()
    .required(),
});

export const updatePasswordValidationSchema = Joi.object({
  password: Joi.string()
    .alphanum()
    .min(7)
    .max(16)
    .required(),

  repeat: Joi.ref('password'),
}).with('password', 'repeat');

export const postValidationSchema = Joi.object({
  text: Joi.string()
    .required(),
});
