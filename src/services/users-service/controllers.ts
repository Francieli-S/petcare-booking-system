import { Request, Response } from 'express';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../database/ormconfig.js';
import {
  queryParser,
  parseUserId,
  removeSensitiveData,
} from '../../utils/index.js';

// TODO: Implement a global error-handlin
// TODO: Separate bisiness logic (crud handling in another file)

const userRepo = AppDataSource.getRepository(User);

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
    const user = await userRepo.findOneBy({ user_id: userId });
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

const create = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, phone, role, city } =
    req.body;
  // TODO: password and email validation(regex) and encryption(bcryptjs)

  try {
    const user = await userRepo.findOneBy({ email });
    if (user) {
      res
        .status(404)
        .json({ status: 'error', message: 'Email already registered' });
      return;
    }
    const newUser = userRepo.create({
      first_name,
      last_name,
      email,
      password,
      phone,
      role,
      city,
    });

    await userRepo.save(newUser);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: removeSensitiveData(newUser),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while creating user',
      error,
    });
  }
};

const update = async (req: Request, res: Response) => {
  const userId = parseUserId(req.params.id);

  if (!userId) {
    res.status(400).json({ status: 'error', message: 'Invalid user ID' });
    return;
  }

  // TODO: email and password validation(regex) and encryption(bcryptjs)
  // TODO: update password, email and role in specific handler

  const { first_name, last_name, phone, city } = req.body;
  try {
    const user = await userRepo.findOneBy({ user_id: userId });
    if (!user) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    const updateUser = userRepo.merge(user, {
      first_name,
      last_name,
      phone,
      city,
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
  const userId = parseUserId(req.params.id);

  if (!userId) {
    res.status(400).json({ status: 'error', message: 'Invalid user ID' });
    return;
  }

  try {
    const userToRemove = await userRepo.delete(userId);
    if (userToRemove.affected === 0) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
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

export default { get, getById, create, update, remove };
