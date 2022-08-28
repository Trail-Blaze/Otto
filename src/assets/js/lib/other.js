const download = require("download");
const fse = require("fs-extra");
const path = require("path");
const { userAssetsDir, userAssetsPackages } = require("./environment");
const { register } = require("./extensions");

function downloadOther(package) {
  download(package.URL, path.join(userAssetsDir, `packages/.staging/${package.name}`), {
    extract: true,
    filename: "CURRENT",
  }).then(() => {
    installOther(
      package,
      path.join(userAssetsDir, `packages/.staging/${package.name}`)
    );
  });
  return;
}

function installOther(package, source = source.toString()) {
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
