const userCommentService = require("../services/userComment.service");

// GET ALL user-comments
exports.getAllUserComments = async (req, h) => {
  try {
    const data = await userCommentService.getAllUserComments();
    return h.response({
      message: "พบข้อมูล user-comment ทั้งหมด",
      count: data.length,
      data,
    });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// GET user-comments by User ID
exports.getByUserId = async (req, h) => {
  try {
    const data = await userCommentService.getUserCommentsByUserId(
      req.params.uId);
    if (data.length === 0)
      return h.response({
        message:"ไม่พบข้อมูลที่ผู้ใช้นี้คอมเมนต์ หรือผู้ใช้นี้ยังไม่ได้คอมเมนต์"
      }).code(404);
    else{
      return h.response({
        message: "พบข้อมูลผู้ใช้คนนี้ที่คอมเมนต์",
        data
      });
    }
  } catch (err) {
    return h
      .response({
        message: "เกิดข้อผิดหลาดในการดึงข้อมูลผู้ใช้ที่คอมเมนต์ของ user คนนี้",
        error: err.message,
      })
      .code(500);
  }
};

// GET user-comments by Comment ID
exports.getByCommentId = async (req, h) => {
  try {
    const data = await userCommentService.getUserCommentsByCommentId(
      req.params.cmId
    );
    return h.response({ message: "ข้อมูลของ comment นี้", data });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// GET by Composite uId + cmId
exports.getByUCM = async (req, h) => {
  try {
    const data = await userCommentService.getUserCommentByUC(
      req.params.uId,
      req.params.cmId
    );
    return h.response({ message: "พบข้อมูลคู่ uId + cmId", data });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// POST
exports.createUserComment = async (req, h) => {
  try {
    const data = await userCommentService.createUserComment(req.payload);
    return h.response({ message: "เพิ่มสำเร็จ", data }).code(201);
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// PUT
exports.updateUserComment = async (req, h) => {
  try {
    const data = await userCommentService.updateUserComment(
      req.params.uId,
      req.params.cmId,
      req.payload
    );
    return h.response({ message: "อัปเดตสำเร็จ", data });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// DELETE
exports.deleteUserComment = async (req, h) => {
  try {
    await userCommentService.deleteUserComment(req.params.uId, req.params.cmId);
    return h.response({ message: "ลบสำเร็จ" });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};
