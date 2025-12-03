const userController = require("../controllers/user.controller");
const Joi = require("joi");

const userSchema = Joi.object({
  fname: Joi.string().required().example("Somchai"),
  lname: Joi.string().required().example("Rakdee"),
  email: Joi.string().email().required().example("somchai@example.com"),
  password: Joi.string().required().example("Pass1234"),
  role: Joi.string().valid("USER", "ADMIN").required(),
  position: Joi.string().optional().example("Developer")
});



module.exports = [
  {
    method: "GET",
    path: "/users",
    handler: userController.getAllUsers,
  },

  {
    method: "GET",
    path: "/users/{id}",
    handler: userController.getUserById,
  },

  {
    method: "POST",
    path: "/users",
    handler: userController.createUser,
  },

  {
    method: "PUT",
    path: "/users/{id}",
    handler: userController.updateUser,
  },

  {
    method: "DELETE",
    path: "/users/{id}",
    handler: userController.deleteUser,
  }
];
