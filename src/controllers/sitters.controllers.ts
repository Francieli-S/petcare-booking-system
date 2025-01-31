import { Request, Response } from 'express';
import {
  createSitterProfile,
  getSitterProfile,
  getAllSitters,
  updateSitterProfile,
} from '../services/sitter.services.js';

const createSitter = async (req: Request, res: Response) => {
  const { bio } = req.body;
  const { user } = req;
  try {
    const sitter = await createSitterProfile(user, bio);
    res
      .status(201)
      .json({ status: 'success', message: 'Sitter profile created', sitter });
  } catch (err) {
    const error = err as Error;
    res
      .status(400)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

const getSitter = async (req: Request, res: Response) => {
  // TODO: this is destructuring req.user but passing params!!
  // correct it and make a separeted route to get sitter profile by id(user request)
  // and another to get sitter profile by token(sitter request)
  const { user } = req;
  try {
    const sitter = await getSitterProfile(req.params.id as unknown as number);
    res.status(200).json({ status: 'success', data: sitter });
  } catch (err) {
    const error = err as Error;
    res
      .status(404)
      .json({
        status: 'error',
        message: error.message || 'An error occurred',
        user,
      });
  }
};

const getSitters = async (req: Request, res: Response) => {
  try {
    const sitters = await getAllSitters();
    res.status(200).json({ status: 'success', data: sitters });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error',
    });
  }
};

const updateSitter = async (req: Request, res: Response) => {
  const { user } = req;
  const updates = req.body;
  try {
    const sitter = await updateSitterProfile(user, updates);
    res.status(200).json({
      status: 'success',
      message: 'Sitter profile updated',
      data: sitter,
    });
  } catch (err) {
    const error = err as Error;
    res
      .status(400)
      .json({ status: 'error', message: error.message || 'An error occurred' });
  }
};

export default { createSitter, getSitter, getSitters, updateSitter };
