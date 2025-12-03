const prisma = require("../utils/prisma");

// ดึง projectEmployee ทั้งหมด
exports.getAllProjectEmployees = async () => {
  return await prisma.projectEmployee.findMany();
};

// ดึง projectEmployee ตามโปรเจกต์ (pId)
exports.getProjectEmployeeById = async (pId) => {
  return await prisma.projectEmployee.findMany({
    where: { pid: parseInt(pId) }
  });
};

// ดึง projectEmployee ตาม pId + uId (Composite Key)
exports.getByPidAndUid = async (pId, uId) => {
  return await prisma.projectEmployee.findUnique({
    where: {
      uid_pid: {
        uid: parseInt(uId),
        pid: parseInt(pId),
      },
    },
  });
};

// A) โปรเจกต์ที่ปิดทั้งหมดของทุก user
exports.getAllClosedProjects = async () => {
  return await prisma.projectEmployee.findMany({
    where: {
      project: { pStatus: "Closed" }
    },
    include: {
      user: true,
      project: true
    }
  });
};

// B) โปรเจกต์ที่ปิดของผู้ใช้เฉพาะคน
exports.getClosedProjectsByUser = async (uId) => {
  return await prisma.projectEmployee.findMany({
    where: {
      uid: parseInt(uId),
      project: { pStatus: "Closed" },
    },
    include: {
      project: true
    }
  });
};



// เพิ่มความสัมพันธ์ (ทีละรายการ)
exports.createProjectEmployee = async (data) => {
  return await prisma.projectEmployee.create({
    data: {
      uid: parseInt(data.uId),
      pid: parseInt(data.pId),
      date: data.dateJoin || null
    }
  });
};

// เพิ่มหลายรายการ
exports.createManyProjectEmployees = async (list) => {
  const formatted = list.map((item) => ({
    uid: parseInt(item.uId),
    pid: parseInt(item.pId),
    date: item.dateJoin || null
  }));

  return await prisma.projectEmployee.createMany({
    data: formatted,
    skipDuplicates: true
  });
};

// อัปเดตความสัมพันธ์ (update โดยใช้ composite key)
exports.updateProjectEmployee = async (pId, uId, data) => {
  return await prisma.projectEmployee.update({
    where: {
      uid_pid: {
        uid: parseInt(uId),
        pid: parseInt(pId)
      }
    },
    data: {
      date: data.dateJoin || null
    }
  });
};

// ลบความสัมพันธ์
exports.deleteProjectEmployee = async (pId, uId) => {
  return await prisma.projectEmployee.delete({
    where: {
      uid_pid: {
        uid: parseInt(uId),
        pid: parseInt(pId)
      }
    }
  });
};
