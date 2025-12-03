const userCommentService = require("../services/userComment.service");

// GET ALL
exports.getAllUserComments = async (req, h) => {
  try {
    const data = await userCommentService.getAllUserComments();
    return h.response({
      message: "พบข้อมูล user-comment ทั้งหมด",
      count: data.length,
      data
    });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// GET by User
exports.getByUserId = async (req, h) => {
  try {
    const data = await userCommentService.getByUserId(req.params.uId);
    return h.response({ message: "ข้อมูลของ user นี้", data });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// GET by Comment
exports.getByCommentId = async (req, h) => {
  try {
    const data = await userCommentService.getByCommentId(req.params.cmId);
    return h.response({ message: "ผู้ใช้ทั้งหมดที่เกี่ยวข้องกับคอมเมนต์นี้", data });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};

// GET by Composite (uId + cmId)
exports.getByUIdCmId = async (req, h) => {
  try {
    const data = await userCommentService.getByUIdCmId(
      req.params.uId,
      req.params.cmId
    );
    return h.response({ message: "ข้อมูลคู่ uId + cmId", data });
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
    await userCommentService.deleteUserComment(
      req.params.uId,
      req.params.cmId
    );
    return h.response({ message: "ลบสำเร็จ" });
  } catch (err) {
    return h.response({ message: "error", error: err.message }).code(500);
  }
};
