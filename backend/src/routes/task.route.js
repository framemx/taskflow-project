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
        options: {
            description: "ดึงข้อมูลงานทั้งหมด",
            tags: ["api", "tasks"]
        }
    },

    {
        method: "GET",
        path:"/tasks/{id}",
        handler: taskController.getTaskById,
        options:{
            description: "ดึงงานรายตัว",
            tags:["api","tasks"]
        }
    },

    {
        method: "POST",
        path: "/tasks",
        handler: taskController.createTask,
        options: {
            description: "สร้างงานใหม่",
            tags: ["api", "tasks"],
            validate:{
                payload:Joi.alternatives().try(
                    taskSchema,           // 1 งาน
                    Joi.array().items(taskSchema)  // หลายงาน
                )
            }
        }
    },

    {
        method: "PUT",
        path: "/tasks/{id}",
        handler: taskController.updateTask,
        options: {
            description: "แก้ไขงาน",
            tags: ["api", "tasks"],
            validate:{
                payload: taskSchema
            }
        }
    },

    {
        method: "DELETE",
        path: "/tasks/{id}",
        handler: taskController.deleteTask,
        options: {
            description: "ลบงาน",
            tags: ["api", "tasks"]
        }
    },
];
