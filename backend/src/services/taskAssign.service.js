const prisma = require("../utils/prisma");

// ดึงทั้งหมด
exports.getAllTaskAssigns = async () => {
  return await prisma.taskAssign.findMany();
};

// ดึงตาม TaskId
exports.getTaskAssignsByTaskId = async (taskId) => {
  return await prisma.taskAssign.findMany({
    where: { tid: parseInt(taskId) },
  });
};

// ดึงตาม UserId
exports.getTaskAssignsByUserId = async (userId) => {
  return await prisma.taskAssign.findMany({
    where: { uid: parseInt(userId) },
  });
};

// ดึงตาม TaskId + UserId (Composite Key)
exports.getTaskAssignByTaskIdUserId = async (taskId, userId) => {
  return await prisma.taskAssign.findUnique({
    where: {
      uid_tid: {
        uid: parseInt(userId),
        tid: parseInt(taskId),
      },
    },
  });
};

// เพิ่ม 1 รายการ
exports.createTaskAssign = async (data) => {
  return await prisma.taskAssign.create({
    data: {
      uid: parseInt(data.uId),
      tid: parseInt(data.tId),
      date_assign: data.date_assign || null,
    },
  });
};

// เพิ่มหลายรายการ
exports.createManyTaskAssigns = async (list) => {
  return prisma.taskAssign.createMany({
    data: list.map((item) => ({
      uid: parseInt(item.uId),
      tid: parseInt(item.tId),
      date_assign: item.date_assign || null,
    })),
    skipDuplicates: true,
  });
};

// อัปเดต
exports.updateTaskAssign = async (taskId, userId, data) => {
  return await prisma.taskAssign.update({
    where: {
      uid_tid: {
        uid: parseInt(userId),
        tid: parseInt(taskId),
      },
    },
    data: {
      date_assign: data.date_assign || null,
    },
  });
};

// ลบ
exports.deleteTaskAssign = async (taskId, userId) => {
  return await prisma.taskAssign.delete({
    where: {
      uid_tid: {
        uid: parseInt(userId),
        tid: parseInt(taskId),
      },
    },
  });
};
