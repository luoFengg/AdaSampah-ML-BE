const Hapi = require("@hapi/hapi");
const routes = require("./routes/routes");
const { loadModel } = require("./handler");
const { config } = require("dotenv");
config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: [
          "http://localhost:5173",
          "http://localhost:4173",
          "http://localhost:4173/",
          "http://localhost:5173/",
          "https://adasampah.netlify.app/",
          "https://adasampah.netlify.app",
          "https://adasampah1.netlify.app/",
          "https://adasampah1.netlify.app",
        ],
      },
    },
  });

  server.ext("onRequest", (request, h) => {
    console.log("Incoming Content-Type:", request.headers["content-type"]);
    return h.continue;
  });

  await loadModel();
  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
