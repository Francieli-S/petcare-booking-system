import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User.js';
import { AppDataSource } from '../config/database.js';
import { queryParser, transformUserToResponse } from '../utils/index.js';
import { configs } from '../config/env.js';

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const userExist = await userRepo.findOneBy({ email });
  if (userExist) {
    throw { status: 404, message: 'Email already registered' };
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = userRepo.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await userRepo.save(newUser);
  return transformUserToResponse(newUser)
};

export const loginUser = async (email: string, password: string) => {
  const userExists = await userRepo.findOneBy({ email });
  if (!userExists || !(await bcryptjs.compare(password, userExists.password))) {
    throw { status: 401, message: 'Login credentials are wrong' };
  }
  if (!configs.auth.JWT_SECRET) {
    throw new Error('Error in generating token');
  }
  return jwt.sign({ id: userExists.id }, configs.auth.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const getUserProfile = async (user: any) => {
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  return transformUserToResponse(user);
};

export const updateUser = async (
  userId: string,
  updates: { firstName?: string; lastName?: string; email?: string }
) => {
  if (!userId) {
    throw { status: 400, message: 'User ID is required' };
  }
  const existingUser = await userRepo.findOneBy({ id: userId });
  if (!existingUser) {
    throw { status: 404, message: 'User not found' };
  }
  const updatedUser = userRepo.merge(existingUser, updates);
  await userRepo.save(updatedUser);
  return transformUserToResponse(updatedUser);
};

export const removeUser = async (userId: string) => {
  if (!userId) {
    throw { status: 400, message: 'User ID is required' };
  }
  await userRepo.delete(userId);
};

export const getUsers = async (query: any, page: number, limit: number) => {
  const findOptions = queryParser(query, ['role']);
  const users = await userRepo.find({
    ...findOptions,
    skip: (page - 1) * limit,
    take: limit,
  });
  if (!users.length) {
    throw { status: 404, message: 'No users found' };
  }
  return users.map(transformUserToResponse);
};

export const getUserById = async (userId: string) => {
  if (!userId) {
    throw { status: 400, message: 'Invalid user ID' };
  }
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  return transformUserToResponse(user);
};
