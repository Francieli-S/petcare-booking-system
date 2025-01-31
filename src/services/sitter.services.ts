import { AppDataSource } from '../config/database.js';
import { Sitter } from '../entities/Sitter.js';
import { User } from '../entities/User.js';

const sitterRepo = AppDataSource.getRepository(Sitter);

export const createSitterProfile = async (user: User, bio: string) => {
  const existingSitter = await sitterRepo.findOne({
    where: {
      user: {
        id: user.id,
      },
    },
    relations: ['user'],
  });
  if (existingSitter) {
    throw new Error('User is already a sitter');
  }
  const sitter = sitterRepo.create({ user: user, bio });
  await sitterRepo.save(sitter);
  return sitter;
};

export const getSitterProfile = async (userId: number) => {
  // this is not working properly
  // user 7 logged who is sitter 2 pass id 2 retrieves user 7 data, but sitter not found message
  // user 7 logged who is sitter 2 pass id 1 retrieves sitter 1 who is user 1 too

  // user 1 logged who is sitter 1 pass id 1 retrieves sitter 1 who is user 1 too
  // user 1 logged who is sitter 1 pass id 2 retrieves user 7 data, but sitter not found message

  const sitter = await sitterRepo.findOne({
    where: {
      user: {
        id: userId,
      },
    },
    relations: ['user'],
  });
  if (!sitter) {
    throw new Error('Sitter profile not found');
  }
  // TODO: remove password from the user
  return sitter;
};

export const getAllSitters = async () => {
  const sitters = await sitterRepo.find({
    relations: ['user'],
  });
  return sitters;
};

export const updateSitterProfile = async (
  user: User,
  updates: { bio: string }
) => {
  const sitter = await sitterRepo.findOne({
    where: {
      user: {
        id: user.id,
      },
    },
    relations: ['user'],
  });
  if (!sitter) {
    throw new Error('Sitter profile not found');
  }
  const updatedSitter = sitterRepo.merge(sitter, updates);
  await sitterRepo.save(updatedSitter);
  return sitter;
};
