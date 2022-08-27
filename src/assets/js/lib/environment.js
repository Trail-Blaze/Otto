// BlazeEnV
/*********************************************************** */
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";

let baseDir = path.join(__drivename, "/Blaze/");
let configDir = path.join(baseDir, "/Launcher/");

let helpersDir = path.join(configDir, "/helpers/");
let backendDir = path.join(configDir, "/backend/");
let userAssetsDir = path.join(configDir, "/userAssets/");
/************************************************************** */

module.exports = {
  __drivename,
  baseDir,
  configDir,
  helpersDir,
  backendDir,
  userAssetsDir,
};
