const { localPDB } = require("./pdb");

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

// Expose register
module.exports = {
  register,
  ref,
};
