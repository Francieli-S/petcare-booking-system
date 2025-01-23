import { Request, Response } from 'express';
import { User } from '../entities/User.js';
import { AppDataSource } from '../config/database.js';
import {
  queryParser,
  parseUserId,
  removeSensitiveData,
} from '../utils/index.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { configs } from '../config/env.js';

// TODO: Implement a global error-handling
// TODO: Separate business logic (crud handling in another file)

const userRepo = AppDataSource.getRepository(User);

const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password } = req.body;
  // TODO: password and email validation(regex)
  try {
    const userExist = await userRepo.findOneBy({ email });
    if (userExist) {
      res
        .status(404)
        .json({ status: 'error', message: 'Email already registered' });
      return;
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = userRepo.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await userRepo.save(newUser);
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: removeSensitiveData(newUser),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while registering user',
      error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userExists = await userRepo.findOneBy({ email });
    if (
      !userExists ||
      !(await bcryptjs.compare(password, userExists.password))
    ) {
      res.status(401).send({ message: 'Login credentials are wrong' });
      return;
    }
    if (!configs.auth.JWT_SECRET) {
      throw new Error('Error in generating token');
    }
    const token = jwt.sign({ id: userExists.id }, configs.auth.JWT_SECRET, {
      expiresIn: '1h',
    });
    //TODO: Refresh Token
    res.status(200).json({
      status: 'success',
      message: 'User logged successfull',
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occured while logging user',
      error,
    });
  }
};

const profile = async (req: Request, res: Response) => {
  const { user } = req;
  res.status(200).send({ user });
};

const update = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  // TODO: email and password validation(regex) and encryption(bcryptjs)
  // TODO: update password, email and role in specific handler

  const { first_name, last_name, email, password } = req.body;
  try {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    const updateUser = userRepo.merge(user, {
      first_name,
      last_name,
      email,
      password,
    });

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: removeSensitiveData(updateUser),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating user',
      error,
    });
  }
};

const remove = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    if (userId) {
      const user = await userRepo.delete(userId);
      if (user.affected === 0) {
        res.status(404).json({ status: 'error', message: 'User not found' });
        return;
      }
    }
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while removing user',
      error,
    });
  }
};

const get = async (req: Request, res: Response) => {
  const findOptions = queryParser(req.query, ['role']);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  try {
    const users = await userRepo.find({
      ...findOptions,
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!users.length) {
      res.status(404).json({ status: 'error', message: 'No users found' });
      return;
    }

    const usersWithoutPassword = users.map(removeSensitiveData);

    res.status(200).json({
      status: 'sucess',
      data: usersWithoutPassword,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    let message = 'An error occurred while fetching users: ';
    if (Object.keys(findOptions).length !== 0) {
      message = 'An error occurred while filtering user: ';
    }
    res.status(500).json({
      status: 'error',
      message: message,
      error,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  const userId = parseUserId(req.params.id); // if I pass 9xx8 f.e. it return user id 9
  if (!userId) {
    res.status(400).json({ status: 'error', message: 'Invalid user ID' });
    return;
  }
  try {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: removeSensitiveData(user),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching user',
      error,
    });
  }
};

export default { register, login, profile, update, remove, get, getById };
