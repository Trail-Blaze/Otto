const download = require("download");
const path = require("path");
const yaml = require("yaml");
const distinfo = yaml.parse(path.join(backendActive, "dist-info.yml"));
const fse = require("fs-extra");
require("./environment");

const backendsDir = backendDir;
const stagingDirectory = path.join(backendsDir, "/.staging/");
const backendActive = path.join(backendsDir, "ACTIVE");
require("./pdb");

/**
 * @brief Downloads a private server, installs it and creates some metadata in the Local Package Database
 * @param {String} url URL to the NodeJS backend
 */
function downloadBackend(url = url.toString()) {
  download(url, stagingDirectory, { extract: true, name: "RobinHood" }).then(
    () => {
      fse.renameSync(backendActive, `INACTIVE_${removeSpecial(distinfo.name)}`);
      localPDB(
        "update",
        distinfo.name,
        "installLocation",
        path.join(backendsDir, `INACTIVE_${distinfo.name}`)
      );
      installBackend(package.name, path.join(stagingDirectory, "RobinHood"));
      return;
    }
  );
}

function installBackend(name = name.toString(), source = source.toString()) {
  fse.move(source, backendsDir, (error) => {
    if (error) throw error;
    fse.rename(name, "ACTIVE");
    // Register package
    // localPDB(method, name, key, value)
    // Version
    localPDB("new", package.name, "VERSION", package.version);
    // Type
    localPDB("update", package.name, "TYPE", package.type);
    // InstallLocation
    localPDB("update", package.name, "INSTALLLOCATION", backendActive);
    // EntryPoint
    localPDB("update", package.name, "ENTRYPOINT", distinfo.entrypoint);
    return;
  });
}

/**
 * @brief Takes a string and removes illegal characters from it
 * @param {String} str String to remove special characters from
 * @returns Sanitized string
 */
function removeSpecial(str = str.toString()) {
  return str.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "_");
}

// Expose only downloadBackend
module.exports = {
  downloadBackend,
};
