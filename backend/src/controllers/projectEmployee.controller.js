const projectEmployeeService = require("../services/projectEmployees.service");

// GET: ทั้งหมด
exports.getAllProjectEmployees = async (req, h) => {
  try {
    const data = await projectEmployeeService.getAllProjectEmployees();

    return h.response({
      message: "พบข้อมูลสมาชิกโปรเจกต์ทั้งหมด",
      count: data.length,
      data,
    }).code(200);

  } catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิกโปรเจกต์ทั้งหมด",
      error: error.message,
    }).code(500);
  }
};

// GET: ตาม pId
exports.getProjectEmployeeById = async (req, h) => {
  try {
    const data = await projectEmployeeService.getProjectEmployeeById(req.params.pId);

    if (!data || data.length === 0) {
      return h.response({ message: "ไม่พบสมาชิกในโปรเจกต์นี้" }).code(404);
    }

    return h.response({
      message: "พบข้อมูลสมาชิกโปรเจกต์",
      data,
    }).code(200);

  } catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิกโปรเจกต์",
      error: error.message,
    }).code(500);
  }
};

// GET: ตาม pId + uId
exports.getProjectEmployeeByPUId = async (req, h) => {
  try {
    const data = await projectEmployeeService.getByPidAndUid(
      req.params.pId,
      req.params.uId
    );

    if (!data) {
      return h.response({
        message: "ไม่พบข้อมูลสมาชิกโปรเจกต์ตาม pId + uId",
      }).code(404);
    }

    return h.response({
      message: "พบข้อมูลสมาชิกโปรเจกต์",
      data,
    }).code(200);

  } catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลสมาชิกโปรเจกต์",
      error: error.message,
    }).code(500);
  }
};

// A) โปรเจกต์ที่ปิดทั้งหมดของทุกคน
exports.getAllClosedProjects = async (req, h) => {
  try {
    const data = await projectEmployeeService.getAllClosedProjects();

    if (!data || data.length === 0) {
      return h.response({
        message: "ยังไม่มีโปรเจกต์ที่ปิด",
        count: 0,
        data: []
      }).code(404);
    }

    return h.response({
      message: "พบโปรเจกต์ที่ปิดทั้งหมดของทุกคน",
      count: data.length,
      data
    }).code(200);

  } catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการดึงโปรเจกต์ปิดทั้งหมด",
      error: error.message
    }).code(500);
  }
};

// B) โปรเจกต์ที่ปิดสำหรับผู้ใช้คนเดียว
exports.getAllClosedProjectsByUser = async (req, h) => {
  try {
    const uId = req.params.uId;
    const data = await projectEmployeeService.getClosedProjectsByUser(uId);

    if (!data || data.length === 0) {
      return h.response({
        message: "ผู้ใช้รายนี้ยังไม่มีโปรเจกต์ที่ปิด",
        count: 0,
        data: []
      }).code(404);
    }

    return h.response({
      message: "พบโปรเจกต์ที่ปิดของผู้ใช้",
      count: data.length,
      data
    }).code(200);

  } catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการดึงโปรเจกต์ปิดของผู้ใช้",
      error: error.message
    }).code(500);
  }
};


// POST: เพิ่มสมาชิกโปรเจกต์
exports.createProjectEmployee = async (req, h) => {
  try {
    const payload = req.payload;

    // หลายรายการ
    if (Array.isArray(payload)) {
      const result = await projectEmployeeService.createManyProjectEmployees(payload);
      
      if (!result || result.count === 0) {
        return h.response({
          message: "ไม่สามารถเพิ่มสมาชิกโปรเจกต์ได้",
        }).code(400);
      }

      return h.response({
        message: "เพิ่มสมาชิกโปรเจกต์หลายรายการสำเร็จ",
        data: result,
      }).code(201);
      
    }

    // รายการเดียว
    const result = await projectEmployeeService.createProjectEmployee(payload);

    if (!result) {
      return h.response({
        message: "ไม่สามารถเพิ่มสมาชิกแบบรายเดียวโปรเจกต์ได้",
      }).code(400);
    }

    return h.response({
      message: "เพิ่มสมาชิกโปรเจกต์สำเร็จแบบรายเดียว",
      data: result,
    }).code(201);
  }
  catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการเพิ่มสมาชิกโปรเจกต์",
      error: error.message,
    }).code(500);
  }
};

// PUT: อัปเดต (pId + uId)
exports.updateProjectEmployeeByPUId = async (req, h) => {
  try {
    const data = await projectEmployeeService.updateProjectEmployee(
      req.params.pId,
      req.params.uId,
      req.payload
    );

    return h.response({
      message: "อัปเดตข้อมูลสมาชิกโปรเจกต์สำเร็จ",
      data,
    }).code(200);

  } catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลสมาชิกโปรเจกต์",
      error: error.message,
    }).code(500);
  }
};

// DELETE: (pId + uId)
exports.deleteProjectEmployeeByPUId = async (req, h) => {
  try {
    await projectEmployeeService.deleteProjectEmployee(
      req.params.pId,
      req.params.uId
    );

    return h.response({
      message: "ลบสมาชิกโปรเจกต์สำเร็จ",
    }).code(200);

  } catch (error) {
    return h.response({
      message: "เกิดข้อผิดพลาดในการลบสมาชิกโปรเจกต์",
      error: error.message,
    }).code(500);
  }
};
