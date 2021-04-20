import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../util.js';

const { hash, compare } = bcryptjs;
const { sign } = jwt;

async function signup(parent, args, context, info) {
  const passwordHash = await hash(args.passwordHash, 10);

  const user = await context.prisma.user.create({ data: { ...args, passwordHash } });

  const token = sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await compare(args.passwordHash, user.passwordHash);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

export {
  signup,
  login,
};
