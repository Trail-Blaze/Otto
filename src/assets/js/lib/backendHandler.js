require("./backendParser");
require("./other");


function downloadButton() {
  switch (package.type) {
    case "backend/button":
      downloadBackend(package.URL);
      break;
    default:
      break;
  }
}
