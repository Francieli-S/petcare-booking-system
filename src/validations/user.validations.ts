import Joi from 'joi';

const register = {
  body: Joi.object({
    first_name: Joi.string().required().messages({
      'string.base': 'First name must be a string',
      'any.required': 'First name is required',
    }),
    last_name: Joi.string().required().messages({
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

export default { register, login };
