const Joi = require("joi");
const controller = require("../controllers/comment.controller");

const commentSchema = Joi.object({
  cmDetail: Joi.string().required(),
  uId: Joi.number().required(),
  tId: Joi.number().required(),
});

module.exports = [
  { method: "GET", path: "/comments", handler: controller.getAllComments },

  {
    method: "GET",
    path: "/comments/{cmid}",
    handler: controller.getCommentById,
  },

  {
    method: "GET",
    path: "/comments/task/{tid}",
    handler: controller.getCommentsByTaskId,
  },

  {
    method: "GET",
    path: "/comments/user/{uid}",
    handler: controller.getCommentsByUserId,
  },

  {
    method: "POST",
    path: "/comments",
    handler: controller.createComment,
  },

  {
    method: "PUT",
    path: "/comments/{cmid}",
    handler: controller.updateComment,
  },

  {
    method: "DELETE",
    path: "/comments/{cmid}",
    handler: controller.deleteComment,
  },
];
