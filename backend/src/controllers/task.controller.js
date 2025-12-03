const taskService = require("../services/task.service");

exports.getAllTasks = async (req, h) => {
  try {
    const tasks = await taskService.getAllTasks();
    return h
      .response({
        message: "พบข้อมูลงานทั้งหมด",
        count: tasks.length,
        data: tasks,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลงาน",
        error: error.message,
      })
      .code(500);
  }
};

exports.getTaskById = async (req, h) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      return h
        .response({
          message: "ไม่พบงานตามรหัสที่ระบุ หรือข้อมูลงานถูกลบไปแล้ว",
        })
        .code(404);
    }

    return h
      .response({
        message: "พบข้อมูลงาน",
        data: task,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลงาน",
        error: error.message,
      })
      .code(500);
  }
};

exports.createTask = async (req, h) => {
  try {
    const payload = req.payload;

    if (!payload || Object.keys(payload).length === 0) {
      return h.response({ message: "กรุณาส่งข้อมูลงาน" }).code(400);
    }

    if (Array.isArray(payload)) {
      const newTasks = await taskService.createManyTasks(payload);

      if (!newTasks || newTasks.count === 0) {
        return h
          .response({
            message: "ไม่สามารถเพิ่มงานได้",
          })
          .code(400);
      }

      else {
        return h
        .response({
          message: "เพิ่มงานหลายรายการสำเร็จ",
          data: newTasks,
        })
        .code(201);
      }
    }

    const newTask = await taskService.createTask(payload);

    return h
      .response({
        message: "สร้างงานใหม่สำเร็จ",
        data: newTask,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการสร้างงาน",
      })
      .code(500);
  }
};

exports.updateTask = async (req, h) => {
  try {
    const updatedTask = await taskService.updateTask(
      req.params.id,
      req.payload
    );

    return h
      .response({
        message: "อัปเดตงานสำเร็จ",
        data: updatedTask,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: error.message + "เกิดข้อผิดพลาดในการอัปเดตงาน ลองหาสาเหตุใหม่",
      })
      .code(500);
  }
};

exports.deleteTask = async (req, h) => {
  try {
    await taskService.deleteTask(req.params.id);

    return h
      .response({
        message: "Task deleted successfully ลบงานสำเร็จ",
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการลบงาน",
      })
      .code(500);
  }
};
