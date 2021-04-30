function teacher(parent, args, context) {
  return context.prisma.listing
    .findUnique({ where: { id: parent.id } })
    .teacher();
}

function students(parent, args, context) {
  return context.prisma.listing
    .findUnique({ where: { id: parent.id } })
    .students();
}

function connReqs(parent, args, context) {
  return context.prisma.listing
    .findUnique({ where: { id: parent.id } })
    .connReqs();
}

function video(parent, args, context) {
  return context.prisma.listing
    .findUnique({ where: { id: parent.id } })
    .video();
}

function category(parent, args, context) {
  return context.prisma.listing
    .findUnique({ where: { id: parent.id } })
    .category();
}

export {
  teacher,
  students,
  connReqs,
  video,
  category,
};
