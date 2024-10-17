export const queryParser = (query: any, allowedParameters: string[]) => {
  let findOptions = {};
  for (const key in query) {
    if (allowedParameters.includes(key)) {
      findOptions = { ...findOptions, where: { [key]: query[key] } };
    }
  }
  return findOptions;
};
