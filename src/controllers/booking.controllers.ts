import { Request, Response } from 'express';
import {
  getAllBookings,
  getOneBooking,
  createNewBooking,
  updateOneBooking,
  deleteOneBooking,
} from '../services/booking.services.js';

const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings(req.user.id);
    res.status(200).json({ status: 'success', data: bookings });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({
        status: 'error',
        message: error.message || 'Internal server error',
      });
  }
};

const getBooking = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await getOneBooking(+id, req.user.id);
    res.status(200).json({ status: 'success', data: booking });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({
        status: 'error',
        message: error.message || 'Internal server error',
      });
  }
};

const createBooking = async (req: Request, res: Response) => {
  const { sitter_id, service_type, number_of_days } = req.body;
  const { user } = req;
  try {
    const booking = await createNewBooking(
      user.id,
      sitter_id,
      service_type,
      number_of_days
    );
    res
      .status(201)
      .json({
        status: 'success',
        message: 'Booking created successfully',
        data: booking,
      });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({
        status: 'error',
        message: error.message || 'Internal server error',
      });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { service_type, number_of_days, status } = req.body;
  try {
    const booking = await updateOneBooking(+id, user.id, {
      service_type,
      number_of_days,
      status,
    });
    res
      .status(200)
      .json({
        status: 'success',
        message: 'Booking updated successfully',
        data: booking,
      });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({
        status: 'error',
        message: error.message || 'Internal server error',
      });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  try {
    await deleteOneBooking(+id, user.id);
    res
      .status(200)
      .json({ status: 'success', message: 'Booking deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({
        status: 'error',
        message: error.message || 'Internal server error',
      });
  }
};

export default {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
