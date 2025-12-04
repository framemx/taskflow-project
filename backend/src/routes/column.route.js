const controller = require("../controllers/column.controller");
const Joi = require("joi");

const schema = Joi.object({
  cName: Joi.string().required().example("To Do"),
  cIndex: Joi.number().optional().example(0)
});

module.exports = [
  {
    method: "GET",
    path: "/columns",
    handler: controller.getAllColumns,
    options: {
      description: "ดึงคอลัมน์ทั้งหมดแบบ Active",
      tags: ["api", "column"]
    }
  },

  {
    method: "GET",
    path: "/columns/deleted",
    handler: controller.getDeletedColumns,
    options: {
      description: "ดึงคอลัมน์ที่ถูกลบแบบ Soft Delete",
      tags: ["api", "column"]
    }
  },

  {
    method: "GET",
    path: "/columns/{cid}",
    handler: controller.getColumnById,
    options: {
      description: "ดึงคอลัมน์ตาม ID",
      tags: ["api", "column"]
    }
  },

  {
    method: "POST",
    path: "/columns",
    handler: controller.createColumn,
    options: {
      description: "สร้างคอลัมน์",
      tags: ["api", "column"],
      validate: { payload: schema }
    }
  },

  {
    method: "PUT",
    path: "/columns/{cid}",
    handler: controller.updateColumn,
    options: {
      description: "อัปเดตคอลัมน์",
      tags: ["api", "column"],
      validate: { payload: schema }
    }
  },

  {
    method: "DELETE",
    path: "/columns/{cid}",
    handler: controller.softDeleteColumn,
    options: {
      description: "Soft Delete ลบเฉพาะสถานะ",
      tags: ["api", "column"]
    }
  },

  {
    method: "PATCH",
    path: "/columns/{cid}/restore",
    handler: controller.restoreColumn,
    options: {
      description: "กู้คืนคอลัมน์ที่ถูกลบ",
      tags: ["api", "column"]
    }
  },

  {
    method: "DELETE",
    path: "/columns/{cid}/force",
    handler: controller.forceDeleteColumn,
    options: {
      description: "ลบจริง (หายถาวร)",
      tags: ["api", "column"]
    }
  }
];
