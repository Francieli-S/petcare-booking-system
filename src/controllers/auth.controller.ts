import { Request, Response } from 'express';
import { User } from '../entities/User.js';
import { AppDataSource } from '../database/ormconfig.js';

const userRepo = AppDataSource.getRepository(User)

const signup = (req: Request, res: Response) => {
  const {email, pass}
  
};

const signin = (req: Request, res: Response) => {};

const verify = (req: Request, res: Response) => {};

export default { signup, signin, verify };
