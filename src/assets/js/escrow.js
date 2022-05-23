const path = require("path");
const fs = require("fs");
const os = require("os");
require("./modules/config.js");
let status = document.getElementById("reviewStatus");

if (!fs.existsSync(path.join(userAssetsDir, "\\InstallList.json"))) {
  status.innerHTML = "WELCOME TO BLAZE! HAVE FUN!<br/><p>LIVE-BUILD_9<br/><code>[2022-05-14T20:22:40.770Z]</code></p>";
  setTimeout(window.location.replace("firststartup.html"), 5000);
} else {
  status.innerText = "ROUTING..."
  window.location.replace("boot.html");
}
