const userController = require("../controllers/user.controller");
const Joi = require("joi");

const userSchema = Joi.object({
  uName: Joi.string().required().example("Somchai"),
  email: Joi.string().email().required().example("somchai@example.com"),
  password: Joi.string().required().example("pass1234"),
  role: Joi.string().valid("USER", "ADMIN").required().example("USER"),
  position: Joi.string().required().example("Software Developer")
});

module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: userController.getAllUsers,
    options: {
      description: "ดึงผู้ใช้ทั้งหมด",
      tags: ["api", "users"]
    }
  },

  {
    method: "GET",
    path: "/users/{id}",
    handler: userController.getUserById,
    options: {
      description: "ดึงข้อมูลผู้ใช้รายบุคคล",
      tags: ["api", "users"]
    }
  },

  {
    method: "POST",
    path: "/users",
    handler: userController.createUser,
    options: {
      description: "เพิ่มผู้ใช้ใหม่ (รองรับหลายคน)",
      tags: ["api", "users"],
      validate: {
        payload: Joi.alternatives().try(
          userSchema,            // 1 คน
          Joi.array().items(userSchema)   // หลายคน
        )
      }
    }
  },

  {
    method: "PUT",
    path: "/users/{id}",
    handler: userController.updateUser,
    options: {
      description: "อัปเดตข้อมูลผู้ใช้",
      tags: ["api", "users"],
      validate: {
        payload: userSchema
      }
    }
  },

  {
    method: "DELETE",
    path: "/users/{id}",
    handler: userController.deleteUser,
    options: {
      description: "ลบผู้ใช้",
      tags: ["api", "users"]
    }
  }
];
