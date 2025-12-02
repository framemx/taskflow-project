const { error } = require("console");
const userService = require("../services/user.service");

exports.getAllUsers = async (req, h) => {
  try {
    const users = await userService.getAllUsers();
    return h.response(users + "พบข้อมูลผู้ใช้ทั้งหมด").code(200);
  } catch (error) {
    return h
      .response({ ข้อผิดพลาด: error.message + "ไม่พบผุ้ใช้ทั้งหมดที่ต้องการ" })
      .code(500);
  }
};

exports.getUserById = async (req, h) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return h
        .response({
          message: "ไม่พบผู้ใช้ตามรหัสที่ระบุ หรือข้อมูลผู้ใช้ถูกลบไปแล้ว",
        })
        .code(404);
    } else {
      return h
        .response({
          message: "พบข้อมูลผู้ใช้",
          data: user,
        })
        .code(200);
    }
  } catch (error) {
    return h
      .response({
        error:
          error.message + " เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ ลองหาสาเหตุใหม่",
      })
      .code(500);
  }
};

exports.createUser = async (req, h) => {
  try {
    const payload = req.payload;

    // กรณีไม่พบข้อมูลหรือ payload ว่าง
    if (!payload || (Array.isArray(payload) && payload.length === 0)) {
      return h
        .response({
          message: "ไม่พบข้อมูลผู้ใช้ที่ต้องการเพิ่ม",
        })
        .code(400);
    }

    // --- ถ้า payload เป็น array (หลายคน) ---
    if (Array.isArray(payload)) {
      const newUsers = await userService.createManyUsers(payload);

      // ถ้าผลลัพธ์เพิ่มไม่ได้เลย
      if (!newUsers || newUsers.count === 0) {
        return h
          .response({
            message: "ไม่สามารถเพิ่มผู้ใช้ได้",
          })
          .code(400);
      }

      return h
        .response({
          message: "Users created successfully เพิ่มแบบหลายคนสำเร็จ",
          count: newUsers.count,
        })
        .code(201);
    }

    // --- ถ้า payload เป็น object (1 คน) ---
    const newUser = await userService.createUser(payload);

    if (!newUser) {
      return h
        .response({
          message: "ไม่สามารถเพิ่มผู้ใช้ได้",
        })
        .code(400);
    }

    return h
      .response({
        message: "User created successfully",
        data: newUser,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        ข้อผิดพลาด:
          error.message + "เกิดข้อผิดพลาดในการสร้างผู้ใช้ ลองหาสาเหตุใหม่",
      })
      .code(500);
  }
};

exports.updateUser = async (req, h) => {
  try {
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.payload
    );

    return h
      .response({
        message: "User updated successfully อัปเดตผู้ใช้สำเร็จ",
        data: updatedUser,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        ข้อผิดพลาด:
          error.message + "เกิดข้อผิดพลาดในการอัปเดตผู้ใช้ ลองหาสาเหตุใหม่",
      })
      .code(500);
  }
};

exports.deleteUser = async (req, h) => {
  try {
    await userService.deleteUser(req.params.id);

    return h
      .response({
        message: "User deleted successfully ลบผู้ใช้สำเร็จ",
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        error: error.message + "เกิดข้อผิดพลาดในการลบผู้ใช้ ลองหาสาเหตุใหม่",
      })
      .code(500);
  }
};
