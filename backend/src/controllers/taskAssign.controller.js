const taskAssignService = require("../services/taskAssign.service");

// GET All
exports.getAllTaskAssigns = async (req, h) => {
  try {
    const data = await taskAssignService.getAllTaskAssigns();
    if (data.length === 0)
      return h.response({ message: "ไม่พบข้อมูล" }).code(404);

    return h.response({
      message: "พบข้อมูลการมอบหมายงานทั้งหมด",
      count: data.length,
      data,
    });
  } catch (err) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: err.message })
      .code(500);
  }
};

// GET by TaskId
exports.getTaskAssignsByTaskId = async (req, h) => {
  try {
    const data = await taskAssignService.getTaskAssignsByTaskId(req.params.tId);
    if (data.length === 0)
      return h.response({ message: "ไม่พบข้อมูล" }).code(404);

    return h.response({ message: "พบข้อมูล", data });
  } catch (err) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: err.message })
      .code(500);
  }
};

// GET by UserId
exports.getTaskAssignsByUserId = async (req, h) => {
  try {
    const data = await taskAssignService.getTaskAssignsByUserId(req.params.uId);
    if (data.length === 0)
      return h.response({ message: "ผู้ใช้นี้ยังไม่ได้รับงาน" }).code(404);

    return h.response({ message: "พบข้อมูล", data });
  } catch (err) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: err.message })
      .code(500);
  }
};

// GET by TaskId + UserId
exports.getTaskAssignByTaskIdUserId = async (req, h) => {
  try {
    const data = await taskAssignService.getTaskAssignByTaskIdUserId(
      req.params.tId,
      req.params.uId
    );

    if (!data)
      return h.response({ message: "ไม่พบข้อมูลคู่ task-user นี้" }).code(404);

    return h.response({ message: "พบข้อมูล", data });
  } catch (err) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: err.message })
      .code(500);
  }
};

// POST
exports.createTaskAssign = async (req, h) => {
  try {
    const payload = req.payload;

    if (Array.isArray(payload)) {
      const res = await taskAssignService.createManyTaskAssigns(payload);
      return h.response({ message: "เพิ่มหลายรายการสำเร็จ", data: res });
    }

    const res = await taskAssignService.createTaskAssign(payload);
    return h.response({ message: "เพิ่มสำเร็จ", data: res }).code(201);
  } catch (err) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: err.message })
      .code(500);
  }
};

// PUT
exports.updateTaskAssign = async (req, h) => {
  try {
    const data = await taskAssignService.updateTaskAssign(
      req.params.tId,
      req.params.uId,
      req.payload
    );
    return h.response({ message: "อัปเดตสำเร็จ", data });
  } catch (err) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: err.message })
      .code(500);
  }
};

// DELETE
exports.deleteTaskAssign = async (req, h) => {
  try {
    await taskAssignService.deleteTaskAssign(req.params.tId, req.params.uId);
    return h.response({ message: "ลบสำเร็จ" });
  } catch (err) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: err.message })
      .code(500);
  }
};
