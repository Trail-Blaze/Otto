const os = require("os");
const path = require("path");
const fs = require("fs");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/");
const configDir = path.join(blazeDir, "/Launcher/");
let launcherConfig;

//TODO FSACCESS NAVJSON. IF NOT FOUND, CREATE FILE

(function createConfig() {
  fs.access(blazeDir, function (error) {
    if (error) {
      fs.mkdirSync(blazeDir);
      console.log("Created New Blaze Dir!");
      createRepoDir();
    }
    fs.access(configDir, function (error) {
      if (error) {
        fs.mkdirSync(configDir);
        console.log("Created New Blaze/Launcher Dir!");

        fetch("https://trail-blaze.github.io/marketplace/config/settings.json")
          .then((response) => response.json())
          .then((data) => {
            launcherConfig = data;
            let navjson = JSON.stringify(launcherConfig, null, 2);
            fs.writeFileSync(
              path.join(configDir, "settings.json"),
              navjson,
              "utf-8"
            );
            createConfig();
          })
          .catch((err) => console.error(err));
      }
      if (fs.existsSync(path.join(configDir, "settings.json"))) {
        launcherConfig = require(path.join(configDir, "settings.json"));
        restoreSettings();
      }
      if (!fs.existsSync(path.join(configDir, "settings.json"))) {
        fetch("https://trail-blaze.github.io/marketplace/config/settings.json")
          .then((response) => response.json())
          .then((data) => {
            launcherConfig = data;
            let navjson = JSON.stringify(launcherConfig, null, 2);
            fs.writeFileSync(
              path.join(configDir, "settings.json"),
              navjson,
              "utf-8"
            );
            launcherConfig = require(path.join(configDir, "settings.json"));
            restoreSettings();
          })
          .catch((err) => console.error(err));
      }
    });
  });
})();

function restoreSettings() {
    const darkTheme = document.getElementById("darkTheme");
    const lightTheme = document.getElementById("lightTheme");
    const backendOnline = document.getElementById("backendOnline");
    const backendOffline = document.getElementById("backendOffline");
    const lightTheme = document.getElementById("lightTheme");
    if (checkBox.checked== true){
    }
}
