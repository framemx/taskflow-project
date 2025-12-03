const Joi = require("joi");
const projectEmployeeController = require("../controllers/projectEmployee.controller");

// Schema
const projectEmployeeSchema = Joi.object({
  pId: Joi.number().required(),
  uId: Joi.number().required(),
  dateJoin: Joi.date().allow(null).optional(),
  dateLeft: Joi.date().allow(null).optional(),
  role: Joi.string().allow(null).optional(),
});

module.exports = [
  // GET ทั้งหมด
  {
    method: "GET",
    path: "/project-employees",
    handler: projectEmployeeController.getAllProjectEmployees,
  },

  // GET ตาม Project ID
  {
    method: "GET",
    path: "/project-employees/{pId}",
    handler: projectEmployeeController.getProjectEmployeeById,
    options: {
      validate: {
        params: Joi.object({
          pId: Joi.number().required(),
        }),
      },
    },
  },

  // GET ตาม Project + User
  {
    method: "GET",
    path: "/project-employees/{pId}/{uId}",
    handler: projectEmployeeController.getProjectEmployeeByPUId,
    options: {
      validate: {
        params: Joi.object({
          pId: Joi.number().required(),
          uId: Joi.number().required(),
        }),
      },
    },
  },

  // A) GET โปรเจกต์ที่ปิดทั้งหมดของทุกคน
{
  method: "GET",
  path: "/project-employees/all-closed",
  handler: projectEmployeeController.getAllClosedProjects,
  options: {
    description: "ดึงโปรเจกต์ที่ปิดทั้งหมด (ทุกคน)",
    tags: ["api", "project-employees"]
  }
},

// B) GET โปรเจกต์ที่ปิดทั้งหมดของคนๆ หนึ่ง
{
  method: "GET",
  path: "/project-employees/all-closed/{uId}",
  handler: projectEmployeeController.getAllClosedProjectsByUser,
  options: {
    description: "ดึงโปรเจกต์ที่ปิดของผู้ใช้รายบุคคล",
    tags: ["api", "project-employees"],
    validate: {
      params: Joi.object({
        uId: Joi.number().required()
      })
    }
  }
},


  // POST เพิ่มสมาชิกโปรเจกต์
  {
    method: "POST",
    path: "/project-employees",
    handler: projectEmployeeController.createProjectEmployee,
    options: {
      validate: {
        payload: Joi.alternatives().try(
          projectEmployeeSchema,
          Joi.array().items(projectEmployeeSchema)
        ),
      },
    },
  },

  // PUT อัปเดต
  {
    method: "PUT",
    path: "/project-employees/{pId}/{uId}",
    handler: projectEmployeeController.updateProjectEmployeeByPUId,
    options: {
      validate: {
        params: Joi.object({
          pId: Joi.number().required(),
          uId: Joi.number().required(),
        }),
        payload: projectEmployeeSchema,
      },
    },
  },

  // DELETE
  {
    method: "DELETE",
    path: "/project-employees/{pId}/{uId}",
    handler: projectEmployeeController.deleteProjectEmployeeByPUId,
    options: {
      validate: {
        params: Joi.object({
          pId: Joi.number().required(),
          uId: Joi.number().required(),
        }),
      },
    },
  },
];
