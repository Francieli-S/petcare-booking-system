import { AppDataSource } from '../config/database.js';
import { Booking } from '../entities/Booking.js';
import { Sitter } from '../entities/Sitter.js';
import { User } from '../entities/User.js';
import { BookingStatus, ServiceType } from '../entities/types.js';

const bookingRepo = AppDataSource.getRepository(Booking);
const sitterRepo = AppDataSource.getRepository(Sitter);
const userRepo = AppDataSource.getRepository(User);

export const getAllBookings = async (userId: number) => {
  return await bookingRepo.find({
    where: { user: { id: userId } },
    relations: ['sitter', 'user'],
  });
};

export const getOneBooking = async (id: number, userId: number) => {
  const booking = await bookingRepo.findOne({
    where: { id, user: { id: userId } },
    relations: ['sitter', 'user'],
  });
  if (!booking) {
    throw { status: 404, message: 'Booking not found' };
  }
  return booking;
};

export const createNewBooking = async (
  userId: number,
  sitterId: number,
  service_type: ServiceType,
  number_of_days: number
) => {
  const sitter = await sitterRepo.findOneBy({ id: sitterId });
  if (!sitter) {
    throw { status: 404, message: 'Sitter not found' };
  }
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }

  const booking = bookingRepo.create({
    user,
    sitter,
    service_type,
    number_of_days,
    total_cost: parseFloat((number_of_days * 15).toFixed(2)),
    status: BookingStatus.PENDING,
  });
  return await bookingRepo.save(booking);
};

export const updateOneBooking = async (
  id: number,
  userId: number,
  updates: { service_type?: ServiceType; number_of_days?: number; status?: BookingStatus }
) => {
  const booking = await bookingRepo.findOne({
    where: { id, user: { id: userId } },
    relations: ['sitter', 'user'],
  });
  if (!booking) {
    throw { status: 404, message: 'Booking not found' };
  }

  if (updates.number_of_days) {
    booking.total_cost = parseFloat((updates.number_of_days * 15).toFixed(2))
  }

  const updatedBooking = bookingRepo.merge(booking, updates);
  return await bookingRepo.save(updatedBooking);
};

export const deleteOneBooking = async (id: number, userId: number) => {
  const booking = await bookingRepo.findOne({
    where: { id, user: { id: userId } },
  });
  if (!booking) {
    throw { status: 404, message: 'Booking not found' };
  }
  await bookingRepo.remove(booking);
};
