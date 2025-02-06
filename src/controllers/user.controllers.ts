import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  removeUser,
  getUsers,
  getUserById,
} from '../services/user.services.js';

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await registerUser(firstName, lastName, email, password);
    res.status(201).json({ user });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

const profile = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    const userData = await getUserProfile(user);
    res.status(200).json({ user: userData });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

const update = async (req: Request, res: Response) => {
  const { user } = req;
  const { firstName, lastName, email } = req.body;
  try {
    const updatedUser = await updateUser(user.id, {
      firstName,
      lastName,
      email,
    });
    res.status(200).json({ updatedUser });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

const remove = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    await removeUser(user?.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

const get = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  try {
    const users = await getUsers(req.query, page, limit);
    res.status(200).json({ users });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

const getById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    res.status(200).json({ user });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

export default { register, login, profile, update, remove, get, getById };
