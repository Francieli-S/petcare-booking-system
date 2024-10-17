import { User } from '../entities/User.js';

export const queryParser = (query: any, allowedParameters: string[]) => {
  let findOptions = {};
  for (const key in query) {
    if (allowedParameters.includes(key)) {
      findOptions = { ...findOptions, where: { [key]: query[key] } };
    }
  }
  return findOptions;
};

export const parseUserId = (id: string): number | null => {
  const parsedId = parseInt(id, 10) // 10 here ensures the string is interpreted as a decimal number
  return isNaN(parsedId) ? null : parsedId
}

export const removeSensitiveData = (user: User) => {
  const {password: _, ...userWithoutPassword} = user
  return userWithoutPassword
}
