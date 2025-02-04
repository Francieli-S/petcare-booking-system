import { AppDataSource } from '../config/database.js';
import { Sitter } from '../entities/Sitter.js';
import { User } from '../entities/User.js';
import { transformSitterToResponse } from '../utils/index.js';

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
  return transformSitterToResponse(sitter);
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
  return transformSitterToResponse(sitter);
};

export const getOneSitter = async (id: string) => {
  const sitter = await sitterRepo.findOne({
    where: { id },
    relations: ['user'],
  });
  if (!sitter) {
    throw new Error('Sitter profile not found');
  }
  return transformSitterToResponse(sitter);
};

export const getAllSitters = async () => {
  const sitters = await sitterRepo.find({
    relations: ['user'],
  });
  return sitters.map(transformSitterToResponse);
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
  return transformSitterToResponse(sitter);
};