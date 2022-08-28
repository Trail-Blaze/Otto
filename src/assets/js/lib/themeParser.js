const download = require("download");
const path = require("path");
const yaml = require("yaml");
const distinfo = yaml.parse(path.join(backendActive, "dist-info.yml"));
const { userAssetsDir } = require("./environment");
const { localPDB } = require("./pdb");
require("./environment");
const { register } = require("./extensions");
const { package } = require("./package");

function downloadTheme(url = url.toString()) {
  download(
    url,
    path.join(userAssetsDir, "theme.json", { name: "theme.json" })
  ).then(() => {
    installTheme(package.name, path.join(userAssetsDir, "theme.json"));
  });
  return;
}

function installTheme(name = name.toString(), source = source.toString()) {
  localPDB("new", package.name, "VERSION", package.version);
  register(
    package.name,
    package.version,
    package.type,
    backendActive,
    distinfo.entrypoint
  );
  return;
}

module.exports = {
  downloadTheme,
};
