import { AppDataSource } from '../config/database.js';
import { Sitter } from '../entities/Sitter.js';
import { User } from '../entities/User.js';
import { removeSensitiveData } from '../utils/index.js';

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

export const getSitterOwnProfile = async (user: User) => {
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
  const result = removeSensitiveData(sitter.user);
  return { ...sitter, user: result };
};

export const getOneSitter = async (id: number) => {
  const sitter = await sitterRepo.findOne({
    where: { id },
    relations: ['user'],
  });
  if (!sitter) {
    throw new Error('Sitter profile not found');
  }
  const result = removeSensitiveData(sitter.user);
  return { ...sitter, user: result };
};

export const getAllSitters = async () => {
  const sitters = await sitterRepo.find({
    relations: ['user'],
  });
  const filteredSitters = sitters.map(({ user, ...sitter }) => ({
    ...sitter,
    user: removeSensitiveData(user),
  }));
  return filteredSitters;
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
