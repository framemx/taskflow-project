const prisma = require("../utils/prisma");

// ดึงทั้งหมด
exports.getAllComments = async () => {
  return await prisma.comment.findMany({
    where: { isActive: true },
    include: {
      user: { select: { uid: true, fname: true, lname: true, email: true }},
      task: { select: { tid: true, tTitle: true, tStatus: true }}
    }
  });
};

// ดึงตามคอมเมนต์ id
exports.getCommentById = async (cmid) => {
  return await prisma.comment.findUnique({
    where: { cmid: parseInt(cmid) },
    include: {
      user: true,
      task: true
    }
  });
};

// ดึงตามงาน (tid)
exports.getCommentsByTaskId = async (tid) => {
  return await prisma.comment.findMany({
    where: { tid: parseInt(tid), isActive: true },
    include: { user: true }
  });
};

// ดึงตามผู้ใช้ (uid)
exports.getCommentsByUserId = async (uid) => {
  return await prisma.comment.findMany({
    where: { uid: parseInt(uid), isActive: true },
    include: { task: true }
  });
};

// เพิ่มคอมเมนต์
exports.createComment = async (data) => {
  return await prisma.comment.create({
    data: {
      cmDetail: data.cmDetail,
      cmCreate: new Date(),
      uid: parseInt(data.uId),
      tid: parseInt(data.tId)
    }
  });
};

// อัปเดตคอมเมนต์
exports.updateComment = async (cmid, data) => {
  return await prisma.comment.update({
    where: { cmid: parseInt(cmid) },
    data: {
      cmDetail: data.cmDetail,
      cmUpdate: new Date()
    }
  });
};

// ลบแบบ Soft delete
exports.deleteComment = async (cmid) => {
  return await prisma.comment.update({
    where: { cmid: parseInt(cmid) },
    data: {
      isActive: false
    }
  });
};
