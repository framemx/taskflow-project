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
    },

    {
        method: "GET",
        path:"/projects/{id}",
        handler: projectController.getProjectById,
    },

    {
        method: "POST",
        path: "/projects",
        handler: projectController.createProject,
    },

    {
        method: "PUT",
        path: "/projects/{id}",
        handler: projectController.updateProject,
    },

    {
        method: "DELETE",
        path: "/projects/{id}",
        handler: projectController.deleteProject,
    }
];
        




