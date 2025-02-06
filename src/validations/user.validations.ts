import Joi from 'joi';

const register = {
  body: Joi.object({
    firstName: Joi.string().required().messages({
      'string.base': 'First name must be a string',
      'any.required': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
      'string.base': 'Last name must be a string',
      'any.required': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.base': 'Password must be a string',
      'any.required': 'Password is required',
    }),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'string.base': 'Password must be a string',
      'any.required': 'Password is required',
    }),
  }),
};

const update = {
  body: Joi.object({
    firstName: Joi.string().messages({
      'string.base': 'First name must be a string',
    }),
    lastName: Joi.string().messages({
      'string.base': 'Last name must be a string',
    }),
    email: Joi.string().email().messages({
      'string.base': 'Email must be a string',
    }),
  }),
};

export default { register, login, update };
