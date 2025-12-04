const prisma = require("../utils/prisma");

// ดึงเฉพาะคอลัมน์ที่ active
exports.getAllColumns = async () => {
  return await prisma.column.findMany({
    where: { isActive: true },
    orderBy: { cIndex: "asc" }
  });
};

// ดึงคอลัมน์ที่ถูกลบ (isActive = false)
exports.getDeletedColumns = async () => {
  return await prisma.column.findMany({
    where: { isActive: false },
    orderBy: { cIndex: "asc" }
  });
};

// ดึง column ตาม ID (ดูได้ทั้ง active และ inactive)
exports.getColumnById = async (cid) => {
  return await prisma.column.findUnique({
    where: { cid: parseInt(cid) }
  });
};

// สร้างคอลัมน์ใหม่
exports.createColumn = async (data) => {
  return await prisma.column.create({ data });
};

// อัปเดต
exports.updateColumn = async (cid, data) => {
  return await prisma.column.update({
    where: { cid: parseInt(cid) },
    data
  });
};

// Soft Delete → เปลี่ยน isActive = false
exports.softDeleteColumn = async (cid) => {
  return await prisma.column.update({
    where: { cid: parseInt(cid) },
    data: { isActive: false }
  });
};

// Restore → เปลี่ยน isActive = true
exports.restoreColumn = async (cid) => {
  return await prisma.column.update({
    where: { cid: parseInt(cid) },
    data: { isActive: true }
  });
};

// ลบจริง (ใช้ในกรณีพิเศษ)
exports.forceDeleteColumn = async (cid) => {
  return await prisma.column.delete({
    where: { cid: parseInt(cid) }
  });
};
