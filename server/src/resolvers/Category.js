function listings(parent, args, context) {
  return context.prisma.category
    .findUnique({ where: { id: parent.id } })
    .listings();
}

function usersInterested(parent, args, context) {
  return context.prisma.category
    .findUnique({ where: { id: parent.id } })
    .users();
}

export {
  listings,
  usersInterested,
};
