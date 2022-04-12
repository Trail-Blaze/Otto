const path = require("path");
const fs = require("fs");
const os = require("os");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/Launcher/");
let userAssetsDir = path.join(blazeDir, "/userAssets/");
let status = document.getElementById("reviewStatus");

if (!fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
  status.innerHTML = "WELCOME TO BLAZE! HAVE FUN!<br/><p>LIVE-BUILD_1<br/><code>[2022-04-12T08:29:06.726Z]</code></p>";
  setTimeout(window.location.replace("firststartup.html"), 3000);
} else {
  status.innerText = "ROUTING..."
  window.location.replace("boot.html");
}
