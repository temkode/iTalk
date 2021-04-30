function from(parent, args, context) {
  return context.prisma.connectionrequest
    .findUnique({ where: { id: parent.id } })
    .user();
}

function listing(parent, args, context) {
  return context.prisma.connectionrequest
    .findUnique({ where: { id: parent.id } })
    .listing();
}

export {
  from,
  listing,
};
