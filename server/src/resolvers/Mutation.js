import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, throwNotAuthenticated } from '../util.js';

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
    throw new Error('Incorrect email or password.');
  }

  const valid = await compare(args.passwordHash, user.passwordHash);
  if (!valid) {
    throw new Error('Incorrect email or password.');
  }

  const token = sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function postListing(parent, args, context, info) {
  // For authenticated users only
  const { userId } = context;
  if (!userId) {
    throwNotAuthenticated();
  }

  // Initially populate Listing data to conditionally add video url later
  const listingData = {
    name: args.name,
    description: args.description,
    rate: args.rate,
    interval: args.interval,
    category: { connect: { id: args.categoryId } },
    teacher: { connect: { id: userId } },
  };

  if (args.videoUrl) {
    // Note: Video must already be uploaded to bucket at this point
    listingData.video = {
      create: {
        type: 'VIDEO',
        url: args.videoUrl,
      },
    };
  }

  return context.prisma.listing.create({
    data: listingData,
    // include: {
    // teacher: true,
    // students: true,
    // video: true,
    // category: true,
    // connReqs: true,
    // },
  });
}

export {
  signup,
  login,
  postListing,
};
