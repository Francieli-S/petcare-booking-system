import { Booking } from '../entities/Booking.js';
import { Sitter } from '../entities/Sitter.js';
import { User } from '../entities/User.js';

export const queryParser = (query: any, allowedParameters: string[]) => {
  let findOptions = {};
  for (const key in query) {
    if (allowedParameters.includes(key)) {
      findOptions = { ...findOptions, where: { [key]: query[key] } };
    }
  }
  return findOptions;
};

export const parseUserId = (id: string): number | null => {
  const parsedId = parseInt(id, 10); // 10 here ensures the string is interpreted as a decimal number
  return isNaN(parsedId) ? null : parsedId;
};

export const transformBookingToResponse = (booking: Booking) => {
  if (!booking) return {}

  const { bio: _, rating: __, ...sitter }  = transformSitterToResponse(booking.sitter) as any
  const user = transformUserToResponse(booking.user)

  return {
    bookingId: booking.id,
    serviceType: booking.serviceType,
    numberOfDays: booking.numberOfDays,
    totalCost: booking.totalCost,
    status: booking.status,
    sitter,
    user
  }
};

export const transformSitterToResponse = (sitter: Sitter) => {
  if (!sitter) return {}

  const { userId: _, ...user } = transformUserToResponse(sitter.user);
  return {
    sitterId: sitter.id,
    bio: sitter.bio,
    rating: sitter.rating,
    ...user
  }
};

export const transformUserToResponse = (user: User) => {
  return user ? {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  } : {}
};