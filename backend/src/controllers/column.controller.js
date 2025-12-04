const service = require("../services/column.service");

// ดึงคอลัมน์ที่ active
exports.getAllColumns = async (req, h) => {
  try {
    const data = await service.getAllColumns();
    return h.response({ message: "ดึงข้อมูลคอลัมน์สำเร็จ", data });
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};

// ดึงคอลัมน์ที่ถูกลบ
exports.getDeletedColumns = async (req, h) => {
  try {
    const data = await service.getDeletedColumns();
    return h.response({ message: "ดึงคอลัมน์ที่ถูกลบสำเร็จ", data });
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};

// ดึงตาม ID
exports.getColumnById = async (req, h) => {
  try {
    const { cid } = req.params;
    const data = await service.getColumnById(cid);

    if (!data) return h.response({ message: "ไม่พบคอลัมน์" }).code(404);

    return h.response({ data });
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};

// สร้าง
exports.createColumn = async (req, h) => {
  try {
    const payload = req.payload;
    const data = await service.createColumn(payload);

    return h.response({
      message: "สร้างคอลัมน์สำเร็จ",
      data
    }).code(201);
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};

// อัปเดต
exports.updateColumn = async (req, h) => {
  try {
    const { cid } = req.params;
    const payload = req.payload;

    const data = await service.updateColumn(cid, payload);

    return h.response({
      message: "อัปเดตคอลัมน์สำเร็จ",
      data
    });
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};

// Soft delete
exports.softDeleteColumn = async (req, h) => {
  try {
    const { cid } = req.params;

    await service.softDeleteColumn(cid);

    return h.response({ message: "ลบคอลัมน์แบบ Soft Delete สำเร็จ" });
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};

// Restore
exports.restoreColumn = async (req, h) => {
  try {
    const { cid } = req.params;

    await service.restoreColumn(cid);

    return h.response({ message: "กู้คืนคอลัมน์สำเร็จ" });
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};

// Force Delete
exports.forceDeleteColumn = async (req, h) => {
  try {
    const { cid } = req.params;

    await service.forceDeleteColumn(cid);

    return h.response({
      message: "ลบจริงสำเร็จ (ข้อมูลนี้จะหายถาวร)"
    });
  } catch (e) {
    return h.response({ error: e.message }).code(500);
  }
};
