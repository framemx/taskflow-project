const prisma = require("../utils/prisma");

// ดึงผู้ใช้ทั้งหมด
exports.getAllUsers = async () => {
    return await prisma.user.findMany();
};

// ดึงผู้ใช้ตาม ID
exports.getUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { uid: parseInt(id) }
    });
};

// เพิ่มผู้ใช้ (ทีละคน)
exports.createUser = async (userData) => {
    return await prisma.user.create({
        data: userData
    });
};

// ⭐ เพิ่มผู้ใช้หลายคนพร้อมกัน (solution หลัก)
exports.createManyUsers = async (userList) => {
    return await prisma.user.createMany({
        data: userList,
        skipDuplicates: true // กัน Error email ซ้ำ
    });
};

// อัปเดตผู้ใช้
exports.updateUser = async (id, userData) => {
    return await prisma.user.update({
        where: { uid: parseInt(id) },
        data: userData
    });
};

// ลบผู้ใช้
exports.deleteUser = async (id) => {
    return await prisma.user.delete({
        where: { uid: parseInt(id) }
    });
};
