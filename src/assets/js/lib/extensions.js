const { localPDB } = require("./pdb");
const removePercent = /\b(100|\d{1,2})%$/g;
let pSaved = 10;

/**
 * @brief Registers package into local packageDB
 * @param {String} name
 * @param {String} version
 * @param {String} type
 * @param {import("original-fs").PathLike} installLocation
 * @param {String} entryPoint
 */
function register(
  name = name.toString(),
  version = version.toString(),
  type = type.toString(),
  installLocation = installLocation.toString(),
  entryPoint = entryPoint.toString()
) {
  // Register package
  // localPDB(method, name, key, value)
  // Version
  localPDB("new", name, "VERSION", version);
  // Type
  localPDB("update", name, "TYPE", type);
  // InstallLocation
  localPDB("update", name, "INSTALLLOCATION", installLocation);
  // EntryPoint
  localPDB("update", name, "ENTRYPOINT", entryPoint);
}

const ref = (id = id.toString()) => {
  return document.getElementById(id);
};

/**
 * @brief Increase progressBar by N%
 * @param {Number} percentage
 */
let retryCount = 0;
function progress(percentage = parseInt(percentage)) {
  let percentNow;
  try {
    percentNow = removePercent.exec(ref("lpdb_progression").style.width)[1];
    retryCount = 0;
  } catch (error) {
    console.warn("[BUG] You're going too fast!", error);
    if (retryCount < 5) {
      progress(percentage);
      retryCount++;
    }
  }
  if (percentNow != null) {
    pSaved = percentNow;
  }
  ref("lpdb_progression").style.width =
    (parseInt(pSaved) + percentage).toString() + "%";
}

// Expose register
module.exports = {
  register,
  ref,
  progress,
};
