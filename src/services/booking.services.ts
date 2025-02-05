import { AppDataSource } from '../config/database.js';
import { Booking } from '../entities/Booking.js';
import { Sitter } from '../entities/Sitter.js';
import { User } from '../entities/User.js';
import { BookingStatus, ServiceType } from '../entities/types.js';
import { transformBookingToResponse } from '../utils/index.js';

const bookingRepo = AppDataSource.getRepository(Booking);
const sitterRepo = AppDataSource.getRepository(Sitter);
const userRepo = AppDataSource.getRepository(User);

export const getAllBookings = async (userId: string) => {
  // while sitter do not create booking as an user
  // check if user is a sitter
  const sitter = await sitterRepo.findOne({ where: { user: { id: userId } } });
  if (sitter) {
    // retrive only bookings for their sitter id
    const bookings = await bookingRepo.find({
      where: { sitter: { id: sitter.id } },
      relations: ['sitter', 'sitter.user', 'user'],
    });
    return bookings.map(transformBookingToResponse);
  }
  // if user is not a sitter, retrive only bookings created for the user id
  const bookings = await bookingRepo.find({
    where: { user: { id: userId } },
    relations: ['sitter', 'sitter.user', 'user'],
  })
  return bookings.map(transformBookingToResponse);
};

export const getOneBooking = async (id: string, userId: string) => {
  // while sitter do not create booking as an user
  // check if user is a sitter
  const sitter = await sitterRepo.findOne({ where: { user: { id: userId } } });
  let booking;
  if (sitter) {
    // retrive only the booking for their sitter id
    booking = await bookingRepo.findOne({
      where: { id, sitter: { id: sitter.id } },
      relations: ['sitter', 'sitter.user', 'user'],
    });
  } else {
    // if user is not a sitter, retrive only the booking created for the user id
    booking = await bookingRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['sitter', 'sitter.user', 'user'],
    });
  }
  if (!booking) {
    throw { status: 404, message: 'Booking not found' };
  }
  return transformBookingToResponse(booking);
};

export const createNewBooking = async (
  userId: string,
  sitterId: string,
  serviceType: ServiceType,
  numberOfDays: number
) => {
  const sitter = await sitterRepo.findOne({ 
    where: {
      id: sitterId,
    },
    relations: ['user'],
 });
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
    serviceType,
    numberOfDays,
    totalCost: numberOfDays * 15.99,
    status: BookingStatus.PENDING,
  });
  return transformBookingToResponse(await bookingRepo.save(booking));
};

export const updateOneBookingByUser = async (
  id: string,
  userId: string,
  updates: {
    serviceType?: ServiceType;
    numberOfDays?: number;
    status?: BookingStatus;
  }
) => {
  const booking = await bookingRepo.findOne({
    where: { id, user: { id: userId } },
    relations: ['sitter', 'sitter.user', 'user'],
  });
  if (!booking) {
    throw { status: 404, message: 'Booking not found' };
  }
  if (updates.numberOfDays) {
    booking.totalCost = parseFloat((updates.numberOfDays * 15).toFixed(2));
  }
  const updatedBooking = bookingRepo.merge(booking, updates);
  return transformBookingToResponse(await bookingRepo.save(updatedBooking));
};

export const updateOneBookingStatusBySitter = async (
  id: string,
  userId: string,
  status: BookingStatus
) => {
  const sitter = await sitterRepo.findOne({ where: { user: { id: userId } } });
  if (!sitter) {
    throw { status: 403, message: 'Sitter not found' };
  }
  const booking = await bookingRepo.findOne({
    where: { id, sitter: { id: sitter.id } },
    relations: ['sitter', 'sitter.user', 'user'],
  });
  if (!booking) {
    throw { status: 404, message: 'Booking not found' };
  }
  booking.status = status;
  return transformBookingToResponse(await bookingRepo.save(booking));
};

export const deleteOneBooking = async (id: string, userId: string) => {
  const booking = await bookingRepo.findOne({
    where: { id, user: { id: userId } },
  });
  if (!booking) {
    throw { status: 404, message: 'Booking not found' };
  }
  await bookingRepo.remove(booking);
};