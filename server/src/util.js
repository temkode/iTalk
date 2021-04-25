import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const { APP_SECRET } = process.env;
const { verify } = jwt;
dotenv.config();

function throwNotAuthenticated() {
  throw new Error('Not authenticated');
}

function getUserId(req) {
  const token = req.headers.authorization.replace('Bearer ', '');
  if (!token) {
    throw new Error('No token found');
  }
  const { userId } = verify(token, APP_SECRET);

  return userId;
}

export {
  APP_SECRET,
  getUserId,
  throwNotAuthenticated,
};
