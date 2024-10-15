import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.base': 'First name must be a string',
    'any.required': 'First name is required',
  }),
  last_name: Joi.string().required().messages({
    'string.base': 'Last name must be a string',
    'any.required': 'Last name is required',
  }),
  email: Joi.string().required().messages({
    'string.base': 'Email must be a string',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'any.required': 'Password is required',
  }),
  phone: Joi.number().messages({
    'number.base': 'Phone must be a number',
  }),
  role: Joi.string().required().messages({
    'string.base': 'Role must be a string',
    'any.required': 'Role is required',
  }),
  city: Joi.string().required().messages({
    'string.base': 'City must be a string',
    'any.required': 'City is required',
  }),
});

const validator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  next();
};

export default validator;
