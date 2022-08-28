const path = require("path");
const fse = require("fs-extra");
const { userAssetsDir } = require("./environment");

/**
 * @version 0.1-Alpha
 * @name LocalPDB
 * @brief Manages user packageDB
 * @param {String} method Method used to retrieve keys.
 *                   Supports "read", "update", "delete", "new" and "saveAll"
 * @param {String} name Name of Object
 * @param {String} key  Key to be read from object
 * @param {*} value Value to be updated or created
 */

function localPDB(
  method = method.toString(),
  name = name.toString(),
  key = key.toString(),
  value = value
) {
  let pdb;
  let pdb_;
  const packageStore = path.join(userAssetsDir, "/packageStore.json");
  // Check for PDB's existense
  try {
    fse.accessSync(path.join(packageStore), fse.constants.F_OK);
    pdb_ = require(path.join(packageStore));
    pdb = pdb_.packageList;
  } catch (error) {
    // If not, we generate one
    pdb_ = {
      localProps: {
        name: "LocalDB for logging info",
        description:
          "LocalDB for logging info on installed packages for future use. Autogenerated by Blaze",
        warning:
          "For your own good, DO NOT ATTEMPT to EDIT/TAMPER with this file under any circumstances! This file is used in cases such as update detection and will cause unintended consequences, unpredicable functionality or catastrophic failures if configured improperly. !!!NO WARRRANTY IS PROVIDED!!!",
        creation_date: new Date().toISOString,
        pak_count: 0,
      },
      packageList: {},
    };
    pdb = pdb_.packageList;
  }
  switch (method) {
    case "read":
      return pdb[name][key].toString();
    case "new":
    case "write":
      // Setup package and create automatic keys "ObjName", "Name" and "Date Added"
      pdb[name] = {};
      pdb[name].NAME = name.toString();
      pdb[name].DATE_ADDED = new Date().toISOString();
      // Create new keys requested
      pdb[name][key] = value;

      // Increase
      pdb_.localProps.pak_count = parseInt(pdb_.localProps.pak_count) + 1;
      // Write
      fse.writeFileSync(packageStore, JSON.stringify(pdb_, false, 3), "utf8");
      console.log("[LPDB] Created NEW " + name + " package.");
      break;
    case "update":
      try {
        pdb[name][key] = value;
      } catch (error) {
        console.error(
          "[LPDB] The package: ",
          name,
          'does NOT exist! Try creating it with localPDB("new", ...)'
        );
      }
      break;
    case "delete":
      if (!key) {
        delete pdb[name];
        break;
      }
      pdb[name][key];
      break;
    case "saveAll":
      let jsondump = JSON.stringify(pdb, 3);
      fse.writeFileSync(
        jsondump,
        path.join(userAssetsDir, "/pdb.json"),
        "utf-8"
      );
      console.info("[LPDB] Saved Local PackageDB successfully.");
      break;
    default:
      throw `Either unsupported method requested or syntax error in code. You requested ⟶ ${method}`;
    //   break;
  }
  // Write
  fse.writeFileSync(packageStore, JSON.stringify(pdb_, false, 3), "utf8");
  return;
}

module.exports = {
  localPDB,
};
