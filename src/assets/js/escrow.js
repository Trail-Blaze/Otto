const path = require("path");
const fs = require("fs");
const os = require("os");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/Launcher/");
let userAssetsDir = path.join(blazeDir, "/userAssets/");

if (!fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
  window.location.replace("firststartup.html");
} else {
  window.location.replace("boot.html");
}
