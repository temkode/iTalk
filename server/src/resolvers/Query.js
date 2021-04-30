function info() {
  return 'This is the iTalk.mn API.';
}

async function listingFeed(parent, args, context) {
  const where = {};

  if (args.filter) {
    where.OR = [
      { description: { contains: args.filter } },
      { name: { contains: args.filter } },
    ];
  }
  if (args.categoryId) {
    where.AND = { categoryId: args.categoryId };
  }

  // Prisma bug in ordering of 0 counts, to be fixed soon
  // https://github.com/prisma/prisma/issues/6824
  let orderByArgs = args.orderBy;
  if (args.orderBy && args.orderBy.students) {
    orderByArgs = { students: { count: args.orderBy.students } };
  }

  const count = context.prisma.listing.count({ where });
  const listings = context.prisma.listing.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: orderByArgs,
  });

  return {
    listings,
    count,
  };
}

export {
  info,
  listingFeed,
};
