const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  // Validating the user input
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.target ||
    !launch.launchDate
  ) {
    return res.status(400).json({
      error: "Missing important data",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (existLaunchWithId(launchId)) {
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
  } else {
    return res.status(404).json({
      Error: "The requested launch does not exist",
    });
  }
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
