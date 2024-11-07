import { Request, Response } from 'express';
import { User } from '../entities/User.js';
import { AppDataSource } from '../database/ormconfig.js';

const signup = (req: Request, res: Response) => {};

const signin = (req: Request, res: Response) => {};

const verify = (req: Request, res: Response) => {};

export default { signup, signin, verify };
