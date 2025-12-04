const controller = require("../controllers/userComment.controller");

module.exports = [
  {
    method: "GET",
    path: "/user-comments",
    handler: controller.getAllUserComments,
  },
  {
    method: "GET",
    path: "/user-comments/user/{uId}",
    handler: controller.getByUserId,
  },
  {
    method: "GET",
    path: "/user-comments/comment/{cmId}",
    handler: controller.getByCommentId,
  },
  

  {
    method: "GET",
    path: "/user-comments/{uId}/{cmId}",
    handler: controller.getByUCM,
  },

  {
    method: "POST",
    path: "/user-comments",
    handler: controller.createUserComment,
  },
  {
    method: "PUT",
    path: "/user-comments/{uId}/{cmId}",
    handler: controller.updateUserComment,
  },
  {
    method: "DELETE",
    path: "/user-comments/{uId}/{cmId}",
    handler: controller.deleteUserComment,
  },
];
