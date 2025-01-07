const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  launchDate: new Date(2030, 11, 13),
  mission: "Impossible",
  rocket: "Explorer 1s1",
  target: "Kepler-442 b",
  customers: ["guru", "maha"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  latestFlightNumber += 1;
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      success: true,
      upcoming: true,
      customers: ["guru", "lakshmi"],
    })
  );
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
module.exports = {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
