const fs = require("fs");
const path = require("path");
const os = require("os");

let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";

let blazeDir = path.join(__drivename, "/Blaze/Launcher/");

let helpersDir = path.join(blazeDir, "/helpers/");
let backendDir = path.join(blazeDir, "/backend/");
let userAssetsDir = path.join(blazeDir, "/userAssets/");
const launcherConfig = require(path.join(blazeDir, "settings.json")); // Opening settings file for readOnly

function openILL() {
  const { shell } = require("electron"); // deconstructing assignment
  shell.openPath(path.join(userAssetsDir, "\\InstallList.json")); // Show the given file in a file manager. If possible, select the file.
}

/*
module.exports = {
  __drivename,
  blazeDir,
  helpersDir,
  backendDir,
  userAssetsDir,
  launcherConfig,
};
*/