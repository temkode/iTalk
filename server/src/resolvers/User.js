function picture(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .picture();
}

function notifications(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .notifications();
}

function connRequestsSent(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .connRequestsSent();
}

function interests(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .interests();
}

function listingsEnrolled(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .joinedListings();
}

function listingsPosted(parent, args, context) {
  return context.prisma.user
    .findUnique({ where: { id: parent.id } })
    .postedListings();
}

export {
  picture,
  notifications,
  connRequestsSent,
  interests,
  listingsEnrolled,
  listingsPosted,
};
