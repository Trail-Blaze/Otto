const os = require("os");
const path = require("path");
const fs = require("fs");
let __drivename =
  os.platform == "win32" ? process.cwd().split(path.sep)[0] : "/";
let blazeDir = path.join(__drivename, "/Blaze/");
const configDir = path.join(blazeDir, "/Launcher/");
let launcherConfig;

// All the checkboxes in the settings window

const splashDefault = document.getElementById("splashDefault");
const splashBlaze = document.getElementById("splashBlaze");
const splashCustom = document.getElementById("splashCustom");
const splashCustomText = document.getElementById("splashCustomText");
const errmsg = document.getElementById("errmsg");


splashDefault.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    splashBlaze.checked = false;
    splashCustom.checked = false;
  } else {
    // Checkbox is not checked..
    splashDefault.checked = true;
  }
});

splashBlaze.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    splashDefault.checked = false;
    splashCustom.checked = false;
  } else {
    // Checkbox is not checked..
    splashDefault.checked = true;
  }
});

splashCustom.addEventListener("change", function () {
  if (this.checked) {
    // Checkbox is checked..
    splashDefault.checked = false;
    splashBlaze.checked = false;
  } else {
    // Checkbox is not checked..
    splashDefault.checked = true;
  }
});

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

        fetch(`${launcherConfig.shopEndpoint}/config/settings.json`)
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
        fetch(`${launcherConfig.shopEndpoint}/config/settings.json`)
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

  document.body.classList.remove("pointer-events-none");

  if (launcherConfig.splash.type === "default") {
    splashDefault.checked = true;
    splashBlaze.checked = false;
  } else if (launcherConfig.splash.type === "blaze") {
    splashBlaze.checked = true;
    splashDefault.checked = false;
  } else if (launcherConfig.splash.type === "custom") {
    splashCustom.checked = true;
    splashCustomText.innerText = `Custom (${launcherConfig.splash.path0}, ${launcherConfig.splash.path1})`;
    splashBlaze.checked = false;
    splashDefault.checked = false;
  } else {
    errmsg.classList.remove("hidden");
  }


}
