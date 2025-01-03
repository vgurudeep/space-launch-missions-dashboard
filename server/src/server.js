const http = require("http");
const app = require("./app");
const { isAllPlanetsLoaded } = require("./models/planets.model");

const PORT = 8000;
const server = http.createServer(app);

async function loadServer() {
  await isAllPlanetsLoaded();
  server.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
  });
}

loadServer();
