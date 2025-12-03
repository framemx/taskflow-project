const prisma = require("../utils/prisma");

// GET All
exports.getAllUserComments = async () => {
  return prisma.userComment.findMany();
};

// GET by UserId
exports.getUserCommentsByUserId = async (uId) => {
  return prisma.userComment.findMany({
    where: { uId: parseInt(uId) }
  });
};

// GET by CommentId
exports.getUserCommentsByCommentId = async (cmId) => {
  return prisma.userComment.findMany({
    where: { cmId: parseInt(cmId) }
  });
};

// GET by UserId + CommentId (Composite Key)
exports.getUserCommentByUC = async (uId, cmId) => {
  return prisma.userComment.findUnique({
    where: {
      uId_cmId: {
        uId: parseInt(uId),
        cmId: parseInt(cmId),
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
      uId_cmId: {
        uId: parseInt(uId),
        cmId: parseInt(cmId)
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
      uId_cmId: {
        uId: parseInt(uId),
        cmId: parseInt(cmId)
      }
    }
  });
};
