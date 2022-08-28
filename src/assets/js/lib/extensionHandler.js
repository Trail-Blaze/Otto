const { ref, progress } = require("./extensions");
const { downloadBackend } = require("./backendParser");
const { downloadTheme } = require("./themeParser");
const { downloadOther } = require("./other");

function downloadButton(package) {
  switch ((package.type = package.type.toString().toUpperCase())) {
    case "BACKEND/BUNDLE":
      ref("progress_indicator").classList.toggle("hidden");
      progress(10);
      downloadBackend(package);
      break;
    case "BACKEND/BINARY":
      progress(10);
      downloadOther(package);
      break;
    case "PAKCHUNK":
      progress(10);
      downloadOther(package);
      break;
    case "THEMEPACK":
      progress(10);
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
