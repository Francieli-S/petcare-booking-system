import { app, connectToDB } from '../src/services/users-service';
import { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (req: VercelRequest, res: VercelResponse) => {
  await connectToDB();
  await app(req, res);
};

export default handler;
