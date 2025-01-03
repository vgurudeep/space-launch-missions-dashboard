// const planets = [];

const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const HabitablePlanets = [];

function isHabitable(Planet) {
  return (
    Planet["koi_disposition"] === "CONFIRMED" &&
    Planet["koi_insol"] > 0.36 &&
    Planet["koi_insol"] < 1.11 &&
    Planet["koi_prad"] < 1.6
  );
}
function isAllPlanetsLoaded() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "data", "kepler_data.csv"))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitable(data)) HabitablePlanets.push(data);
      })
      .on("error", (err) => reject(err))
      .on("end", () => {
        resolve();
        console.log(
          `The number of habitable planets found : ${HabitablePlanets.length}`
        );
      });
  });
}

module.exports = { isAllPlanetsLoaded, planets: HabitablePlanets };
