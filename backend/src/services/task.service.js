const prisma = require("../utils/prisma");

// ดึงงานทั้งหมด
exports.getAllTasks = async () => {
  return await prisma.task.findMany();
};

// ดึงงานตาม ID
exports.getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { tid: parseInt(id) },
  });
};

// ดึงงานทั้งหมดของโปรเจกต์
exports.getTasksByProjectId = async (projectId) => {
    return await prisma.task.findMany({
        where: { pid: parseInt(projectId) }
    });
};

// ดึงงานเฉพาะ tid ที่อยู่ในโปรเจกต์นั้น
exports.getTaskByProjectAndTaskId = async (projectId, taskId) => {
    return await prisma.task.findFirst({
        where: {
            pid: parseInt(projectId),
            tid: parseInt(taskId),
        }
    });
};

// เพิ่มงาน (ทีละงาน)
exports.createTask = async (taskData) => {
  return await prisma.task.create({
    data: taskData,
  });
};

// ⭐ เพิ่มงานหลายรายการพร้อมกัน (solution หลัก)
exports.createManyTasks = async (taskList) => {
  return await prisma.task.createMany({
    data: taskList,
    skipDuplicates: true, // กัน Error งานซ้ำ
  });
};

// อัปเดตงาน
exports.updateTask = async (id, taskData) => {
  return await prisma.task.update({
    where: { tid: parseInt(id) },
    data: taskData,
  });
}

// ลบงาน
exports.deleteTask = async (id) => {
  return await prisma.task.delete({
    where: { tid: parseInt(id) },
  });
}