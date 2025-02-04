import Joi from 'joi';
import { ServiceType, BookingStatus } from '../entities/types.js';

const createBooking = {
  body: Joi.object({
    sitter_id: Joi.string().required().messages({
      'string.base': 'Sitter ID must be a string',
      'any.required': 'Sitter ID is required',
    }),
    service_type: Joi.string()
      .valid(...Object.values(ServiceType))
      .required()
      .messages({
        'string.base': 'Service type must be a string',
        'any.only': `Service type must be one of: ${Object.values(
          ServiceType
        ).join(', ')}`,
        'any.required': 'Service type is required',
      }),
    number_of_days: Joi.number().integer().positive().required().messages({
      'number.base': 'Number of days must be a number',
      'number.integer': 'Number of days must be an integer',
      'number.positive': 'Number of days must be a positive number',
      'any.required': 'Number of days is required',
    }),
  }),
};

const updateBookingByUser = {
  params: Joi.object({
    id: Joi.string().required().messages({
      'string.base': 'Booking ID must be a string',
      'any.required': 'Booking ID is required',
    }),
  }),
  body: Joi.object({
    service_type: Joi.string()
      .valid(...Object.values(ServiceType))
      .messages({
        'string.base': 'Service type must be a string',
        'any.only': `Service type must be one of: ${Object.values(
          ServiceType
        ).join(', ')}`,
      }),
    number_of_days: Joi.number().integer().positive().messages({
      'number.base': 'Number of days must be a number',
      'number.integer': 'Number of days must be an integer',
      'number.positive': 'Number of days must be a positive number',
    }),
    status: Joi.string()
      .valid(BookingStatus.CANCELED)
      .messages({
        'string.base': 'Status must be a string',
        'any.only': `Status must be one of: ${Object.values(BookingStatus).join(
          ', '
        )}`,
      }),
  }),
};

const updateBookingBySitter = {
  params: Joi.object({
    id: Joi.string().required().messages({
      'string.base': 'Booking ID must be a string',
      'any.required': 'Booking ID is required',
    }),
  }),
  body: Joi.object({
    status: Joi.string()
      .valid(
        BookingStatus.ACCEPTED,
        BookingStatus.COMPLETED,
        BookingStatus.CANCELED
      )
      .required()
      .messages({
        'string.base': 'Status must be a string',
        'any.only': `Status must be one of: ${Object.values(BookingStatus).join(
          ', '
        )}`,
      }),
  }),
};

const deleteBooking = {
  params: Joi.object({
    id: Joi.string().required().messages({
      'string.base': 'Booking ID must be a string',
      'any.required': 'Booking ID is required',
    }),
  }),
};

export default {
  createBooking,
  updateBookingByUser,
  updateBookingBySitter,
  deleteBooking,
};
