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
  },

  // GET ตาม Project + User
  {
    method: "GET",
    path: "/project-employees/{pId}/{uId}",
    handler: projectEmployeeController.getProjectEmployeeByPUId,
  },

  // A) GET โปรเจกต์ที่ปิดทั้งหมดของทุกคน
{
  method: "GET",
  path: "/project-employees/all-closed",
  handler: projectEmployeeController.getAllClosedProjects,
},

// B) GET โปรเจกต์ที่ปิดทั้งหมดของคนๆ หนึ่ง
{
  method: "GET",
  path: "/project-employees/all-closed/{uId}",
  handler: projectEmployeeController.getAllClosedProjectsByUser
},


  // POST เพิ่มสมาชิกโปรเจกต์
  {
    method: "POST",
    path: "/project-employees",
    handler: projectEmployeeController.createProjectEmployee,
  },

  // PUT อัปเดต
  {
    method: "PUT",
    path: "/project-employees/{pId}/{uId}",
    handler: projectEmployeeController.updateProjectEmployeeByPUId,
  },

  // DELETE
  {
    method: "DELETE",
    path: "/project-employees/{pId}/{uId}",
    handler: projectEmployeeController.deleteProjectEmployeeByPUId,
  },
];
