const path = require("path");
const fse = require("fs-extra");
const { userAssetsDir } = require("./environment");

/**
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
  const pdb = require(path.join(userAssetsDir, "/pdb.json"));
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
  return;
}

module.exports = {
  localPDB,
};
