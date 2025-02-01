import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User.js';
import { AppDataSource } from '../config/database.js';
import { queryParser, removeSensitiveData } from '../utils/index.js';
import { configs } from '../config/env.js';

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
) => {
  const userExist = await userRepo.findOneBy({ email });
  if (userExist) {
    throw { status: 404, message: 'Email already registered' };
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = userRepo.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });
  await userRepo.save(newUser);
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
  return removeSensitiveData(user);
};

export const updateUser = async (
  userId: number | undefined,
  updates: { first_name?: string; last_name?: string; email?: string }
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
  return removeSensitiveData(updatedUser);
};

export const removeUser = async (userId: number | undefined) => {
  if (!userId) {
    throw { status: 400, message: 'User ID is required' };
  }
  const result = await userRepo.delete(userId);
  if (result.affected === 0) {
    throw { status: 404, message: 'User not found' };
  }
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
  return users.map(removeSensitiveData);
};

export const getUserById = async (userId: number | undefined) => {
  if (!userId) {
    throw { status: 400, message: 'Invalid user ID' };
  }
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) {
    throw { status: 404, message: 'User not found' };
  }
  return removeSensitiveData(user);
};
