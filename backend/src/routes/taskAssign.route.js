const Joi = require("joi");
const controller = require("../controllers/taskAssign.controller");

module.exports = [
  {
    method: "GET",
    path: "/task-assigns",
    handler: controller.getAllTaskAssigns,
  },

  {
    method: "GET",
    path: "/task-assigns/task/{tId}",
    handler: controller.getTaskAssignsByTaskId,
  },

  {
    method: "GET",
    path: "/task-assigns/user/{uId}",
    handler: controller.getTaskAssignsByUserId,
  },

  {
    method: "GET",
    path: "/task-assigns/{tId}/{uId}",
    handler: controller.getTaskAssignByTaskIdUserId,
  },

  {
    method: "POST",
    path: "/task-assigns",
    handler: controller.createTaskAssign,
  },

  {
    method: "PUT",
    path: "/task-assigns/{tId}/{uId}",
    handler: controller.updateTaskAssign,
  },

  {
    method: "DELETE",
    path: "/task-assigns/{tId}/{uId}",
    handler: controller.deleteTaskAssign,
  },
];
