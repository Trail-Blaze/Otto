const download = require("download");
const path = require("path");
const yaml = require("yaml");
const { userAssetsDir, backendActive } = require("./environment");
const { localPDB } = require("./pdb");
const { register } = require("./extensions");

function downloadTheme(package) {
  download(
    package.URL,
    path.join(userAssetsDir, "theme.json", { name: "theme.json" })
  ).then(() => {
    installTheme(package, path.join(userAssetsDir, "theme.json"));
  });
  return;
}

function installTheme(package, source = source.toString()) {
  localPDB("new", package.name, "VERSION", package.version);
  register(
    package.name,
    package.version,
    package.type,
    backendActive,
    "theme.json"
  );
  return;
}

module.exports = {
  downloadTheme,
};
