const { ref } = require("./extensions");

require("./extensions");
const { downloadBackend } = require("./backendParser");
const { downloadTheme } = require("./themeParser");
const { downloadOther } = require("./other");
let pkg = require("./package");

function downloadButton() {
  pkg.package = package;
  switch ((package.type = package.type.toString().toUpperCase())) {
    case "BACKEND/BUNDLE":
      downloadBackend(package.URL);
      break;
    case "BACKEND/BINARY":
      downloadOther(package.URL);
      break;
    case "PAKCHUNK":
      downloadOther(package.URL);
      break;
    case "THEMEPACK":
      downloadTheme(package.URL);
      break;
    default:
      break;
  }

  // Finish up + exit
  ref("downloadButton").style.display = "none";
  ref("status").innerText = "INSTALLED";
  return;
}

module.exports = {
  downloadButton,
};
