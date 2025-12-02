require("dotenv").config();
const Hapi = require("@hapi/hapi");

// Swagger Dependencies
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");

const userRoutes = require("./src/routes/user.route");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: { cors: true },
  });

  // --- Swagger Options ---
  const swaggerOptions = {
    info: {
      title: "TaskFlow API Documentation",
      version: "1.0.0",
    },
  };

  // --- Register Swagger Plugin ---
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  // --- Register Routes ---
  server.route(userRoutes);

  await server.start();
  console.log("🚀 Hapi Server running at:", server.info.uri);
  console.log("📘 Swagger Docs:", server.info.uri + "/documentation");
};

init();
