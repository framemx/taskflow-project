require("dotenv").config();
const Hapi = require("@hapi/hapi");

// Swagger Dependencies
// const Inert = require("@hapi/inert");
// const Vision = require("@hapi/vision");
// const HapiSwagger = require("hapi-swagger");

const userRoutes = require("./src/routes/user.route");
const projectRoutes = require("./src/routes/project.route");
const taskRoutes = require("./src/routes/task.route");
const projectEmployeeRoutes = require("./src/routes/projectEmployees.route");
const taskAssignRoutes = require("./src/routes/taskAssign.route");
const commentRoutes = require("./src/routes/comment.route");
const userCommentRoutes = require("./src/routes/userComment.route")
const columnRoutes = require("./src/routes/column.route");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost", //host: "localhost" → ฟังในเครื่องนี้ (ถ้าจะให้คนอื่นในวงแลนเข้าได้มักใช้ 0.0.0.0)
    routes: { cors: true },  //เปิด CORS ทุก origin ทั้งหมด
  });

  // --- Swagger Options ---
  // const swaggerOptions = {
  //   info: {
  //     title: "TaskFlow API Documentation",
  //     version: "1.0.0",
  //   },
  // };

  // --- Register Swagger Plugin ---
  // await server.register([
  //   Inert,
  //   Vision,
  //   {
  //     plugin: HapiSwagger,
  //     options: swaggerOptions,
  //   },
  // ]);

  // --- Register Routes ---
  server.route(userRoutes);
  server.route(projectRoutes);
  server.route(taskRoutes);
  server.route(projectEmployeeRoutes);
  server.route(taskAssignRoutes);
  server.route(commentRoutes);
  server.route(userCommentRoutes);
  server.route(columnRoutes);
  

  await server.start();
  console.log("🚀 Hapi Server running at:", server.info.uri);
  //  console.log("📘 Swagger Docs:", server.info.uri + "/documentation");
};

init();
