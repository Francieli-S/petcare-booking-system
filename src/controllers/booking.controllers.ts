import { Request, Response } from 'express';
import {
  getAllBookings,
  getOneBooking,
  createNewBooking,
  updateOneBookingByUser,
  updateOneBookingStatusBySitter,
  deleteOneBooking,
} from '../services/booking.services.js';

const getBookings = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    const bookings = await getAllBookings(user.id);
    res.status(200).json({ bookings });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error',
    });
  }
};

const getBooking = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const booking = await getOneBooking(id, user.id);
    res.status(200).json({ booking });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
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
    res.status(201).json({ booking });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error',
    });
  }
};

const updateBookingByUser = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { service_type, number_of_days, status } = req.body;
  try {
    const booking = await updateOneBookingByUser(id, user.id, {
      service_type,
      number_of_days,
      status,
    });
    res.status(200).json({ booking });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error',
    });
  }
};

const updateBookingStatusBySitter = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { status } = req.body;
  try {
    const booking = await updateOneBookingStatusBySitter(id, user.id, status);
    res.status(200).json({ booking });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error',
    });
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  try {
    await deleteOneBooking(id, user.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error',
    });
  }
};

export default {
  getBookings,
  getBooking,
  createBooking,
  updateBookingByUser,
  updateBookingStatusBySitter,
  deleteBooking,
};
