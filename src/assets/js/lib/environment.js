// BlazeEnV
/*********************************************************** */
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";

let baseDir = path.join(__drivename, "/Blaze/");
let configDir = path.join(baseDir, "/Launcher/");

let helpersDir = path.join(configDir, "/helpers/");
let backendDir = path.join(configDir, "/backend/");
/** Uncommon - Module-specific */
const backendsDir = backendDir;
const stagingDirectory = path.join(backendsDir, "/.staging/");
const backendActive = path.join(backendsDir, "ACTIVE");
/************* */
let userAssetsDir = path.join(configDir, "/userAssets/");
let userAssetsPackages = path.join(userAssetsDir, "/packages");
/************************************************************** */

module.exports = {
  __drivename,
  baseDir,
  configDir,
  helpersDir,
  backendDir,
  backendsDir,
  stagingDirectory,
  backendActive,
  userAssetsDir,
  userAssetsPackages,
};
