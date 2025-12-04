const prisma = require("../utils/prisma");

// GET All
exports.getAllUserComments = async () => {
  return prisma.userComment.findMany();
};

// GET by UserId
exports.getUserCommentsByUserId = async (uId) => {
  return prisma.userComment.findMany({
    where: { uid: parseInt(uId) }
  });
};

// GET by CommentId
exports.getUserCommentsByCommentId = async (cmId) => {
  return prisma.userComment.findMany({
    where: { cmid: parseInt(cmId) }
  });
};

// GET by UserId + CommentId (Composite Key)
exports.getUserCommentByUC = async (uId, cmId) => {
  return prisma.userComment.findUnique({
    where: {
      uid_cmid: {
        uid: parseInt(uId),
        cmid: parseInt(cmId)
      }
    }
  });
};

// POST
exports.createUserComment = (data) =>
  prisma.userComment.create({
    data: {
      uid: parseInt(data.uId),
      cmid: parseInt(data.cmId),
      action: data.action,
      detail: data.detail ?? null,
    }
  });

// PUT
exports.updateUserComment = async (uId, cmId, data) => {
  return prisma.userComment.update({
    where: {
      uid_cmid: {
        uid: parseInt(uId),
        cmid: parseInt(cmId)
      }
    },
    data: {
      action: data.action,
      detail: data.detail || null
    }
  });
};

// DELETE
exports.deleteUserComment = async (uId, cmId) => {
  return prisma.userComment.delete({
    where: {
      uid_cmid: {
        uid: parseInt(uId),
        cmid: parseInt(cmId)
      }
    }
  });
};
