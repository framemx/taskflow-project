const taskController  = require("../controllers/task.controller");
const Joi = require("joi");

// Schema สำหรับตรวจสอบข้อมูล Task
const taskSchema = Joi.object({
    tTitle: Joi.string().required(),
    tType: Joi.string().allow(null).optional(),
    tDescription: Joi.string().allow(null).optional(),
    tDateCreate: Joi.date().allow(null).optional(),
    tDateStart: Joi.date().allow(null).optional(),
    tDateCommit: Joi.date().allow(null).optional(),
    tDateDue: Joi.date().allow(null).optional(),
    tStatus: Joi.string().allow(null).optional(),
    tPriority: Joi.string().allow(null).optional()
});

module.exports = [
    {
        method: "GET",
        path:"/tasks",
        handler: taskController.getAllTasks,
    },

    {
        method: "GET",
        path:"/tasks/{id}",
        handler: taskController.getTaskById,
    },

    {
        method: "POST",
        path: "/tasks",
        handler: taskController.createTask,
    },

    {
        method: "PUT",
        path: "/tasks/{id}",
        handler: taskController.updateTask,
    },

    {
        method: "DELETE",
        path: "/tasks/{id}",
        handler: taskController.deleteTask,

    },
];
