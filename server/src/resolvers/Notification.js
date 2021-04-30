function recipient(parent, args, context) {
  return context.prisma.notification
    .findUnique({ where: { id: parent.id } })
    .recipient();
}

function sender(parent, args, context) {
  return context.prisma.notification
    .findUnique({ where: { id: parent.id } })
    .sender();
}

export {
  recipient,
  sender,
};
