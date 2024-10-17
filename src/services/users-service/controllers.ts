import { Request, Response } from 'express';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../database/ormconfig.js';
import { queryParser } from '../../utils/index.js';
// import { v4 as uuid4 } from 'uuid';

// TODO: Implement a global error-handling
// TODO: Separate in another file, db functions from the req/res handlers

const userRepo = AppDataSource.getRepository(User);

const get = async (req: Request, res: Response) => {
  const findOptions = queryParser(req.query, ['role']);
  try {
    const users = await userRepo.find(findOptions);
    if (!users.length) {
      return res
        .status(404)
        .json({ status: 'error', message: 'No users found' });
    }

    const usersWithoutPassword = users.map((user) => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.status(200).json({
      status: 'sucess',
      data: usersWithoutPassword,
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    let message = 'An error occurred while fetching users: ';
    if (findOptions !== null) {
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
  const userId = parseInt(req.params.id, 10); // ensure the string is interpreted as a decimal number
  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid user ID' });
  }
  try {
    const user = await userRepo.findOneBy({ user_id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: userWithoutPassword,
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
      return res
        .status(404)
        .json({ status: 'error', message: 'Email already registered' });
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

    const { password: _, ...userWithoutPassword } = newUser;

    await userRepo.save(newUser);
    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: userWithoutPassword,
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
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid user ID' });
  }

  // TODO: email and password validation(regex) and encryption(bcryptjs)
  // TODO: update password, email and role in specific handler

  const { first_name, last_name, phone, city } = req.body;
  try {
    const user = await userRepo.findOneBy({ user_id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    const updateUser = userRepo.merge(user, {
      first_name,
      last_name,
      phone,
      city,
    });

    const { password: _, ...userWithoutPassword } = updateUser;

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: userWithoutPassword,
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
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Invalid user ID' });
  }

  try {
    const userToRemove = await userRepo.delete(userId);
    if (userToRemove.affected === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
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
