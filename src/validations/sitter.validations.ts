import Joi from 'joi';

const createSitter = {
  body: Joi.object({
    bio: Joi.string().min(10).max(500).required().messages({
      'string.base': 'Bio must be a string',
      'string.min': 'Bio must be at least 10 characters long',
      'string.max': 'Bio cannot exceed 500 characters',
      'any.required': 'Bio is required',
    }),
  }),
};

const updateSitter = {
  body: Joi.object({
    bio: Joi.string().min(10).max(500).required().messages({
      'string.base': 'Bio must be a string',
      'string.min': 'Bio must be at least 10 characters long',
      'string.max': 'Bio cannot exceed 500 characters',
      'any.required': 'Bio is required',
    }),
  }),
};

export default { createSitter, updateSitter };
