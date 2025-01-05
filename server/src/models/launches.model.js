launches = new Map();

launch = {
  flightNumber: 100,
  launchDate: new Date("December 13", 2030),
  mission: "Impossible",
  rocket: "Explorer 1s1",
  destination: "Kepler-442 b",
  customer: ["guru", "maha"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = {
  launches,
};
