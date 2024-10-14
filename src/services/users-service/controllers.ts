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

export default { get, create };
