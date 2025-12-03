const projectService = require("../services/project.service");

exports.getAllProjects = async (req, h) => {
  try {
    const projects = await projectService.getAllProjects();
    return h
      .response({
        message: "พบข้อมูลโปรเจกต์ทั้งหมด",
        count: projects.length,
        data: projects,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลโปรเจกต์ทั้งหมด",
      })
      .code(500);
  }
};

exports.getProjectById = async (req, h) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    if (!project) {
      return h
        .response({
          message: "ไม่พบข้อมูลโปรเจกต์ตามรหัสที่ระบุ",
        })
        .code(404);
    }

    return h
      .response({
        message: "พบข้อมูลโปรเจกต์",
        data: project,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลโปรเจกต์",
      })
      .code(500);
  }
};

exports.createProject = async (req, h) => {
  try {
    const payload = req.payload;

    if (!payload || Object.keys(payload).length === 0) {
      return h.response({ message: "กรุณาส่งข้อมูลโปรเจกต์" }).code(400);
    }

    if (Array.isArray(payload)) {
      const newProjects = await projectService.createManyProjects(payload);

      if (!newProjects || newProjects.count === 0) {
        return h
          .response({
            message: "ไม่สามารถเพิ่มโปรเจกต์ได้",
          })
          .code(400);
      }

      return h
        .response({
          message: "เพิ่มโปรเจกต์หลายรายการสำเร็จ",
          count: newProjects.count,
        })
        .code(201);
    }

    const newProject = await projectService.createProject(payload);

    return h
      .response({
        message: "สร้างโปรเจกต์สำเร็จ",
        data: newProject,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการสร้างโปรเจกต์",
      })
      .code(500);
  }
};

exports.updateProject = async (req, h) => {
  try {
    const updatedProject = await projectService.updateProject(
      req.params.id,
      req.payload
    );

    return h
      .response({
        message: "อัปเดตโปรเจกต์สำเร็จ",
        data: updatedProject,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการอัปเดตโปรเจกต์",
      })
      .code(500);
  }
};

exports.deleteProject = async (req, h) => {
  try {
    await projectService.deleteProject(req.params.id);

    return h
      .response({
        message: "Project deleted successfully ลบโปรเจกต์สำเร็จ",
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการลบโปรเจกต์",
      })
      .code(500);
  }
};
