const path = require("path");
const fs = require("fs");
const os = require("os");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/Launcher/");
let userAssetsDir = path.join(blazeDir, "/userAssets/");
let status = document.getElementById("reviewStatus");

if (!fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
  status.innerHTML = "WELCOME TO BLAZE! HAVE FUN!<br/><p>LIVE-BUILD_9<br/><code>[2022-05-14T20:22:40.770Z]</code></p>";
  setTimeout(window.location.replace("firststartup.html"), 5000);
} else {
  status.innerText = "ROUTING..."
  window.location.replace("boot.html");
}
