const prisma = require("../utils/prisma");

// ดึงโปรเจกต์ทั้งหมด
exports.getAllProjects = async () =>{
    return await prisma.project.findMany();
}

// ดึงโปรเจกต์ตาม ID
exports.getProjectById = async (id) =>{
    return await prisma.project.findUnique({
        where: { pid: parseInt(id) }
    });
}

// เพิ่มโปรเจกต์ (ทีละโปรเจกต์)
exports.createProject = async (projectData) =>{
    return await prisma.project.create({
        data: projectData
    });
}

// เพิ่มโปรเจกต์หลายรายการ
exports.createManyProjects = async (projectList) =>{
    return await prisma.project.createMany({
        data: projectList,
        skipDuplicates: true
    });
}

// อัปเดตโปรเจกต์
exports.updateProject = async (id, projectData) =>{
    return await prisma.project.update({
        where: { pid: parseInt(id) },
        data: projectData
    });
}

// ลบโปรเจกต์
exports.deleteProject = async (id) =>{
    return await prisma.project.delete({
        where: { pid: parseInt(id) }
    });
}
