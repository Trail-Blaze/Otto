const { ref } = require("./extensions");
const { downloadBackend } = require("./backendParser");
const { downloadTheme } = require("./themeParser");
const { downloadOther } = require("./other");

function downloadButton(package) {
  switch ((package.type = package.type.toString().toUpperCase())) {
    case "BACKEND/BUNDLE":
      downloadBackend(package);
      break;
    case "BACKEND/BINARY":
      downloadOther(package);
      break;
    case "PAKCHUNK":
      downloadOther(package);
      break;
    case "THEMEPACK":
      downloadTheme(package);
      break;
    default:
      break;
  }

  // Finish up + exit
  ref("download_rel").style.display = "none";
  ref("name").innerText = "INSTALLED";
  return;
}

module.exports = {
  downloadButton,
};
