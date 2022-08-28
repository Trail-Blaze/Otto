const download = require("download");
const fse = require("fs-extra");
const path = require("path");
const { userAssetsDir, userAssetsPackages } = require("./environment");
const { register } = require("./extensions");
const { package } = require("./package");

function downloadOther(url = url.toString()) {
  download(url, path.join(userAssetsDir, `packages/.staging/${package.name}`), {
    extract: true,
    name: "CURRENT",
  }).then(() => {
    installOther(
      package.name,
      path.join(userAssetsDir, `packages/.staging/${package.name}`)
    );
  });
  return;
}

function installOther(name = name.toString(), source = source.toString()) {
  // Move up one directory
  // Rename source to package.name
  // Register
  fse.move(source, userAssetsPackages, (error) => {
    if (error) throw error;
    fse.rename(source, package.name);
    register(
      package.name,
      package.version,
      package.type,
      userAssetsPackages,
      getName(path.join(userAssetsPackages, package.name))
    );
  });
}

function getName(source = source.toString()) {
  let m = require(path.join(source, "/metadata.json"));
  return m.pak;
}

module.exports = {
  downloadOther,
};
