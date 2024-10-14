import { Request, Response } from 'express';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../database/ormconfig.js';
// import { v4 as uuid4 } from 'uuid';

const userRepo = AppDataSource.getRepository(User);

const get = async (req: Request, res: Response) => {
  try {
    const users = await userRepo.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await userRepo.findOneBy({ user_id: userId });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, phone, role, city } =
    req.body;
  // const uuid = uuid4();
  try {
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
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { first_name, last_name, email, password, phone, role, city } =
    req.body;
  try {
    const user = await userRepo.findOneBy({ user_id: userId });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const updateUser = userRepo.merge(user, {
      first_name,
      last_name,
      email,
      password,
      phone,
      role,
      city,
    });
    res.status(200).send(updateUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const userToRemove = await userRepo.delete(userId);
    if (userToRemove.affected === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { get, getById, create, update, remove };
