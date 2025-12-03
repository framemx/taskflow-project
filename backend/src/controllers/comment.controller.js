const commentService = require("../services/comment.service");

// GET: ทั้งหมด
exports.getAllComments = async (req, h) => {
  try {
    const comments = await commentService.getAllComments();
    return h.response({
      message: "พบข้อมูลคอมเมนต์ทั้งหมด",
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    return h
      .response({
        error: error.message,
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลคอมเมนต์ทั้งหมด",
      })
      .code(500);
  }
};

// GET: ตาม cmid
exports.getCommentById = async (req, h) => {
    try {
    const comment = await commentService.getCommentById(req.params.cmid);

    if (!comment) {
      return h
        .response({
          message: "ไม่พบคอมเมนต์ตามรหัสที่ระบุ หรือข้อมูลคอมเมนต์ถูกลบไปแล้ว",
        })
        .code(404);
    }

    return h.response({
      message: "พบข้อมูลคอมเมนต์",
      data: comment,
    });
  } catch (error) {
    return h
      .response({
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลคอมเมนต์",
        error: error.message,
      })
      .code(500);
  }
};

// GET: ตาม Task
exports.getCommentsByTaskId = async (req, h) => {
  try {
    const data = await commentService.getCommentsByTaskId(req.params.tid);

    return h.response({ message: "คอมเมนต์ของงานนี้", data });
  } catch (error) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: error.message })
      .code(500);
  }
};

// GET: ตาม User
exports.getCommentsByUserId = async (req, h) => {
  try {
    const data = await commentService.getCommentsByUserId(req.params.uid);

    return h.response({ message: "คอมเมนต์ของผู้ใช้นี้", data });
  } catch (error) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: error.message })
      .code(500);
  }
};

// POST
exports.createComment = async (req, h) => {
  try {
    const res = await commentService.createComment(req.payload);

    return h
      .response({
        message: "เพิ่มคอมเมนต์สำเร็จ",
        data: res,
      })
      .code(201);
  } catch (error) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: error.message })
      .code(500);
  }
};

// PUT
exports.updateComment = async (req, h) => {
  try {
    const res = await commentService.updateComment(
      req.params.cmid,
      req.payload
    );

    return h.response({
      message: "อัปเดตคอมเมนต์สำเร็จ",
      data: res,
    });
  } catch (error) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: error.message })
      .code(500);
  }
};

// DELETE (soft delete)
exports.deleteComment = async (req, h) => {
  try {
    await commentService.deleteComment(req.params.cmid);

    return h.response({ message: "ลบคอมเมนต์สำเร็จ (ซ่อนจากระบบ)" });
  } catch (error) {
    return h
      .response({ message: "เกิดข้อผิดพลาด", error: error.message })
      .code(500);
  }
};
