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

ref = (id) => document.getElementById(id);

function openILL() {
  const { shell } = require("electron"); // deconstructing assignment
  shell.openPath(path.join(userAssetsDir, "\\InstallList.json")); // Show the given file in a file manager. If possible, select the file.
}

function dropInstall(position = ref(position)) {
  // Drop install at position "position"
  delete installList[position];
  // Remove from UI
  entryListAll.removeChild(ref(`install__${position}`))
  const filtered = installList.filter((e) => {
    return e != null;
  });
  installList = filtered;

  // Save file
  let data = JSON.stringify(installList, null, 3);
  fs.writeFile(
    path.join(userAssetsDir, "InstallList.json"),
    data,
    function (err) {
      if (err) {
        // Throw errors, if any
        console.log(err);
      }
    }
  );
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
