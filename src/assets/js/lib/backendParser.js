const download = require("download");
const path = require("path");
const yaml = require("yaml");
const fse = require("fs-extra");
const {
  backendActive,
  stagingDirectory,
  backendsDir,
  backendDir,
} = require("./environment");
const { register } = require("./extensions");
const { localPDB } = require("./pdb");
let distinfo;
try {
  distinfo = yaml.parse(
    fse.readFileSync(path.join(backendActive, "dist-info.yml"), "utf8")
  );
} catch (e) {}

/**
 * @brief Downloads a private server, installs it and creates some metadata in the Local Package Database
 * @param {String} url URL to the NodeJS backend
 */
function downloadBackend(package) {
  download(package.URL, path.join(stagingDirectory, "RobinHood"), {
    extract: true,
    filename: "RobinHood",
  }).then(() => {
    try {
      fse.renameSync(backendActive, path.join(backendsDir, `INACTIVE__${removeSpecial(distinfo.name)}`));

      localPDB(
        "update",
        distinfo.name,
        "installLocation",
        path.join(backendsDir, `INACTIVE__${distinfo.name}`)
      );
    } catch (e) {
      console.info('[LPDB] No "ACTIVE" backend currently.');
    }
    setTimeout(() => {
      installBackend(package, path.join(stagingDirectory, "RobinHood"));
    }, 3000);

    return;
  });
}

function installBackend(package, source = source.toString()) {
  fse.rename(source, backendActive, (error) => {
    if (error) throw error;
    fse.rename(package.name, "ACTIVE");
    try {
      distinfo = yaml.parse(
        fse.readFileSync(path.join(backendActive, "dist-info.yml"), "utf8")
      );
      register(
        package.name,
        package.version,
        package.type,
        backendActive,
        distinfo.entrypoint
      );
    } catch (error) {
      // Find subdirs(if any), rename, move and try again
      if (fse.readdirSync(path.join(backendDir, "/ACTIVE")).length === 1) {
        fse.renameSync(
          path.join(backendActive, fse.readdirSync(backendActive)[0]),
          path.join(backendDir, "/ACTIVE/ACTIVE")
        );
        fse.moveSync(
          path.join(backendDir, "/ACTIVE/ACTIVE"),
          path.join(backendDir, "/ACTIVE_")
        );
        // Remove old backend
        fse.removeSync(backendActive);
        // Make new active backend
        fse.rename(
          path.join(backendDir, "ACTIVE_"),
          path.join(backendActive),
          (error) => {
            if (error) throw error;
            try {
              // Wait a reasonable time for move to finish
              setTimeout(() => {
                distinfo = yaml.parse(
                  fse.readFileSync(
                    path.join(backendActive, "dist-info.yml"),
                    "utf8"
                  )
                );

                register(
                  package.name,
                  package.version,
                  package.type,
                  backendActive,
                  distinfo.entrypoint
                );
              }, 10000);
            } catch (error) {
              console.warn(
                "[LPDB_REGISTER] Unable to register backend with LPBD",
                error
              );
            }
          }
        );
      }
    }
    return;
  });
}

/**
 * @brief Takes a string and removes illegal characters from it
 * @param {String} str String to remove special characters from
 * @returns Sanitized string
 */
function removeSpecial(str = str.toString()) {
  str = str.replace(/[^a-zA-Z ]/g, "");
  return str.replace(/\s/g, "_");
}

// Expose only downloadBackend
module.exports = {
  downloadBackend,
};
