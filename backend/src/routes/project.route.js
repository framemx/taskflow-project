const projectController = require("../controllers/project.controller");
const Joi = require("joi");

const projectSchema = Joi.object({
    pName: Joi.string().required(),
    pDateStart: Joi.date().allow(null).optional(),
    pDateEnd: Joi.date().allow(null).optional(),
    pDateCompleted: Joi.date().allow(null).optional(),
    pStatus: Joi.string().allow(null).optional(),
    pDescription: Joi.string().allow(null).optional()
});


module.exports = [
    {
        method: "GET",
        path:"/projects",
        handler: projectController.getAllProjects,
        options: {
            description: "ดึงข้อมูลโปรเจกต์ทั้งหมด",
            tags: ["api", "projects"]
        }
    },

    {
        method: "GET",
        path:"/projects/{id}",
        handler: projectController.getProjectById,
        options:{
            description: "ดึงโปรเจกต์รายตัว",
            tags:["api","projects"]
        }
    },

    {
        method: "POST",
        path: "/projects",
        handler: projectController.createProject,
        options: {
            description: "สร้างโปรเจกต์ใหม่",
            tags: ["api", "projects"],
            validate:{
                payload:Joi.alternatives().try(
                    projectSchema,           // 1 โปรเจกต์
                    Joi.array().items(projectSchema)  // หลายโปรเจกต์
                )
            }
        }
    },

    {
        method: "PUT",
        path: "/projects/{id}",
        handler: projectController.updateProject,
        options: {
            description: "อัปเดตข้อมูลโปรเจกต์",
            tags: ["api", "projects"],
            validate: {
                payload: projectSchema
            }
        }
    },

    {
        method: "DELETE",
        path: "/projects/{id}",
        handler: projectController.deleteProject,
        options: {
            description: "ลบโปรเจกต์",
            tags: ["api", "projects"]
        }
    }
    

];
        




